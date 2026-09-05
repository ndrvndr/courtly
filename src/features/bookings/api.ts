import { apiClient } from "@/lib/apiClient";

import type {
  AvailabilityResponse,
  Booking,
  BookingDetail,
  BookingFilterStatus,
  BookingsResponse,
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

export async function getBookings(
  status: BookingFilterStatus,
): Promise<BookingsResponse> {
  const { data } = await apiClient.get<BookingsResponse>("/v1/bookings", {
    params: { status },
  });
  return data;
}

export async function getBookingDetail(id: string): Promise<BookingDetail> {
  const { data } = await apiClient.get<BookingDetail>(`/v1/bookings/${id}`);
  return data;
}

export async function cancelBooking(id: string): Promise<void> {
  await apiClient.delete(`/v1/bookings/${id}`);
}
