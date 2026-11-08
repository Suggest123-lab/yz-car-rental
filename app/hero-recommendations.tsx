"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Car } from "@/lib/car-types";

function peso(value: string) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default function HeroRecommendations({ cars }: { cars: Car[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (cars.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % cars.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [cars.length]);

  return (
    <aside className="relative mx-auto w-full max-w-xl lg:ml-auto" aria-label="Recommended cars">
      <div className="relative p-5 sm:p-6">
        <div className="relative mt-3 h-[19rem] sm:h-[21rem]">
          {cars.map((car, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={car.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 text-white transition-opacity duration-700 ease-in-out ${
                  isActive
                    ? "z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
              >
                <div aria-hidden="true" className="absolute bottom-7 left-7 right-3 top-3 -rotate-[10deg] rounded-[3.25rem] bg-white shadow-[0_22px_35px_-22px_rgba(20,33,61,0.6)]" />
                <div className="absolute bottom-7 left-7 right-3 top-3 -rotate-[5deg] overflow-hidden rounded-[3.25rem] bg-[#14213d] shadow-[0_22px_35px_-22px_rgba(20,33,61,0.75)]">
                  <Image
                    src={car.imageUrl ?? "/images/asset_landing.jpg"}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="scale-105 object-cover object-center rotate-[5deg]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213d]/85 via-[#14213d]/10 to-[#14213d]/10" />
                </div>
                <div className="absolute bottom-10 right-3 z-10 text-right sm:right-5">
                  <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">{car.name}</h2>
                  <p className="mt-1 text-sm text-white/85">{car.category}</p>
                </div>
                <div className="absolute bottom-1 left-0 z-10 grid w-40 gap-2 sm:w-44">
                  <div className="rounded-l-xl bg-[#fca311] px-3 py-2.5 text-[#14213d] shadow-lg shadow-[#14213d]/15">
                    <p className="text-2xl font-medium leading-none">{peso(car.startingRate)}</p>
                    <p className="mt-1 text-xs text-[#14213d]/70">Starting daily rate</p>
                  </div>
                  <div className="rounded-l-xl bg-white px-3 py-2.5 text-[#14213d] shadow-lg shadow-[#14213d]/15">
                    <p className="text-base font-medium">{car.capacity} seats · {car.transmission}</p>
                    <p className="mt-1 text-xs text-[#5f6775]">Ready for your trip</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
