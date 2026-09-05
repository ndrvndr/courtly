import { apiClient } from "@/lib/apiClient";

import type {
  AvailabilityResponse,
  Booking,
  CreateBookingPayload,
} from "./types";

export async function getAvailability(
  facilityId: string,
  date: string,
): Promise<AvailabilityResponse> {
  const { data } = await apiClient.get<AvailabilityResponse>(
    `/v1/facilities/${facilityId}/availability`,
    { params: { date } },
  );
  return data;
}

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<Booking> {
  const { data } = await apiClient.post<Booking>("/v1/bookings", payload);
  return data;
}
