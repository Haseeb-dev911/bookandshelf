import { eq } from "drizzle-orm";
import db from "../../../db/index.config.js";

import { categoriesModel } from "../../../db/models/category.book.schema.js";
import { citiesModel } from "../../../db/models/cites.schema.js";
import { countriesModel } from "../../../db/models/countries.schema.js";
import { oldBookProductImagesModel, oldBookProductModel } from "../../../db/models/old.book.product.schema.js";
import { userSettingModel } from "../../../db/models/user.setting.schema.js";
import { wishlistModel } from "../../../db/models/wishlist.schema.js";

import { AppError } from "../../../error/App.error.js";


export const oldBookListingRepository = {

    categoryCheck: async (categoryId) => {
        const verifyCategory = await db
            .select()
            .from(categoriesModel)
            .where(eq(categoriesModel.id, categoryId))
            .limit(1)
        return verifyCategory;
    },

    oldBookAddListing: async (formData, userId) => {
        try {

            const { categoryId, title, author, description, price, city, country,
                condition,
                customFields,
                images
            } = formData;

            const addProductResult = await db.transaction(async (tx) => {
                const [newBook] = await tx.insert(oldBookProductModel)
                    .values({
                        sellerId: userId,
                        categoryId,
                        title,
                        author,
                        description,
                        price,
                        city: parseInt(city, 10),
                        country: parseInt(country, 10),
                        condition: condition ? condition.trim() : condition,
                        customFields
                    }).returning({ id: oldBookProductModel.id });

                const imagestoInsert = images.map(img => ({
                    public_id: img.public_id,
                    secure_url: img.secure_url,
                    format: img.format,
                    resource_type: img.resource_type,
                    productId: newBook.id,
                }));
                const imageInset = await tx.insert(oldBookProductImagesModel).values(imagestoInsert);

                return { success: true, bookId: newBook.id }
            });
            return addProductResult;

        } catch (error) {
            console.log(error);

            throw new AppError(
                "Failed to create book listing. Please try again.",
                500,
                [{ field: "root", message: "Failed to create book listing. Please try again." }])
        }

    },

    getAllBooksCategory: async () => {
        const allCategories = await db.query.categoriesModel.findMany({
            columns: {
                id: true,
                name: true
            },
            orderBy: (categories, { asc }) => [asc(categories.name)]
        });
        return allCategories;
    },

    getLocationDataUser: async (userId) => {
        return (
            await db
                .select({
                    cityId: citiesModel.id,
                    cityName: citiesModel.name,
                    countryId: countriesModel.id,
                    countryName: countriesModel.name,
                })
                .from(userSettingModel)
                .leftJoin(citiesModel, eq(userSettingModel.cityId, citiesModel.id))
                .leftJoin(countriesModel, eq(citiesModel.countryId, countriesModel.id))
                .where(eq(userSettingModel.userId, userId))
                .limit(1)
        )[0];
    },

    getUserOldBookListing: async (userId, categoryId) => {
        let conditions = [eq(oldBookProductModel.sellerId, userId)];
        if (categoryId) {
            conditions.push(eq(oldBookProductModel.categoryId, categoryId));
        }

        const listings = await db.query.oldBookProductModel.findMany({
            where: (books, { and }) => and(...conditions),
            with: {
                images: true,
                seller: {
                    with: {
                        setting: true
                    }
                },
                locationCity: true
            },
            orderBy: (books, { desc }) => [desc(books.createdAt)],
        });
        return listings;
    },

    getListingImages: async (bookId, userId) => {
        const book = await db.query.oldBookProductModel.findFirst({
            where: (books, { and, eq }) => and(eq(books.id, bookId), eq(books.sellerId, userId)),
            with: {
                images: true
            }
        });
        return book?.images || null;
    },

    deleteListingWithTransaction: async (bookId, userId, cloudinaryDeleteFn) => {
        await db.transaction(async (tx) => {
            // Check ownership and existance
            const book = await tx.query.oldBookProductModel.findFirst({
                where: (books, { and, eq }) => and(eq(books.id, bookId), eq(books.sellerId, userId)),
                with: {
                    images: true
                }
            });

            if (!book) throw new AppError("Listing not found or unauthorized", 404, [{ field: "root", message: "Listing not found or unauthorized" }]);

            // Delete from DB (images will cascade delete if DB constraints are set, otherwise delete manually here if needed. 
            // The schema has onDelete: 'cascade' for images so deleting product is enough)
            await tx.delete(oldBookProductModel).where(eq(oldBookProductModel.id, bookId));

            // Run cloudinary delete function. If it fails, it will throw and rollback the transaction.
            if (cloudinaryDeleteFn) {
                await cloudinaryDeleteFn(book.images);
            }
        });
    },

    markListingAsSold: async (bookId, userId) => {
        await db.transaction(async (tx) => {
            // Check ownership and existence
            const book = await tx.query.oldBookProductModel.findFirst({
                where: (books, { and, eq }) => and(eq(books.id, bookId), eq(books.sellerId, userId))
            });

            if (!book) throw new AppError("Listing not found or unauthorized", 404, [{ field: "root", message: "Listing not found or unauthorized" }]);

            // Update status to sold
            await tx.update(oldBookProductModel)
                .set({ status: "sold" })
                .where(eq(oldBookProductModel.id, bookId));

            // Delete from any wishlist
            await tx.delete(wishlistModel)
                .where(eq(wishlistModel.bookId, bookId));
        });
        return { success: true, message: "Listing marked as sold successfully" };
    },

    editListing: async (bookId, userId, formData) => {
        const { title, author, description, price, condition, categoryId, city, country, customFields, images } = formData;

        await db.transaction(async (tx) => {
            // Check ownership
            const book = await tx.query.oldBookProductModel.findFirst({
                where: (books, { and, eq }) => and(eq(books.id, bookId), eq(books.sellerId, userId)),
                with: { images: true }
            });

            if (!book) throw new AppError("Listing not found or unauthorized", 404, [{ field: "root", message: "Listing not found or unauthorized" }]);

            // Build update fields (only update provided fields)
            const updateFields = {};
            if (title !== undefined) updateFields.title = title;
            if (author !== undefined) updateFields.author = author;
            if (description !== undefined) updateFields.description = description;
            if (price !== undefined) updateFields.price = String(price);
            if (condition !== undefined) updateFields.condition = condition;
            if (categoryId !== undefined) updateFields.categoryId = categoryId;
            if (city !== undefined) updateFields.city = parseInt(city, 10);
            if (country !== undefined) updateFields.country = parseInt(country, 10);
            if (customFields !== undefined) updateFields.customFields = customFields;

            if (Object.keys(updateFields).length > 0) {
                await tx.update(oldBookProductModel)
                    .set(updateFields)
                    .where(eq(oldBookProductModel.id, bookId));
            }

            // If new images provided, replace old ones
            if (images && images.length > 0) {
                await tx.delete(oldBookProductImagesModel)
                    .where(eq(oldBookProductImagesModel.productId, bookId));

                const imagesToInsert = images.map(img => ({
                    public_id: img.public_id,
                    secure_url: img.secure_url,
                    format: img.format,
                    resource_type: img.resource_type,
                    productId: bookId,
                }));
                await tx.insert(oldBookProductImagesModel).values(imagesToInsert);
            }
        });

        return { success: true, message: "Listing updated successfully" };
    }

}