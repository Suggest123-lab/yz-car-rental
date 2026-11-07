"use client";

import Link from "next/link";
import { useActionState, useEffect, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Car } from "@/lib/car-types";
import { submitBooking, type BookingFormState } from "./actions";

type BookingDetailsProps = {
  cars: Car[];
  initialCarId?: string;
};

type BookingPreview = {
  formData: FormData;
  fullName: string;
  phone: string;
  email: string;
  carName: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation: string;
  notes: string;
  rentalDays: number;
  totalPayment: number;
};

export default function BookingDetails({ cars, initialCarId }: BookingDetailsProps) {
  const router = useRouter();
  const selectedInitialCar = cars.find((car) => String(car.id) === initialCarId);
  const [selectedCarId, setSelectedCarId] = useState(selectedInitialCar ? String(selectedInitialCar.id) : "");
  const selectedCar = cars.find((car) => String(car.id) === selectedCarId);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [state, formAction, pending] = useActionState<BookingFormState, FormData>(submitBooking, {});
  const [, startTransition] = useTransition();
  const [invalidFields, setInvalidFields] = useState<Set<string>>(() => new Set());
  const [preview, setPreview] = useState<BookingPreview | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const rentalDays = (() => {
    if (!pickupDate || !returnDate || returnDate < pickupDate) return null;
    const start = Date.parse(`${pickupDate}T00:00:00Z`);
    const end = Date.parse(`${returnDate}T00:00:00Z`);
    return Number.isNaN(start) || Number.isNaN(end) ? null : Math.max(1, Math.ceil((end - start) / 86_400_000));
  })();
  const totalPayment = selectedCar && rentalDays ? Number(selectedCar.startingRate) * rentalDays : null;
  const peso = (amount: number) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(amount);
  const inputClass = (name: string, resize = false) => `mt-2 w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-2 ${resize ? "resize-y " : ""}${invalidFields.has(name) ? "border-[#b42318] bg-red-50 focus:border-[#b42318] focus:ring-[#b42318]/15" : "border-[#cbd5e1] focus:border-[#14213d] focus:ring-[#14213d]/15"}`;
  const updateFieldValidity = (event: FormEvent<HTMLFormElement>) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) || !field.name) return;
    setInvalidFields((previous) => {
      const next = new Set(previous);
      if (field.validity.valid) next.delete(field.name);
      else next.add(field.name);
      return next;
    });
  };
  const formatPhone = (event: FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 11);
  };
  const openPreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const pickupDate = value("pickupDate");
    const returnDate = value("returnDate");
    if (returnDate < pickupDate) {
      setClientError("Return date must be on or after the pick-up date.");
      setInvalidFields((previous) => new Set(previous).add("returnDate"));
      return;
    }
    setClientError(null);
    const days = Math.max(1, Math.ceil((Date.parse(`${returnDate}T00:00:00Z`) - Date.parse(`${pickupDate}T00:00:00Z`)) / 86_400_000));
    setPreview({ formData, fullName: value("fullName"), phone: value("phone"), email: value("email"), carName: selectedCar?.name ?? "Selected car", pickupDate, pickupTime: value("pickupTime"), returnDate, returnTime: value("returnTime"), pickupLocation: value("pickupLocation"), notes: value("notes"), rentalDays: days, totalPayment: (selectedCar ? Number(selectedCar.startingRate) : 0) * days });
  };
  const confirmBooking = () => {
    if (!preview) return;
    startTransition(() => { formAction(preview.formData); });
  };

  useEffect(() => {
    if (!state.success) return;
    setPreview(null);
    setShowConfirmation(true);
    const redirectTimer = window.setTimeout(() => router.replace("/"), 3000);
    return () => window.clearTimeout(redirectTimer);
  }, [router, state.success]);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-12 lg:py-14">
      <form action={formAction} onSubmit={openPreview} onInvalid={updateFieldValidity} onInput={updateFieldValidity} className="rounded-3xl border border-[#dbe2ef] bg-white p-6 shadow-sm sm:p-8">
        <fieldset>
          <legend className="text-xl font-semibold">Your details</legend>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Full name <span aria-hidden="true" className="text-[#b42318]">*</span><input name="fullName" required autoComplete="name" aria-invalid={invalidFields.has("fullName")} className={inputClass("fullName")} /></label>
            <label className="text-sm font-medium">Mobile number <span aria-hidden="true" className="text-[#b42318]">*</span><input name="phone" type="tel" required autoComplete="tel" inputMode="numeric" pattern="[0-9]{11}" minLength={11} maxLength={11} title="Enter an 11-digit mobile number." placeholder="09XXXXXXXXX" aria-invalid={invalidFields.has("phone")} onInput={formatPhone} className={inputClass("phone")} /><span className="mt-1 block text-xs font-normal text-[#5f6775]">Enter 11 digits.</span></label>
          </div>
          <label className="mt-5 block text-sm font-medium">Email address <span aria-hidden="true" className="text-[#b42318]">*</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" aria-invalid={invalidFields.has("email")} className={inputClass("email")} /></label>
        </fieldset>

        <fieldset className="mt-9 border-t border-[#dbe2ef] pt-8">
          <legend className="text-xl font-semibold">Trip details</legend>
          <label className="mt-6 block text-sm font-medium">Choose a car <span aria-hidden="true" className="text-[#b42318]">*</span>
            <select name="carId" required value={selectedCarId} aria-invalid={invalidFields.has("carId")} onChange={(event) => setSelectedCarId(event.target.value)} className={`${inputClass("carId")} bg-white`}>
              <option value="" disabled>Select an available car</option>
              {cars.map((car) => <option key={car.id} value={car.id}>{car.name} — ₱{Number(car.startingRate).toLocaleString("en-PH")}/day</option>)}
            </select>
          </label>
          {cars.length === 0 ? <p className="mt-2 text-sm text-[#b42318]">No cars are currently marked available. Please contact us for assistance.</p> : null}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Pick-up date <span aria-hidden="true" className="text-[#b42318]">*</span><input name="pickupDate" type="date" required value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} aria-invalid={invalidFields.has("pickupDate")} className={inputClass("pickupDate")} /></label>
            <label className="text-sm font-medium">Return date <span aria-hidden="true" className="text-[#b42318]">*</span><input name="returnDate" type="date" required value={returnDate} onChange={(event) => setReturnDate(event.target.value)} aria-invalid={invalidFields.has("returnDate")} className={inputClass("returnDate")} /></label>
            <label className="text-sm font-medium">Pick-up time <span aria-hidden="true" className="text-[#b42318]">*</span><input name="pickupTime" type="time" required aria-invalid={invalidFields.has("pickupTime")} className={inputClass("pickupTime")} /></label>
            <label className="text-sm font-medium">Return time <span aria-hidden="true" className="text-[#b42318]">*</span><input name="returnTime" type="time" required aria-invalid={invalidFields.has("returnTime")} className={inputClass("returnTime")} /></label>
          </div>
          <label className="mt-5 block text-sm font-medium">Pick-up location <span aria-hidden="true" className="text-[#b42318]">*</span><input name="pickupLocation" required placeholder="e.g. Cagayan de Oro City" aria-invalid={invalidFields.has("pickupLocation")} className={inputClass("pickupLocation")} /></label>
          <label className="mt-5 block text-sm font-medium">Notes <span className="font-normal text-[#5f6775]">(optional)</span><textarea name="notes" rows={4} placeholder="Flight details, special requests, or drop-off location" className={inputClass("notes", true)} /></label>
        </fieldset>

        {clientError || state.error ? <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#b42318]">{clientError ?? state.error}</p> : null}
        <button type="submit" disabled={cars.length === 0 || pending} className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#fca311] to-[#ffb331] px-5 py-3.5 text-sm font-semibold text-[#14213d] shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-[#aab4c4] disabled:bg-none">{pending ? "Sending request…" : "Send booking request"}</button>
        <p className="mt-3 text-center text-xs leading-5 text-[#5f6775]">Submitting this form requests a booking; it does not confirm a reservation.</p>
      </form>

      <aside className="h-fit overflow-hidden rounded-3xl bg-[#14213d] text-white shadow-sm lg:sticky lg:top-6">
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Booking details</p>
          {selectedCar ? <>
            <h2 className="mt-3 text-2xl font-semibold">{selectedCar.name}</h2>
            <p className="mt-1 text-sm text-white/70">{selectedCar.category}</p>
          </> : <><h2 className="mt-3 text-2xl font-semibold">Your selected car</h2><p className="mt-2 text-sm leading-6 text-white/75">Choose an available car and its details will appear here.</p></>}
        </div>
        {selectedCar ? <>
          {selectedCar.imageUrl ? <img src={selectedCar.imageUrl} alt={selectedCar.name} className="h-52 w-full object-cover" /> : <div className="flex h-52 items-center justify-center bg-[#263d66] text-xs font-semibold tracking-[0.16em] text-white/65">YZ CAR RENTAL</div>}
          <div className="grid grid-cols-2 gap-4 p-6 pt-5 text-sm sm:p-8 sm:pt-5"><div><p className="text-white/60">Starting at</p><p className="mt-1 text-lg font-semibold text-[#fca311]">₱{Number(selectedCar.startingRate).toLocaleString("en-PH")}<span className="text-xs font-normal text-white/65"> / day</span></p></div><div><p className="text-white/60">Car details</p><p className="mt-1 font-medium">{selectedCar.capacity} seats · {selectedCar.transmission}</p></div></div>
        </> : null}
        {selectedCar ? <div className="border-t border-white/15 px-6 py-5 sm:px-8"><p className="text-sm font-semibold">Estimated payment</p>{totalPayment !== null && rentalDays ? <><p className="mt-2 text-2xl font-semibold text-[#fca311]">{peso(totalPayment)}</p><p className="mt-1 text-xs leading-5 text-white/65">{rentalDays} {rentalDays === 1 ? "day" : "days"} × {peso(Number(selectedCar.startingRate))} starting daily rate</p></> : <p className="mt-2 text-sm leading-6 text-white/75">Select your pick-up and return dates to see the estimated total.</p>}<p className="mt-2 text-xs leading-5 text-white/55">Final payment may change after the booking is reviewed.</p></div> : null}
        <div className="border-t border-white/15 p-6 sm:p-8"><p className="text-sm font-semibold">Need help first?</p><p className="mt-2 text-sm leading-6 text-white/75">Browse the fleet to compare available vehicles.</p><Link href="/fleet" className="mt-4 inline-flex text-sm font-semibold text-[#fca311] underline underline-offset-4">View our fleet</Link></div>
      </aside>
      {preview ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213d]/60 p-4" role="dialog" aria-modal="true" aria-labelledby="booking-review-title"><section className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Review booking</p><h2 id="booking-review-title" className="mt-2 text-2xl font-semibold tracking-tight">Confirm your request</h2><p className="mt-2 text-sm leading-6 text-[#5f6775]">Please check the details below before sending your booking request.</p><dl className="mt-6 divide-y divide-[#e8edf4] rounded-2xl border border-[#dbe2ef] px-4"><div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-medium text-[#5f6775]">Customer</dt><dd className="text-sm font-semibold">{preview.fullName}<span className="mt-1 block font-normal text-[#5f6775]">{preview.phone} · {preview.email}</span></dd></div><div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-medium text-[#5f6775]">Car</dt><dd className="text-sm font-semibold">{preview.carName}</dd></div><div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-medium text-[#5f6775]">Rental period</dt><dd className="text-sm">{preview.pickupDate} at {preview.pickupTime}<span className="mx-1 text-[#5f6775]">to</span>{preview.returnDate} at {preview.returnTime}</dd></div><div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-medium text-[#5f6775]">Pick-up location</dt><dd className="text-sm">{preview.pickupLocation}</dd></div>{preview.notes ? <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-medium text-[#5f6775]">Notes</dt><dd className="whitespace-pre-wrap text-sm">{preview.notes}</dd></div> : null}</dl>{state.error ? <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-[#b42318]">{state.error}</p> : null}<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" disabled={pending} onClick={() => setPreview(null)} className="rounded-xl border border-[#cbd5e1] px-4 py-2.5 text-sm font-semibold text-[#14213d] hover:bg-[#eef2f7] disabled:opacity-60">Cancel and edit</button><button type="button" disabled={pending} onClick={confirmBooking} className="rounded-xl bg-[#14213d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#263d66] disabled:opacity-60">{pending ? "Confirming…" : "Confirm booking"}</button></div></section></div> : null}
      {showConfirmation ? <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#14213d]/60 p-4" role="dialog" aria-modal="true" aria-labelledby="booking-confirmation-title"><section className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">✓</div><h2 id="booking-confirmation-title" className="mt-5 text-2xl font-semibold tracking-tight">Booking request sent</h2><p className="mt-3 text-sm leading-6 text-[#5f6775]">{state.success} Returning to the home page shortly.</p><button type="button" onClick={() => router.replace("/")} className="mt-6 rounded-xl bg-[#14213d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#263d66]">Return home now</button></section></div> : null}
    </div>
  );
}
