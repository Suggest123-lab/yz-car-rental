"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, getAdminSession } from "@/lib/admin-auth";
import { carStatuses, type CarStatus } from "@/lib/car-types";
import { pool } from "@/lib/db";

function textValue(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  if (typeof value !== "string") throw new Error(`Invalid ${key}.`);
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) throw new Error(`Invalid ${key}.`);
  return trimmed;
}

function numericValue(formData: FormData, key: string, allowDecimal = false) {
  const value = formData.get(key);
  if (typeof value !== "string") throw new Error(`Invalid ${key}.`);
  const pattern = allowDecimal ? /^\d+(?:\.\d{1,2})?$/ : /^\d+$/;
  if (!pattern.test(value)) throw new Error(`Invalid ${key}.`);
  return Number(value);
}

async function requireAdmin() {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    throw new Error("Unauthorized.");
  }
}

function refreshCars() {
  revalidatePath("/admin/cars");
  revalidatePath("/fleet");
  revalidatePath("/");
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
  const uploadDirectory = path.join(process.cwd(), "public", "uploads", "cars");
  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));

  return `/uploads/cars/${filename}`;
}

export async function saveCar(formData: FormData) {
  await requireAdmin();

  const idValue = formData.get("carId");
  const carId = typeof idValue === "string" && idValue ? Number(idValue) : null;
  const name = textValue(formData, "name", 120);
  const categoryName = textValue(formData, "category", 80);
  const transmission = textValue(formData, "transmission", 40);
  const capacity = numericValue(formData, "capacity");
  const cityRate = numericValue(formData, "cityRate", true);
  const outsideCdoRate = numericValue(formData, "outsideCdoRate", true);
  const outsideRegionRate = numericValue(formData, "outsideRegionRate", true);
  const carwashRate = numericValue(formData, "carwashRate", true);
  const status = formData.get("status");
  const existingImageUrl = typeof formData.get("existingImageUrl") === "string" ? formData.get("existingImageUrl")!.toString() : "";
  const imageFile = formData.get("imageFile");
  const description = typeof formData.get("description") === "string" ? formData.get("description")!.toString().trim() : "";

  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 99) throw new Error("Capacity must be between 1 and 99.");
  if (![cityRate, outsideCdoRate, outsideRegionRate, carwashRate].every((rate) => Number.isFinite(rate) && rate >= 0 && rate <= 1_000_000)) throw new Error("Enter valid rates.");
  const category = await pool.query<{ id: number }>("SELECT category_id AS id FROM car_categories WHERE lower(name) = lower($1)", [categoryName]);
  const categoryId = category.rows[0]?.id;
  if (!categoryId) throw new Error("Select a valid category.");
  if (!carStatuses.includes(status as CarStatus)) throw new Error("Invalid status.");
  if (existingImageUrl.length > 2_000 || description.length > 1_000) throw new Error("Image or description is too long.");

  let imageUrl = formData.get("removeImage") === "on" ? null : existingImageUrl || null;
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await saveUploadedImage(imageFile);
  }

  const values = [name, capacity, cityRate, outsideCdoRate, outsideRegionRate, carwashRate, categoryId, transmission, status, imageUrl || null, description || null, formData.get("isFeatured") === "on"];

  if (carId !== null) {
    if (!Number.isInteger(carId) || carId < 1) throw new Error("Invalid car.");
    await pool.query(
      `UPDATE cars SET name = $1, capacity = $2, city_rate = $3, outside_cdo_rate = $4,
       outside_region_rate = $5, carwash_rate = $6, category_id = $7, transmission = $8,
       status = $9, image_url = $10, description = $11, is_featured = $12, updated_at = now() WHERE car_id = $13`,
      [...values, carId],
    );
  } else {
    await pool.query(
      `INSERT INTO cars (name, capacity, city_rate, outside_cdo_rate, outside_region_rate, carwash_rate, category_id, transmission, status, image_url, description, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      values,
    );
  }

  refreshCars();
}

