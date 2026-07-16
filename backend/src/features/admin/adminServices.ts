import prisma from "../../shared/config/prisma";
import { addCategoryInput } from "../../shared/types/categoryTypes";
import { ApiError } from "../../shared/utils/apiError";
import slugify from "slugify";
import { takenSlug } from "../../shared/utils/logic/verifySlug";
import { uploadImage } from "../../shared/utils/uploadImage";
import { Role } from "../../generated/prisma";

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

export const getAllUsersService = async (id: string, role?: Role) => {
  const users = await prisma.user.findMany({
    where: { id: { not: id }, ...(role && { role }) },
    orderBy: { createdAt: "desc" },
  });

  return users;
};
