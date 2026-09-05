import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelBooking,
  createBooking,
  getAvailability,
  getBookingDetail,
  getBookings,
} from "./api";
import type { BookingFilterStatus, CreateBookingPayload } from "./types";

export function useAvailability(facilityId: string, date: string) {
  return useQuery({
    queryKey: ["availability", facilityId, date],
    queryFn: () => getAvailability(facilityId, date),
    enabled: !!facilityId && !!date,
  });
}

export function useCreateBooking(facilityId: string, date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability", facilityId, date],
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useBookings(status: BookingFilterStatus) {
  return useQuery({
    queryKey: ["bookings", status],
    queryFn: () => getBookings(status),
  });
}

export function useBookingDetail(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingDetail(id),
    enabled: !!id,
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });
}
