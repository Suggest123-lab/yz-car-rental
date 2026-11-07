export const carStatuses = ["available", "rented", "maintenance", "unavailable"] as const;
export type CarStatus = (typeof carStatuses)[number];

export type Car = {
  id: number;
  name: string;
  capacity: number;
  startingRate: string;
  category: string;
  transmission: string;
  status: CarStatus;
  imageUrl: string | null;
  description: string | null;
  isFeatured: boolean;
};
