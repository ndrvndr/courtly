import { Text, View } from "react-native";

export default function BookingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-2xl font-bold text-white">My Bookings</Text>
      <Text>TODO: fetch GET /v1/bookings</Text>
    </View>
  );
}
