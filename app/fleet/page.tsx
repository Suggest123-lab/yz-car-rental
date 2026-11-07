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
    <main className="min-h-screen bg-[#f7f8f4] text-[#17352e]">
      <header className="bg-[#173f35]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
          <Link href="/" aria-label="YZ Car Rental home">
            <Image src="/images/yz_logo.jpg" alt="YZ Car Rental logo" width={64} height={64} className="h-14 w-14 rounded-full object-cover shadow-lg shadow-black/30" />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-sm font-normal text-white/90 lg:flex">
            <Link className="transition hover:text-[#f3c878]" href="/">HOME</Link>
            <Link className="text-[#f3c878]" href="/fleet" aria-current="page">OUR FLEET</Link>
            <Link className="transition hover:text-[#f3c878]" href="/#faq">FAQ</Link>
            <Link className="transition hover:text-[#f3c878]" href="/#about">ABOUT US</Link>
            <Link className="transition hover:text-[#f3c878]" href="/#contact">CONTACT US</Link>
            <Link href="/fleet" className="rounded-full border border-[#f3c878] bg-[#f3c878] px-5 py-3 font-medium text-[#1c2b5a] shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#ffe09a]">Book Now</Link>
          </nav>
          <Link href="/fleet" className="ml-auto rounded-full border border-[#f3c878] bg-[#f3c878] px-5 py-3 text-sm font-medium text-[#1c2b5a] shadow-lg shadow-black/25 transition hover:bg-[#ffe09a] lg:hidden">Book Now</Link>
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
        <div className="absolute inset-0 bg-[#102c25]/65" />
        <h1 className="relative px-6 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">Our fleet</h1>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e98d48]">YZ Car Rental</p>
          <p className="mx-auto mt-3 max-w-xl text-[#687870]">Choose a ride that fits your plans. Contact us to check your preferred dates.</p>
        </div>
        {cars.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <article key={car.id} className="overflow-hidden rounded-3xl border border-[#dfe5dc] bg-white shadow-sm">
                {car.imageUrl ? (
                  <img src={car.imageUrl} alt={car.name} className="h-52 w-full object-cover" />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-[#edf2e9] text-sm font-semibold tracking-[0.12em] text-[#687870]">YZ CAR RENTAL</div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-sm text-[#687870]">{car.category}</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">{car.name}</h2></div>
                    {car.isFeatured ? <span className="rounded-full bg-[#fff2db] px-2.5 py-1 text-xs font-semibold text-[#9a5b16]">Featured</span> : null}
                  </div>
                  <p className="mt-4 text-sm text-[#687870]">{car.capacity} seats · {car.transmission}</p>
                  {car.description ? <p className="mt-3 text-sm leading-6 text-[#687870]">{car.description}</p> : null}
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-[#e8ece6] pt-5"><p className="text-lg font-semibold text-[#1c2b5a]">{peso(car.startingRate)}<span className="text-xs font-normal text-[#687870]"> / day</span></p><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${car.status === "available" ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-700"}`}>{car.status === "available" ? "Available" : car.status.charAt(0).toUpperCase() + car.status.slice(1)}</span></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-2xl border border-dashed border-[#cfd8cf] bg-white p-8 text-center text-sm text-[#687870]">Our fleet is being updated. Please check back soon.</p>
        )}
      </div>
    </main>
  );
}
