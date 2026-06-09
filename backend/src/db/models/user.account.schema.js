import { pgEnum, pgTable, text, serial, boolean, varchar, uuid } from "drizzle-orm/pg-core";
import { timeStamps } from "./utils/timestamps.common.js";

export const userStatus = pgEnum("status", [
    "active",
    "banned",
    "restricted",
]);

export const userRole = pgEnum("role", [
    "user",
    "admin",
    "support"
]);

export const userAccountModel = pgTable("users_account", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    name: varchar("name", { length: 200 })
        .notNull(),

    email: varchar("email", { length: 255 })
        .unique()
        .notNull(),

    rawEmail: varchar("raw_email", { length: 255 })
        .unique()
        .notNull(),

    password: text("password"),

    role: userRole("role")
        .default("user"),

    isVerifed: boolean("is_verfied")
        .default(false),

    isEmailVerified: boolean("is_email_verfied")
        .default(false),

    ...timeStamps
});