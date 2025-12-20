import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Stack } from "expo-router";

export default function ProductsLayout() {
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
