import { eq, and, ilike, or, asc, desc, gt, lt } from "drizzle-orm";
import db from "../../../db/index.config.js";

import { oldBookProductModel, oldBookProductImagesModel } from "../../../db/models/old.book.product.schema.js";
import { categoriesModel } from "../../../db/models/category.book.schema.js";
import { AppError } from "../../../error/App.error.js";


export const plpRepository = {

    /**
     * Fetch active listings with pagination + filters.
     *
     * @param {object} opts
     * @param {string|null}  opts.categoryId  - filter by category UUID
     * @param {string|null}  opts.condition   - 'new' | 'good' | 'fair' | 'poor'
     * @param {string|null}  opts.search      - free-text search on title / description
     * @param {string}       opts.sortBy      - 'newest' | 'price_asc' | 'price_desc'
     * @param {number}       opts.limit       - page size (default 12)
     * @param {number}       opts.offset      - how many records to skip (cursor-free pagination)
     */
    getAllActiveListings: async ({
        categoryId = null,
        condition = null,
        search = null,
        sortBy = "newest",
        limit = 12,
        offset = 0
    } = {}) => {
        try {
            const conditions = [eq(oldBookProductModel.status, "active")];

            if (categoryId) {
                conditions.push(eq(oldBookProductModel.categoryId, categoryId));
            }

            if (condition) {
                conditions.push(eq(oldBookProductModel.condition, condition));
            }

            // Determine sort direction
            let orderFn;
            if (sortBy === "price_asc") {
                orderFn = (books, { asc }) => [asc(books.price)];
            } else if (sortBy === "price_desc") {
                orderFn = (books, { desc }) => [desc(books.price)];
            } else {
                // default: newest first
                orderFn = (books, { desc }) => [desc(books.createdAt)];
            }

            // NOTE: drizzle's findMany doesn't support ILIKE search natively in a
            // where-builder with dynamic conditions, so we fetch with other filters
            // and optionally post-filter in JS for the search term.
            // For large datasets this should be moved to a raw SQL with ILIKE.
            const listings = await db.query.oldBookProductModel.findMany({
                where: (books, { and }) => and(...conditions),
                with: {
                    images: true
                },
                orderBy: orderFn,
                limit: search ? undefined : limit,   // if searching, fetch broader set
                offset: search ? 0 : offset,
            });

            // --- client-side search filter (title / description) ---
            let filtered = listings;
            if (search && search.trim()) {
                const q = search.toLowerCase();
                filtered = listings.filter(
                    b =>
                        b.title?.toLowerCase().includes(q) ||
                        b.description?.toLowerCase().includes(q)
                );
            }

            // Manual pagination slice when search is active
            const total = filtered.length;
            const page = search ? filtered.slice(offset, offset + limit) : filtered;

            return {
                listings: page,
                total: search ? total : undefined,   // only available for search
                hasMore: page.length === limit
            };

        } catch (error) {
            console.error("PLP Repository Error:", error);
            throw new AppError(
                "Failed to fetch listings.",
                500,
                [{ field: "root", message: "Failed to fetch listings." }]
            );
        }
    },

    getAllCategories: async () => {
        const allCategories = await db.query.categoriesModel.findMany({
            columns: {
                id: true,
                name: true
            },
            orderBy: (categories, { asc }) => [asc(categories.name)]
        });
        return allCategories;
    }

};
