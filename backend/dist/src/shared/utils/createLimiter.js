"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const redis_1 = __importDefault(require("../config/redis"));
const createLimiter = (max, windowMs, message) => (0, express_rate_limit_1.default)({
    windowMs,
    max,
    message: { success: false, error: message },
    standardHeaders: true,
    legacyHeaders: false,
    store: new rate_limit_redis_1.default({
        sendCommand: (...args) => redis_1.default.call(...args),
    }),
});
exports.createLimiter = createLimiter;
