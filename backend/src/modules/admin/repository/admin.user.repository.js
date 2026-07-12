import { eq, or, ilike, and, desc, asc, count, sql } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { userSettingModel } from "../../../db/models/user.setting.schema.js";
import { ordersModel } from "../../../db/models/order.schema.js";
import { eBookProductModel } from "../../../db/models/e.book.product.schema.js";
import { oldBookProductModel } from "../../../db/models/old.book.product.schema.js";
import { wishlistModel } from "../../../db/models/wishlist.schema.js";

export const adminUserRepository = {
    getPaginatedUsers: async (page, limit, search, role, status, sortBy) => {
        const offset = (page - 1) * limit;

        const filters = [];

        if (search) {
            filters.push(
                or(
                    ilike(userAccountModel.name, `%${search}%`),
                    ilike(userAccountModel.email, `%${search}%`)
                )
            );
        }

        if (role) {
            filters.push(eq(userAccountModel.role, role));
        }

        if (status) {
            filters.push(eq(userAccountModel.status, status));
        }

        const whereClause = filters.length > 0 ? and(...filters) : undefined;
        const orderByClause = sortBy === "oldest" ? asc(userAccountModel.createdAt) : desc(userAccountModel.createdAt);

        const usersQuery = db
            .select({
                id: userAccountModel.id,
                name: userAccountModel.name,
                email: userAccountModel.email,
                role: userAccountModel.role,
                status: userAccountModel.status,
                createdAt: userAccountModel.createdAt,
                avatar: userSettingModel.profileImageUrl
            })
            .from(userAccountModel)
            .leftJoin(userSettingModel, eq(userAccountModel.id, userSettingModel.userId))
            .where(whereClause)
            .limit(limit)
            .offset(offset)
            .orderBy(orderByClause);

        const totalQuery = db
            .select({ value: count(userAccountModel.id) })
            .from(userAccountModel)
            .where(whereClause);

        const [users, [{ value: totalCount }]] = await Promise.all([
            usersQuery,
            totalQuery
        ]);

        return { users, totalCount };
    },

    getUserDetails: async (userId) => {
        const userBasic = await db
            .select({
                id: userAccountModel.id,
                name: userAccountModel.name,
                email: userAccountModel.email,
                role: userAccountModel.role,
                status: userAccountModel.status,
                isEmailVerified: userAccountModel.isEmailVerified,
                createdAt: userAccountModel.createdAt,
                avatar: userSettingModel.profileImageUrl,
                bio: userSettingModel.description
            })
            .from(userAccountModel)
            .leftJoin(userSettingModel, eq(userAccountModel.id, userSettingModel.userId))
            .where(eq(userAccountModel.id, userId))
            .limit(1);

        if (!userBasic.length) return null;

        const [ordersCount] = await db.select({ value: count(ordersModel.id) })
            .from(ordersModel).where(eq(ordersModel.userId, userId));
            
        const [uploadedOldBooksCount] = await db.select({ value: count(oldBookProductModel.id) })
            .from(oldBookProductModel).where(eq(oldBookProductModel.sellerId, userId));
            
        const [wishlistCount] = await db.select({ value: count(wishlistModel.id) })
            .from(wishlistModel).where(eq(wishlistModel.userId, userId));

        const activeListings = await db.select({
            id: oldBookProductModel.id,
            title: oldBookProductModel.title,
            price: oldBookProductModel.price,
            status: oldBookProductModel.status,
            createdAt: oldBookProductModel.createdAt,
        }).from(oldBookProductModel)
        .where(
            and(
                eq(oldBookProductModel.sellerId, userId),
                eq(oldBookProductModel.status, "active")
            )
        )
        .orderBy(desc(oldBookProductModel.createdAt))
        .limit(10);

        return {
            ...userBasic[0],
            totalOrders: ordersCount.value,
            uploadedOldBooks: uploadedOldBooksCount.value,
            wishlistCount: wishlistCount.value,
            activeListings,
        };
    },

    updateUserStatus: async (userId, status) => {
        const [updatedUser] = await db
            .update(userAccountModel)
            .set({ status })
            .where(eq(userAccountModel.id, userId))
            .returning({ id: userAccountModel.id, status: userAccountModel.status });
        return updatedUser;
    },

    updateUserRole: async (userId, role) => {
        const [updatedUser] = await db
            .update(userAccountModel)
            .set({ role })
            .where(eq(userAccountModel.id, userId))
            .returning({ id: userAccountModel.id, role: userAccountModel.role });
        return updatedUser;
    },
    
    countAdmins: async () => {
        const [adminsCount] = await db
            .select({ value: count(userAccountModel.id) })
            .from(userAccountModel)
            .where(eq(userAccountModel.role, "admin"));
        return adminsCount.value;
    }
};
