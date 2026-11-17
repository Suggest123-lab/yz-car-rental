"use client";

import { useState, useTransition } from "react";
import type { DriverServiceRate, DriverTravelScope } from "@/lib/driver-service-rates";
import { saveDriverServiceRates } from "./actions";

const fields: { travelScope: DriverTravelScope; label: string; description: string }[] = [
  { travelScope: "city", label: "City drive", description: "Trips within Cagayan de Oro City." },
  { travelScope: "outside-cdo", label: "Outside CDO", description: "Trips outside the city but within the region." },
  { travelScope: "outside-region", label: "Outside region", description: "Trips beyond the region." },
];

export default function DriverRatesManager({ rates }: { rates: DriverServiceRate[] }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ text: string; tone: "success" | "error" } | null>(null);
  const ratesByScope = new Map(rates.map((rate) => [rate.travelScope, rate.dailyRate]));

  function save(formData: FormData) {
    startTransition(async () => {
      try {
        await saveDriverServiceRates(formData);
        setMessage({ text: "Driver rates saved.", tone: "success" });
      } catch (error) {
        setMessage({ text: error instanceof Error ? error.message : "Unable to save driver rates.", tone: "error" });
      }
    });
  }

  return <>
    <form action={save} className="mt-8 rounded-2xl border border-[#dbe2ef] bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        {fields.map((field) => <label key={field.travelScope} className="block rounded-xl border border-[#e8edf4] p-4 text-sm font-medium text-[#14213d]">
          <span>{field.label}</span>
          <span className="mt-1 block text-xs font-normal leading-5 text-[#5f6775]">{field.description}</span>
          <span className="relative mt-3 block"><span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-[#5f6775]">₱</span><input name={`${field.travelScope}Rate`} type="number" min="0" max="1000000" step="0.01" required defaultValue={ratesByScope.get(field.travelScope) ?? "0"} className="block w-full rounded-xl border border-[#cbd5e1] bg-white py-2.5 pl-7 pr-3 text-sm font-normal outline-none transition focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20" aria-label={`${field.label} daily driver rate in Philippine pesos`} /></span>
          <span className="mt-2 block text-xs font-normal text-[#5f6775]">per day</span>
        </label>)}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#e8edf4] pt-5"><p className="text-xs leading-5 text-[#5f6775]">These rates apply only when a driver is requested.</p><button disabled={pending} className="shrink-0 rounded-xl bg-[#14213d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263d66] disabled:cursor-not-allowed disabled:opacity-60">{pending ? "Saving…" : "Save driver rates"}</button></div>
    </form>
    {message ? <div role="status" aria-live="polite" className={`fixed bottom-6 right-6 z-[60] rounded-xl px-4 py-3 text-sm font-semibold shadow-xl ${message.tone === "success" ? "bg-emerald-700 text-white" : "bg-red-700 text-white"}`}>{message.text}</div> : null}
  </>;
}
