import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

import redis from "../../../config/redis.config.js";

let loginSignupRateLimiter = null;
let tokenRateLimiter = null;
let passwordResetRequest = null;

const createLimiter = ({ windowMs, limit }) => {
  return rateLimit({
    windowMs,
    limit,

    store: new RedisStore({
      sendCommand: (...args) => redis.sendCommand([...args]),
    }),

    handler: (req, res) => {
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Try again later",
        payload: null,
        errors: [
          {
            field: "root",
            message: "Too many attempts. Try again later",
          },
        ],
      });
    },
  });
};

export const initializeRateLimiters = () => {
  loginSignupRateLimiter = createLimiter({
    windowMs: 20 * 60 * 1000,
    limit: 10,
  });

  tokenRateLimiter = createLimiter({
    windowMs: 20 * 60 * 1000,
    limit: 10,
  });

  passwordResetRequest = createLimiter({
    windowMs: 20 * 60 * 1000,
    limit: 15,
  });
};

export const getLoginSignupRateLimiter = () => loginSignupRateLimiter;

export const getTokenRateLimiter = () => tokenRateLimiter;

export const getPasswordResetRequest = () => passwordResetRequest;

export const useLimiter = (getLimiter) => {
  return (req, res, next) => {
    const limiter = getLimiter();

    if (!limiter) {
      return res.status(500).json({
        success: false,
        message: "Rate limiter is not initialized",
        payload: null,
        errors: [{ field: "root", message: "Rate limiter is not initialized" }],
      });
    }

    return limiter(req, res, next);
  };
};