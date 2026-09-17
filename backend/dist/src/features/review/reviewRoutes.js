"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../shared/middlewares/auth/authenticate");
const reviewController_1 = require("./reviewController");
const reviewLimiter_1 = require("../../shared/middlewares/limiters/reviewLimiter");
const reviewRouter = (0, express_1.Router)();
reviewRouter.post("/add/:productId", authenticate_1.authenticate, reviewLimiter_1.addReviewLimiter, reviewController_1.addReviewController);
exports.default = reviewRouter;
