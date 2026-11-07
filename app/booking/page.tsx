import Image from "next/image";
import Link from "next/link";
import { getCars } from "@/lib/cars";
import BookingDetails from "./booking-details";

// The form reads live fleet availability and an optional selected-car query parameter.
export const instant = false;

type BookingPageProps = {
  searchParams: Promise<{ car?: string | string[] }>;
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const [cars, params] = await Promise.all([getCars(), searchParams]);
  const selectedCar = Array.isArray(params.car) ? params.car[0] : params.car;
  const availableCars = cars.filter((car) => car.status === "available");

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-[#14213d]">
      <header className="bg-[#14213d]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
          <Link href="/" aria-label="YZ Car Rental home">
            <Image src="/images/yz_logo.jpg" alt="YZ Car Rental logo" width={64} height={64} className="h-14 w-14 rounded-full object-cover shadow-lg shadow-black/30" />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-sm font-normal text-white/90 lg:flex">
            <Link className="transition hover:text-[#fca311]" href="/">HOME</Link>
            <Link className="transition hover:text-[#fca311]" href="/fleet">OUR FLEET</Link>
            <Link className="text-[#fca311]" href="/booking" aria-current="page">BOOK NOW</Link>
            <Link className="transition hover:text-[#fca311]" href="/#contact">CONTACT US</Link>
          </nav>
          <Link href="/fleet" className="ml-auto rounded-full border border-[#fca311] px-5 py-3 text-sm font-medium text-[#fca311] transition hover:bg-white/10 lg:hidden">View fleet</Link>
        </div>
      </header>

      <section className="relative flex min-h-40 items-center justify-center overflow-hidden sm:min-h-48">
        <Image
          src="/images/asset_landing.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#14213d]/75" />
        <h1 className="relative px-6 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">Book your car</h1>
      </section>

      <section className="border-b border-[#dbe2ef] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Rental request</p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f6775]">Tell us where and when you need a ride. We&apos;ll review your request and confirm availability before your reservation is finalized.</p>
        </div>
      </section>

      <BookingDetails cars={availableCars} initialCarId={selectedCar} />
    </main>
  );
}
