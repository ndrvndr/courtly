import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View,
} from "react-native";

import { useDebounce } from "@/hooks/useDebounce";

import { useFacilities } from "../hooks";
import { FacilityCard } from "./FacilityCard";
import { FacilityFilterBar } from "./FacilityFilterBar";

export function FacilityList() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 400);

  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFacilities({
    search: debouncedSearch || undefined,
    sport: selectedSport || undefined,
  });

  const facilities = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View className="flex-1 bg-gray-50">
      <FacilityFilterBar
        search={search}
        onSearchChange={setSearch}
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
      />

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : isError ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="mb-3 text-center text-gray-500">
            Failed to load facilities.
          </Text>
          <Text className="font-medium text-blue-600" onPress={() => refetch()}>
            Tap to retry
          </Text>
        </View>
      ) : (
        <FlatList
          data={facilities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => <FacilityCard facility={item} />}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 16 }} />
            ) : null
          }
          ListEmptyComponent={
            <View className="justify-center items-center mt-20">
              <Text className="text-gray-400">No facilities found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
