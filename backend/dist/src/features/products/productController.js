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
exports.getHomePageDataControllers = exports.adminDeleteProductController = exports.getAdminProductsController = exports.getSellerProductsController = exports.getRelatedProductsController = exports.toggleAvailabilityController = exports.updateProductController = exports.getSingleProductController = exports.deleteProductController = exports.getAllProductsController = exports.createProductController = void 0;
const productServices = __importStar(require("./productServices"));
const sellerValidations_1 = require("../../shared/validations/sellerValidations");
const apiError_1 = require("../../shared/utils/apiError");
const productValidations_1 = require("../../shared/validations/productValidations");
const adminValidation_1 = require("../../shared/validations/adminValidation");
const createProductController = async (req, res, next) => {
    try {
        const sellerId = req.seller.id;
        console.log(req.body);
        const input = sellerValidations_1.createProductSchema.parse({
            ...req.body,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
        });
        const files = req.files;
        if (!files || files.length === 0)
            throw new apiError_1.ApiError(400, "At least one image is required.");
        const { message } = await productServices.createProductService(sellerId, input, files);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.createProductController = createProductController;
const getAllProductsController = async (req, res, next) => {
    try {
        const input = productValidations_1.productQuerySchema.parse(req.query);
        const { products, pagination } = await productServices.getAllProductsService(input);
        return res.status(200).json({ success: true, products, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllProductsController = getAllProductsController;
const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sellerId = req.seller.id;
        const { message } = await productServices.deleteProductService(id, sellerId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProductController = deleteProductController;
const getSingleProductController = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const product = await productServices.getSingleProductServices(slug);
        return res.status(200).json({ success: true, product });
    }
    catch (err) {
        next(err);
    }
};
exports.getSingleProductController = getSingleProductController;
const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sellerId = req.seller.id;
        const input = sellerValidations_1.updateProductSchema.parse({
            ...req.body,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
        });
        const files = req.files;
        const { message } = await productServices.updateProductServices(id, sellerId, input, files);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProductController = updateProductController;
const toggleAvailabilityController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sellerId = req.seller.id;
        const { message } = await productServices.toggleAvailabilityServices(id, sellerId);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.toggleAvailabilityController = toggleAvailabilityController;
const getRelatedProductsController = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const relatedProducts = await productServices.getRelatedProductsService(slug);
        return res.status(200).json({ success: true, relatedProducts });
    }
    catch (err) {
        next(err);
    }
};
exports.getRelatedProductsController = getRelatedProductsController;
const getSellerProductsController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const input = adminValidation_1.productQuerySchema.parse(req.query);
        const { products, pagination } = await productServices.getSellerProductsService(id, input);
        return res.status(200).json({ success: true, products, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getSellerProductsController = getSellerProductsController;
const getAdminProductsController = async (req, res, next) => {
    try {
        const input = adminValidation_1.productQuerySchema.parse(req.query);
        const { pagination, products } = await productServices.getAdminProductsService(input);
        return res.json({ success: true, products, pagination });
    }
    catch (err) {
        next(err);
    }
};
exports.getAdminProductsController = getAdminProductsController;
const adminDeleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { message } = await productServices.adminDeleteProductService(id);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.adminDeleteProductController = adminDeleteProductController;
const getHomePageDataControllers = async (req, res, next) => {
    try {
        const { bestDeals, categoriesWithCount, newArrivals, topSelling } = await productServices.getHomePageDataService();
        return res
            .status(200)
            .json({ bestDeals, categoriesWithCount, newArrivals, topSelling });
    }
    catch (err) {
        next(err);
    }
};
exports.getHomePageDataControllers = getHomePageDataControllers;
