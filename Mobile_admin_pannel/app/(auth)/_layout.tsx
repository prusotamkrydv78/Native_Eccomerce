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
      />
    </SafeAreaContextWrapper>
  );
}
