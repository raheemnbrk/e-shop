"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewController = void 0;
const reviewServices_1 = require("./reviewServices");
const reviewValidations_1 = require("../../shared/validations/reviewValidations");
const addReviewController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const input = reviewValidations_1.addReviewSchema.parse(req.body);
        const { message } = await (0, reviewServices_1.addReviewServices)(userId, productId, input);
        return res.status(201).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.addReviewController = addReviewController;
