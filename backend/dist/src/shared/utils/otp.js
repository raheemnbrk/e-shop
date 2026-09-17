"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetToken = exports.saveResetToken = exports.verifyResetOtp = exports.saveResetOtp = exports.verifyOtp = exports.saveOtp = exports.generateOTP = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const OTP_TTL = 10 * 60;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateOTP = generateOTP;
const saveOtp = async (email, otp) => {
    await redis_1.default.set(`otp:${email}`, otp, "EX", OTP_TTL);
};
exports.saveOtp = saveOtp;
const verifyOtp = async (email, otp) => {
    const stored = await redis_1.default.get(`otp:${email}`);
    if (!stored || stored !== otp)
        return false;
    await redis_1.default.del(`otp:${email}`);
    return true;
};
exports.verifyOtp = verifyOtp;
const saveResetOtp = async (email, otp) => {
    await redis_1.default.set(`otp:reset:${email}`, otp, "EX", OTP_TTL);
};
exports.saveResetOtp = saveResetOtp;
const verifyResetOtp = async (email, otp) => {
    const stored = await redis_1.default.get(`otp:reset:${email}`);
    if (!stored || stored !== otp)
        return false;
    await redis_1.default.del(`otp:reset:${email}`);
    return true;
};
exports.verifyResetOtp = verifyResetOtp;
const saveResetToken = async (email, token) => {
    await redis_1.default.set(`reset-token:${email}`, token, "EX", 15 * 60);
};
exports.saveResetToken = saveResetToken;
const verifyResetToken = async (email, token) => {
    const stored = await redis_1.default.get(`reset-token:${email}`);
    if (!stored || stored !== token)
        return false;
    await redis_1.default.del(`reset-token:${email}`);
    return true;
};
exports.verifyResetToken = verifyResetToken;
