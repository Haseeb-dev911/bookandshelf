import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "../service/wishlist.service";

/**
 * Hook to fetch the logged-in user's full wishlist.
 */
export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => wishlistService.getWishlist(),
    staleTime: 1 * 60 * 1000, // 1 minute stale time
    gcTime: 5 * 60 * 1000,    // 5 minutes garbage collection time
  });
};

/**
 * Hook to remove a book from the user's wishlist.
 * Automatically invalidates the "wishlist" and "plp-listings" queries to refresh state.
 */
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => wishlistService.removeFromWishlist(bookId),
    onSuccess: () => {
      // Invalidate both the wishlist query and listings query to reflect the state change everywhere
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["plp-listings"] });
    },
  });
};
