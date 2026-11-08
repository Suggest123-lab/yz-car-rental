"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CustomerMoment } from "@/lib/customer-moments";

export default function CustomerGallery({ customerMoments }: { customerMoments: CustomerMoment[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCustomers = customerMoments.length ? Array.from(
    { length: Math.min(3, customerMoments.length) },
    (_, index) => customerMoments[(startIndex + index) % customerMoments.length],
  ) : [];

  useEffect(() => {
    if (customerMoments.length <= 1) return;
    const interval = window.setInterval(() => setStartIndex((currentIndex) => (currentIndex + 1) % customerMoments.length), 5000);
    return () => window.clearInterval(interval);
  }, [customerMoments.length]);

  function showPrevious() {
    setStartIndex((currentIndex) => (currentIndex - 1 + customerMoments.length) % customerMoments.length);
  }

  function showNext() {
    setStartIndex((currentIndex) => (currentIndex + 1) % customerMoments.length);
  }

  if (!customerMoments.length) {
    return <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white p-8 text-center text-sm leading-6 text-[#5f6775]">Customer photos will be shared here soon.</div>;
  }

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {visibleCustomers.map((customer, index) => (
          <article key={customer.id} className={`group overflow-hidden rounded-3xl bg-[#14213d] shadow-[0_20px_50px_-35px_rgba(19,40,92,0.6)] ${index > 0 ? "hidden lg:block" : ""}`}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={customer.imageUrl} alt={customer.customerName ? `${customer.customerName}, a YZ Car Rental customer` : "YZ Car Rental customer moment"} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              {(customer.customerName || customer.occasion) ? <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14213d]/90 via-[#14213d]/35 to-transparent px-5 pb-5 pt-16 text-white">{customer.customerName ? <h3 className="text-lg font-medium">{customer.customerName}</h3> : null}{customer.occasion ? <p className="mt-1 text-sm text-white/75">{customer.occasion}</p> : null}</div> : null}
            </div>
          </article>
        ))}
      </div>
      {customerMoments.length > 1 ? <div className="mt-7 flex items-center justify-center gap-3"><button type="button" onClick={showPrevious} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14213d] text-xl text-[#14213d] transition hover:bg-[#14213d] hover:text-[#fca311]" aria-label="Show previous customer photos">←</button><span className="text-sm text-[#5f6775]">Customer moments</span><button type="button" onClick={showNext} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14213d] text-xl text-[#14213d] transition hover:bg-[#14213d] hover:text-[#fca311]" aria-label="Show next customer photos">→</button></div> : null}
    </div>
  );
}
