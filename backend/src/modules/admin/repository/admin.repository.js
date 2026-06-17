import { eq, and, sql, desc, asc } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { oldBookProductModel, oldBookProductImagesModel } from "../../../db/models/old.book.product.schema.js";
import { categoriesModel } from "../../../db/models/category.book.schema.js";
import { AppError } from "../../../error/App.error.js";

export const adminRepository = {
    getDashboardStats: async () => {
        try {
            // Count total users
            const [usersCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(userAccountModel);

            // Count total listings (physical + ebooks)
            const [listingsCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel);

            // Count ebooks
            const [ebooksCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel)
                .where(eq(oldBookProductModel.isEbook, true));

            // Count physical listings
            const [physicalCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel)
                .where(eq(oldBookProductModel.isEbook, false));

            // Count active listings
            const [activeCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel)
                .where(eq(oldBookProductModel.status, "active"));

            // Count sold listings
            const [soldCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel)
                .where(eq(oldBookProductModel.status, "sold"));

            return {
                totalUsers: usersCountResult?.count || 0,
                totalListings: listingsCountResult?.count || 0,
                totalEbooks: ebooksCountResult?.count || 0,
                totalPhysical: physicalCountResult?.count || 0,
                activeListings: activeCountResult?.count || 0,
                soldListings: soldCountResult?.count || 0,
            };
        } catch (error) {
            console.error("Dashboard stats repo error:", error);
            throw new AppError("Failed to fetch dashboard stats", 500);
        }
    },

    getUserGrowthTimeline: async () => {
        try {
            const result = await db
                .select({
                    date: sql`date_trunc('day', ${userAccountModel.createdAt})::date`,
                    count: sql`count(*)::int`
                })
                .from(userAccountModel)
                .groupBy(sql`date_trunc('day', ${userAccountModel.createdAt})::date`)
                .orderBy(asc(sql`date_trunc('day', ${userAccountModel.createdAt})::date`));
            return result;
        } catch (error) {
            console.error("User growth repo error:", error);
            throw new AppError("Failed to fetch user growth data", 500);
        }
    },

    getListingGrowthTimeline: async () => {
        try {
            const result = await db
                .select({
                    date: sql`date_trunc('day', ${oldBookProductModel.createdAt})::date`,
                    total: sql`count(*)::int`,
                    ebookCount: sql`sum(case when ${oldBookProductModel.isEbook} = true then 1 else 0 end)::int`,
                    physicalCount: sql`sum(case when ${oldBookProductModel.isEbook} = false then 1 else 0 end)::int`
                })
                .from(oldBookProductModel)
                .groupBy(sql`date_trunc('day', ${oldBookProductModel.createdAt})::date`)
                .orderBy(asc(sql`date_trunc('day', ${oldBookProductModel.createdAt})::date`));
            return result;
        } catch (error) {
            console.error("Listing growth repo error:", error);
            throw new AppError("Failed to fetch listing growth data", 500);
        }
    },

    getEbooks: async ({ limit = 10, offset = 0 } = {}) => {
        try {
            return await db.query.oldBookProductModel.findMany({
                where: eq(oldBookProductModel.isEbook, true),
                with: {
                    images: true,
                    seller: true,
                },
                limit,
                offset,
                orderBy: (books, { desc }) => [desc(books.createdAt)],
            });
        } catch (error) {
            console.error("Get ebooks repo error:", error);
            throw new AppError("Failed to fetch ebooks list", 500);
        }
    },

    createEbook: async (data, userId) => {
        try {
            const { title, author, description, price, categoryId, coverImage, pdfFile, discountPercentage = 0 } = data;
            const newEbook = await db.transaction(async (tx) => {
                const [book] = await tx.insert(oldBookProductModel)
                    .values({
                        sellerId: userId,
                        categoryId,
                        title,
                        author,
                        description,
                        price: price.toString(),
                        isEbook: true,
                        discountPercentage,
                        pdfUrl: pdfFile.secure_url,
                        pdfPublicId: pdfFile.public_id,
                        customFields: {},
                    })
                    .returning();

                // Insert cover image into images table so PLP and details page load it automatically
                await tx.insert(oldBookProductImagesModel)
                    .values({
                        productId: book.id,
                        public_id: coverImage.public_id,
                        secure_url: coverImage.secure_url,
                        format: coverImage.format,
                        resource_type: coverImage.resource_type,
                    });

                return book;
            });
            return newEbook;
        } catch (error) {
            console.error("Create ebook repo error:", error);
            throw new AppError("Failed to publish ebook listing", 500);
        }
    },

    updateEbook: async (bookId, data) => {
        try {
            const { title, author, description, price, categoryId, coverImage, pdfFile, discountPercentage = 0 } = data;
            
            const updated = await db.transaction(async (tx) => {
                const updateFields = {
                    title,
                    author,
                    description,
                    price: price.toString(),
                    categoryId,
                    discountPercentage,
                };
                
                if (pdfFile) {
                    updateFields.pdfUrl = pdfFile.secure_url;
                    updateFields.pdfPublicId = pdfFile.public_id;
                }

                const [book] = await tx.update(oldBookProductModel)
                    .set(updateFields)
                    .where(eq(oldBookProductModel.id, bookId))
                    .returning();

                if (coverImage) {
                    // Delete old cover image first
                    await tx.delete(oldBookProductImagesModel)
                        .where(eq(oldBookProductImagesModel.productId, bookId));

                    // Insert new one
                    await tx.insert(oldBookProductImagesModel)
                        .values({
                            productId: bookId,
                            public_id: coverImage.public_id,
                            secure_url: coverImage.secure_url,
                            format: coverImage.format,
                            resource_type: coverImage.resource_type,
                        });
                }
                return book;
            });
            return updated;
        } catch (error) {
            console.error("Update ebook repo error:", error);
            throw new AppError("Failed to update ebook listing", 500);
        }
    },

    deleteEbook: async (bookId) => {
        try {
            // Transaction handles deleting product, cascading deletes its images
            const result = await db.transaction(async (tx) => {
                const book = await tx.query.oldBookProductModel.findFirst({
                    where: eq(oldBookProductModel.id, bookId),
                    with: { images: true }
                });

                if (!book) throw new AppError("E-book not found", 404);

                await tx.delete(oldBookProductModel)
                    .where(eq(oldBookProductModel.id, bookId));

                return book;
            });
            return result;
        } catch (error) {
            console.error("Delete ebook repo error:", error);
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to delete ebook listing", 500);
        }
    },

    applyBulkDiscount: async ({ discountPercentage, categoryId }) => {
        try {
            const conditions = [eq(oldBookProductModel.isEbook, true)];
            if (categoryId) {
                conditions.push(eq(oldBookProductModel.categoryId, categoryId));
            }

            const result = await db.update(oldBookProductModel)
                .set({ discountPercentage })
                .where(and(...conditions))
                .returning({ id: oldBookProductModel.id });

            return result.length;
        } catch (error) {
            console.error("Apply bulk discount repo error:", error);
            throw new AppError("Failed to apply bulk discount", 500);
        }
    }
};
