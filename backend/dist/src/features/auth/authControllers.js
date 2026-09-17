"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.resetPasswordController = exports.verifyResetPasswordController = exports.forgotPasswordController = exports.googleCallbackController = exports.googleAuthController = exports.refreshController = exports.logoutController = exports.loginController = exports.resendOtpController = exports.verifyOtpController = exports.registerController = void 0;
const authValidation_1 = require("../../shared/validations/authValidation");
const jwt_1 = require("../../shared/utils/jwt");
const authService = __importStar(require("./authServices"));
const apiError_1 = require("../../shared/utils/apiError");
const passport_1 = __importDefault(require("../../shared/config/passport"));
const isProd = process.env.NODE_ENV === "production";
const cookiesOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: jwt_1.REFRESH_TOKEN_EXPIRES_MS,
};
const registerController = async (req, res, next) => {
    try {
        const input = authValidation_1.registerSchema.parse(req.body);
        const result = await authService.registerService(input);
        return res.status(201).json({ success: true, message: result.message });
    }
    catch (err) {
        next(err);
    }
};
exports.registerController = registerController;
const verifyOtpController = async (req, res, next) => {
    try {
        const input = authValidation_1.otpSchema.parse(req.body);
        const result = await authService.verifyOtpService(input);
        res.cookie("refreshToken", result.refreshToken, cookiesOptions);
        return res.status(200).json({
            success: true,
            accessToken: result.accessToken,
            user: result.user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.verifyOtpController = verifyOtpController;
const resendOtpController = async (req, res, next) => {
    try {
        const input = authValidation_1.resendOtpSchema.parse(req.body);
        const result = await authService.resendOtpService(input);
        return res.status(200).json({ success: true, message: result.message });
    }
    catch (err) {
        next(err);
    }
};
exports.resendOtpController = resendOtpController;
const loginController = async (req, res, next) => {
    try {
        const input = authValidation_1.loginSchema.parse(req.body);
        const result = await authService.loginService(input);
        if (!result.verified) {
            return res.json({
                success: true,
                verified: false,
                message: "Please verify your email. A new code has been sent.",
            });
        }
        res.cookie("refreshToken", result.refreshToken, cookiesOptions);
        return res.status(200).json({
            success: true,
            verified: true,
            accessToken: result.accessToken,
            user: result.user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.loginController = loginController;
const logoutController = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        await authService.logoutService(refreshToken);
        res.clearCookie("refreshToken", {
            httpOnly: cookiesOptions.httpOnly,
            secure: cookiesOptions.secure,
            sameSite: cookiesOptions.sameSite,
        });
        res
            .status(200)
            .json({ success: true, message: "Logged out successfully." });
    }
    catch (err) {
        next(err);
    }
};
exports.logoutController = logoutController;
const refreshController = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            throw new apiError_1.ApiError(401, "Unauthorized access. Please login again.");
        const result = await authService.refreshTokenService(refreshToken);
        res.cookie("refreshToken", result.refreshToken, cookiesOptions);
        return res.status(200).json({
            success: true,
            accessToken: result.accessToken,
            user: result.user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.refreshController = refreshController;
exports.googleAuthController = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
});
exports.googleCallbackController = [
    passport_1.default.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const { accessToken, refreshToken } = await authService.googleAuthService(user);
            res.cookie("refreshToken", refreshToken, cookiesOptions);
            res.redirect(`${process.env.CLIENT_URL}/callback`);
        }
        catch (err) {
            next(err);
        }
    },
];
const forgotPasswordController = async (req, res, next) => {
    try {
        const input = authValidation_1.forgotPasswordSchema.parse(req.body);
        const { message } = await authService.forgotPasswordService(input);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.forgotPasswordController = forgotPasswordController;
const verifyResetPasswordController = async (req, res, next) => {
    try {
        const input = authValidation_1.verifyOtpSchema.parse(req.body);
        const { resetToken } = await authService.verifyResetPasswordOtpService(input);
        return res.status(200).json({ success: true, resetToken });
    }
    catch (err) {
        next(err);
    }
};
exports.verifyResetPasswordController = verifyResetPasswordController;
const resetPasswordController = async (req, res, next) => {
    try {
        const input = authValidation_1.resetPasswordSchema.parse(req.body);
        const { message } = await authService.resetPasswordService(input);
        return res.json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.resetPasswordController = resetPasswordController;
const changePasswordController = async (req, res, next) => {
    try {
        const input = authValidation_1.changePasswordSchema.parse(req.body);
        const { id } = req.user;
        const { message } = await authService.changePasswordService(input, id);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.changePasswordController = changePasswordController;
