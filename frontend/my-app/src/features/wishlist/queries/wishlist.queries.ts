import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "../service/wishlist.service";

/**
 * Hook to fetch the logged-in user's full wishlist.
 * staleTime: 0 — always refetch when invalidated so adds/removes reflect instantly.
 */
export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => wishlistService.getWishlist(),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to add a book to the user's wishlist.
 * Invalidates ["wishlist"] so WishlistPage and the heart icon sync instantly.
 */
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => wishlistService.addToWishlist(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

/**
 * Hook to remove a book from the user's wishlist.
 * Invalidates ["wishlist"] so WishlistPage and the heart icon sync instantly.
 */
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => wishlistService.removeFromWishlist(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
