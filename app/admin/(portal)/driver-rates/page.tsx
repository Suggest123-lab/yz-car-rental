import { getDriverServiceRates } from "@/lib/driver-service-rates";
import DriverRatesManager from "./driver-rates-manager";

export default async function DriverRatesPage() {
  const rates = await getDriverServiceRates();

  return (
    <section className="mx-auto max-w-4xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Pricing</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">Driver rates</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5f6775]">Set the daily fee added when a customer requests a driver. Each rate applies to every vehicle in the selected travel area.</p>
      <DriverRatesManager rates={rates} />
    </section>
  );
}
