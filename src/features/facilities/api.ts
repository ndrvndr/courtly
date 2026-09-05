import { apiClient } from "@/lib/apiClient";

import type { FacilitiesQueryParams, FacilitiesResponse } from "./types";

export async function getFacilities(
  params: FacilitiesQueryParams,
): Promise<FacilitiesResponse> {
  const { data } = await apiClient.get<FacilitiesResponse>("/v1/facilities", {
    params,
  });
  return data;
}
