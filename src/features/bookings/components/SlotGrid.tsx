import * as Haptics from "expo-haptics";
import { Pressable, ScrollView, Text, View } from "react-native";

import type { CourtAvailability, Slot } from "../types";

interface Props {
  courts: CourtAvailability[];
  selectedCourtId: string | null;
  onSelectCourt: (courtId: string) => void;
  selectedSlot: Slot | null;
  onSelectSlot: (slot: Slot) => void;
}

export function SlotGrid({
  courts,
  selectedCourtId,
  onSelectCourt,
  selectedSlot,
  onSelectSlot,
}: Props) {
  const activeCourt = courts.find((c) => c.id === selectedCourtId) ?? courts[0];

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
        }}
      >
        {courts.map((court) => {
          const isActive = court.id === activeCourt?.id;
          return (
            <Pressable
              key={court.id}
              onPress={() => {
                Haptics.selectionAsync();
                onSelectCourt(court.id);
              }}
              className={`px-4 py-2 rounded-full border ${
                isActive
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-700"}`}
              >
                {court.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="px-4">
        <View className="flex-row gap-4 items-center mb-3">
          <View className="flex-row items-center gap-1.5">
            <View className="w-3 h-3 bg-white rounded-full border border-gray-300" />
            <Text className="text-xs text-gray-500">Available</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <View className="w-3 h-3 bg-gray-200 rounded-full" />
            <Text className="text-xs text-gray-500">Booked</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <View className="w-3 h-3 bg-blue-600 rounded-full" />
            <Text className="text-xs text-gray-500">Selected</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {activeCourt?.slots.map((slot) => {
            const isSelected =
              selectedSlot?.startTime === slot.startTime &&
              selectedCourtId === activeCourt.id;
            return (
              <Pressable
                key={slot.startTime}
                disabled={!slot.available}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onSelectSlot(slot);
                }}
                className={`px-3 py-2.5 rounded-lg border items-center ${
                  !slot.available
                    ? "bg-gray-100 border-gray-100"
                    : isSelected
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300"
                }`}
                style={{ minWidth: "22%" }}
              >
                <Text
                  className={`text-xs font-medium ${
                    !slot.available
                      ? "text-gray-400"
                      : isSelected
                        ? "text-white"
                        : "text-gray-700"
                  }`}
                >
                  {slot.startTime}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
