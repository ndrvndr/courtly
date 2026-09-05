import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useAuthStore } from "@/store/authStore";
import { ApiErrorResponse } from "@/types/api";

import { loginUser, registerUser } from "./api";
import type { LoginPayload, RegisterPayload } from "./types";

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: async (data) => {
      await login(data.accessToken, data.user);
    },
  });
}

export function useRegister() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: async (data) => {
      await login(data.accessToken, data.user);
    },
  });
}

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    if (data?.message) {
      return Array.isArray(data.message)
        ? data.message.join(", ")
        : data.message;
    }
  }
  return "Something went wrong. Please try again.";
}
