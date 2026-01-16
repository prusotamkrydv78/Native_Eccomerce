import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { View, ActivityIndicator } from "react-native";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Don't navigate while still loading auth state
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated and not in auth group, redirect to login
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // User is authenticated but in auth group, redirect to main app
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments]);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#F83758" />
      </View>
    );
  }

  return <>{children}</>;
}
