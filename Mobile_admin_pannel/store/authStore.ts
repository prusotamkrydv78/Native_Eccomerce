import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: any | null;
  tokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
  isAuthenticated: boolean;
  setAuth: (user: any, tokens: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,

  setAuth: async (user, tokens) => {
    await AsyncStorage.multiSet([
      ["accessToken", tokens.accessToken],
      ["refreshToken", tokens.refreshToken],
      ["user", JSON.stringify(user)],
    ]);
    set({
      user,
      tokens,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    set({ user: null, tokens: null, isAuthenticated: false });
  },
}));
