import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { BookingScreen } from "@/features/bookings/components/BookingScreen";
import { useFacilityDetail } from "@/features/facilities/hooks";

export default function BookingRoute() {
  const { facilityId } = useLocalSearchParams<{ facilityId: string }>();
  const { data, isLoading } = useFacilityDetail(facilityId);

  if (isLoading || !data) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return <BookingScreen facilityId={facilityId} facilityName={data.name} />;
}
