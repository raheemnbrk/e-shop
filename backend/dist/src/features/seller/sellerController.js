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
exports.getOrderController = exports.updateOrderStatusController = exports.getSellerProfileForAdminController = exports.getSellerCustomersController = exports.updateSellerController = exports.applySellerController = void 0;
const sellerValidations_1 = require("../../shared/validations/sellerValidations");
const apiError_1 = require("../../shared/utils/apiError");
const sellerServices = __importStar(require("./sellerService"));
const applySellerController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const input = sellerValidations_1.applySellerSchema.parse(req.body);
        const file = req.file;
        if (!file)
            throw new apiError_1.ApiError(400, "The store logo is required.");
        const { message } = await sellerServices.applySellerService(userId, input, file);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.applySellerController = applySellerController;
const updateSellerController = async (req, res, next) => {
    try {
        const sellerId = req.seller.id;
        const input = sellerValidations_1.updateSellerSchema.parse(req.body);
        const file = req.file;
        const seller = await sellerServices.updateSellerServices(sellerId, input, file);
        return res.status(200).json({ success: true, seller });
    }
    catch (err) {
        next(err);
    }
};
exports.updateSellerController = updateSellerController;
const getSellerCustomersController = async (req, res, next) => {
    try {
        const sellerId = req.seller.id;
        const input = sellerValidations_1.sellerCustomersQuerySchema.parse(req.query);
        const { customers, pagination } = await sellerServices.getSellerCustomersServices(sellerId, input);
        return res.json({ success: true, customers, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getSellerCustomersController = getSellerCustomersController;
const getSellerProfileForAdminController = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { seller, stats } = await sellerServices.getSellerProfileForAdminService(slug);
        return res.status(200).json({ success: true, seller, stats });
    }
    catch (err) {
        next(err);
    }
};
exports.getSellerProfileForAdminController = getSellerProfileForAdminController;
const updateOrderStatusController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sellerId = req.seller.id;
        const input = sellerValidations_1.updateOrderStatusSchema.parse(req.body);
        const { message } = await sellerServices.updateOrderStatusService(id, sellerId, input);
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
        const sellerId = req.seller.id;
        if (!orderNumber) {
            return res.status(400).json({ message: "Order number is required." });
        }
        const order = await sellerServices.getOrderService(sellerId, orderNumber);
        return res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
};
exports.getOrderController = getOrderController;
