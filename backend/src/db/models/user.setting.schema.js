import { pgTable, text, uuid, varchar, integer } from "drizzle-orm/pg-core";

import { timeStamps } from "./utils/timestamps.common.js";
import { citiesModel } from "./cites.schema.js";
import { userAccountModel } from "./user.account.schema.js";

export const userSettingModel = pgTable("user_setting", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),


    userId: uuid("user_id")
        .references(() => userAccountModel.id,
            { onDelete: "cascade", onUpdate: "cascade" }),

    description: text("description "),

    cityId: integer("city_id").references(() => citiesModel.id),

    profileImageUrl: varchar("profile_image_url", { length: 500 }),

    profileImageId: varchar("profile_image_id", { length: 255 }),

    profileImageFormat: varchar("profile_image_format", { length: 50 }),

    profileImageResourceType: varchar("profile_image_resource_type", { length: 50 }),

    ...timeStamps
});