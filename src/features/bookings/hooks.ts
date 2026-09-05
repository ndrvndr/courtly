import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createBooking, getAvailability } from "./api";
import type { CreateBookingPayload } from "./types";

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
