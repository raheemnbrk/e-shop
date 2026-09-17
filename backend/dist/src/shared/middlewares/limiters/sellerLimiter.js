"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSellerLimiter = exports.applyLimiter = void 0;
const createLimiter_1 = require("../../utils/createLimiter");
exports.applyLimiter = (0, createLimiter_1.createLimiter)(3, 60 * 60 * 1000, "Too many seller applications, please try again later.");
exports.updateSellerLimiter = (0, createLimiter_1.createLimiter)(8, 15 * 60 * 1000, "Too many requests please try again.");
