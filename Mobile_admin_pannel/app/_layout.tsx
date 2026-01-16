import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import "../global.css";
import { StatusBar } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useEffect } from "react";
import { bootstrapAuth } from "@/lib/bootstrapAuth";
import AuthGate from "@/components/AuthGate";
const RootLayout = () => {
  useEffect(() => {
    bootstrapAuth();
  }, []);

  return (
    <>
      {/* <AuthGate> */}
      <QueryClientProvider client={queryClient}>
        <StatusBar backgroundColor="white" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <PortalHost />
      </QueryClientProvider>
      {/* </AuthGate> */}
    </>
  );
};

export default RootLayout;
