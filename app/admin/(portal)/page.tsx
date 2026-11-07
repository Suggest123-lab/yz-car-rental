export default function AdminDashboardPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Overview</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">Business dashboard</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5f6775]">Manage your rentals, fleet, and the information customers see on the website from one place.</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[["Bookings", "Review and manage incoming rental requests."], ["Car listing", "Keep vehicles, rates, and availability up to date."], ["Website content", "Update contact, payment, and customer-moment details."]].map(([title, description]) => (
          <article key={title} className="rounded-2xl border border-[#dbe2ef] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5f6775]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
