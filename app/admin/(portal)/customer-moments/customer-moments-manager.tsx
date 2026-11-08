"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import type { CustomerMoment } from "@/lib/customer-moments";
import { addCustomerMoment, deleteCustomerMoment } from "./actions";

type Toast = { message: string; tone: "success" | "error" };

export default function CustomerMomentsManager({ moments }: { moments: CustomerMoment[] }) {
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<Toast | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3_500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function upload(formData: FormData) {
    startTransition(async () => {
      try {
        await addCustomerMoment(formData);
        formRef.current?.reset();
        setToast({ message: "Customer photo uploaded successfully.", tone: "success" });
      } catch (error) {
        setToast({ message: error instanceof Error ? error.message : "Unable to upload the photo.", tone: "error" });
      }
    });
  }

  function remove(formData: FormData) {
    startTransition(async () => {
      try {
        await deleteCustomerMoment(formData);
        setToast({ message: "Customer photo removed.", tone: "success" });
      } catch (error) {
        setToast({ message: error instanceof Error ? error.message : "Unable to remove the photo.", tone: "error" });
      }
    });
  }

  return <>
    <form ref={formRef} action={upload} encType="multipart/form-data" className="mt-8 rounded-2xl border border-[#dbe2ef] bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#14213d]">Customer name <span className="font-normal text-[#5f6775]">(optional)</span><input name="customerName" maxLength={120} placeholder="e.g. Maria Santos" className="mt-1.5 block w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm font-normal outline-none transition focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20" /></label>
        <label className="text-sm font-medium text-[#14213d]">Caption <span className="font-normal text-[#5f6775]">(optional)</span><input name="occasion" maxLength={160} placeholder="e.g. Weekend road trip" className="mt-1.5 block w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm font-normal outline-none transition focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20" /></label>
        <label className="text-sm font-medium text-[#14213d] sm:col-span-2">Photo <span className="font-normal text-[#5f6775]">(JPG, PNG, WebP, or GIF; max 5 MB)</span><input name="imageFile" type="file" required accept="image/jpeg,image/png,image/webp,image/gif" className="mt-1.5 block w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 text-sm font-normal file:mr-3 file:rounded-lg file:border-0 file:bg-[#eef2f7] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[#14213d] hover:file:bg-[#dbe2ef]" /></label>
      </div>
      <div className="mt-5 flex justify-end border-t border-[#e8edf4] pt-5"><button disabled={pending} className="rounded-xl bg-[#14213d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263d66] disabled:cursor-not-allowed disabled:opacity-60">{pending ? "Uploading…" : "Upload photo"}</button></div>
    </form>

    <div className="mt-8">
      <div className="flex items-baseline justify-between gap-4"><h3 className="text-lg font-semibold text-[#14213d]">Published photos</h3><p className="text-sm text-[#5f6775]">{moments.length} {moments.length === 1 ? "photo" : "photos"}</p></div>
      {moments.length ? <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{moments.map((moment) => <article key={moment.id} className="overflow-hidden rounded-2xl border border-[#dbe2ef] bg-white shadow-sm"><div className="relative aspect-[4/3] bg-[#eef2f7]"><Image src={moment.imageUrl} alt={moment.customerName ? `${moment.customerName}, YZ Car Rental customer` : "YZ Car Rental customer moment"} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" /></div><div className="p-4">{moment.customerName ? <h4 className="font-semibold text-[#14213d]">{moment.customerName}</h4> : <h4 className="font-semibold text-[#5f6775]">Customer moment</h4>}{moment.occasion ? <p className="mt-1 text-sm text-[#5f6775]">{moment.occasion}</p> : null}<form action={remove} className="mt-4"><input type="hidden" name="customerMomentId" value={moment.id} /><button disabled={pending} className="rounded-lg border border-[#fecaca] px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">Remove</button></form></div></article>)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-8 text-sm leading-6 text-[#5f6775]">No customer photos have been published yet. Uploaded photos will appear here and on the home page.</div>}
    </div>

    {toast ? <div role="status" aria-live="polite" className={`fixed bottom-6 right-6 z-[60] rounded-xl px-4 py-3 text-sm font-semibold shadow-xl ${toast.tone === "success" ? "bg-emerald-700 text-white" : "bg-red-700 text-white"}`}>{toast.message}</div> : null}
  </>;
}
