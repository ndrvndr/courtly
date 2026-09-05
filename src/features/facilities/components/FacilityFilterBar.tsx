import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Skeleton } from "@/components/ui/Skeleton";
import { useCities, useSports } from "@/features/metadata/hooks";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  selectedSport: string | null;
  onSportChange: (sport: string | null) => void;
  selectedCity: string | null;
  onCityChange: (city: string | null) => void;
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-3 py-1.5 rounded-full border flex-row items-center gap-2 ${
        active ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
      }`}
    >
      <Text className={active ? "text-sm text-white" : "text-sm text-gray-700"}>
        {label}
      </Text>
    </Pressable>
  );
}

function ChipRowSkeleton({ widths }: { widths: number[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
    >
      {widths.map((w, i) => (
        <Skeleton key={i} width={w} height={30} borderRadius={999} />
      ))}
    </ScrollView>
  );
}

export function FacilityFilterBar({
  search,
  onSearchChange,
  selectedSport,
  onSportChange,
  selectedCity,
  onCityChange,
}: Props) {
  const { data: sportsData, isLoading: sportsLoading } = useSports();
  const { data: citiesData, isLoading: citiesLoading } = useCities();

  return (
    <View className="px-4 pt-4 pb-3 bg-white">
      <View className="flex-row items-center px-3 py-2 mb-3 bg-gray-100 rounded-lg">
        <Ionicons name="search" size={18} color="#9ca3af" />
        <TextInput
          className="flex-1 ml-2 text-sm text-gray-900"
          placeholder="Search facilities..."
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={onSearchChange}
        />
      </View>

      {sportsLoading ? (
        <ChipRowSkeleton widths={[70, 90, 80, 85, 75]} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
        >
          <FilterChip
            label="All Sports"
            active={selectedSport === null}
            onPress={() => onSportChange(null)}
          />
          {sportsData?.data.map((sport) => (
            <FilterChip
              key={sport.id}
              label={sport.name}
              active={selectedSport === sport.slug}
              onPress={() => onSportChange(sport.slug)}
            />
          ))}
        </ScrollView>
      )}

      {citiesLoading ? (
        <ChipRowSkeleton widths={[75, 100, 95, 90, 100, 85]} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          <FilterChip
            label="All Cities"
            active={selectedCity === null}
            onPress={() => onCityChange(null)}
          />
          {citiesData?.data.map((city) => (
            <FilterChip
              key={city}
              label={city}
              active={selectedCity === city}
              onPress={() => onCityChange(city)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
