import { useLocalSearchParams } from "expo-router";

import { FacilityDetailScreen } from "@/features/facilities/components/FacilityDetail";

export default function FacilityDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <FacilityDetailScreen id={id} />;
}
