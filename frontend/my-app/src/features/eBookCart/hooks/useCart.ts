import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useProfileDataQuery } from "@/features/profile-setting/services/query.service";
import { useGetCart, useAddToCart, useRemoveFromCart, useMergeCart } from "../queries/cart.queries";
import type { CartTotals } from "../types/ebook-cart.types";

const LOCAL_STORAGE_CART_KEY = "EBOOK_CART";

// Note: Guest cart stores an array of ebookIds because we don't fetch full details for guest cart initially,
// or we can store the full basic item details. Let's store just the IDs for simplicity and we will fetch 
// details on the cart page for guests if needed, or we just store full book details in local storage.
// Storing full details in local storage is better so we can render the cart page directly without extra API calls.

export interface GuestCartItem {
    id: string;
    title: string;
    author: string;
    category: { id: string; name: string };
    format: string;
    price: number;
    discountPercentage: number;
    quantity: number;
    images: { secure_url: string }[];
    fileSize: string;
    seller: {
        id: string;
        name: string;
        setting: { profileImageUrl: string | null } | null;
    };
}

export const useCart = () => {
    const { data: profileData, isSuccess: isProfileSuccess } = useProfileDataQuery();
    const isLoggedIn = isProfileSuccess && profileData?.success;

    const { data: dbCartData, isLoading: isDbCartLoading } = useGetCart(!!isLoggedIn);
    const { mutateAsync: addToDbCart } = useAddToCart();
    const { mutateAsync: removeFromDbCart } = useRemoveFromCart();
    const { mutateAsync: mergeDbCart } = useMergeCart();

    const [guestCart, setGuestCart] = useState<GuestCartItem[]>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // Sync guest cart to local storage
    useEffect(() => {
        if (!isLoggedIn) {
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(guestCart));
        }
    }, [guestCart, isLoggedIn]);

    // Handle login merge
    useEffect(() => {
        if (isLoggedIn) {
            const stored = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as GuestCartItem[];
                if (parsed.length > 0) {
                    const ids = parsed.map(item => item.id);
                    mergeDbCart(ids).then(() => {
                        localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
                        setGuestCart([]);
                    }).catch(err => {
                        console.error("Failed to merge guest cart", err);
                    });
                } else {
                    localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
                }
            }
        }
    }, [isLoggedIn, mergeDbCart]);

    const cartItems = isLoggedIn ? (dbCartData?.payload?.items || []) : guestCart;
    const isLoading = isLoggedIn ? isDbCartLoading : false;

    // Helper: is item in cart
    const isInCart = useCallback((ebookId: string) => {
        if (isLoggedIn) {
            return dbCartData?.payload?.items?.some((i: any) => i.id === ebookId) ?? false;
        }
        return guestCart.some(i => i.id === ebookId);
    }, [isLoggedIn, dbCartData, guestCart]);

    const addItem = async (book: any) => {
        try {
            if (isLoggedIn) {
                await addToDbCart(book.id);
            } else {
                setGuestCart(prev => {
                    if (prev.some(i => i.id === book.id)) return prev; // already in cart
                    
                    // Map the book to guest cart item
                    const newItem: GuestCartItem = {
                        id: book.id,
                        title: book.title,
                        author: book.author || "Unknown",
                        category: book.category || { id: book.categoryId, name: "Unknown" },
                        format: book.format || "PDF",
                        price: Number(book.price),
                        discountPercentage: book.discountPercentage || 0,
                        quantity: 1,
                        images: book.images || [],
                        fileSize: book.fileSize || "Unknown",
                        seller: book.seller || { id: book.sellerId, name: "Unknown Seller", setting: null },
                    };
                    return [...prev, newItem];
                });
            }
            toast.success("E-book added to cart!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to add to cart");
        }
    };

    const removeItem = async (ebookId: string) => {
        try {
            if (isLoggedIn) {
                await removeFromDbCart(ebookId);
            } else {
                setGuestCart(prev => prev.filter(i => i.id !== ebookId));
            }
            toast.success("Removed from cart");
        } catch (error: any) {
            toast.error("Failed to remove item");
        }
    };

    const getTotals = (): CartTotals => {
        if (isLoggedIn && dbCartData?.payload?.totals) {
            return dbCartData.payload.totals;
        }

        // Calculate for guest
        const subtotal = guestCart.reduce((sum, item) => {
            const price = Number(item.price);
            const discount = Number(item.discountPercentage) || 0;
            const finalPrice = discount > 0 ? price - (price * discount / 100) : price;
            return sum + finalPrice;
        }, 0);
        
        const tax = subtotal * 0.08;
        const grandTotal = subtotal + tax;

        return {
            subtotal,
            shipping: 0,
            tax,
            grandTotal,
            totalItems: guestCart.length,
        };
    };

    return {
        cartItems,
        isLoading,
        isInCart,
        addItem,
        removeItem,
        totals: getTotals(),
        isLoggedIn,
    };
};
