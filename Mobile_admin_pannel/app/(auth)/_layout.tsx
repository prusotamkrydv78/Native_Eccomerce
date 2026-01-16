import { Stack } from "expo-router";
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { StatusBar } from "react-native";
import AuthGate from "@/components/AuthGate";

export default function RootLayout() {
  return (
    <SafeAreaContextWrapper>
      <StatusBar backgroundColor="white" />
      <AuthGate>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="startup" options={{ title: "Startup" }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
        </Stack>
      </AuthGate>
    </SafeAreaContextWrapper>
  );
}
