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
exports.deleteCouponController = exports.getAllCouponsController = exports.toggleCouponController = exports.updateCouponController = exports.createCouponController = void 0;
const couponValidation_1 = require("../../shared/validations/couponValidation");
const couponServices = __importStar(require("./couponServices"));
const createCouponController = async (req, res, next) => {
    try {
        const input = couponValidation_1.createCouponSchema.parse(req.body);
        const { message } = await couponServices.createCouponService(input);
        return res.status(201).json({
            success: true,
            message,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createCouponController = createCouponController;
const updateCouponController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const input = couponValidation_1.updateCouponSchema.parse(req.body);
        const { message } = await couponServices.updateCouponService(id, input);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.updateCouponController = updateCouponController;
const toggleCouponController = async (req, res, next) => {
    const { id } = req.params;
    const { message } = await couponServices.toggleCouponService(id);
    return res.status(200).json({ success: true, message });
};
exports.toggleCouponController = toggleCouponController;
const getAllCouponsController = async (req, res, next) => {
    try {
        const input = couponValidation_1.couponQuerySchema.parse(req.query);
        const { coupons, pagination } = await couponServices.getALlCouponsService(input);
        return res.status(200).json({ success: true, coupons, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllCouponsController = getAllCouponsController;
const deleteCouponController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { message } = await couponServices.deleteCouponService(id);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteCouponController = deleteCouponController;
