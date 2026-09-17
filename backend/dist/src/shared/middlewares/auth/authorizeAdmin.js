"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = void 0;
const apiError_1 = require("../../utils/apiError");
const authorizeAdmin = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user || user.role !== "ADMIN")
            throw new apiError_1.ApiError(401, "Access denied.");
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authorizeAdmin = authorizeAdmin;
