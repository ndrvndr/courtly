import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../../global.css";

import { useAuthStore } from "@/store/authStore";

const queryClient = new QueryClient();

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isHydrated, isAuthenticated, hydrate } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isHydrated, isAuthenticated, segments]);

  if (!isHydrated) return null; // TODO: change the splash screen.

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGate>
        <Stack
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#ffffff" },
            headerTintColor: "#111827",
            headerTitleStyle: { fontWeight: "600", fontSize: 16 },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="facility/[id]"
            options={{ title: "Facility Detail" }}
          />
          <Stack.Screen
            name="booking/[facilityId]"
            options={{ title: "Book a Court" }}
          />
        </Stack>
      </AuthGate>
    </QueryClientProvider>
  );
}
