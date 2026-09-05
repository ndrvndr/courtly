import * as Haptics from "expo-haptics";
import { Pressable, ScrollView, Text } from "react-native";

import {
  formatDateLabel,
  formatDayLabel,
  getNextNDays,
  toApiDateString,
} from "@/utils/formatDate";

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DatePickerStrip({ selectedDate, onSelectDate }: Props) {
  const days = getNextNDays(14);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      className="bg-white border-b border-gray-100"
    >
      {days.map((date) => {
        const apiDate = toApiDateString(date);
        const isActive = apiDate === selectedDate;
        return (
          <Pressable
            key={apiDate}
            onPress={() => {
              Haptics.selectionAsync();
              onSelectDate(apiDate);
            }}
            className={`items-center px-3.5 py-2.5 rounded-xl border min-w-[56px] ${
              isActive
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-gray-200"
            }`}
          >
            <Text
              className={`text-xs font-medium ${isActive ? "text-white" : "text-gray-400"}`}
            >
              {formatDayLabel(date)}
            </Text>
            <Text
              className={`text-sm font-semibold mt-0.5 ${isActive ? "text-white" : "text-gray-800"}`}
            >
              {formatDateLabel(date)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
