import { AppError } from "../../../error/App.error.js";
import { eBookCartRepository } from "../repository/ebook.cart.repository.js";
import { paymentRepository } from "../../payment/repository/payment.repository.js";

// ─── E-Book Cart Service ──────────────────────────────────────────────────────

export const addToCartService = async (userId, ebookId) => {
    try {
        // Block if user has already purchased this ebook
        const alreadyPurchased = await paymentRepository.isAlreadyPurchased(userId, ebookId);
        if (alreadyPurchased) {
            throw new AppError("You have already purchased this e-book.", 400, [
                { field: "ebookId", message: "This e-book is already in your library." }
            ]);
        }

        const result = await eBookCartRepository.addToCart(userId, ebookId);

        if (result.alreadyExists) {
            return {
                success: true,
                message: "E-Book is already in your cart.",
                payload: { inCart: true },
            };
        }

        return {
            success: true,
            message: "E-Book added to cart.",
            payload: { inCart: true, id: result.id },
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to add e-book to cart.", 500, [
            { field: "root", message: "Failed to add e-book to cart." }
        ]);
    }
};

export const removeFromCartService = async (userId, ebookId) => {
    try {
        const result = await eBookCartRepository.removeFromCart(userId, ebookId);

        return {
            success: true,
            message: result.removed ? "E-Book removed from cart." : "E-Book was not in cart.",
            payload: { inCart: false },
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to remove e-book from cart.", 500, [
            { field: "root", message: "Failed to remove e-book from cart." }
        ]);
    }
};

export const getUserCartService = async (userId) => {
    try {
        const items = await eBookCartRepository.getUserCart(userId);

        const cartItems = items.map((item) => ({
            cartId: item.id,
            addedAt: item.createdAt,
            ...item.ebook,
            quantity: 1, // always 1 for e-books
        }));

        const subtotal = cartItems.reduce((sum, i) => {
            const price = Number(i.price);
            const discount = Number(i.discountPercentage) || 0;
            const finalPrice = discount > 0 ? price - (price * discount / 100) : price;
            return sum + finalPrice;
        }, 0);
        const tax = subtotal * 0.08;
        const grandTotal = subtotal + tax;

        return {
            success: true,
            message: "Cart fetched successfully.",
            payload: {
                items: cartItems,
                count: cartItems.length,
                totals: {
                    subtotal,
                    shipping: 0,
                    tax,
                    grandTotal,
                    totalItems: cartItems.length,
                },
            },
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to fetch cart.", 500, [
            { field: "root", message: "Failed to fetch cart." }
        ]);
    }
};

export const mergeGuestCartService = async (userId, ebookIds) => {
    try {
        const result = await eBookCartRepository.mergeGuestCart(userId, ebookIds);

        return {
            success: true,
            message: `Guest cart merged. ${result.merged} item(s) added.`,
            payload: { merged: result.merged },
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Failed to merge guest cart.", 500, [
            { field: "root", message: "Failed to merge guest cart." }
        ]);
    }
};
