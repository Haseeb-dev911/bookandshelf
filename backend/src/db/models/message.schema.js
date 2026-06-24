import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userAccountModel } from "./user.account.schema.js";
import { conversationModel } from "./conversation.schema.js";

export const messageModel = pgTable("message", {
    id: uuid("id").defaultRandom().primaryKey(),
    
    conversationId: uuid("conversation_id")
        .notNull()
        .references(() => conversationModel.id, { onDelete: "cascade" }),
        
    senderId: uuid("sender_id")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),
        
    receiverId: uuid("receiver_id")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),

    content: text("content").notNull(),
    
    isRead: boolean("is_read").default(false).notNull(),
    
    readAt: timestamp("read_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const messageRelations = relations(messageModel, ({ one }) => ({
    conversation: one(conversationModel, {
        fields: [messageModel.conversationId],
        references: [conversationModel.id]
    }),
    sender: one(userAccountModel, {
        fields: [messageModel.senderId],
        references: [userAccountModel.id]
    }),
    receiver: one(userAccountModel, {
        fields: [messageModel.receiverId],
        references: [userAccountModel.id]
    })
}));
