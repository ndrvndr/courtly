import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const SPORTS = ["tennis", "padel", "badminton", "futsal", "basketball"];

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  selectedSport: string | null;
  onSportChange: (sport: string | null) => void;
}

export function FacilityFilterBar({
  search,
  onSearchChange,
  selectedSport,
  onSportChange,
}: Props) {
  return (
    <View className="px-4 pt-4 pb-3 bg-white">
      <View className="flex-row items-center px-3 py-2 mb-3 bg-gray-100 rounded-lg">
        <Ionicons name="search" size={18} color="#9ca3af" />
        <TextInput
          className="flex-1 ml-2"
          placeholder="Search facilities..."
          value={search}
          onChangeText={onSearchChange}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        <Pressable
          onPress={() => onSportChange(null)}
          className={`px-3 py-1.5 rounded-full border ${
            selectedSport === null
              ? "bg-blue-600 border-blue-600"
              : "bg-white border-gray-300"
          }`}
        >
          <Text
            className={
              selectedSport === null
                ? "text-white text-sm"
                : "text-gray-700 text-sm"
            }
          >
            All
          </Text>
        </Pressable>
        {SPORTS.map((sport) => (
          <Pressable
            key={sport}
            onPress={() => onSportChange(sport)}
            className={`px-3 py-1.5 rounded-full border ${
              selectedSport === sport
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-gray-300"
            }`}
          >
            <Text
              className={`capitalize text-sm ${selectedSport === sport ? "text-white" : "text-gray-700"}`}
            >
              {sport}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
