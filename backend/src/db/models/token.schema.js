import { integer, pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

import { userAccountModel } from "./user.account.schema.js";
import { timeStamps } from "./utils/timestamps.common.js";

export const tokenModel = pgTable("token", {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
        .references(() => userAccountModel.id)
        .notNull(),

    token: text("token").notNull(),

    expireAt: timestamp("expire_at").notNull(),

    ...timeStamps
});