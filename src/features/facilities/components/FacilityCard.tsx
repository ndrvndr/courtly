import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/utils/formatPrice";

import type { Facility } from "../types";

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Pressable
      onPress={() => router.push(`/facility/${facility.id}`)}
      className="overflow-hidden mb-4 bg-white rounded-xl border border-gray-100 shadow-sm"
    >
      <ImageWithFallback
        uri={facility.imageUrl}
        style={{ width: "100%", height: 160 }}
        contentFit="cover"
        transition={200}
      />

      <View className="p-3">
        <Text className="text-base font-semibold" numberOfLines={1}>
          {facility.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={14} color="#6b7280" />
          <Text className="ml-1 text-xs text-gray-500" numberOfLines={1}>
            {facility.location} · {facility.distanceKm} km
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text className="ml-1 text-xs font-medium">{facility.rating}</Text>
            <Text className="ml-1 text-xs text-gray-400">
              ({facility.reviewCount})
            </Text>
          </View>
          <Text className="text-sm font-bold text-blue-600">
            {formatPrice(facility.startingPrice)}
            <Text className="text-xs font-normal text-gray-500">/hr</Text>
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-1 mt-2">
          {facility.sports.map((sport) => (
            <View key={sport} className="bg-blue-50 rounded-full px-2 py-0.5">
              <Text className="text-xs text-blue-600 capitalize">{sport}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}
