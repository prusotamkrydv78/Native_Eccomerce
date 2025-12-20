import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <SafeAreaContextWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Orders" }} />
        <Stack.Screen name="[orderId]" options={{ title: "Order Details" }} />
      </Stack>
    </SafeAreaContextWrapper>
  );
}
