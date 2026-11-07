import Image from "next/image";
import Link from "next/link";
import { getCars } from "@/lib/cars";

// The fleet is managed in PostgreSQL and should render fresh on each request.
export const instant = false;

function peso(value: string) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default async function FleetPage() {
  const cars = await getCars();

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-[#14213d]">
      <header className="bg-[#14213d]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
          <Link href="/" aria-label="YZ Car Rental home">
            <Image src="/images/yz_logo.jpg" alt="YZ Car Rental logo" width={64} height={64} className="h-14 w-14 rounded-full object-cover shadow-lg shadow-black/30" />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-sm font-normal text-white/90 lg:flex">
            <Link className="transition hover:text-[#fca311]" href="/">HOME</Link>
            <Link className="text-[#fca311]" href="/fleet" aria-current="page">OUR FLEET</Link>
            <Link className="transition hover:text-[#fca311]" href="/#faq">FAQ</Link>
            <Link className="transition hover:text-[#fca311]" href="/#about">ABOUT US</Link>
            <Link className="transition hover:text-[#fca311]" href="/#contact">CONTACT US</Link>
            <Link href="/booking" className="rounded-full border border-[#fca311] bg-[#fca311] px-5 py-3 font-medium text-[#14213d] shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#fca311]">Book Now</Link>
          </nav>
          <Link href="/booking" className="ml-auto rounded-full border border-[#fca311] bg-[#fca311] px-5 py-3 text-sm font-medium text-[#14213d] shadow-lg shadow-black/25 transition hover:bg-[#fca311] lg:hidden">Book Now</Link>
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
        <div className="absolute inset-0 bg-[#14213d]/65" />
        <h1 className="relative px-6 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">Our fleet</h1>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">YZ Car Rental</p>
          <p className="mx-auto mt-3 max-w-xl text-[#5f6775]">Choose a ride that fits your plans. Contact us to check your preferred dates.</p>
        </div>
        {cars.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <article key={car.id} className="overflow-hidden rounded-3xl border border-[#dbe2ef] bg-white shadow-sm">
                {car.imageUrl ? (
                  <img src={car.imageUrl} alt={car.name} className="h-52 w-full object-cover" />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-[#eef2f7] text-sm font-semibold tracking-[0.12em] text-[#5f6775]">YZ CAR RENTAL</div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-sm text-[#5f6775]">{car.category}</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">{car.name}</h2></div>
                    {car.isFeatured ? <span className="rounded-full bg-[#fff7e6] px-2.5 py-1 text-xs font-semibold text-[#9a5b00]">Featured</span> : null}
                  </div>
                  <p className="mt-4 text-sm text-[#5f6775]">{car.capacity} seats · {car.transmission}</p>
                  {car.description ? <p className="mt-3 text-sm leading-6 text-[#5f6775]">{car.description}</p> : null}
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#dbe2ef] pt-5"><p className="text-lg font-semibold text-[#14213d]">{peso(car.startingRate)}<span className="text-xs font-normal text-[#5f6775]"> / day</span></p><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${car.status === "available" ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>{car.status === "available" ? "Available" : car.status.charAt(0).toUpperCase() + car.status.slice(1)}</span></div>
                  {car.status === "available" ? <Link href={`/booking?car=${car.id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-[#14213d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#263d66]">Book this car</Link> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-8 text-center text-sm text-[#5f6775]">Our fleet is being updated. Please check back soon.</p>
        )}
      </div>
    </main>
  );
}
