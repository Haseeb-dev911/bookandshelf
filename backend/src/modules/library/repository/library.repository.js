import { eq, and } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { ordersModel, orderItemsModel } from "../../../db/models/order.schema.js";
import { eBookProductModel } from "../../../db/models/e.book.product.schema.js";

const libraryRepository = {
    getPurchasedEbooks: async (userId) => {
        const orders = await db.query.ordersModel.findMany({
            where: (orders, { eq, and }) => and(eq(orders.userId, userId), eq(orders.status, "paid")),
            with: {
                items: {
                    with: {
                        ebook: {
                            with: {
                                images: true
                            }
                        }
                    }
                }
            }
        });
        
        const library = [];
        const seenEbooks = new Set();
        
        for (const order of orders) {
            for (const item of order.items) {
                if (item.ebook && item.ebook.status === 'active' && !seenEbooks.has(item.ebook.id)) {
                    seenEbooks.add(item.ebook.id);
                    library.push({
                        ebookId: item.ebook.id,
                        title: item.ebook.title,
                        author: item.ebook.author,
                        coverImage: item.ebook.images?.[0]?.secure_url || null,
                        purchaseDate: item.createdAt
                    });
                }
            }
        }
        
        // Sort by purchaseDate descending
        library.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        
        return library;
    },

    verifyPurchase: async (userId, ebookId) => {
        const result = await db
            .select({
                ebookId: eBookProductModel.id,
                pdfPublicId: eBookProductModel.pdfPublicId,
                status: eBookProductModel.status
            })
            .from(ordersModel)
            .innerJoin(orderItemsModel, eq(ordersModel.id, orderItemsModel.orderId))
            .innerJoin(eBookProductModel, eq(orderItemsModel.ebookId, eBookProductModel.id))
            .where(
                and(
                    eq(ordersModel.userId, userId),
                    eq(ordersModel.status, "paid"),
                    eq(orderItemsModel.ebookId, ebookId)
                )
            )
            .limit(1);
            
        return result[0] || null;
    }
};

export default libraryRepository;
