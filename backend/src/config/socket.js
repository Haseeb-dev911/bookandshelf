import { Server } from "socket.io";
import redis from "./redis.config.js";

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected", socket.id);

        // When a user joins (after login or opening app)
        socket.on("join", async (userId) => {
            if (!userId) return;
            
            socket.join(`user:${userId}`);
            
            // Mark user as online in redis
            // redis is already the client
            if (redis) {
                await redis.set(`user_online:${userId}`, socket.id);
            }
            
            // Broadcast user online status
            io.emit("userOnline", { userId });
        });

        // Forward message to receiver instantly
        socket.on("sendMessage", (data) => {
            // data should include: conversationId, senderId, receiverId, content, etc.
            if (!data.receiverId) return;
            
            io.to(`user:${data.receiverId}`).emit("newMessage", data);
            io.to(`user:${data.senderId}`).emit("newMessage", data); // also to sender's other tabs
            
            io.to(`user:${data.receiverId}`).emit("conversationUpdated", data);
            io.to(`user:${data.senderId}`).emit("conversationUpdated", data);
        });

        // Typing indicators
        socket.on("typing", (data) => {
            if (!data.receiverId) return;
            io.to(`user:${data.receiverId}`).emit("typing", data);
        });

        socket.on("stopTyping", (data) => {
            if (!data.receiverId) return;
            io.to(`user:${data.receiverId}`).emit("stopTyping", data);
        });

        // Mark read
        socket.on("markRead", (data) => {
            // data: { conversationId, senderId, receiverId }
            // Receiver is marking messages as read
            if (!data.senderId) return;
            io.to(`user:${data.senderId}`).emit("messageRead", { 
                conversationId: data.conversationId, 
                readAt: new Date().toISOString() 
            });
        });

        socket.on("disconnect", async () => {
            console.log("Client disconnected", socket.id);
            
            // We need to find which user this socket belonged to to mark them offline.
            // A simple approach without mapping all sockets in memory is to iterate Redis or wait for an explicit offline event,
            // but for now we can just let it expire or if we have a reverse map.
            // For a robust solution, we might store `socket_user:${socket.id}` -> `userId`
        });
    });

    return io;
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
