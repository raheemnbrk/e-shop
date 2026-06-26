import rateLimit from "express-rate-limit";
import RedisStore, { RedisReply } from "rate-limit-redis";
import redis from "../config/redis";

export const createLimiter = (max: number, windowMs: number, message: string) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, error: message },
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args: [string, ...string[]]) =>
        redis.call(...args) as Promise<RedisReply>,
    }),
  });
