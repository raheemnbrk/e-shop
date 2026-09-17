"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_EXPIRES_MS = exports.verifyRefreshToken = exports.verifyAccessToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const signAccessToken = (payload) => jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
exports.signAccessToken = signAccessToken;
const signRefreshToken = (payload) => jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
exports.signRefreshToken = signRefreshToken;
const verifyAccessToken = (token) => jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
exports.verifyRefreshToken = verifyRefreshToken;
exports.REFRESH_TOKEN_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000;
