import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

import { TOKEN_KEY } from "@/constants/config";
import { User } from "@/features/auth/types";

interface AuthState {
  token: string | null;
  user: User | null;
  isHydrated: boolean; // Has the SecureStore check been completed upon app startup?
  isAuthenticated: boolean;
  hydrate: () => Promise<void>;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isHydrated: false,
  isAuthenticated: false,

  hydrate: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    set({ token, isAuthenticated: !!token, isHydrated: true });
  },

  login: async (token, user) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    set({ token, user, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
