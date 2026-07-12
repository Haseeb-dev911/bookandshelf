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

        // ── User registers their identity after connecting ──────────────────────
        // The frontend emits 'join' with userId only after the user profile is
        // confirmed loaded. This prevents the stale closure bug where join was
        // emitted with an undefined userId.
        socket.on("join", async (userId) => {
            if (!userId) return;

            // Join a personal room — this is how we target messages to a specific user
            // regardless of which socket instance they are connected from.
            socket.join(`user:${userId}`);

            if (redis) {
                // Forward map: userId → socketId  (used to check online status)
                await redis.set(`user_online:${userId}`, socket.id);
                // Reverse map: socketId → userId  (used to clean up on disconnect)
                await redis.set(`socket_user:${socket.id}`, userId);
            }

            io.emit("userOnline", { userId });
        });

        // ── sendMessage socket event is REMOVED ────────────────────────────────
        // Previously this event re-emitted the raw client payload (which contained
        // a temp ID) to the receiver. However, the HTTP controller (sendMessage in
        // messaging.controller.js) already:
        //   1. Persists the message to the DB (gets a real UUID)
        //   2. Emits "newMessage" with the real DB record to both users
        //   3. Emits "conversationUpdated" to both users
        // Having the client ALSO emit via socket created a race condition where the
        // receiver got the temp-ID message first, then the real message — and the
        // dedup check (m.id === msg.id) failed because the IDs didn't match.
        // Solution: the HTTP path is the single source of truth for message emission.

        // ── Typing indicators ───────────────────────────────────────────────────
        socket.on("typing", (data) => {
            if (!data.receiverId) return;
            io.to(`user:${data.receiverId}`).emit("typing", data);
        });

        socket.on("stopTyping", (data) => {
            if (!data.receiverId) return;
            io.to(`user:${data.receiverId}`).emit("stopTyping", data);
        });

        // ── Mark read ───────────────────────────────────────────────────────────
        socket.on("markRead", (data) => {
            if (!data.senderId) return;
            io.to(`user:${data.senderId}`).emit("messageRead", {
                conversationId: data.conversationId,
                readAt: new Date().toISOString()
            });
        });

        // ── Cleanup on disconnect ───────────────────────────────────────────────
        socket.on("disconnect", async () => {
            console.log("Client disconnected", socket.id);

            if (redis) {
                // Use the reverse map to find which user this socket belonged to
                const userId = await redis.get(`socket_user:${socket.id}`);
                if (userId) {
                    // Only remove the forward map if this socket is still the active one.
                    // (User may have reconnected with a new socket before this fires.)
                    const storedSocketId = await redis.get(`user_online:${userId}`);
                    if (storedSocketId === socket.id) {
                        await redis.del(`user_online:${userId}`);
                        io.emit("userOffline", { userId });
                    }
                    await redis.del(`socket_user:${socket.id}`);
                }
            }
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
