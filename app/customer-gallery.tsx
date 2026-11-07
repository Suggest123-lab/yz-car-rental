"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const customerMoments = [
  {
    name: "Mia and family",
    occasion: "Weekend road trip",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Jared",
    occasion: "Business travel",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Angela and friends",
    occasion: "City escape",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Paolo",
    occasion: "Airport pickup",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Rina",
    occasion: "A day out",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  },
];

export default function CustomerGallery() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCustomers = Array.from({ length: 3 }, (_, index) =>
    customerMoments[(startIndex + index) % customerMoments.length],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStartIndex((currentIndex) => (currentIndex + 1) % customerMoments.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  function showPrevious() {
    setStartIndex(
      (currentIndex) =>
        (currentIndex - 1 + customerMoments.length) % customerMoments.length,
    );
  }

  function showNext() {
    setStartIndex((currentIndex) => (currentIndex + 1) % customerMoments.length);
  }

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCustomers.map((customer) => (
          <article
            key={customer.name}
            className="group overflow-hidden rounded-3xl bg-[#14213d] shadow-[0_20px_50px_-35px_rgba(19,40,92,0.6)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={customer.image}
                alt={`${customer.name}, a YZ Car Rental customer`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14213d]/90 via-[#14213d]/35 to-transparent px-5 pb-5 pt-16 text-white">
                <h3 className="text-lg font-medium">{customer.name}</h3>
                <p className="mt-1 text-sm text-white/75">{customer.occasion}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-7 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={showPrevious}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14213d] text-xl text-[#14213d] transition hover:bg-[#14213d] hover:text-[#fca311]"
          aria-label="Show previous customer photos"
        >
          ←
        </button>
        <span className="text-sm text-[#5f6775]">Customer moments</span>
        <button
          type="button"
          onClick={showNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14213d] text-xl text-[#14213d] transition hover:bg-[#14213d] hover:text-[#fca311]"
          aria-label="Show next customer photos"
        >
          →
        </button>
      </div>
    </div>
  );
}
