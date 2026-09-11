import prisma from "../../shared/config/prisma";
import {
  addCategoryInput,
  updateCategoryInput,
} from "../../shared/types/categoryTypes";
import { ApiError } from "../../shared/utils/apiError";
import { takenSlug } from "../../shared/utils/logic/verifySlug";
import { uploadImage } from "../../shared/utils/uploadImage";
import slugify from "slugify";

export const addCategoryServices = async (
  input: addCategoryInput,
  file?: Express.Multer.File,
) => {
  let slug: string = slugify(input.name, { lower: true, strict: true });

  slug = await takenSlug(slug, "category");

  let image: string | undefined;

  if (file) {
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    image = await uploadImage(base64, "e-shop/categories");
  }

  await prisma.category.create({
    data: {
      name: input.name,
      parentId: input.parentId ?? null,
      slug,
      image,
    },
  });

  return { message: "Category created successfully." };
};

export const getAllCategoriesServices = async () => {
  const categories = await prisma.category.findMany({
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
    const totalProducts =
      category._count.products +
      category.children.reduce(
        (total, child) => total + child._count.products,
        0,
      );

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

export const getCategoryBySlugServices = async (slug: string) => {
  const category = await prisma.category.findUnique({
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

  if (!category) throw new ApiError(404, "Category not found.");

  return {
    ...category,
    productCount: category._count.products,
    children: category.children.map((child) => ({
      ...child,
      productCount: child._count.products,
    })),
  };
};

export const deleteCategoryServices = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Category not found.");

  await prisma.category.delete({ where: { id } });
  return { message: "Category deleted successfully." };
};

export const updateCategoryService = async (
  id: string,
  input: updateCategoryInput,
  file?: Express.Multer.File,
) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new ApiError(404, "Category not found.");

  let image = category.image;
  if (file) {
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    image = await uploadImage(base64, "e-shop/categories");
  }

  let slug: string = category.slug;
  if (input.name && input.name !== category.name) {
    slug = slugify(input.name, { lower: true, strict: true });
    slug = await takenSlug(slug, "category", id);
  }

  await prisma.category.update({
    where: { id },
    data: { ...input, slug, image },
  });

  return { message: "Category updated successfully." };
};
