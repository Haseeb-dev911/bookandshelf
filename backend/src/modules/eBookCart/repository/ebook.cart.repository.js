import { and, eq, inArray } from "drizzle-orm";
import db from "../../../db/index.config.js";
import { eBookCartModel } from "../../../db/models/ebook.cart.schema.js";
import {
  eBookProductModel,
  eBookProductImagesModel,
} from "../../../db/models/e.book.product.schema.js";
import { userAccountModel } from "../../../db/models/user.account.schema.js";
import { userSettingModel } from "../../../db/models/user.setting.schema.js";
import { AppError } from "../../../error/App.error.js";

// ─── E-Book Cart Repository ───────────────────────────────────────────────────

export const eBookCartRepository = {
  /** Add an e-book to the user's cart. Idempotent via onConflictDoNothing. */
  addToCart: async (userId, ebookId) => {
    // Verify the e-book exists and is active
    const [ebook] = await db
      .select({ id: eBookProductModel.id })
      .from(eBookProductModel)
      .where(
        and(
          eq(eBookProductModel.id, ebookId),
          eq(eBookProductModel.status, "active"),
        ),
      )
      .limit(1);

    if (!ebook) {
      throw new AppError("E-Book not found", 404, [
        {
          field: "ebookId",
          message: "E-Book listing not found or unavailable.",
        },
      ]);
    }

    const [inserted] = await db
      .insert(eBookCartModel)
      .values({ userId, ebookId })
      .onConflictDoNothing()
      .returning({ id: eBookCartModel.id });

    return { alreadyExists: !inserted, id: inserted?.id ?? null };
  },

  /** Remove an e-book from the user's cart. */
  removeFromCart: async (userId, ebookId) => {
    const [deleted] = await db
      .delete(eBookCartModel)
      .where(
        and(
          eq(eBookCartModel.userId, userId),
          eq(eBookCartModel.ebookId, ebookId),
        ),
      )
      .returning({ id: eBookCartModel.id });

    return { removed: !!deleted };
  },

  /** Get all cart items for a user with full e-book details. */
  getUserCart: async (userId) => {
    const items = await db.query.eBookCartModel.findMany({
      where: (c, { eq }) => eq(c.userId, userId),
      with: {
        ebook: {
          with: {
            images: true,
            seller: {
              with: { setting: true },
            },
          },
        },
      },
      orderBy: (c, { desc }) => [desc(c.createdAt)],
    });
    return items;
  },

  /** Bulk-insert e-book IDs (guest cart merge). Skips duplicates. */
  mergeGuestCart: async (userId, ebookIds) => {
    if (!ebookIds || ebookIds.length === 0) return { merged: 0 };

    // Verify all supplied IDs correspond to active e-books
    const validEbooks = await db
      .select({ id: eBookProductModel.id })
      .from(eBookProductModel)
      .where(
        and(
          inArray(eBookProductModel.id, ebookIds),
          eq(eBookProductModel.status, "active"),
        ),
      );

    const validIds = validEbooks.map((e) => e.id);
    if (validIds.length === 0) return { merged: 0 };

    const rows = validIds.map((ebookId) => ({ userId, ebookId }));

    await db.insert(eBookCartModel).values(rows).onConflictDoNothing();

    return { merged: validIds.length };
  },

  /** Check if a single e-book is in the user's cart. */
  isInCart: async (userId, ebookId) => {
    const [row] = await db
      .select({ id: eBookCartModel.id })
      .from(eBookCartModel)
      .where(
        and(
          eq(eBookCartModel.userId, userId),
          eq(eBookCartModel.ebookId, ebookId),
        ),
      )
      .limit(1);

    return !!row;
  },
};
