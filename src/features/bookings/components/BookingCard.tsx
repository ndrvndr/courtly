import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { formatPrice } from "@/utils/formatPrice";

import type { Booking } from "../types";

const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  CONFIRMED: { bg: "bg-green-50", text: "text-green-700" },
  CANCELLED: { bg: "bg-red-50", text: "text-red-700" },
  COMPLETED: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function BookingCard({ booking }: { booking: Booking }) {
  const [imageFailed, setImageFailed] = useState(false);
  const statusStyle = STATUS_STYLE[booking.status] ?? STATUS_STYLE.COMPLETED;

  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <Pressable
      onPress={() => router.push(`/bookings/${booking.id}`)}
      className="flex-row gap-3 p-3 mb-3 bg-white rounded-xl border border-gray-100 shadow-sm"
    >
      {imageFailed || !booking.facility.imageUrl ? (
        <View className="justify-center items-center w-16 h-16 bg-gray-100 rounded-lg">
          <Ionicons name="image-outline" size={20} color="#9ca3af" />
        </View>
      ) : (
        <Image
          source={{ uri: booking.facility.imageUrl }}
          style={{ width: 64, height: 64, borderRadius: 8 }}
          contentFit="cover"
          onError={() => setImageFailed(true)}
        />
      )}

      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="flex-1 text-sm font-semibold" numberOfLines={1}>
            {booking.facility.name}
          </Text>
          <View className={`rounded-full px-2 py-0.5 ${statusStyle.bg}`}>
            <Text className={`text-[10px] font-medium ${statusStyle.text}`}>
              {booking.status}
            </Text>
          </View>
        </View>

        <Text className="mb-1 text-xs text-gray-500">{booking.court.name}</Text>

        <View className="flex-row gap-1 items-center mb-1">
          <Ionicons name="calendar-outline" size={12} color="#6b7280" />
          <Text className="text-xs text-gray-500">
            {formattedDate} · {booking.startTime}-{booking.endTime}
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-[10px] text-gray-400">
            {booking.bookingReference}
          </Text>
          <Text className="text-sm font-bold text-blue-600">
            {formatPrice(booking.totalPrice)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
