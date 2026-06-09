import { z } from "zod";

// ─── Wishlist Validation Schemas ──────────────────────────────────────────────

/** Schema for the batch status check endpoint */
export const wishlistStatusSchema = z.object({
    bookIds: z
        .array(z.string().uuid({ message: "Each bookId must be a valid UUID." }))
        .min(1, { message: "bookIds array must have at least one entry." })
        .max(100, { message: "Cannot check more than 100 books at once." }),
});
