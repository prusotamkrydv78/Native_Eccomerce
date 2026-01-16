import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, tokens: Tokens) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

// Keys for secure storage
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (user, tokens) => {
    try {
      // Store tokens securely (encrypted)
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));

      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error storing auth data:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Clear secure storage
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error clearing auth data:", error);
      // Still reset state even if storage clear fails
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));
