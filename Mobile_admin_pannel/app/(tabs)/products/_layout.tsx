import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { Stack } from "expo-router";

export default function ProductsLayout() {
  return (
    <SafeAreaContextWrapper>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Products" }} />
        <Stack.Screen name="[productId]" options={{ title: "ProductDetial" }} />
        <Stack.Screen name="add-product" options={{ title: "AddProduct" }} />
        <Stack.Screen name="edit-product" options={{ title: "EditProduct" }} />
      </Stack>
    </SafeAreaContextWrapper>
  );
}
