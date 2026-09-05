import { apiClient } from "@/lib/apiClient";

import type {
  FacilitiesQueryParams,
  FacilitiesResponse,
  FacilityDetail,
} from "./types";

export async function getFacilities(
  params: FacilitiesQueryParams,
): Promise<FacilitiesResponse> {
  const { data } = await apiClient.get<FacilitiesResponse>("/v1/facilities", {
    params,
  });
  return data;
}

export async function getFacilityDetail(id: string): Promise<FacilityDetail> {
  const { data } = await apiClient.get<FacilityDetail>(`/v1/facilities/${id}`);
  return data;
}
