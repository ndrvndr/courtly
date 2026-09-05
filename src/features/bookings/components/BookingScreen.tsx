import * as Haptics from "expo-haptics";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";

import { toApiDateString } from "@/utils/formatDate";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

import { useAvailability, useCreateBooking } from "../hooks";
import type { Slot } from "../types";
import { BookingSummarySheet } from "./BookingSummarySheet";
import { DatePickerStrip } from "./DatePickerStrip";
import { SlotGrid } from "./SlotGrid";

export function BookingScreen({
  facilityId,
  facilityName,
}: {
  facilityId: string;
  facilityName: string;
}) {
  const [selectedDate, setSelectedDate] = useState(() =>
    toApiDateString(new Date()),
  );
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [summaryVisible, setSummaryVisible] = useState(false);

  const { data, isLoading, isError, refetch } = useAvailability(
    facilityId,
    selectedDate,
  );
  const { mutate, isPending } = useCreateBooking(facilityId, selectedDate);

  const courts = data?.courts ?? [];
  const activeCourtId = selectedCourtId ?? courts[0]?.id ?? null;
  const activeCourt = courts.find((c) => c.id === activeCourtId);

  const handleSelectSlot = (slot: Slot) => {
    if (!selectedCourtId) setSelectedCourtId(activeCourtId);
    setSelectedSlot(slot);
    setSummaryVisible(true);
  };

  const handleConfirm = () => {
    if (!activeCourt || !selectedSlot) return;

    mutate(
      {
        courtId: activeCourt.id,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      },
      {
        onSuccess: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setSummaryVisible(false);
          setSelectedSlot(null);
          Alert.alert(
            "Booking Confirmed",
            "Your court has been booked successfully.",
            [
              {
                text: "View My Bookings",
                onPress: () => router.replace("/(tabs)/bookings"),
              },
              { text: "OK" },
            ],
          );
        },
        onError: (error) => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          Alert.alert("Booking Failed", getApiErrorMessage(error));
          refetch();
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: `Book: ${facilityName}` }} />

      <DatePickerStrip
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : isError || courts.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="mb-3 text-center text-gray-500">
            {isError
              ? "Failed to load availability."
              : "No courts available for this facility."}
          </Text>
          {isError && (
            <Text
              className="font-medium text-blue-600"
              onPress={() => refetch()}
            >
              Tap to retry
            </Text>
          )}
        </View>
      ) : (
        <ScrollView
          className="flex-1 pt-4"
          showsVerticalScrollIndicator={false}
        >
          <SlotGrid
            courts={courts}
            selectedCourtId={activeCourtId}
            onSelectCourt={(id) => {
              setSelectedCourtId(id);
              setSelectedSlot(null);
            }}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        </ScrollView>
      )}

      {activeCourt && selectedSlot && (
        <BookingSummarySheet
          visible={summaryVisible}
          onClose={() => setSummaryVisible(false)}
          facilityName={facilityName}
          court={activeCourt}
          slot={selectedSlot}
          date={selectedDate}
          isPending={isPending}
          onConfirm={handleConfirm}
        />
      )}
    </View>
  );
}
