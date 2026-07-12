import { AppError } from "../../../error/App.error.js";
import { getIo } from "../../../config/socket.js";
import * as messagingRepo from "../repository/messaging.repository.js";

export const createConversation = async (req, res, next) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.userId;

        if (!receiverId) {
            throw new AppError("Receiver ID is required", 400);
        }
        
        if (senderId === receiverId) {
            throw new AppError("Cannot create conversation with yourself", 400);
        }

        const conversation = await messagingRepo.createOrGetConversation(senderId, receiverId);

        res.status(200).json({
            success: true,
            payload: conversation
        });
    } catch (error) {
        next(error);
    }
};

export const getUserConversations = async (req, res, next) => {
    try {
        const userId = req.userId;
        const conversations = await messagingRepo.getConversationsByUser(userId);

        res.status(200).json({
            success: true,
            payload: conversations
        });
    } catch (error) {
        next(error);
    }
};

export const getSingleConversation = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const userId = req.userId;

        const conversation = await messagingRepo.getConversationById(conversationId, userId);

        res.status(200).json({
            success: true,
            payload: conversation
        });
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const { conversationId, receiverId, content } = req.body;
        const senderId = req.userId;

        if (!conversationId || !receiverId || !content) {
            throw new AppError("conversationId, receiverId, and content are required", 400);
        }

        const message = await messagingRepo.createMessage({
            conversationId,
            senderId,
            receiverId,
            content
        });

        // ── Single authoritative emission path ──────────────────────────────────
        // The frontend no longer emits via socket.emit("sendMessage"). This HTTP
        // handler is the ONLY place that emits "newMessage". This guarantees the
        // receiver always receives the real DB message (with a real UUID), never
        // a temp-ID optimistic message from the sender's client.
        try {
            const io = getIo();
            // Deliver real message to both participants
            io.to(`user:${receiverId}`).emit("newMessage", message);
            io.to(`user:${senderId}`).emit("newMessage", message);
            // Signal both sides to refresh their conversation sidebar
            io.to(`user:${receiverId}`).emit("conversationUpdated", { conversationId });
            io.to(`user:${senderId}`).emit("conversationUpdated", { conversationId });
        } catch (socketError) {
            // Socket failure must never break the HTTP response
            console.error("Socket error during sendMessage:", socketError);
        }

        res.status(201).json({
            success: true,
            payload: message
        });
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const userId = req.userId;

        const messages = await messagingRepo.getMessagesByConversation(conversationId, userId);

        res.status(200).json({
            success: true,
            payload: messages
        });
    } catch (error) {
        next(error);
    }
};

export const markMessagesRead = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const receiverId = req.userId;

        const updated = await messagingRepo.markMessagesAsRead(conversationId, receiverId);

        try {
            const io = getIo();
            // Emit to sender that their messages were read
            // Need to know senderId, which is the other participant. 
            // Better to emit to the whole conversation room, but we don't have conversation rooms.
            // We can fetch conversation to know the other user.
            const conversation = await messagingRepo.getConversationById(conversationId, receiverId);
            const senderId = conversation.otherUser.id;
            
            io.to(`user:${senderId}`).emit("messageRead", { 
                conversationId, 
                readAt: new Date().toISOString() 
            });
        } catch (e) {
            console.error(e);
        }

        res.status(200).json({
            success: true,
            payload: updated
        });
    } catch (error) {
        next(error);
    }
};
