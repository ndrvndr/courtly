import { PaginatedResponse } from "@/types/pagination";

export interface Slot {
  startTime: string;
  endTime: string;
  price: number;
  available: boolean;
}

export interface CourtAvailability {
  id: string;
  name: string;
  type: string;
  indoor: boolean;
  slots: Slot[];
}

export interface AvailabilityResponse {
  date: string;
  courts: CourtAvailability[];
}

export interface CreateBookingPayload {
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export type BookingStatus = "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type BookingFilterStatus = "UPCOMING" | "PAST" | "CANCELLED";

export interface Booking {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  facility: {
    id: string;
    name: string;
    imageUrl: string;
  };
  court: {
    id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
}

export interface BookingDetail extends Booking {
  price: number;
  serviceFee: number;
}

export type BookingsResponse = PaginatedResponse<Booking>;
