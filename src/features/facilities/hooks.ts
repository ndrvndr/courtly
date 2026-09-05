import { useInfiniteQuery } from "@tanstack/react-query";

import { getFacilities } from "./api";
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
