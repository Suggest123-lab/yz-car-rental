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

const steps = [
  {
    number: "01",
    title: "Choose your car",
    description: "Find a ride that fits your plans, your group, and your budget.",
  },
  {
    number: "02",
    title: "Pick your dates",
    description: "Tell us when you need the car and where you want to collect it.",
  },
  {
    number: "03",
    title: "Enjoy the drive",
    description: "Get your keys and enjoy the freedom to go wherever the road leads.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f4] text-[#17352e]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        <a href="#" className="flex items-center gap-3" aria-label="YzDrive home">
          <BrandMark />
          <span className="text-xl font-bold tracking-tight">
            yz<span className="text-[#e98d48]">drive</span>
          </span>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-medium text-[#52655e] md:flex">
          <a className="transition hover:text-[#173f35]" href="#how-it-works">
            How it works
          </a>
          <a className="transition hover:text-[#173f35]" href="#our-car">
            Our car
          </a>
        </nav>
        <a
          href="#our-car"
          className="rounded-full bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#245b4b]"
        >
          Find your ride
        </a>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 sm:px-10 sm:pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-28 lg:pt-12">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce6dd] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#47725e]">
            <span className="h-2 w-2 rounded-full bg-[#e98d48]" />
            A better way to get there
          </p>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-[4.5rem]">
            Make room for the{" "}
            <span className="font-serif font-medium italic text-[#e98d48]">
              good
            </span>{" "}
            in getting there.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#687870] sm:text-lg sm:leading-8">
            Your next trip deserves a comfortable ride. Find a car that fits
            your plans and enjoy the journey at your own pace.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#our-car"
              className="inline-flex items-center gap-3 rounded-full bg-[#173f35] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#173f35]/10 transition hover:-translate-y-0.5 hover:bg-[#245b4b]"
            >
              Explore our car
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#how-it-works"
              className="rounded-full px-5 py-4 text-sm font-semibold text-[#52655e] transition hover:text-[#173f35]"
            >
              How it works
            </a>
          </div>
          <div className="mt-12 flex items-center gap-3 text-sm text-[#687870]">
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f7f8f4] bg-[#dce9dd] text-xs font-bold text-[#315d49]">
                Y
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f7f8f4] bg-[#f2ddc7] text-xs font-bold text-[#8d5b32]">
                Z
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f7f8f4] bg-[#e3e7dd] text-xs font-bold text-[#52655e]">
                +
              </span>
            </div>
            <span>
              <strong className="font-semibold text-[#17352e]">Easy</strong>{" "}
              booking, more open road
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
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
              <span className="mt-1 block text-sm font-semibold">Ready when you are</span>
            </div>
          </div>
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#e7ece5] bg-white px-4 py-2.5 text-xs font-medium text-[#52655e] shadow-lg shadow-[#173f35]/5 sm:bottom-[-1.4rem] sm:px-5 sm:py-3 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#6c9e74]" />
            A little more freedom, every mile
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-[#e8ece6] bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e98d48]">
                Simple from start to finish
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Your trip, three easy steps.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#687870]">
              Less time figuring things out, more time looking forward to the
              drive.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map((step) => (
              <article key={step.number} className="border-t border-[#dfe6de] pt-5">
                <span className="text-sm font-bold tracking-wide text-[#e98d48]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[#687870]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="our-car"
        className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-12 lg:py-24"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e98d48]">
            Meet your next ride
          </p>
          <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A comfortable ride for wherever life takes you.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#687870]">
            Whether it&apos;s a quick errand or a weekend away, start with a
            dependable ride and make the trip your own.
          </p>
          <a
            href="mailto:hello@yzdrive.example"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#245b4b] transition hover:text-[#e98d48]"
          >
            Ask us about availability <span aria-hidden="true">→</span>
          </a>
        </div>
        <article className="grid overflow-hidden rounded-[1.75rem] border border-[#e7ece5] bg-white shadow-[0_20px_60px_-40px_rgba(23,63,53,0.28)] sm:grid-cols-[1fr_0.85fr]">
          <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-[#edf2e9] p-6 sm:min-h-72">
            <div className="absolute -left-12 -top-20 h-56 w-56 rounded-full bg-[#dce9dd]" />
            <div className="absolute bottom-8 left-8 right-8 h-8 rounded-[50%] bg-[#173f35]/10 blur-lg" />
            <div className="relative w-full">
              <HeroCar />
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <span className="w-fit rounded-full bg-[#f8eee3] px-3 py-1.5 text-xs font-semibold text-[#a66a38]">
              Available to rent
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">
              Toyota Vios
            </h3>
            <p className="mt-1 text-sm text-[#687870]">A practical everyday ride</p>
            <div className="my-6 h-px bg-[#e8ece6]" />
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="block text-xs text-[#77847d]">Starting from</span>
                <span className="mt-1 block text-2xl font-semibold tracking-tight">
                  ₱1,500
                  <span className="text-sm font-normal text-[#687870]"> / day</span>
                </span>
              </div>
              <span className="rounded-xl bg-[#f3f6f1] px-3 py-2 text-sm font-medium text-[#52655e]">
                5 seats
              </span>
            </div>
          </div>
        </article>
      </section>

      <footer className="border-t border-[#e8ece6] bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-7 text-sm text-[#687870] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
          <a href="#" className="flex items-center gap-2 font-semibold text-[#17352e]">
            <BrandMark />
            yzdrive
          </a>
          <p>Good trips start with a good ride.</p>
          <p>© yzdrive</p>
        </div>
      </footer>
    </main>
  );
}
