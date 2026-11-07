import Image from "next/image";
import Link from "next/link";

export default function FleetPage() {
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
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-12">
        <div className="mt-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e98d48]">YZ Car Rental</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Our Fleet</h1>
          <p className="mt-4 text-[#687870]">Our complete car list will be available here soon.</p>
        </div>
      </div>
    </main>
  );
}
