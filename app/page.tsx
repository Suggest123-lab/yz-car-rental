import Image from "next/image";
import Link from "next/link";
import { getCars } from "@/lib/cars";
import type { Car } from "@/lib/car-types";
import { getCustomerMoments } from "@/lib/customer-moments";
import CustomerGallery from "./customer-gallery";
import FloatingActions from "./floating-actions";
import HeroRecommendations from "./hero-recommendations";

function BrandMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14213d] text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
      >
        <path
          d="M4 14.5h16l-1.6-5.2a2 2 0 0 0-1.9-1.4H7.5a2 2 0 0 0-1.9 1.4L4 14.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 14.5v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h11v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3M7 12h.01M17 12h.01"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function HeroCar() {
  return (
    <svg
      role="img"
      aria-label="Illustration of a green rental car"
      viewBox="0 0 680 400"
      className="relative z-10 w-full drop-shadow-[0_30px_25px_rgba(23,63,53,0.2)]"
      fill="none"
    >
      <path
        d="m101 275 25-71c8-22 24-37 47-44l95-28c22-7 48-10 72-8l92 8c27 2 50 14 67 34l48 58 45 18c13 5 21 17 21 31v27H83v-8c0-8 7-15 18-17Z"
        fill="#263d66"
      />
      <path
        d="m183 165 88-26c20-6 42-9 64-7l29 2-17 74H148l12-34c4-5 12-7 23-9Z"
        fill="#e5ebf4"
      />
      <path d="m382 136 47 4c21 2 40 12 54 28l31 40H366l16-72Z" fill="#e5ebf4" />
      <path d="m344 139 33 2-17 77h-50l34-79Z" fill="#263d66" />
      <path
        d="M89 266h556v16H85v-4c0-6 1-10 4-12Z"
        fill="#fca311"
      />
      <path
        d="M106 281v6c0 12 10 22 22 22s22-10 22-22v-6h-44Zm426 0v6c0 12 10 22 22 22s22-10 22-22v-6h-44Z"
        fill="#14213d"
      />
      <circle cx="128" cy="287" r="13" fill="#cbd5e1" />
      <circle cx="554" cy="287" r="13" fill="#cbd5e1" />
      <path d="M102 233h40l-9 24H95l7-24Zm518 1h18c10 0 18 8 18 18v6h-42l6-24Z" fill="#fca311" />
      <path
        d="M189 165h236M165 208h334"
        stroke="#fff"
        strokeOpacity=".23"
        strokeWidth="2"
      />
      <path
        d="M222 237h183"
        stroke="#fff7e6"
        strokeOpacity=".55"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const faqItems = [
  {
    question: "What do I need to rent a car?",
    answer:
      "Please prepare a valid driver's license, a government-issued ID, and the required rental deposit.",
  },
  {
    question: "Can I book a car in advance?",
    answer:
      "Yes. Reserve your preferred vehicle ahead of time so we can confirm its availability for your travel dates.",
  },
  {
    question: "Are there mileage limits?",
    answer:
      "Mileage arrangements may vary by vehicle and rental period. We will confirm the details before your booking is finalized.",
  },
  {
    question: "What happens if I need to extend my rental?",
    answer:
      "Contact us as soon as possible. Extensions are subject to vehicle availability and the applicable daily rate.",
  },
];

function peso(value: string) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function LegacyHeroRecommendations({ cars }: { cars: Car[] }) {
  if (!cars.length) {
    return (
      <aside className="relative mx-auto w-full max-w-xl lg:ml-auto" aria-label="Recommended cars">
        <div className="rounded-[2rem] bg-white/95 p-8 text-[#14213d] shadow-2xl shadow-black/25">
          <p className="text-xs font-medium tracking-[0.14em] text-[#5f6775]">OUR FLEET</p>
          <h2 className="mt-3 text-2xl font-semibold">New rides are coming soon.</h2>
          <p className="mt-3 text-sm leading-6 text-[#5f6775]">Our vehicle listing is being updated. Browse the fleet for the latest details.</p>
          <Link href="/fleet" className="mt-6 inline-flex rounded-full bg-[#fca311] px-5 py-3 text-sm font-medium text-[#14213d] transition hover:brightness-105">View our fleet</Link>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="relative mx-auto w-full max-w-xl lg:ml-auto"
      aria-label="Recommended cars"
    >
      <div className="relative p-5 sm:p-6">
        <div className="relative mt-3 h-[19rem] sm:h-[21rem]">
          {cars.map((car, index) => (
            <article
              key={car.name}
              className="recommendation-slide absolute inset-0 text-white"
              style={{ animationDelay: `${index * 4}s` }}
            >
              <div aria-hidden="true" className="absolute bottom-7 left-7 right-3 top-3 -rotate-[10deg] rounded-[3.25rem] bg-white shadow-[0_22px_35px_-22px_rgba(20,33,61,0.6)]" />
              <div className="absolute bottom-7 left-7 right-3 top-3 -rotate-[5deg] overflow-hidden rounded-[3.25rem] bg-[#14213d] shadow-[0_22px_35px_-22px_rgba(20,33,61,0.75)]">
                <Image
                  src={car.imageUrl ?? "/images/asset_landing.jpg"}
                  alt={`${car.name} available for rent`}
                  fill
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
          ))}
        </div>
      </div>
    </aside>
  );
}

// The landing carousel reflects the live vehicle listing.
export const instant = false;

export default async function Home() {
  const [cars, customerMoments] = await Promise.all([getCars(), getCustomerMoments()]);
  const listedCars = cars.slice(0, 4);

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#f8f9fb] text-[#14213d]">
      <div className="absolute inset-x-0 top-0 h-[max(100svh,52rem)] lg:h-screen">
        <Image
          src="/images/asset_landing.jpg"
          alt="A Toyota sedan parked on an open mountain road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14213d]/88 via-[#14213d]/60 to-[#14213d]/25" />
      </div>

      <header className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-10 sm:py-5 lg:px-12">
        <a href="#" aria-label="YZ Car Rental home">
          <Image
            src="/images/yz_logo.jpg"
            alt="YZ Car Rental logo"
            width={64}
            height={64}
            className="h-12 w-12 rounded-full object-cover shadow-lg shadow-black/30 sm:h-14 sm:w-14"
          />
        </a>
        <nav className="ml-auto hidden items-center gap-7 text-sm font-normal text-white/90 lg:flex">
          <a className="transition hover:text-[#fca311]" href="#">
            HOME
          </a>
          <Link className="transition hover:text-[#fca311]" href="/fleet">
            OUR FLEET
          </Link>
          <a className="transition hover:text-[#fca311]" href="#faq">
            FAQ
          </a>
          <a className="transition hover:text-[#fca311]" href="#about">
            ABOUT US
          </a>
          <a className="transition hover:text-[#fca311]" href="#contact">
            CONTACT US
          </a>
          <Link
            href="/booking"
            className="rounded-full border border-[#fca311] bg-[#fca311] px-5 py-3 font-medium text-[#14213d] shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#fca311]"
          >
            Book Now
          </Link>
        </nav>
        <div className="contents lg:hidden">
          <details className="group absolute right-4 top-1/2 z-[60] -translate-y-1/2 sm:right-10">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/10 [&::-webkit-details-marker]:hidden" aria-label="Open navigation menu">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </summary>
            <nav className="absolute right-0 top-full z-[70] mt-3 flex w-56 flex-col rounded-2xl border border-white/20 bg-[#14213d]/95 p-2 text-sm font-medium text-white shadow-xl backdrop-blur" aria-label="Mobile navigation">
              <a className="rounded-xl px-4 py-3 transition hover:bg-white/10" href="#">Home</a>
              <Link className="rounded-xl px-4 py-3 transition hover:bg-white/10" href="/fleet">Our fleet</Link>
              <a className="rounded-xl px-4 py-3 transition hover:bg-white/10" href="#faq">FAQ</a>
              <a className="rounded-xl px-4 py-3 transition hover:bg-white/10" href="#about">About us</a>
              <a className="rounded-xl px-4 py-3 transition hover:bg-white/10" href="#contact">Contact us</a>
            </nav>
          </details>
          <Link
            href="/booking"
            className="absolute left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#fca311] bg-[#fca311] px-4 py-3 text-sm font-medium text-[#14213d] shadow-lg shadow-black/25 transition hover:bg-[#fca311] sm:px-5"
          >
            Book Now
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-7xl items-center gap-8 px-4 pb-14 pt-8 text-white sm:gap-12 sm:px-10 sm:pb-24 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-28 lg:pt-12">
        <div className="relative z-10">
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-[4.5rem]">
            Make room for the{" "}
            <span className="font-serif font-medium italic text-[#fca311]">
              good
            </span>{" "}
            in getting there.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            Your next trip deserves a comfortable ride. Find a car that fits
            your plans and enjoy the journey at your own pace.
          </p>
          <Link
            href="/fleet"
            className="mt-7 inline-flex rounded-full bg-[#fca311] px-5 py-3 text-sm font-medium text-[#14213d] shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:brightness-105"
          >
            View our fleet
          </Link>
        </div>

        <div className="hidden relative mx-auto w-full max-w-2xl lg:ml-auto">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#fca311]/30 blur-2xl" />
          <div className="absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-[#e5ebf4]/50 blur-2xl" />
          <div className="relative flex aspect-[1.18] items-center justify-center overflow-hidden rounded-[2rem] bg-[#eef2f7] sm:rounded-[2.5rem]">
            <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/60" />
            <div className="absolute -right-2 -top-16 h-64 w-64 rounded-full border border-white/60" />
            <div className="absolute bottom-10 left-8 h-40 w-40 rounded-full bg-[#e5ebf4]" />
            <div className="absolute bottom-[18%] left-0 right-0 h-px bg-[#e5ebf4]" />
            <div className="absolute bottom-[18%] left-[12%] right-[8%] h-10 rounded-[50%] bg-[#14213d]/10 blur-xl" />
            <div className="w-[110%] translate-y-2 sm:translate-y-5">
              <HeroCar />
            </div>
            <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg shadow-[#14213d]/5 backdrop-blur sm:left-8 sm:top-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7e6] text-lg">
                ✦
              </span>
              <span>
                <span className="block text-xs text-[#5f6775]">Your next trip</span>
                <span className="block text-sm font-semibold">Starts here</span>
              </span>
            </div>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-[#14213d] px-4 py-3 text-white shadow-xl shadow-[#14213d]/15 sm:bottom-8 sm:right-8 sm:px-5">
              <span className="block text-xs text-white/70">A ride for your plans</span>
              <span className="mt-1 block text-sm font-semibolfd">Ready when you are</span>
            </div>
          </div>
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#e5ebf4] bg-white px-4 py-2.5 text-xs font-medium text-[#5f6775] shadow-lg shadow-[#14213d]/5 sm:bottom-[-1.4rem] sm:px-5 sm:py-3 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#fca311]" />
            A little more freedom, every mile
          </div>
        </div>
        {listedCars.length ? (
          <HeroRecommendations cars={listedCars} />
        ) : (
          <LegacyHeroRecommendations cars={listedCars} />
        )}
      </section>

      <section id="faq" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">
              Helpful answers
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently asked questions.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#5f6775]">
              Everything you need to know before getting behind the wheel.
            </p>
          </div>
          <div className="mt-10 divide-y divide-[#dbe2ef] rounded-2xl border border-[#dbe2ef]">
            {faqItems.map((item) => (
              <details key={item.question} className="group px-5 py-1 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-[#14213d]">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-xl leading-none text-[#14213d] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 text-sm leading-6 text-[#5f6775]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-[#dbe2ef] bg-[#f8f9fb]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">
              About YZ Car Rental
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              A dependable ride for every kind of trip.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5f6775]">
              YZ Car Rental helps travelers, families, and professionals get around Cagayan de Oro with comfort and flexibility. Whether you are planning a quick errand, a weekend escape, or a longer journey, we make it simple to find a vehicle that suits your plans.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#5f6775]">
              We focus on straightforward booking, well-presented vehicles, and friendly support from inquiry to return.
            </p>
            <Link
              href="/booking"
              className="mt-7 inline-flex rounded-full bg-[#14213d] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#14213d]/15 transition hover:-translate-y-0.5 hover:bg-[#263d66]"
            >
              Plan your trip
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#14213d] shadow-xl shadow-[#14213d]/15">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/asset_landing.jpg"
                alt="A rental car ready for the road"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14213d]/80 via-[#14213d]/10 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <p className="text-lg font-medium">Your plans, your pace.</p>
              <p className="mt-1 text-sm leading-6 text-white/80">Book a ride and make the most of the road ahead.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="border-t border-[#dbe2ef] bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">
              Where to find us
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Serving Cagayan de Oro and beyond.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#5f6775]">
              Based in Cagayan de Oro City, Misamis Oriental, we are ready to help you start your journey. Open the map for directions or to explore the area before your trip.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Cagayan%20de%20Oro%20City%2C%20Misamis%20Oriental%2C%20Philippines"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#fca311] px-5 py-3 text-sm font-medium text-[#14213d] shadow-lg shadow-[#fca311]/20 transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              Open in Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#dbe2ef] bg-[#eef2f7] shadow-xl shadow-[#14213d]/10">
            <iframe
              title="Map of Cagayan de Oro City, Misamis Oriental"
              src="https://www.google.com/maps?q=Cagayan%20de%20Oro%20City%2C%20Misamis%20Oriental%2C%20Philippines&z=13&output=embed"
              className="aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[#dbe2ef] bg-[#f8f9fb]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">
                On the road with us
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Customer moments.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#5f6775]">
              A few of the people who have made YZ Car Rental part of their journey.
            </p>
          </div>
          <CustomerGallery customerMoments={customerMoments} />
        </div>
      </section>

      <footer id="contact" className="border-t border-[#dbe2ef] bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2 font-semibold text-[#14213d]">
                <BrandMark />
                YZ Car Rental
              </a>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[#5f6775]">
                Good trips start with a good ride. Let us help you get there.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#14213d]">Contact us</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#5f6775]">
                <li>
                  <a className="transition hover:text-[#14213d]" href="tel:+639171234567">
                    +63 917 123 4567
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-[#14213d]" href="mailto:hello@yzdrive.ph">
                    hello@yzdrive.ph
                  </a>
                </li>
                <li className="max-w-48 leading-6">
                  Cagayan de Oro City, Misamis Oriental, Philippines
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#14213d]">Quick links</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a className="text-[#5f6775] transition hover:text-[#14213d]" href="#">Home</a></li>
                <li><Link className="text-[#5f6775] transition hover:text-[#14213d]" href="/fleet">Our fleet</Link></li>
                <li><a className="text-[#5f6775] transition hover:text-[#14213d]" href="#faq">FAQ</a></li>
                <li><a className="text-[#5f6775] transition hover:text-[#14213d]" href="#contact">Contact us</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#14213d]">We accept</h2>
              <p className="mt-4 text-sm leading-6 text-[#5f6775]">
                Major credit and debit cards are welcome.
              </p>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Accepted cards">
                <span className="rounded-md border border-[#dbe2ef] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#14213d]">VISA</span>
                <span className="rounded-md border border-[#dbe2ef] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#fca311]">mastercard</span>
                <span className="rounded-md border border-[#dbe2ef] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#14213d]">JCB</span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-[#dbe2ef] pt-6 text-sm text-[#5f6775]">
            © yzcarrentalcdo. All rights reserved.
          </div>
        </div>
      </footer>
      <FloatingActions />
    </main>
  );
}
