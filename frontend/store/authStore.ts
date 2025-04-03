import * as SecureStore from "expo-secure-store";
import { RouterOutput, trpc } from "@/utils/trpc";
import { create } from "zustand";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

interface AuthState {
  user: { token: string } | null;
  login: (tokens: RouterOutput["auth"]["login"]["token"]) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (tokens) => {
    try {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
      set({ user: { token: tokens.accessToken } });
    } catch (error) {
      console.error("Error setting tokens:", error);
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      set({ user: null });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (!refreshToken) return;

      const data = await trpc.auth.refreshToken.useMutation().mutateAsync({ refreshToken });

      if (data) {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
        set({ user: { token: data.accessToken } });
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      set({ user: null });
    }
  },
}));
