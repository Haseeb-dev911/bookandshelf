import { eq, and, sql, desc, asc } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { oldBookProductModel, oldBookProductImagesModel } from "../../../db/models/old.book.product.schema.js";
import { eBookProductModel, eBookProductImagesModel } from "../../../db/models/e.book.product.schema.js";
import { categoriesModel } from "../../../db/models/category.book.schema.js";
import { AppError } from "../../../error/App.error.js";

export const adminRepository = {
    getDashboardStats: async () => {
        try {
            // Count total users
            const [usersCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(userAccountModel);

            // Count total listings (physical)
            const [listingsCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel);

            // Count ebooks
            const [ebooksCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(eBookProductModel);

            // Count physical listings
            const physicalCountResult = listingsCountResult;

            // Count active listings
            const [activeCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel)
                .where(eq(oldBookProductModel.status, "active"));
            
            const [activeEbooksCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(eBookProductModel)
                .where(eq(eBookProductModel.status, "active"));

            // Count sold listings
            const [soldCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(oldBookProductModel)
                .where(eq(oldBookProductModel.status, "sold"));

            const [soldEbooksCountResult] = await db
                .select({ count: sql`count(*)::int` })
                .from(eBookProductModel)
                .where(eq(eBookProductModel.status, "sold"));

            return {
                totalUsers: usersCountResult?.count || 0,
                totalListings: (listingsCountResult?.count || 0) + (ebooksCountResult?.count || 0),
                totalEbooks: ebooksCountResult?.count || 0,
                totalPhysical: physicalCountResult?.count || 0,
                activeListings: (activeCountResult?.count || 0) + (activeEbooksCountResult?.count || 0),
                soldListings: (soldCountResult?.count || 0) + (soldEbooksCountResult?.count || 0),
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
            // Need to combine physical and ebooks for timeline
            // Since Drizzle lacks easy UNION ALL, we do it in code
            const physicalGrowth = await db
                .select({
                    date: sql`date_trunc('day', ${oldBookProductModel.createdAt})::date`,
                    physicalCount: sql`count(*)::int`
                })
                .from(oldBookProductModel)
                .groupBy(sql`date_trunc('day', ${oldBookProductModel.createdAt})::date`);
                
            const ebookGrowth = await db
                .select({
                    date: sql`date_trunc('day', ${eBookProductModel.createdAt})::date`,
                    ebookCount: sql`count(*)::int`
                })
                .from(eBookProductModel)
                .groupBy(sql`date_trunc('day', ${eBookProductModel.createdAt})::date`);

            const combinedMap = new Map();
            physicalGrowth.forEach(item => {
                const dateStr = typeof item.date === 'string' ? item.date : item.date.toISOString().split('T')[0];
                combinedMap.set(dateStr, { date: item.date, physicalCount: item.physicalCount, ebookCount: 0, total: item.physicalCount });
            });
            ebookGrowth.forEach(item => {
                const dateStr = typeof item.date === 'string' ? item.date : item.date.toISOString().split('T')[0];
                if (combinedMap.has(dateStr)) {
                    const existing = combinedMap.get(dateStr);
                    existing.ebookCount = item.ebookCount;
                    existing.total += item.ebookCount;
                } else {
                    combinedMap.set(dateStr, { date: item.date, physicalCount: 0, ebookCount: item.ebookCount, total: item.ebookCount });
                }
            });
            
            return Array.from(combinedMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } catch (error) {
            console.error("Listing growth repo error:", error);
            throw new AppError("Failed to fetch listing growth data", 500);
        }
    },

    getEbooks: async ({ limit = 10, offset = 0 } = {}) => {
        try {
            return await db.query.eBookProductModel.findMany({
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
                const [book] = await tx.insert(eBookProductModel)
                    .values({
                        sellerId: userId,
                        categoryId,
                        title,
                        author,
                        description,
                        price: price.toString(),
                        discountPercentage,
                        pdfUrl: pdfFile.secure_url,
                        pdfPublicId: pdfFile.public_id,
                    })
                    .returning();

                // Insert cover image into images table so PLP and details page load it automatically
                await tx.insert(eBookProductImagesModel)
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

                const [book] = await tx.update(eBookProductModel)
                    .set(updateFields)
                    .where(eq(eBookProductModel.id, bookId))
                    .returning();

                if (coverImage) {
                    // Delete old cover image first
                    await tx.delete(eBookProductImagesModel)
                        .where(eq(eBookProductImagesModel.productId, bookId));

                    // Insert new one
                    await tx.insert(eBookProductImagesModel)
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
                const book = await tx.query.eBookProductModel.findFirst({
                    where: eq(eBookProductModel.id, bookId),
                    with: { images: true }
                });

                if (!book) throw new AppError("E-book not found", 404);

                await tx.delete(eBookProductModel)
                    .where(eq(eBookProductModel.id, bookId));

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
            const conditions = [];
            if (categoryId) {
                conditions.push(eq(eBookProductModel.categoryId, categoryId));
            }

            const result = await db.update(eBookProductModel)
                .set({ discountPercentage })
                .where(conditions.length > 0 ? and(...conditions) : undefined)
                .returning({ id: eBookProductModel.id });

            return result.length;
        } catch (error) {
            console.error("Apply bulk discount repo error:", error);
            throw new AppError("Failed to apply bulk discount", 500);
        }
    }
};
