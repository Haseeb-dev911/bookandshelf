import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userAccountModel } from "./user.account.schema.js";

export const conversationModel = pgTable("conversation", {
    id: uuid("id").defaultRandom().primaryKey(),
    
    participantOne: uuid("participant_one")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),
        
    participantTwo: uuid("participant_two")
        .notNull()
        .references(() => userAccountModel.id, { onDelete: "cascade" }),

    lastMessage: text("last_message"),
    
    lastMessageAt: timestamp("last_message_at"),
    
    lastMessageSender: uuid("last_message_sender")
        .references(() => userAccountModel.id, { onDelete: "set null" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const conversationRelations = relations(conversationModel, ({ one, many }) => ({
    userOne: one(userAccountModel, {
        fields: [conversationModel.participantOne],
        references: [userAccountModel.id]
    }),
    userTwo: one(userAccountModel, {
        fields: [conversationModel.participantTwo],
        references: [userAccountModel.id]
    })
}));
