import { Stack } from "expo-router";
import "../global.css";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

export default function RootLayout() {
  return (
    <SafeAreaContextWrapper>
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
