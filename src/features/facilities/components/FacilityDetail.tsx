import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useFacilityDetail } from "../hooks";
import { AmenityBadge } from "./AmenityBadge";
import { CourtCard } from "./CourtCard";

export function FacilityDetailScreen({ id }: { id: string }) {
  const { data, isLoading, isError, refetch } = useFacilityDetail(id);
  const [imageFailed, setImageFailed] = useState(false);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-white">
        <Text className="mb-3 text-center text-gray-500">
          Failed to load facility details.
        </Text>
        <Text className="font-medium text-blue-600" onPress={() => refetch()}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: data.name }} />

      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 240 }}>
          {imageFailed || !data.imageUrl ? (
            <View className="flex-1 justify-center items-center bg-gray-100">
              <Ionicons name="image-outline" size={40} color="#9ca3af" />
            </View>
          ) : (
            <Image
              source={{ uri: data.imageUrl }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              onError={() => setImageFailed(true)}
            />
          )}

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
              justifyContent: "flex-end",
              padding: 16,
            }}
          >
            <Text className="text-2xl font-bold text-white">{data.name}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={14} color="#fbbf24" />
              <Text className="ml-1 text-sm text-white">
                {data.rating} ({data.reviewCount} reviews)
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View className="p-4">
          <View className="flex-row items-start mb-4">
            <Ionicons
              name="location-outline"
              size={16}
              color="#6b7280"
              style={{ marginTop: 2 }}
            />
            <Text className="flex-1 ml-2 text-sm text-gray-600">
              {data.address}
            </Text>
          </View>

          <Text className="mb-5 text-sm leading-5 text-gray-700">
            {data.description}
          </Text>

          <Text className="mb-2 text-base font-semibold">Sports Available</Text>
          <View className="flex-row flex-wrap gap-2 mb-5">
            {data.sports.map((sport) => (
              <View key={sport} className="px-3 py-1 bg-blue-50 rounded-full">
                <Text className="text-xs text-blue-600 capitalize">
                  {sport}
                </Text>
              </View>
            ))}
          </View>

          <Text className="mb-2 text-base font-semibold">Amenities</Text>
          <View className="flex-row flex-wrap gap-2 mb-5">
            {data.amenities.map((amenity) => (
              <AmenityBadge key={amenity} label={amenity} />
            ))}
          </View>

          <Text className="mb-2 text-base font-semibold">Courts</Text>
          {data.courts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </View>

        <View className="p-4 pb-8">
          <Pressable
            onPress={() => router.push(`/booking/${data.id}`)}
            className="items-center py-4 bg-blue-600 rounded-lg"
          >
            <Text className="text-base font-semibold text-white">Book Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
