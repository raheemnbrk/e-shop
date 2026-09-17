"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiError_1 = require("../utils/apiError");
const ioredis_1 = require("ioredis");
const zod_1 = require("zod");
const errorHandler = async (err, req, res, next) => {
    if (err instanceof apiError_1.ApiError) {
        console.log("Api Error : ", err.message);
        return res
            .status(err.status)
            .json({ success: false, message: err.message });
    }
    if (err instanceof ioredis_1.ReplyError) {
        console.log("Redis error: ", err.message);
        return res.status(503).json({ success: false, message: err.message });
    }
    if (err instanceof zod_1.ZodError) {
        console.log("Validation Errors:", err.issues.map((issue) => issue.message));
        return res.status(400).json({
            success: false,
            errors: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }
    console.log("Error message : ", err.message);
    return res.status(500).json({ success: false, message: err.message });
};
exports.errorHandler = errorHandler;
