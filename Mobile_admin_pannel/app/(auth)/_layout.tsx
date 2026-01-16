import { Stack } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { StatusBar } from "react-native";

export default function AuthLayout() {
  return (
    <SafeAreaContextWrapper>
      <StatusBar backgroundColor="white" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="startup" options={{ title: "Startup" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
      </Stack>
    </SafeAreaContextWrapper>
  );
}
