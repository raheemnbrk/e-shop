"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerStatsController = void 0;
const statsService_1 = require("./statsService");
const getCustomerStatsController = async (req, res, next) => {
    const userId = req.user.id;
    const stats = await (0, statsService_1.getCustomerStatsService)(userId);
    return res.status(200).json({ success: true, result: stats });
};
exports.getCustomerStatsController = getCustomerStatsController;
