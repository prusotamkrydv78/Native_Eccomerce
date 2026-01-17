import React, { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../store/auth";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/home" as any);
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6F7F9",
        }}
      >
        <ActivityIndicator size="large" color="#FF9900" />
      </View>
    );
  }

  return <>{children}</>;
}
