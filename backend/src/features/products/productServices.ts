import { Prisma } from "../../generated/prisma";
import prisma from "../../shared/config/prisma";
import { productQueryInput as customerProductQueryInput } from "../../shared/types/productTypes";
import { productQueryInput } from "../../shared/types/adminType";
import {
  createProductInput,
  updateProductInput,
} from "../../shared/types/sellerTypes";
import { ApiError } from "../../shared/utils/apiError";
import { takenSlug } from "../../shared/utils/logic/verifySlug";
import { uploadImage } from "../../shared/utils/uploadImage";
import slugify from "slugify";

export const createProductService = async (
  sellerId: string,
  input: createProductInput,
  files: Express.Multer.File[],
) => {
  let slug: string = slugify(input.name, { lower: true, strict: true });
  slug = await takenSlug(slug, "product");

  const images = await Promise.all(
    files.map(async (file) => {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      return await uploadImage(base64, "e-shop/products");
    }),
  );

  await prisma.product.create({
    data: {
      ...input,
      slug,
      images,
      sellerId,
    },
  });

  return { message: "Product created successfully." };
};

export const getAllProductsService = async (
  input: customerProductQueryInput,
) => {
  const { category, search, maxPrice, minPrice, sortBy, page } = input;

  const limit = 12;
  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    ...(search && { name: { contains: search, mode: "insensitive" as const } }),
    ...(category && { category: { slug: category } }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sortBy === "highest"
      ? { price: "desc" }
      : sortBy === "lowest"
        ? { price: "asc" }
        : sortBy === "discount"
          ? { discount: "desc" }
          : { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
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
    prisma.product.count({ where }),
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

export const deleteProductService = async (id: string, sellerId: string) => {
  const product = await prisma.product.findFirst({ where: { id, sellerId } });
  if (!product) throw new ApiError(404, "Product not found.");

  await prisma.product.delete({ where: { id } });

  return { message: "Product deleted successfully." };
};

export const getSingleProductServices = async (slug: string) => {
  const product = await prisma.product.findUnique({
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
  if (!product) throw new ApiError(404, "Product not found.");

  return product;
};

export const updateProductServices = async (
  id: string,
  sellerId: string,
  input: updateProductInput,
  files?: Express.Multer.File[],
) => {
  const product = await prisma.product.findFirst({ where: { id, sellerId } });
  if (!product) throw new ApiError(404, "Product not found.");

  let images = product.images;
  if (files && files.length > 0) {
    const newImages = await Promise.all(
      files.map(async (file) => {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        return await uploadImage(base64, "e-shop/products");
      }),
    );
    images = [...product.images, ...newImages];
  }

  let slug: string = product.slug;
  if (input.name && product.name !== input.name) {
    slug = slugify(input.name, { lower: true, strict: true });
    slug = await takenSlug(slug, "product", id);
  }

  await prisma.product.update({
    where: { id, sellerId },
    data: { ...input, slug, images },
  });

  return { message: "Product updated successfully." };
};

export const toggleAvailabilityServices = async (
  id: string,
  sellerId: string,
) => {
  const product = await prisma.product.findFirst({ where: { id, sellerId } });
  if (!product) throw new ApiError(404, "Product not found.");

  const available = product.available;

  await prisma.product.update({
    where: { id, sellerId },
    data: { available: !product.available },
  });

  const message = available
    ? "Your product is not available now."
    : "You product is available now.";

  return { message };
};

export const getRelatedProductsService = async (slug: string) => {
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) throw new ApiError(404, "Product not found.");

  const relatedProducts = await prisma.product.findMany({
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
      available: true,
      reviews: { select: { rating: true } },
      category: { select: { name: true } },
    },
    take: 5,
  });

  return relatedProducts;
};

export const getSellerProductsService = async (
  id: string,
  input: productQueryInput,
) => {
  const { page, category, search, sortBy, status, stock } = input;
  const limit = 10;
  const skip = (page - 1) * limit;

  let categoryId: string | undefined;

  if (category && category !== "all") {
    const categoryData = await prisma.category.findUnique({
      where: { slug: category },
      select: { id: true },
    });

    if (!categoryData) throw new ApiError(404, "Category not found.");
    categoryId = categoryData.id;
  }

  const where: Prisma.ProductWhereInput = {
    sellerId: id,
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(category && category !== "all" && { categoryId }),
    ...(status && status !== "all" && { available: status === "available" }),
    ...(stock === "in" && { stock: { gt: 0 } }),
    ...(stock === "low" && { stock: { gt: 0, lte: 10 } }),
    ...(stock === "out" && { stock: 0 }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sortBy === "oldest"
      ? { createdAt: "asc" }
      : sortBy === "high"
        ? { price: "desc" }
        : sortBy === "low"
          ? { price: "asc" }
          : { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
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
    prisma.product.count({
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

export const getAdminProductsService = async (input: productQueryInput) => {
  const { page, category, search, sortBy, searchBy, stock } = input;

  const limit = 10;
  const skip = (page - 1) * limit;

  let categoryId: string | undefined;

  if (category && category !== "all") {
    const categoryData = await prisma.category.findUnique({
      where: { slug: category },
      select: { id: true },
    });

    if (!categoryData) throw new ApiError(404, "Category not found.");
    categoryId = categoryData.id;
  }

  const where: Prisma.ProductWhereInput = {
    available: true,
    ...(search &&
      searchBy === "seller" && {
        seller: {
          storeName: { contains: search, mode: "insensitive" as const },
        },
      }),

    ...(search &&
      searchBy !== "seller" && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    ...(category && category !== "all" && { categoryId }),
    ...(stock === "in" && { stock: { gt: 0 } }),
    ...(stock === "low" && { stock: { gt: 0, lte: 10 } }),
    ...(stock === "out" && { stock: 0 }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sortBy === "oldest"
      ? { createdAt: "asc" }
      : sortBy === "high"
        ? { price: "desc" }
        : sortBy === "low"
          ? { price: "asc" }
          : { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
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
    prisma.product.count({
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

export const adminDeleteProductService = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!product) throw new ApiError(404, "Product not found.");

  await prisma.product.delete({ where: { id } });

  return { message: "Product deleted successfully." };
};
