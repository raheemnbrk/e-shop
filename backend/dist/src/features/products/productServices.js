"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomePageDataService = exports.adminDeleteProductService = exports.getAdminProductsService = exports.getSellerProductsService = exports.getRelatedProductsService = exports.toggleAvailabilityServices = exports.updateProductServices = exports.getSingleProductServices = exports.deleteProductService = exports.getAllProductsService = exports.createProductService = void 0;
const prisma_1 = __importDefault(require("../../shared/config/prisma"));
const apiError_1 = require("../../shared/utils/apiError");
const verifySlug_1 = require("../../shared/utils/logic/verifySlug");
const uploadImage_1 = require("../../shared/utils/uploadImage");
const slugify_1 = __importDefault(require("slugify"));
const getCategoryTreeIds = async (slug) => {
    const root = await prisma_1.default.category.findUnique({
        where: { slug },
        select: { id: true },
    });
    if (!root)
        throw new apiError_1.ApiError(404, "Category not found.");
    const categories = await prisma_1.default.category.findMany({
        select: { id: true, parentId: true },
    });
    const categoryIds = new Set([root.id]);
    let foundDescendant = true;
    while (foundDescendant) {
        foundDescendant = false;
        for (const category of categories) {
            if (category.parentId &&
                categoryIds.has(category.parentId) &&
                !categoryIds.has(category.id)) {
                categoryIds.add(category.id);
                foundDescendant = true;
            }
        }
    }
    return [...categoryIds];
};
const createProductService = async (sellerId, input, files) => {
    let slug = (0, slugify_1.default)(input.name, { lower: true, strict: true });
    slug = await (0, verifySlug_1.takenSlug)(slug, "product");
    const images = await Promise.all(files.map(async (file) => {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        return await (0, uploadImage_1.uploadImage)(base64, "e-shop/products");
    }));
    await prisma_1.default.product.create({
        data: {
            ...input,
            slug,
            images,
            sellerId,
        },
    });
    return { message: "Product created successfully." };
};
exports.createProductService = createProductService;
const getAllProductsService = async (input) => {
    const { category, search, maxPrice, minPrice, sortBy, page } = input;
    const limit = 12;
    const skip = (page - 1) * limit;
    let categoryIds;
    if (category) {
        const categoryData = await prisma_1.default.category.findUnique({
            where: { slug: category },
            select: { id: true, children: { select: { id: true } } },
        });
        if (!categoryData) {
            categoryIds = [];
        }
        else {
            categoryIds = [
                categoryData.id,
                ...categoryData.children.map((child) => child.id),
            ];
        }
    }
    const price = minPrice !== undefined || maxPrice !== undefined
        ? {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
        }
        : undefined;
    const where = {
        ...(search && { name: { contains: search, mode: "insensitive" } }),
        ...(categoryIds && { categoryId: { in: categoryIds } }),
        ...(price && { price }),
    };
    const orderBy = sortBy === "highest"
        ? { price: "desc" }
        : sortBy === "lowest"
            ? { price: "asc" }
            : sortBy === "discount"
                ? { discount: "desc" }
                : { createdAt: "desc" };
    const [products, total] = await Promise.all([
        prisma_1.default.product.findMany({
            where,
            select: {
                id: true,
                name: true,
                slug: true,
                price: true,
                discount: true,
                images: true,
                available: true,
                stock: true,
                reviews: { select: { rating: true } },
                category: { select: { name: true, slug: true } },
            },
            orderBy,
            skip,
            take: limit,
        }),
        prisma_1.default.product.count({ where }),
    ]);
    return {
        products,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            hasNextPage: page < Math.ceil(total / limit),
            limit,
        },
    };
};
exports.getAllProductsService = getAllProductsService;
const deleteProductService = async (id, sellerId) => {
    const product = await prisma_1.default.product.findFirst({ where: { id, sellerId } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    await prisma_1.default.product.delete({ where: { id } });
    return { message: "Product deleted successfully." };
};
exports.deleteProductService = deleteProductService;
const getSingleProductServices = async (slug) => {
    const product = await prisma_1.default.product.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            discount: true,
            stock: true,
            images: true,
            description: true,
            available: true,
            createdAt: true,
            category: { select: { name: true, slug: true, image: true } },
            seller: { select: { storeName: true, storeSlug: true, logo: true } },
            reviews: {
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    createdAt: true,
                    user: { select: { firstName: true, lastName: true, image: true } },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    return product;
};
exports.getSingleProductServices = getSingleProductServices;
const updateProductServices = async (id, sellerId, input, files) => {
    const product = await prisma_1.default.product.findFirst({ where: { id, sellerId } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    let images = product.images;
    if (files && files.length > 0) {
        const newImages = await Promise.all(files.map(async (file) => {
            const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            return await (0, uploadImage_1.uploadImage)(base64, "e-shop/products");
        }));
        images = [...product.images, ...newImages];
    }
    let slug = product.slug;
    if (input.name && product.name !== input.name) {
        slug = (0, slugify_1.default)(input.name, { lower: true, strict: true });
        slug = await (0, verifySlug_1.takenSlug)(slug, "product", id);
    }
    await prisma_1.default.product.update({
        where: { id, sellerId },
        data: { ...input, slug, images },
    });
    return { message: "Product updated successfully." };
};
exports.updateProductServices = updateProductServices;
const toggleAvailabilityServices = async (id, sellerId) => {
    const product = await prisma_1.default.product.findFirst({ where: { id, sellerId } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    const available = product.available;
    await prisma_1.default.product.update({
        where: { id, sellerId },
        data: { available: !product.available },
    });
    const message = available
        ? "Your product is not available now."
        : "You product is available now.";
    return { message };
};
exports.toggleAvailabilityServices = toggleAvailabilityServices;
const getRelatedProductsService = async (slug) => {
    const product = await prisma_1.default.product.findUnique({ where: { slug } });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    const relatedProducts = await prisma_1.default.product.findMany({
        where: {
            categoryId: product.categoryId,
            NOT: { id: product.id },
            available: true,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            discount: true,
            images: true,
            stock: true,
            createdAt: true,
            available: true,
            reviews: { select: { rating: true } },
            category: { select: { name: true, slug: true, image: true } },
        },
        take: 5,
    });
    return relatedProducts;
};
exports.getRelatedProductsService = getRelatedProductsService;
const getSellerProductsService = async (id, input) => {
    const { page, category, search, sortBy, status, stock } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const categoryIds = category && category !== "all"
        ? await getCategoryTreeIds(category)
        : undefined;
    const where = {
        sellerId: id,
        ...(search && {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ],
        }),
        ...(categoryIds && { categoryId: { in: categoryIds } }),
        ...(status && status !== "all" && { available: status === "available" }),
        ...(stock === "in" && { stock: { gt: 0 } }),
        ...(stock === "low" && { stock: { gt: 0, lte: 10 } }),
        ...(stock === "out" && { stock: 0 }),
    };
    const orderBy = sortBy === "oldest"
        ? { createdAt: "asc" }
        : sortBy === "high"
            ? { price: "desc" }
            : sortBy === "low"
                ? { price: "asc" }
                : sortBy === "top"
                    ? { orderItems: { _count: "desc" } }
                    : { createdAt: "desc" };
    const [products, total] = await Promise.all([
        prisma_1.default.product.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                category: true,
                seller: true,
                reviews: {
                    select: { id: true },
                },
            },
        }),
        prisma_1.default.product.count({
            where,
        }),
    ]);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return {
        products,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getSellerProductsService = getSellerProductsService;
const getAdminProductsService = async (input) => {
    const { page, category, search, sortBy, searchBy, stock } = input;
    const limit = 10;
    const skip = (page - 1) * limit;
    const categoryIds = category && category !== "all"
        ? await getCategoryTreeIds(category)
        : undefined;
    const where = {
        ...(search &&
            searchBy === "seller" && {
            seller: {
                storeName: { contains: search, mode: "insensitive" },
            },
        }),
        ...(search &&
            searchBy !== "seller" && {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ],
        }),
        ...(categoryIds && { categoryId: { in: categoryIds } }),
        ...(stock === "in" && { stock: { gt: 0 } }),
        ...(stock === "low" && { stock: { gt: 0, lte: 10 } }),
        ...(stock === "out" && { stock: 0 }),
    };
    const orderBy = sortBy === "oldest"
        ? { createdAt: "asc" }
        : sortBy === "high"
            ? { price: "desc" }
            : sortBy === "low"
                ? { price: "asc" }
                : sortBy === "top"
                    ? { orderItems: { _count: "desc" } }
                    : { createdAt: "desc" };
    const [products, total] = await Promise.all([
        prisma_1.default.product.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                category: true,
                seller: true,
                reviews: {
                    select: { id: true },
                },
            },
        }),
        prisma_1.default.product.count({
            where,
        }),
    ]);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return {
        products,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getAdminProductsService = getAdminProductsService;
const adminDeleteProductService = async (id) => {
    const product = await prisma_1.default.product.findUnique({
        where: { id },
        select: { id: true },
    });
    if (!product)
        throw new apiError_1.ApiError(404, "Product not found.");
    await prisma_1.default.product.delete({ where: { id } });
    return { message: "Product deleted successfully." };
};
exports.adminDeleteProductService = adminDeleteProductService;
const getHomePageDataService = async () => {
    const [newArrivals, bestDeals, topSellingItems, categories] = await Promise.all([
        prisma_1.default.product.findMany({
            where: { available: true },
            include: { category: true, reviews: true },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
        prisma_1.default.product.findMany({
            where: { discount: { gt: 0 }, available: true },
            include: { category: true, reviews: true },
            orderBy: { discount: "desc" },
            take: 5,
        }),
        prisma_1.default.orderItem.groupBy({
            by: ["productId"],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5,
        }),
        prisma_1.default.category.findMany({
            where: { parentId: null },
            include: {
                children: {
                    include: {
                        _count: {
                            select: { products: true },
                        },
                    },
                },
                _count: {
                    select: { products: true },
                },
            },
        }),
    ]);
    const topSellingIds = topSellingItems
        .map((item) => item.productId)
        .filter(Boolean);
    const topSelling = await prisma_1.default.product.findMany({
        where: { id: { in: topSellingIds }, available: true },
        include: { category: true, reviews: true },
    });
    const sortedTopSelling = topSellingIds
        .map((id) => topSelling.find((p) => p.id === id))
        .filter(Boolean);
    const categoriesWithCount = categories.map((category) => {
        const subCategoryProductCount = category.children.reduce((acc, child) => acc + child._count.products, 0);
        return {
            ...category,
            productCount: category._count.products + subCategoryProductCount,
        };
    });
    return {
        newArrivals,
        bestDeals,
        topSelling: sortedTopSelling,
        categoriesWithCount,
    };
};
exports.getHomePageDataService = getHomePageDataService;
