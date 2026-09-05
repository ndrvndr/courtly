import type { PaginatedResponse } from "@/types/pagination";

export interface Facility {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  sports: string[];
  startingPrice: number;
  imageUrl: string;
}

export type FacilitiesResponse = PaginatedResponse<Facility>;

export interface FacilitiesQueryParams {
  search?: string;
  sport?: string;
  city?: string;
  page?: number;
  limit?: number;
}
