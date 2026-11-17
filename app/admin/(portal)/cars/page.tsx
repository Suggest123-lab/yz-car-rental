import { getCarCategories, getCars } from "@/lib/cars";
import CarManager from "./car-manager";

export default async function CarListingPage() {
  const [cars, categories] = await Promise.all([getCars(), getCarCategories()]);

  return <CarManager cars={cars} categories={categories} />;
}
