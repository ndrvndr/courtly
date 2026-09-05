import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getFacilities, getFacilityDetail } from "./api";
import type { FacilitiesQueryParams } from "./types";

export function useFacilities(params: Omit<FacilitiesQueryParams, "page">) {
  return useInfiniteQuery({
    queryKey: ["facilities", params],
    queryFn: ({ pageParam }) =>
      getFacilities({ ...params, page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}

export function useFacilityDetail(id: string) {
  return useQuery({
    queryKey: ["facility", id],
    queryFn: () => getFacilityDetail(id),
    enabled: !!id,
  });
}
