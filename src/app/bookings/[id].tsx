import { BookingDetailScreen } from "@/features/bookings/components/BookingDetail";
import { useLocalSearchParams } from "expo-router";

export default function BookingDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <BookingDetailScreen id={id} />;
}
