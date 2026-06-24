import db from "../../../db/index.config.js";
import { conversationModel, messageModel, userAccountModel } from "../../../db/models/index.js";
import { eq, or, and, desc, asc } from "drizzle-orm";
import { AppError } from "../../../error/App.error.js";

export const createOrGetConversation = async (participantOne, participantTwo) => {
    // Check if conversation exists
    const existing = await db.query.conversationModel.findFirst({
        where: or(
            and(
                eq(conversationModel.participantOne, participantOne),
                eq(conversationModel.participantTwo, participantTwo)
            ),
            and(
                eq(conversationModel.participantOne, participantTwo),
                eq(conversationModel.participantTwo, participantOne)
            )
        )
    });

    if (existing) {
        return existing;
    }

    // Create new
    const [newConversation] = await db.insert(conversationModel).values({
        participantOne,
        participantTwo
    }).returning();

    return newConversation;
};

export const getConversationsByUser = async (userId) => {
    // We need conversations + last message + user details of the other participant
    const conversations = await db.query.conversationModel.findMany({
        where: or(
            eq(conversationModel.participantOne, userId),
            eq(conversationModel.participantTwo, userId)
        ),
        orderBy: [desc(conversationModel.lastMessageAt)],
        with: {
            userOne: {
                columns: { id: true, name: true }
            },
            userTwo: {
                columns: { id: true, name: true }
            }
        }
    });

    return conversations.map(c => {
        const otherUser = c.participantOne === userId ? c.userTwo : c.userOne;
        return {
            ...c,
            otherUser
        };
    });
};

export const getConversationById = async (conversationId, userId) => {
    const conversation = await db.query.conversationModel.findFirst({
        where: eq(conversationModel.id, conversationId),
        with: {
            userOne: { columns: { id: true, name: true } },
            userTwo: { columns: { id: true, name: true } }
        }
    });

    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    if (conversation.participantOne !== userId && conversation.participantTwo !== userId) {
        throw new AppError("Unauthorized access to conversation", 403);
    }

    const otherUser = conversation.participantOne === userId ? conversation.userTwo : conversation.userOne;
    return { ...conversation, otherUser };
};

export const createMessage = async ({ conversationId, senderId, receiverId, content }) => {
    // Verify conversation
    const conversation = await getConversationById(conversationId, senderId); // this also verifies access

    const [message] = await db.insert(messageModel).values({
        conversationId,
        senderId,
        receiverId,
        content,
        isRead: false
    }).returning();

    // Update conversation lastMessage
    await db.update(conversationModel)
        .set({
            lastMessage: content,
            lastMessageAt: new Date(),
            lastMessageSender: senderId,
            updatedAt: new Date()
        })
        .where(eq(conversationModel.id, conversationId));

    return message;
};

export const getMessagesByConversation = async (conversationId, userId) => {
    // Verify access
    await getConversationById(conversationId, userId);

    const messages = await db.query.messageModel.findMany({
        where: eq(messageModel.conversationId, conversationId),
        orderBy: [asc(messageModel.createdAt)] // old to new
    });

    return messages;
};

export const markMessagesAsRead = async (conversationId, receiverId) => {
    const updated = await db.update(messageModel)
        .set({ isRead: true, readAt: new Date() })
        .where(
            and(
                eq(messageModel.conversationId, conversationId),
                eq(messageModel.receiverId, receiverId),
                eq(messageModel.isRead, false)
            )
        )
        .returning();
        
    return updated;
};
