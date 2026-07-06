import prisma from "../../shared/config/prisma";
import { addCategoryInput } from "../../shared/types/categoryTypes";
import { ApiError } from "../../shared/utils/apiError";
import slugify from "slugify";
import { takenSlug } from "../../shared/utils/logic/verifySlug";
import { uploadImage } from "../../shared/utils/uploadImage";

export const approveSellerServices = async (userId: string) => {
  const seller = await prisma.seller.findUnique({ where: { userId } });
  if (!seller) throw new ApiError(404, "Seller not found.");

  if (seller.status === "APPROVED")
    throw new ApiError(400, "The seller is already approved.");

  await prisma.$transaction([
    prisma.seller.update({
      where: { userId },
      data: { status: "APPROVED" },
    }),

    prisma.user.update({
      where: { id: userId },
      data: { role: "SELLER" },
    }),
  ]);

  return { message: "Seller approved successfully." };
};

export const rejectSellerServices = async (userId: string) => {
  const seller = await prisma.seller.findUnique({ where: { userId } });
  if (!seller) throw new ApiError(404, "Seller not found.");

  if (seller.status === "REJECTED")
    throw new ApiError(400, "The seller is already rejected.");

  await prisma.seller.update({
    where: { userId },
    data: { status: "REJECTED" },
  });

  return { message: "Seller rejected successfully." };
};

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
