import Image from "next/image";
import Link from "next/link";
import CustomerGallery from "./customer-gallery";

function BrandMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173f35] text-white">
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
        fill="#23634f"
      />
      <path
        d="m183 165 88-26c20-6 42-9 64-7l29 2-17 74H148l12-34c4-5 12-7 23-9Z"
        fill="#d9eee1"
      />
      <path d="m382 136 47 4c21 2 40 12 54 28l31 40H366l16-72Z" fill="#d9eee1" />
      <path d="m344 139 33 2-17 77h-50l34-79Z" fill="#23634f" />
      <path
        d="M89 266h556v16H85v-4c0-6 1-10 4-12Z"
        fill="#ee9c54"
      />
      <path
        d="M106 281v6c0 12 10 22 22 22s22-10 22-22v-6h-44Zm426 0v6c0 12 10 22 22 22s22-10 22-22v-6h-44Z"
        fill="#18332e"
      />
      <circle cx="128" cy="287" r="13" fill="#d5d9d3" />
      <circle cx="554" cy="287" r="13" fill="#d5d9d3" />
      <path d="M102 233h40l-9 24H95l7-24Zm518 1h18c10 0 18 8 18 18v6h-42l6-24Z" fill="#f3c878" />
      <path
        d="M189 165h236M165 208h334"
        stroke="#fff"
        strokeOpacity=".23"
        strokeWidth="2"
      />
      <path
        d="M222 237h183"
        stroke="#f4f4e9"
        strokeOpacity=".55"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const recommendedCars = [
  {
    name: "Toyota Vios",
    type: "Compact sedan",
    rate: "₱1,500",
    details: "5 seats · Automatic",
  },
  {
    name: "Honda City",
    type: "City sedan",
    rate: "₱1,700",
    details: "5 seats · Automatic",
  },
  {
    name: "Mitsubishi Mirage",
    type: "Economy hatchback",
    rate: "₱1,300",
    details: "5 seats · Automatic",
  },
  {
    name: "Toyota Innova",
    type: "Family MPV",
    rate: "₱2,500",
    details: "7 seats · Automatic",
  },
];

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

function HeroRecommendations() {
  return (
    <aside
      className="relative mx-auto w-full max-w-md lg:ml-auto"
      aria-label="Recommended cars"
    >
      <div className="overflow-hidden rounded-[2rem] border border-white/30 bg-white/15 p-5 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-6">
        <p className="text-xs font-medium tracking-[0.14em] text-[#f3c878]">
          RECOMMENDED FOR YOU
        </p>
        <div className="relative mt-4 h-[19rem]">
          {recommendedCars.map((car, index) => (
            <article
              key={car.name}
              className="recommendation-slide absolute inset-0 overflow-hidden rounded-2xl bg-[#f7f8f4] text-[#17352e]"
              style={{ animationDelay: `${index * 4}s` }}
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#edf2e9] px-5">
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#dce9dd]" />
                <div className="absolute bottom-5 left-8 right-8 h-5 rounded-[50%] bg-[#173f35]/10 blur-lg" />
                <div className="relative w-full">
                  <HeroCar />
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-[#77847d]">{car.type}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{car.name}</h2>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <span className="text-sm text-[#687870]">{car.details}</span>
                  <span className="text-lg font-semibold text-[#1c2b5a]">{car.rate}<span className="text-xs font-normal text-[#687870]"> / day</span></span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/fleet"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#f3c878] px-5 py-3 text-sm font-medium text-[#1c2b5a] transition hover:bg-[#ffe09a]"
        >
          See More
        </Link>
      </div>
    </aside>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <details className="group relative">
        <summary
          className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full bg-[#173f35] text-white shadow-lg shadow-[#173f35]/25 transition hover:-translate-y-0.5 hover:bg-[#245b4b] [&::-webkit-details-marker]:hidden"
          aria-label="Open contact shortcuts"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M20 11.5a7.5 7.5 0 0 1-11.1 6.57L4 20l1.94-4.38A7.5 7.5 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Open contact shortcuts</span>
        </summary>
        <div className="absolute bottom-0 right-14 w-56 rounded-2xl border border-[#e3e8e1] bg-white p-3 shadow-xl shadow-[#173f35]/15">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#687870]">
            Contact us
          </p>
          <a
            href="https://m.me/yzcarrentalcdo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-[#17352e] transition hover:bg-[#f3f6f1]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0084ff] text-xs font-bold text-white">M</span>
            Messenger
          </a>
          <a
            href="tel:+639171234567"
            className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-[#17352e] transition hover:bg-[#f3f6f1]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8 rounded-full bg-[#e6f0e7] p-2 text-[#173f35]">
              <path d="M7.5 3.5 5.7 5.2c-1.1 1.1.1 4.5 2.8 7.2s6.1 3.9 7.2 2.8l1.8-1.8-2.7-2.2-1.6 1c-.8-.3-2.1-1.6-2.4-2.4l1-1.6-2.3-2.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            +63 917 123 4567
          </a>
        </div>
      </details>

      <a
        href="#top"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3c878] text-[#1c2b5a] shadow-lg shadow-[#173f35]/20 transition hover:-translate-y-0.5 hover:bg-[#ffe09a]"
        aria-label="Back to top"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="m6 14 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#f7f8f4] text-[#17352e]">
      <div className="absolute inset-x-0 top-0 h-screen">
        <Image
          src="/images/asset_landing.jpg"
          alt="A Toyota sedan parked on an open mountain road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102c25]/85 via-[#173f35]/55 to-[#102c25]/20" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        <a href="#" aria-label="YZ Car Rental home">
          <Image
            src="/images/yz_logo.jpg"
            alt="YZ Car Rental logo"
            width={64}
            height={64}
            className="h-14 w-14 rounded-full object-cover shadow-lg shadow-black/30"
          />
        </a>
        <nav className="ml-auto hidden items-center gap-7 text-sm font-normal text-white/90 lg:flex">
          <a className="transition hover:text-[#f3c878]" href="#">
            HOME
          </a>
          <Link className="transition hover:text-[#f3c878]" href="/fleet">
            OUR FLEET
          </Link>
          <a className="transition hover:text-[#f3c878]" href="#faq">
            FAQ
          </a>
          <a className="transition hover:text-[#f3c878]" href="#about">
            ABOUT US
          </a>
          <a className="transition hover:text-[#f3c878]" href="#contact">
            CONTACT US
          </a>
          <Link
            href="/fleet"
            className="rounded-full border border-[#f3c878] bg-[#f3c878] px-5 py-3 font-medium text-[#1c2b5a] shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#ffe09a]"
          >
            Book Now
          </Link>
        </nav>
        <Link
          href="/fleet"
          className="ml-auto rounded-full border border-[#f3c878] bg-[#f3c878] px-5 py-3 text-sm font-medium text-[#1c2b5a] shadow-lg shadow-black/25 transition hover:bg-[#ffe09a] lg:hidden"
        >
          Book Now
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 text-white sm:px-10 sm:pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-28 lg:pt-12">
        <div className="relative z-10">
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-[4.5rem]">
            Make room for the{" "}
            <span className="font-serif font-medium italic text-[#f3b06d]">
              good
            </span>{" "}
            in getting there.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            Your next trip deserves a comfortable ride. Find a car that fits
            your plans and enjoy the journey at your own pace.
          </p>
        </div>

        <div className="hidden relative mx-auto w-full max-w-2xl lg:ml-auto">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#e8b37c]/30 blur-2xl" />
          <div className="absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-[#b8d5bd]/50 blur-2xl" />
          <div className="relative flex aspect-[1.18] items-center justify-center overflow-hidden rounded-[2rem] bg-[#e7eee5] sm:rounded-[2.5rem]">
            <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full border border-white/60" />
            <div className="absolute -right-2 -top-16 h-64 w-64 rounded-full border border-white/60" />
            <div className="absolute bottom-10 left-8 h-40 w-40 rounded-full bg-[#d2e2d3]" />
            <div className="absolute bottom-[18%] left-0 right-0 h-px bg-[#cad8cc]" />
            <div className="absolute bottom-[18%] left-[12%] right-[8%] h-10 rounded-[50%] bg-[#173f35]/10 blur-xl" />
            <div className="w-[110%] translate-y-2 sm:translate-y-5">
              <HeroCar />
            </div>
            <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg shadow-[#173f35]/5 backdrop-blur sm:left-8 sm:top-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eee3] text-lg">
                ✦
              </span>
              <span>
                <span className="block text-xs text-[#77847d]">Your next trip</span>
                <span className="block text-sm font-semibold">Starts here</span>
              </span>
            </div>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-[#173f35] px-4 py-3 text-white shadow-xl shadow-[#173f35]/15 sm:bottom-8 sm:right-8 sm:px-5">
              <span className="block text-xs text-white/70">A ride for your plans</span>
              <span className="mt-1 block text-sm font-semibolfd">Ready when you are</span>
            </div>
          </div>
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#e7ece5] bg-white px-4 py-2.5 text-xs font-medium text-[#52655e] shadow-lg shadow-[#173f35]/5 sm:bottom-[-1.4rem] sm:px-5 sm:py-3 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#6c9e74]" />
            A little more freedom, every mile
          </div>
        </div>
        <HeroRecommendations />
      </section>

      <section id="faq" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e98d48]">
              Helpful answers
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Frequently asked questions.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#687870]">
              Everything you need to know before getting behind the wheel.
            </p>
          </div>
          <div className="mt-10 divide-y divide-[#e3e8e1] rounded-2xl border border-[#e3e8e1]">
            {faqItems.map((item) => (
              <details key={item.question} className="group px-5 py-1 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-[#17352e]">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-xl leading-none text-[#1c2b5a] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 text-sm leading-6 text-[#687870]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e8ece6] bg-[#f7f8f4]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e98d48]">
                On the road with us
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Customer moments.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#687870]">
              A few of the people who have made YZ Car Rental part of their journey.
            </p>
          </div>
          <CustomerGallery />
        </div>
      </section>

      <footer id="contact" className="border-t border-[#e8ece6] bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2 font-semibold text-[#17352e]">
                <BrandMark />
                yzdrive
              </a>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[#687870]">
                Good trips start with a good ride. Let us help you get there.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#17352e]">Contact us</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#687870]">
                <li>
                  <a className="transition hover:text-[#173f35]" href="tel:+639171234567">
                    +63 917 123 4567
                  </a>
                </li>
                <li>
                  <a className="transition hover:text-[#173f35]" href="mailto:hello@yzdrive.ph">
                    hello@yzdrive.ph
                  </a>
                </li>
                <li className="max-w-48 leading-6">
                  Cagayan de Oro City, Misamis Oriental, Philippines
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#17352e]">Quick links</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a className="text-[#687870] transition hover:text-[#173f35]" href="#">Home</a></li>
                <li><Link className="text-[#687870] transition hover:text-[#173f35]" href="/fleet">Our fleet</Link></li>
                <li><a className="text-[#687870] transition hover:text-[#173f35]" href="#faq">FAQ</a></li>
                <li><a className="text-[#687870] transition hover:text-[#173f35]" href="#contact">Contact us</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#17352e]">We accept</h2>
              <p className="mt-4 text-sm leading-6 text-[#687870]">
                Major credit and debit cards are welcome.
              </p>
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Accepted cards">
                <span className="rounded-md border border-[#dfe5dc] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#1a3b77]">VISA</span>
                <span className="rounded-md border border-[#dfe5dc] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#e05232]">mastercard</span>
                <span className="rounded-md border border-[#dfe5dc] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#2874a6]">JCB</span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-[#e8ece6] pt-6 text-sm text-[#687870]">
            © yzcarrentalcdo. All rights reserved.
          </div>
        </div>
      </footer>
      <FloatingActions />
    </main>
  );
}
