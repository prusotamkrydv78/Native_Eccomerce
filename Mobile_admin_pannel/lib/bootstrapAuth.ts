import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../store/authStore";

// Keys for secure storage (must match authStore.ts)
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const bootstrapAuth = async () => {
  const { setLoading } = useAuthStore.getState();

  try {
    // Read from secure storage (encrypted)
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    const userJson = await SecureStore.getItemAsync(USER_KEY);

    if (accessToken && refreshToken && userJson) {
      useAuthStore.setState({
        tokens: {
          accessToken,
          refreshToken,
        },
        user: JSON.parse(userJson),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setLoading(false);
    }
  } catch (error) {
    console.error("Auth Bootstrap Error:", error);
    // Clear everything if something is corrupt
    await useAuthStore.getState().logout();
  }
};
