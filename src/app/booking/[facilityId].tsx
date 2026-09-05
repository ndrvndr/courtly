import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function BookingScreen() {
  const { facilityId } = useLocalSearchParams<{ facilityId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Flow</Text>
      <Text>Facility ID: {facilityId}</Text>
      <Text>TODO: date picker + availability + booking</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 24,
  },
  title: { fontSize: 20, fontWeight: "600" },
});
