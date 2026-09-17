"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const apiError_1 = require("../../utils/apiError");
const jwt_1 = require("../../utils/jwt");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            throw new apiError_1.ApiError(401, "Unauthorized  Access , please login.");
        const token = authHeader.split(" ")[1];
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.user = payload;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authenticate = authenticate;
