import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listingService } from "../service/listing.service";

export const useUserOldBookListing = (categoryId?: string) => {
    return useQuery({
        queryKey: ["user-old-book-listings", categoryId],
        queryFn: () => listingService.getUserOldBookListing(categoryId),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

export const useDeleteUserOldBookProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: listingService.deleteUserOldBookProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
        }
    });
};

export const useMarkListingAsSold = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: listingService.markListingAsSold,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-old-book-listings"] });
            queryClient.invalidateQueries({ queryKey: ["plp-all-active-listings"] });
        }
    });
};

export const useAllActiveBookListings = (categoryId?: string) => {
    return useQuery({
        queryKey: ["plp-all-active-listings", categoryId],
        queryFn: () => listingService.getAllActiveBookListings(categoryId),
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};

export const useAllPLPCategories = () => {
    return useQuery({
        queryKey: ["plp-categories"],
        queryFn: () => listingService.getAllPLPCategories(),
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    });
};
