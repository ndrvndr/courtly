import { useQuery } from "@tanstack/react-query";
import { getCities, getSports } from "./api";

export function useSports() {
  return useQuery({
    queryKey: ["sports"],
    queryFn: getSports,
    staleTime: 1000 * 60 * 60,
  });
}

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 1000 * 60 * 60,
  });
}
