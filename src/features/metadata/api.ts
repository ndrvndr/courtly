import { apiClient } from "@/lib/apiClient";

import type { CitiesResponse, SportsResponse } from "./types";

export async function getSports(): Promise<SportsResponse> {
  const { data } = await apiClient.get<SportsResponse>("/v1/sports");
  return data;
}

export async function getCities(): Promise<CitiesResponse> {
  const { data } = await apiClient.get<CitiesResponse>("/v1/cities");
  return data;
}
