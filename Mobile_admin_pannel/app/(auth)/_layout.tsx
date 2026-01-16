import { Stack, useRouter } from "expo-router"; 
import SafeAreaContextWrapper from "@/components/SafeAreaContextWrapper";
import { useEffect, useState } from "react";
import { tokenStorage } from "@/utils/tokenStorage";
import { ActivityIndicator, StatusBar, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState<null | boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const accessToken = await tokenStorage.getAccessToken();
        if (accessToken) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.error("Auth Check Error:", error);
        router.replace("/(auth)/login");
      } finally {
        setLoading(false);
      }
    };
    // checkAuth();
  }, []);

  return (
    <SafeAreaContextWrapper>
      
          <StatusBar backgroundColor="white" />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#F83758" />
        </View>
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="startup" options={{ title: "Startup" }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
        </Stack>
      )}
    </SafeAreaContextWrapper>
  );
}
