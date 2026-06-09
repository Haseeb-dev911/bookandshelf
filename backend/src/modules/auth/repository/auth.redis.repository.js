import { json } from "zod";
import redis from "../../../config/redis.config.js";

export const redisUserAccount = {
    createRedisAccount: async (userId) => {
        await redis.sAdd("registered_user_account", userId);
    },

    checkUserAccountExits: async (userId) => {
        return await redis.sIsMember("registered_user_account", userId);
    },

    createTokenRoom: async (userId, name, email) => {
        const redisPipline = redis.multi();

        redisPipline.hSet(`otp_session:${userId}`, {
            email, name, attempt: "0"
        });
        redisPipline.expire(`otp_session:${userId}`, 3600);

        await redisPipline.exec();
    },

    updateTokenRoomAttempts: async (userId) => {
        await redis.hIncrBy(`otp_session:${userId}`, "attempt", 1);
    },

    readUserTokenSessionData: async (userId) => {
        return await redis.hGetAll(`otp_session:${userId}`);
    },

    createResetPasswordRequestSession: async (
        sessionId,
        validUser,
        token = null,
        userId = null,
        email = null) => {

        const redisPipline = redis.multi();
        redisPipline.hSet(`password_reset_opt_session:${sessionId}`, {
            userId: String(userId),
            hashToken: String(token),
            attempt: String(1),
            email: String(email),
            validUser: String(validUser),
        });

        redisPipline.expire(`password_reset_opt_session:${sessionId}`, 2000);
        await redisPipline.exec();
    },

    updateResetPasswordVerifyAttempt: async (sessionId, token, attempt) => {
        const redisPipline = redis.multi();
        redisPipline.hSet(`password_reset_opt_session:${sessionId}`, {
            hashToken: String(token),
            attempt: String(attempt)
        });

        redisPipline.expire(`password_reset_opt_session:${sessionId}`, 2000);
        await redisPipline.exec();
    },

    getResetPasswordRequestSession: async (sessionId) => {
        return await redis.hGetAll(`password_reset_opt_session:${sessionId}`);
    },

    createPasswordPageUpdateSession: async (optSessionId, passwordPageSessionId, userId) => {

        await redis.del(`password_reset_opt_session:${optSessionId}`);

        await redis.set(`password_page_update_session:${passwordPageSessionId}`,
            JSON.stringify({ userId }),
            { "EX": 1200 });
    },

    getPasswordPageUpdateSession: async (passwordPageSessionId) => {
        const getSessionData = await
            redis.get(`password_page_update_session:${passwordPageSessionId}`)
        return getSessionData ? JSON.parse(getSessionData) : null;
    },

    deleteAllTokenSessions: async (sessionId) => {
        await redis.del(`otp_session:${sessionId}`);
    }
}