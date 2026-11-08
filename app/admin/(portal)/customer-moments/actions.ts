"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, getAdminSession } from "@/lib/admin-auth";
import { pool } from "@/lib/db";

async function requireAdmin() {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) throw new Error("Unauthorized.");
}

function optionalText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  if (typeof value !== "string") throw new Error(`Invalid ${key}.`);
  const trimmed = value.trim();
  if (trimmed.length > maxLength) throw new Error(`Invalid ${key}.`);
  return trimmed || null;
}

function refreshCustomerMoments() {
  revalidatePath("/");
  revalidatePath("/admin/customer-moments");
}

async function saveUploadedImage(file: File) {
  const extensions = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  } as const;
  const extension = extensions[file.type as keyof typeof extensions];
  if (!extension) throw new Error("Use a JPG, PNG, WebP, or GIF image.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be 5 MB or smaller.");

  const filename = `${randomUUID()}.${extension}`;
  const uploadDirectory = path.join(process.cwd(), "public", "uploads", "customer-moments");
  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/customer-moments/${filename}`;
}

export async function addCustomerMoment(formData: FormData) {
  await requireAdmin();
  const customerName = optionalText(formData, "customerName", 120);
  const occasionValue = formData.get("occasion");
  const occasion = typeof occasionValue === "string" ? occasionValue.trim() : "";
  const imageFile = formData.get("imageFile");

  if (occasion.length > 160) throw new Error("Caption must be 160 characters or fewer.");
  if (!(imageFile instanceof File) || imageFile.size === 0) throw new Error("Choose an image to upload.");
  const imageUrl = await saveUploadedImage(imageFile);
  await pool.query(
    `INSERT INTO customer_moments (customer_name, occasion, image_url) VALUES ($1, $2, $3)`,
    [customerName, occasion || null, imageUrl],
  );
  refreshCustomerMoments();
}

export async function deleteCustomerMoment(formData: FormData) {
  await requireAdmin();
  const value = formData.get("customerMomentId");
  const id = typeof value === "string" ? Number(value) : NaN;
  if (!Number.isSafeInteger(id) || id < 1) throw new Error("Invalid customer moment.");

  const { rows } = await pool.query<{ imageUrl: string }>(
    `DELETE FROM customer_moments WHERE customer_moment_id = $1 RETURNING image_url AS "imageUrl"`,
    [id],
  );
  const imageUrl = rows[0]?.imageUrl;
  if (imageUrl?.startsWith("/uploads/customer-moments/")) {
    const filename = path.basename(imageUrl);
    await unlink(path.join(process.cwd(), "public", "uploads", "customer-moments", filename)).catch(() => undefined);
  }
  refreshCustomerMoments();
}
