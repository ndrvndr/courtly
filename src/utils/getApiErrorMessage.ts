import type { ApiErrorResponse } from "@/types/api";
import { AxiosError } from "axios";

export function getApiErrorMessage(error: unknown): string {
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
