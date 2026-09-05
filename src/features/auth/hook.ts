import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/store/authStore";

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
