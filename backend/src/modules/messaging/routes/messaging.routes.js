import express from "express";
import * as messagingController from "../controller/messaging.controller.js";
import { messagingAuthMiddleware } from "../middleware/messaging.middleware.js";

const router = express.Router();

// All messaging routes require authentication
router.use(messagingAuthMiddleware);

// Conversations
router.get("/conversations", messagingController.getUserConversations);
router.post("/conversations", messagingController.createConversation);
router.get("/conversations/:conversationId", messagingController.getSingleConversation);

// Messages
router.get("/:conversationId", messagingController.getMessages);
router.post("/", messagingController.sendMessage);
router.patch("/read/:conversationId", messagingController.markMessagesRead);

export default router;
