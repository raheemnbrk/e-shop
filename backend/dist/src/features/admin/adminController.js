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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderController = exports.updateOrderStatusController = exports.getCustomerProfileController = exports.changeRoleController = exports.getAllSellersController = exports.deleteUserController = exports.getAllUsersController = exports.rejectSellerController = exports.approveSellerController = void 0;
const adminServices = __importStar(require("./adminServices"));
const adminValidation_1 = require("../../shared/validations/adminValidation");
const apiError_1 = require("../../shared/utils/apiError");
const approveSellerController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { message } = await adminServices.approveSellerServices(userId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.approveSellerController = approveSellerController;
const rejectSellerController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { message } = await adminServices.rejectSellerServices(userId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.rejectSellerController = rejectSellerController;
const getAllUsersController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const input = adminValidation_1.userQuerySchema.parse(req.query);
        const { users, pagination } = await adminServices.getAllUsersService(id, input);
        return res.status(200).json({ success: true, users, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllUsersController = getAllUsersController;
const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { message } = await adminServices.deleteUserService(id);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUserController = deleteUserController;
const getAllSellersController = async (req, res, next) => {
    try {
        const input = adminValidation_1.sellerQuerySchema.parse(req.query);
        const { sellers, pagination } = await adminServices.getAllSellersService(input);
        return res.status(200).json({ success: true, sellers, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllSellersController = getAllSellersController;
const changeRoleController = async (req, res, next) => {
    try {
        const { role } = req.body;
        const { id } = req.params;
        if (!id)
            throw new apiError_1.ApiError(400, "You must select a user.");
        if (!role)
            throw new apiError_1.ApiError(400, "You must select a role");
        const { message } = await adminServices.changeRoleService(id, role);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.changeRoleController = changeRoleController;
const getCustomerProfileController = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await adminServices.getCustomerProfileService(userId);
        return res.status(200).json({ success: true, result });
    }
    catch (err) {
        next(err);
    }
};
exports.getCustomerProfileController = getCustomerProfileController;
const updateOrderStatusController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const input = adminValidation_1.updateOrderStatusSchema.parse(req.body);
        const { message } = await adminServices.updateOrderStatusService(id, input);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.updateOrderStatusController = updateOrderStatusController;
const getOrderController = async (req, res, next) => {
    try {
        const { orderNumber } = req.params;
        const order = await adminServices.getOrderService(orderNumber);
        return res.status(200).json({ success: true, order });
    }
    catch (err) {
        next(err);
    }
};
exports.getOrderController = getOrderController;
