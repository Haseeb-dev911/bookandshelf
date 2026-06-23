import { eq } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { oldBookProductModel } from "../../../db/models/old.book.product.schema.js";
import { eBookProductModel } from "../../../db/models/e.book.product.schema.js";

export const productPageRepository = {
    getProductDetails: async (bookId) => {
        let product = await db.query.oldBookProductModel.findFirst({
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

        if (product) {
            product.isEbook = false;
            return product;
        }

        product = await db.query.eBookProductModel.findFirst({
            where: (books, { eq }) => eq(books.id, bookId),
            with: {
                images: true,
                seller: {
                    with: {
                        setting: true
                    }
                }
            }
        });

        if (product) {
            product.isEbook = true;
            return product;
        }

        return null;
    }
};
