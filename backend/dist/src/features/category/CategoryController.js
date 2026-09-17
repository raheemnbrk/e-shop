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
exports.updateCategoryController = exports.deleteCategoryController = exports.getCategoryBySlugController = exports.getCategoriesController = exports.createCategoryController = void 0;
const categoryValidation_1 = require("../../shared/validations/categoryValidation");
const categoryServices = __importStar(require("./categoryServices"));
const createCategoryController = async (req, res, next) => {
    try {
        const input = categoryValidation_1.addCategorySchema.parse(req.body);
        const file = req.file;
        const { message } = await categoryServices.addCategoryServices(input, file);
        return res.status(201).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.createCategoryController = createCategoryController;
const getCategoriesController = async (req, res, next) => {
    try {
        const categories = await categoryServices.getAllCategoriesServices();
        return res.status(200).json({ success: true, categories });
    }
    catch (err) {
        next(err);
    }
};
exports.getCategoriesController = getCategoriesController;
const getCategoryBySlugController = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const category = await categoryServices.getCategoryBySlugServices(slug);
        return res.status(200).json({ success: true, category });
    }
    catch (err) {
        next(err);
    }
};
exports.getCategoryBySlugController = getCategoryBySlugController;
const deleteCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { message } = await categoryServices.deleteCategoryServices(id);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteCategoryController = deleteCategoryController;
const updateCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const input = categoryValidation_1.updateCategorySchema.parse(req.body);
        const file = req.file;
        const { message } = await categoryServices.updateCategoryService(id, input, file);
        return res.status(200).json({ success: true, message });
    }
    catch (err) {
        next(err);
    }
};
exports.updateCategoryController = updateCategoryController;
