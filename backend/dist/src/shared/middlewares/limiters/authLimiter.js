"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordLimiter = exports.resendOtpLimiter = exports.verifyOtpLimiter = exports.loginLimiter = exports.registerLimiter = void 0;
const createLimiter_1 = require("../../utils/createLimiter");
exports.registerLimiter = (0, createLimiter_1.createLimiter)(5, 60 * 60 * 1000, "Too many accounts created, please try again later.");
exports.loginLimiter = (0, createLimiter_1.createLimiter)(5, 15 * 60 * 1000, "Too many login attempts, please try again later.");
exports.verifyOtpLimiter = (0, createLimiter_1.createLimiter)(10, 15 * 60 * 1000, "Too many verification attempts, please try again later.");
exports.resendOtpLimiter = (0, createLimiter_1.createLimiter)(3, 60 * 60 * 1000, "Too many resend requests, please try again in an hour.");
exports.forgetPasswordLimiter = (0, createLimiter_1.createLimiter)(3, 60 * 60 * 1000, "Too many password reset attempts, please try again in an hour.");
