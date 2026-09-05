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

export interface Booking {
  id: string;
  reference: string;
  status: string;
  date: string;
  startTime: string;
  endTime: string;
  court: {
    id: string;
    name: string;
  };
  facility: {
    id: string;
    name: string;
  };
  price: number;
}
