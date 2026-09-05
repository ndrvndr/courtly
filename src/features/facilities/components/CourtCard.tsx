import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { formatPrice } from "@/utils/formatPrice";

import type { Court } from "../types";

export function CourtCard({ court }: { court: Court }) {
  return (
    <View className="flex-row justify-between items-center p-3 mb-2 bg-white rounded-lg border border-gray-100">
      <View className="flex-1">
        <Text className="text-sm font-medium">{court.name}</Text>
        <View className="flex-row gap-2 items-center mt-1">
          <View className="bg-gray-100 rounded-full px-2 py-0.5">
            <Text className="text-xs text-gray-600 capitalize">
              {court.type.toLowerCase()}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons
              name={court.indoor ? "home-outline" : "sunny-outline"}
              size={12}
              color="#6b7280"
            />
            <Text className="ml-1 text-xs text-gray-500">
              {court.indoor ? "Indoor" : "Outdoor"}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-sm font-semibold text-blue-600">
        {formatPrice(court.basePrice)}
        <Text className="text-xs font-normal text-gray-500">/hr</Text>
      </Text>
    </View>
  );
}
