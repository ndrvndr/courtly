import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    Text,
    View,
} from "react-native";

import { useBookings } from "../hooks";
import type { BookingFilterStatus } from "../types";
import { BookingCard } from "./BookingCard";

const TABS: { label: string; value: BookingFilterStatus }[] = [
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Past", value: "PAST" },
  { label: "Cancelled", value: "CANCELLED" },
];

export function BookingList() {
  const [activeTab, setActiveTab] = useState<BookingFilterStatus>("UPCOMING");
  const { data, isLoading, isError, refetch, isRefetching } =
    useBookings(activeTab);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row px-4 bg-white border-b border-gray-100">
        {TABS.map((tab) => {
          const isActive = tab.value === activeTab;
          return (
            <Pressable
              key={tab.value}
              onPress={() => setActiveTab(tab.value)}
              className="flex-1 items-center py-4"
              style={{
                borderBottomWidth: 2,
                borderBottomColor: isActive ? "#2563eb" : "transparent",
              }}
            >
              <Text
                className={`text-sm ${isActive ? "font-semibold text-blue-600" : "text-gray-500"}`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : isError ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="mb-3 text-center text-gray-500">
            Failed to load bookings.
          </Text>
          <Text className="font-medium text-blue-600" onPress={() => refetch()}>
            Tap to retry
          </Text>
        </View>
      ) : (
        <FlatList
          data={data?.data ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => <BookingCard booking={item} />}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <View className="justify-center items-center mt-20">
              <Ionicons name="calendar-outline" size={40} color="#d1d5db" />
              <Text className="mt-2 text-gray-400">
                No {activeTab.toLowerCase()} bookings.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
