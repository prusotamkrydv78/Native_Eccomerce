import { useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { View } from "@rn-primitives/slot";
import { ActivityIndicator } from "react-native";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated } = useAuthStore();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    }
    setTimeout(() => {
      setReady(true);
    }, 500);
  }, [isAuthenticated, segments]);

  if (!ready)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#F83758" />
      </View>
    );

  return <>{children}</>;
}
