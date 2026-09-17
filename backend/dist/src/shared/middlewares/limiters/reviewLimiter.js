"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewLimiter = void 0;
const createLimiter_1 = require("../../utils/createLimiter");
exports.addReviewLimiter = (0, createLimiter_1.createLimiter)(10, 60 * 60 * 1000, "Too many accounts created, please try again later.");
