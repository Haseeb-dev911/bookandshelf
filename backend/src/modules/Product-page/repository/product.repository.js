import { eq } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { oldBookProductModel } from "../../../db/models/old.book.product.schema.js";

export const productPageRepository = {
    getProductDetails: async (bookId) => {
        const product = await db.query.oldBookProductModel.findFirst({
            where: (books, { eq }) => eq(books.id, bookId),
            with: {
                images: true,
                seller: {
                    with: {
                        setting: true
                    }
                },
                locationCity: true
            }
        });
        return product || null;
    }
};
