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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeCartController = exports.updateCartController = exports.clearCartController = exports.removeItemFromCartController = exports.getAllCartItemsController = exports.addToCartController = void 0;
const cartServices = __importStar(require("./cartServices"));
const cartValidations_1 = require("../../shared/validations/cartValidations");
const apiError_1 = require("../../shared/utils/apiError");
const zod_1 = __importDefault(require("zod"));
const addToCartController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // coerce quantity to number in case client sent it as a string
        if (req.body && typeof req.body.quantity !== "number") {
            req.body.quantity = Number(req.body.quantity);
        }
        const input = cartValidations_1.addToCartSchema.parse(req.body);
        const { message } = await cartServices.addToCartServices(userId, input);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.addToCartController = addToCartController;
const getAllCartItemsController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await cartServices.getCartService(userId);
        return res.status(200).json({ success: true, cart });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllCartItemsController = getAllCartItemsController;
const removeItemFromCartController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        if (!productId)
            throw new apiError_1.ApiError(400, "You must select an item.");
        const { message } = await cartServices.removeItemFromCartService(userId, productId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.removeItemFromCartController = removeItemFromCartController;
const clearCartController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { message } = await cartServices.clearCartService(userId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.clearCartController = clearCartController;
const updateCartController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (req.body && typeof req.body.quantity !== "number") {
            req.body.quantity = Number(req.body.quantity);
        }
        const input = cartValidations_1.addToCartSchema.parse(req.body);
        const message = await cartServices.updateCartService(userId, input);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.updateCartController = updateCartController;
const mergeCartController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const mergeCartSchema = zod_1.default.object({
            items: zod_1.default.array(cartValidations_1.addToCartSchema),
        });
        if (req.body && Array.isArray(req.body.items)) {
            req.body.items = req.body.items.map((it) => ({
                ...it,
                quantity: Number(it.quantity),
            }));
            // remove invalid items (non-numeric, zero or negative quantities)
            req.body.items = req.body.items.filter((it) => Number.isFinite(it.quantity) && it.quantity >= 1);
        }
        const { items } = mergeCartSchema.parse(req.body);
        const { message } = await cartServices.mergeCartService(userId, items);
        res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.mergeCartController = mergeCartController;
