import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { API_BASE_URL, TOKEN_KEY } from "@/constants/config";
import { useAuthStore } from "@/store/authStore";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Attach the token to every request.
apiClient.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired/invalid tokens globally.
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      useAuthStore.getState().logout();
      // Navigation to the login page is handled in the root layout via `useEffect`.
      // The listener for `isAuthenticated` shouldn't be here (avoid importing the router in non-component files).
    }
    return Promise.reject(error);
  },
);
