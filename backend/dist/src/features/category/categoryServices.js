"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryService = exports.deleteCategoryServices = exports.getCategoryBySlugServices = exports.getAllCategoriesServices = exports.addCategoryServices = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const verifySlug_1 = require("../../shared/utils/logic/verifySlug");
const uploadImage_1 = require("../../shared/utils/uploadImage");
const slugify_1 = __importDefault(require("slugify"));
const addCategoryServices = async (input, file) => {
    let slug = (0, slugify_1.default)(input.name, { lower: true, strict: true });
    slug = await (0, verifySlug_1.takenSlug)(slug, "category");
    let image;
    if (file) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        image = await (0, uploadImage_1.uploadImage)(base64, "e-shop/categories");
    }
    await prisma_1.default.category.create({
        data: {
            name: input.name,
            parentId: input.parentId ?? null,
            slug,
            image,
        },
    });
    return { message: "Category created successfully." };
};
exports.addCategoryServices = addCategoryServices;
const getAllCategoriesServices = async () => {
    const categories = await prisma_1.default.category.findMany({
        where: {
            parentId: null,
        },
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
            children: {
                include: {
                    _count: {
                        select: {
                            products: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });
    return categories.map((category) => {
        const totalProducts = category._count.products +
            category.children.reduce((total, child) => total + child._count.products, 0);
        return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            image: category.image,
            parentId: category.parentId,
            createdAt: category.createdAt,
            productCount: totalProducts,
            children: category.children.map((child) => ({
                id: child.id,
                name: child.name,
                slug: child.slug,
                image: child.image,
                parentId: category.parentId,
                createdAt: category.createdAt,
                productCount: child._count.products,
            })),
        };
    });
};
exports.getAllCategoriesServices = getAllCategoriesServices;
const getCategoryBySlugServices = async (slug) => {
    const category = await prisma_1.default.category.findUnique({
        where: { slug },
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
            children: {
                include: {
                    _count: {
                        select: {
                            products: true,
                        },
                    },
                },
            },
            products: { where: { available: true }, orderBy: { createdAt: "desc" } },
        },
    });
    if (!category)
        throw new apiError_1.ApiError(404, "Category not found.");
    return {
        ...category,
        productCount: category._count.products,
        children: category.children.map((child) => ({
            ...child,
            productCount: child._count.products,
        })),
    };
};
exports.getCategoryBySlugServices = getCategoryBySlugServices;
const deleteCategoryServices = async (id) => {
    const category = await prisma_1.default.category.findUnique({ where: { id } });
    if (!category)
        throw new apiError_1.ApiError(404, "Category not found.");
    await prisma_1.default.category.delete({ where: { id } });
    return { message: "Category deleted successfully." };
};
exports.deleteCategoryServices = deleteCategoryServices;
const updateCategoryService = async (id, input, file) => {
    const category = await prisma_1.default.category.findUnique({ where: { id } });
    if (!category)
        throw new apiError_1.ApiError(404, "Category not found.");
    let image = category.image;
    if (file) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        image = await (0, uploadImage_1.uploadImage)(base64, "e-shop/categories");
    }
    let slug = category.slug;
    if (input.name && input.name !== category.name) {
        slug = (0, slugify_1.default)(input.name, { lower: true, strict: true });
        slug = await (0, verifySlug_1.takenSlug)(slug, "category", id);
    }
    await prisma_1.default.category.update({
        where: { id },
        data: { ...input, slug, image },
    });
    return { message: "Category updated successfully." };
};
exports.updateCategoryService = updateCategoryService;
