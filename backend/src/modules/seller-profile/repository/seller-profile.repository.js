import { eq, and } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { userSettingModel } from "../../../db/models/user.setting.schema.js";
import { citiesModel } from "../../../db/models/cites.schema.js";
import { countriesModel } from "../../../db/models/countries.schema.js";
import { oldBookProductModel } from "../../../db/models/old.book.product.schema.js";

export const sellerProfileRepository = {
    getSellerDetails: async (sellerId) => {
        const [seller] = await db
            .select({
                id: userAccountModel.id,
                name: userAccountModel.name,
                email: userAccountModel.email,
                description: userSettingModel.description,
                cityName: citiesModel.name,
                countryName: countriesModel.name,
                profileImageUrl: userSettingModel.profileImageUrl,
            })
            .from(userAccountModel)
            .leftJoin(userSettingModel, eq(userAccountModel.id, userSettingModel.userId))
            .leftJoin(citiesModel, eq(userSettingModel.cityId, citiesModel.id))
            .leftJoin(countriesModel, eq(citiesModel.countryId, countriesModel.id))
            .where(eq(userAccountModel.id, sellerId))
            .limit(1);

        return seller || null;
    },

    getSellerListings: async (sellerId) => {
        const listings = await db.query.oldBookProductModel.findMany({
            where: (books, { and, eq }) => and(
                eq(books.sellerId, sellerId),
                eq(books.status, "active")
            ),
            with: {
                images: true,
                locationCity: true
            },
            orderBy: (books, { desc }) => [desc(books.createdAt)]
        });

        return listings;
    }
};
