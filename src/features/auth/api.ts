import { apiClient } from "@/lib/apiClient";

import type { AuthResponse, LoginPayload, RegisterPayload } from "./types";

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/v1/auth/login",
    payload,
  );
  return data;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>(
    "/v1/auth/register",
    payload,
  );
  return data;
}
