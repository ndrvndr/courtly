import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Stack, router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

import { formatPrice } from "@/utils/formatPrice";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

import { useBookingDetail, useCancelBooking } from "../hooks";

export function BookingDetailScreen({ id }: { id: string }) {
  const { data, isLoading, isError, refetch } = useBookingDetail(id);
  const { mutate: cancel, isPending } = useCancelBooking();
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
          Failed to load booking detail.
        </Text>
        <Text className="font-medium text-blue-600" onPress={() => refetch()}>
          Tap to retry
        </Text>
      </View>
    );
  }

  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const canCancel = data.status === "CONFIRMED";

  const handleCancel = () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            cancel(id, {
              onSuccess: () => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                );
                Alert.alert(
                  "Booking Cancelled",
                  "Your booking has been cancelled.",
                  [{ text: "OK", onPress: () => router.back() }],
                );
              },
              onError: (error) => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error,
                );
                Alert.alert("Failed to Cancel", getApiErrorMessage(error));
              },
            });
          },
        },
      ],
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Booking Detail" }} />
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4">
          <View className="flex-row gap-3 mb-5">
            {imageFailed || !data.facility.imageUrl ? (
              <View className="justify-center items-center w-20 h-20 bg-gray-100 rounded-lg">
                <Ionicons name="image-outline" size={24} color="#9ca3af" />
              </View>
            ) : (
              <Image
                source={{ uri: data.facility.imageUrl }}
                style={{ width: 80, height: 80, borderRadius: 8 }}
                contentFit="cover"
                onError={() => setImageFailed(true)}
              />
            )}
            <View className="flex-1 justify-center">
              <Text className="text-base font-bold">{data.facility.name}</Text>
              <Text className="text-gray-500 text-sm mt-0.5">
                {data.court.name}
              </Text>
              <View className="self-start bg-green-50 rounded-full px-2 py-0.5 mt-1.5">
                <Text className="text-xs font-medium text-green-700">
                  {data.status}
                </Text>
              </View>
            </View>
          </View>

          <View className="p-4 mb-5 bg-gray-50 rounded-xl">
            <Text className="mb-3 text-xs text-gray-400">
              BOOKING REFERENCE
            </Text>
            <Text className="mb-4 font-mono text-base font-semibold">
              {data.bookingReference}
            </Text>

            <View className="flex-row gap-2 items-center mb-3">
              <Ionicons name="calendar-outline" size={16} color="#4b5563" />
              <Text className="text-sm text-gray-700">{formattedDate}</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Ionicons name="time-outline" size={16} color="#4b5563" />
              <Text className="text-sm text-gray-700">
                {data.startTime} - {data.endTime}
              </Text>
            </View>
          </View>

          <View className="pt-4 border-t border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-500">Court Price</Text>
              <Text className="text-sm text-gray-700">
                {formatPrice(data.price)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-500">Service Fee</Text>
              <Text className="text-sm text-gray-700">
                {formatPrice(data.serviceFee)}
              </Text>
            </View>
            <View className="flex-row justify-between pt-2 mt-2 border-t border-gray-100">
              <Text className="text-base font-semibold">Total</Text>
              <Text className="text-base font-bold text-blue-600">
                {formatPrice(data.totalPrice)}
              </Text>
            </View>
          </View>
        </View>

        {canCancel && (
          <View className="p-4 pb-8">
            <Pressable
              onPress={handleCancel}
              disabled={isPending}
              className="items-center py-4 rounded-lg border border-red-500 disabled:opacity-50"
            >
              {isPending ? (
                <ActivityIndicator color="#ef4444" />
              ) : (
                <Text className="font-semibold text-red-500">
                  Cancel Booking
                </Text>
              )}
            </Pressable>
          </View>
        )}
      </ScrollView>
    </>
  );
}
