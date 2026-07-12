import prisma from "../../shared/config/prisma";
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
  search?: string,
  filter?: string,
) => {
  const orderBy =
    filter === "lower price"
      ? { price: "asc" as const }
      : filter === "higher price"
        ? { price: "desc" as const }
        : filter === "name"
          ? { name: "asc" as const }
          : { createdAt: "desc" as const };
  const products = await prisma.product.findMany({
    where: {
      available: true,
      ...(search && { name: { contains: search, mode: "insensitive" } }),
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
    orderBy,
  });

  return products;
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
