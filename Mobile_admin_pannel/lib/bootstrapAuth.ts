import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/authStore";

export const bootstrapAuth = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    const userJson = await AsyncStorage.getItem("user");

    if (accessToken && refreshToken && userJson) {
      useAuthStore.setState({
        tokens: {
          accessToken,
          refreshToken,
        },
        user: JSON.parse(userJson),
        isAuthenticated: true,
      });
    }
  } catch (error) {
    console.error("Auth Bootstrap Error:", error);
    // Optionally clear everything if something is corrupt
    await useAuthStore.getState().logout();
  }
};
