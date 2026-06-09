import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { plpService, type FetchListingsParams } from "../service/plp.service";
import type { PLPFilters } from "../types/plp.types";

// ─── Infinite scroll query for PLP listings ───────────────────────────────────

/**
 * Uses react-query's useInfiniteQuery so we can append more pages as the
 * user scrolls to the bottom of the list.
 *
 * pageParam starts at 1 and is incremented by the getNextPageParam callback.
 */
export const usePLPListings = (filters: Partial<PLPFilters>) => {
    return useInfiniteQuery({
        queryKey: ["plp-listings", filters],

        queryFn: ({ pageParam = 1 }) => {
            const params: FetchListingsParams = {
                ...filters,
                page:  pageParam as number,
                limit: 12,
            };
            return plpService.getListings(params);
        },

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            // If the API says there are more records, request the next page
            if (lastPage?.payload?.hasMore) {
                return (lastPage.payload.page ?? 1) + 1;
            }
            return undefined; // no more pages → infinite scroll stops
        },

        staleTime: 2 * 60 * 1000,   // 2 min
        gcTime:    5 * 60 * 1000,   // 5 min
    });
};

// ─── Categories query ─────────────────────────────────────────────────────────

export const usePLPCategories = () => {
    return useQuery({
        queryKey: ["plp-categories"],
        queryFn:  () => plpService.getCategories(),
        staleTime: 10 * 60 * 1000,
        gcTime:    15 * 60 * 1000,
    });
};
