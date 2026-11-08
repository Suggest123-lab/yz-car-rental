import { getCustomerMoments } from "@/lib/customer-moments";
import CustomerMomentsManager from "./customer-moments-manager";

export default async function CustomerMomentsPage() {
  const moments = await getCustomerMoments();

  return (
    <section className="mx-auto max-w-6xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Customization</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">Customer moments</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5f6775]">Upload photos from completed services to display in the customer-moments gallery on the home page.</p>
      <CustomerMomentsManager moments={moments} />
    </section>
  );
}
