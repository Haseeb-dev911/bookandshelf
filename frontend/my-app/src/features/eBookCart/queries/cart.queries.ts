import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../service/cart.service";

export const useGetCart = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ["ebook-cart"],
        queryFn: () => cartService.getCart(),
        enabled,
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ebookId: string) => cartService.addToCart(ebookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ebook-cart"] });
        },
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ebookId: string) => cartService.removeFromCart(ebookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ebook-cart"] });
        },
    });
};

export const useMergeCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ebookIds: string[]) => cartService.mergeGuestCart(ebookIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ebook-cart"] });
        },
    });
};
