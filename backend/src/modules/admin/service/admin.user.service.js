import { adminUserRepository } from "../repository/admin.user.repository.js";
import { authRepostory } from "../../auth/repository/auth.repository.js";
import { redisUserAccount } from "../../auth/repository/auth.redis.repository.js";
import { AppError } from "../../../error/App.error.js";
import { getIo } from "../../../config/socket.js";

export const adminUserService = {
    getUsersList: async (queryParams) => {
        const page = parseInt(queryParams.page) || 1;
        const limit = parseInt(queryParams.limit) || 10;
        
        return await adminUserRepository.getPaginatedUsers(
            page,
            limit,
            queryParams.search,
            queryParams.role,
            queryParams.status,
            queryParams.sortBy
        );
    },

    getUserDetails: async (userId) => {
        const user = await adminUserRepository.getUserDetails(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return user;
    },

    blockUser: async (adminId, userId, reason) => {
        if (adminId === userId) {
            throw new AppError("You cannot block your own account", 400);
        }

        const user = await authRepostory.findUserAccountViaId(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.role === "admin") {
            const adminCount = await adminUserRepository.countAdmins();
            if (adminCount <= 1) {
                throw new AppError("Cannot block the last remaining administrator", 400);
            }
        }

        const updatedUser = await adminUserRepository.updateUserStatus(userId, "banned");
        
        // We intentionally do NOT delete the user's session token here.
        // The socket event below fires the ban modal instantly on their active session.
        // Their session remains valid only to allow them to see the modal and click logout.
        // The middleware (validateuserMiddleware) already blocks all API calls for banned users.

        // Notify user's socket to show ban modal, and all clients to refresh PLP
        try {
            const io = getIo();
            io.to(`user:${userId}`).emit("ACCOUNT_BANNED", { userId });
            io.emit("USER_STATUS_CHANGED", { userId, status: "banned" });
        } catch (_) {}

        return updatedUser;
    },

    unblockUser: async (userId) => {
        const user = await authRepostory.findUserAccountViaId(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const result = await adminUserRepository.updateUserStatus(userId, "active");

        // Notify frontend to refresh listings since banned user's books are visible again
        try { getIo().emit("USER_STATUS_CHANGED", { userId, status: "active" }); } catch (_) {}

        return result;
    },

    restrictUser: async (adminId, userId) => {
        if (adminId === userId) {
            throw new AppError("You cannot restrict your own account", 400);
        }

        const user = await authRepostory.findUserAccountViaId(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.role === "admin") {
            throw new AppError("Administrators cannot be restricted", 400);
        }

        const result = await adminUserRepository.updateUserStatus(userId, "restricted");
        
        try {
            const io = getIo();
            io.to(`user:${userId}`).emit("ACCOUNT_RESTRICTED", { userId });
            io.emit("USER_STATUS_CHANGED", { userId, status: "restricted" });
        } catch (_) {}

        return result;
    },

    unrestrictUser: async (userId) => {
        const user = await authRepostory.findUserAccountViaId(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const result = await adminUserRepository.updateUserStatus(userId, "active");
        
        try {
            const io = getIo();
            io.to(`user:${userId}`).emit("ACCOUNT_UNRESTRICTED", { userId });
            io.emit("USER_STATUS_CHANGED", { userId, status: "active" });
        } catch (_) {}
        
        return result;
    },

    changeUserRole: async (adminId, userId, newRole) => {
        if (adminId === userId) {
            throw new AppError("You cannot change your own role", 400);
        }

        const user = await authRepostory.findUserAccountViaId(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.role === "admin" && newRole !== "admin") {
            const adminCount = await adminUserRepository.countAdmins();
            if (adminCount <= 1) {
                throw new AppError("Cannot remove the last remaining administrator", 400);
            }
        }

        return await adminUserRepository.updateUserRole(userId, newRole);
    }
};
