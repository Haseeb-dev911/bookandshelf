import { eq, and, ilike, or, asc, desc, gt, lt, inArray } from "drizzle-orm";
import db from "../../../db/index.config.js";

import { oldBookProductModel, oldBookProductImagesModel } from "../../../db/models/old.book.product.schema.js";
import { eBookProductModel, eBookProductImagesModel } from "../../../db/models/e.book.product.schema.js";
import { categoriesModel } from "../../../db/models/category.book.schema.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { AppError } from "../../../error/App.error.js";


export const plpRepository = {

    /**
     * Fetch active listings with pagination + filters.
     *
     * @param {object} opts
     * @param {string|null}  opts.categoryId  - filter by category UUID
     * @param {string|null}  opts.condition   - 'new' | 'good' | 'fair' | 'poor'
     * @param {string|null}  opts.type        - 'all' | 'ebook' | 'physical'
     * @param {string|null}  opts.search      - free-text search on title / description
     * @param {string}       opts.sortBy      - 'newest' | 'price_asc' | 'price_desc'
     * @param {number}       opts.limit       - page size (default 12)
     * @param {number}       opts.offset      - how many records to skip (cursor-free pagination)
     */
    getAllActiveListings: async ({
        categoryId = null,
        condition = null,
        type = "all",
        search = null,
        sortBy = "newest",
        limit = 12,
        offset = 0
    } = {}) => {
        try {
            let allListings = [];

            // 1. Fetch physical books
            if (type === "all" || type === "physical") {
                const physicalConditions = [
                    eq(oldBookProductModel.status, "active"),
                    inArray(oldBookProductModel.sellerId, db.select({ id: userAccountModel.id }).from(userAccountModel).where(eq(userAccountModel.status, "active")))
                ];
                if (categoryId) physicalConditions.push(eq(oldBookProductModel.categoryId, categoryId));
                if (condition) physicalConditions.push(eq(oldBookProductModel.condition, condition));

                let physicalOrderFn;
                if (sortBy === "price_asc") physicalOrderFn = (books, { asc }) => [asc(books.price)];
                else if (sortBy === "price_desc") physicalOrderFn = (books, { desc }) => [desc(books.price)];
                else physicalOrderFn = (books, { desc }) => [desc(books.createdAt)];

                const physicalListings = await db.query.oldBookProductModel.findMany({
                    where: (books, { and }) => and(...physicalConditions),
                    with: {
                        images: true,
                        seller: {
                            with: { setting: true }
                        },
                        locationCity: true
                    },
                    orderBy: physicalOrderFn,
                    limit: search ? undefined : offset + limit,
                });
                
                allListings.push(...physicalListings.map(l => ({ ...l, isEbook: false })));
            }

            // 2. Fetch ebooks (skip if filtering by condition since ebooks don't have conditions)
            if ((type === "all" || type === "ebook") && !condition) {
                const ebookConditions = [
                    eq(eBookProductModel.status, "active"),
                    inArray(eBookProductModel.sellerId, db.select({ id: userAccountModel.id }).from(userAccountModel).where(eq(userAccountModel.status, "active")))
                ];
                if (categoryId) ebookConditions.push(eq(eBookProductModel.categoryId, categoryId));

                let ebookOrderFn;
                if (sortBy === "price_asc") ebookOrderFn = (books, { asc }) => [asc(books.price)];
                else if (sortBy === "price_desc") ebookOrderFn = (books, { desc }) => [desc(books.price)];
                else ebookOrderFn = (books, { desc }) => [desc(books.createdAt)];

                const ebookListings = await db.query.eBookProductModel.findMany({
                    where: (books, { and }) => and(...ebookConditions),
                    with: {
                        images: true,
                        seller: {
                            with: { setting: true }
                        }
                    },
                    orderBy: ebookOrderFn,
                    limit: search ? undefined : offset + limit,
                });
                
                allListings.push(...ebookListings.map(l => ({ ...l, isEbook: true })));
            }

            // 3. Client-side search filter (title / description)
            if (search && search.trim()) {
                const q = search.toLowerCase();
                allListings = allListings.filter(b =>
                    b.title?.toLowerCase().includes(q) ||
                    b.description?.toLowerCase().includes(q)
                );
            }

            // 4. Sort the combined results
            if (sortBy === "price_asc") {
                allListings.sort((a, b) => Number(a.price) - Number(b.price));
            } else if (sortBy === "price_desc") {
                allListings.sort((a, b) => Number(b.price) - Number(a.price));
            } else {
                // newest
                allListings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }

            // 5. Slice for pagination
            const total = search ? allListings.length : undefined;
            const page = allListings.slice(offset, offset + limit);

            return {
                listings: page,
                total,
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
