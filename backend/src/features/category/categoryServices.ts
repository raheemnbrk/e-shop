import prisma from "../../shared/config/prisma";
import { addCategoryInput } from "../../shared/types/categoryTypes";
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
    where: { parentId: null },
    include: { children: true },
    orderBy: { name: "asc" },
  });

  return categories;
};

export const getCategoryBySlugServices = async (slug: string) => {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
      products: { where: { available: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!category) throw new ApiError(404, "Category not found.");

  return category;
};
