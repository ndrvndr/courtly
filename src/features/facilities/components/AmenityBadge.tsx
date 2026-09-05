import { Text, View } from "react-native";

// const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
//   parking: "car-outline",
//   showers: "water-outline",
//   cafe: "cafe-outline",
//   "equipment rental": "basketball-outline",
// };

export function AmenityBadge({ label }: { label: string }) {
  // const icon = ICON_MAP[label.toLowerCase()] ?? "checkmark-circle-outline";

  return (
    <View className="flex-row gap-2 items-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
      {/* <Ionicons name={icon} size={16} color="#374151" /> */}
      <Text className="text-sm text-gray-700">{label}</Text>
    </View>
  );
}
