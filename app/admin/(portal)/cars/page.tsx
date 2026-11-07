import { getCars } from "@/lib/cars";
import CarManager from "./car-manager";

export default async function CarListingPage() {
  const cars = await getCars();

  return <CarManager cars={cars} />;
}
