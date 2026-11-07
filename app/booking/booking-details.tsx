"use client";

import Link from "next/link";
import { useState } from "react";
import type { Car } from "@/lib/car-types";

type BookingDetailsProps = {
  cars: Car[];
  initialCarId?: string;
};

export default function BookingDetails({ cars, initialCarId }: BookingDetailsProps) {
  const selectedInitialCar = cars.find((car) => String(car.id) === initialCarId);
  const [selectedCarId, setSelectedCarId] = useState(selectedInitialCar ? String(selectedInitialCar.id) : "");
  const selectedCar = cars.find((car) => String(car.id) === selectedCarId);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-12 lg:py-14">
      <form className="rounded-3xl border border-[#dbe2ef] bg-white p-6 shadow-sm sm:p-8">
        <fieldset>
          <legend className="text-xl font-semibold">Your details</legend>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Full name<input name="fullName" required autoComplete="name" className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
            <label className="text-sm font-medium">Mobile number<input name="phone" type="tel" required autoComplete="tel" placeholder="09XX XXX XXXX" className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
          </div>
          <label className="mt-5 block text-sm font-medium">Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
        </fieldset>

        <fieldset className="mt-9 border-t border-[#dbe2ef] pt-8">
          <legend className="text-xl font-semibold">Trip details</legend>
          <label className="mt-6 block text-sm font-medium">Choose a car
            <select name="carId" required value={selectedCarId} onChange={(event) => setSelectedCarId(event.target.value)} className="mt-2 w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15">
              <option value="" disabled>Select an available car</option>
              {cars.map((car) => <option key={car.id} value={car.id}>{car.name} — ₱{Number(car.startingRate).toLocaleString("en-PH")}/day</option>)}
            </select>
          </label>
          {cars.length === 0 ? <p className="mt-2 text-sm text-[#b42318]">No cars are currently marked available. Please contact us for assistance.</p> : null}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">Pick-up date<input name="pickupDate" type="date" required className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
            <label className="text-sm font-medium">Return date<input name="returnDate" type="date" required className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
            <label className="text-sm font-medium">Pick-up time<input name="pickupTime" type="time" required className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
            <label className="text-sm font-medium">Return time<input name="returnTime" type="time" required className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
          </div>
          <label className="mt-5 block text-sm font-medium">Pick-up location<input name="pickupLocation" required placeholder="e.g. Cagayan de Oro City" className="mt-2 w-full rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
          <label className="mt-5 block text-sm font-medium">Notes <span className="font-normal text-[#5f6775]">(optional)</span><textarea name="notes" rows={4} placeholder="Flight details, special requests, or drop-off location" className="mt-2 w-full resize-y rounded-xl border border-[#cbd5e1] px-4 py-3 text-base outline-none transition focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/15" /></label>
        </fieldset>

        <button type="submit" disabled={cars.length === 0} className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#fca311] to-[#ffb331] px-5 py-3.5 text-sm font-semibold text-[#14213d] shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-[#aab4c4] disabled:bg-none">Send booking request</button>
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
        <div className="border-t border-white/15 p-6 sm:p-8"><p className="text-sm font-semibold">Need help first?</p><p className="mt-2 text-sm leading-6 text-white/75">Browse the fleet to compare available vehicles.</p><Link href="/fleet" className="mt-4 inline-flex text-sm font-semibold text-[#fca311] underline underline-offset-4">View our fleet</Link></div>
      </aside>
    </div>
  );
}
