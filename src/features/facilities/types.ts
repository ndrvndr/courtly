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

export interface Court {
  id: string;
  name: string;
  type: string;
  indoor: boolean;
  basePrice: number;
  sport: string;
}

export interface FacilityDetail {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  sports: string[];
  amenities: string[];
  courts: Court[];
}
