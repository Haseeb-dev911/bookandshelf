import { pgTable, uuid, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { userAccountModel } from "./user.account.schema.js";
import { eBookProductModel } from "./e.book.product.schema.js";
import { timeStamps } from "./utils/timestamps.common.js";

// ─── E-Book Cart Table ────────────────────────────────────────────────────────
// Each row = one user owning one e-book in their cart.
// Quantity is always 1 — enforced by the unique constraint.

export const eBookCartModel = pgTable(
  "ebook_cart",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => userAccountModel.id, { onDelete: "cascade" }),

    ebookId: uuid("ebook_id")
      .notNull()
      .references(() => eBookProductModel.id, { onDelete: "cascade" }),

    ...timeStamps,
  },
  (table) => ({
    // A user cannot add the same e-book to cart twice
    userEbookUnique: unique("ebook_cart_user_ebook_unique").on(
      table.userId,
      table.ebookId,
    ),
  }),
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const eBookCartRelations = relations(eBookCartModel, ({ one }) => ({
  user: one(userAccountModel, {
    fields: [eBookCartModel.userId],
    references: [userAccountModel.id],
  }),
  ebook: one(eBookProductModel, {
    fields: [eBookCartModel.ebookId],
    references: [eBookProductModel.id],
  }),
}));
