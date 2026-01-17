import { Stack } from "expo-router";
import "./global.css";
import AuthGate from "../components/AuthGate";
import { AuthProvider } from "../store/auth";
import { CartProvider } from "../store/cart";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";

export default function RootLayout() {
  return (
    <SafeAreaContextWrapper>
      <AuthProvider>
        <CartProvider>
          <AuthGate>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </AuthGate>
        </CartProvider>
      </AuthProvider>
    </SafeAreaContextWrapper>
  );
}
