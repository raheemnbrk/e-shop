import { Prisma } from "../../generated/prisma";
import prisma from "../../shared/config/prisma";
import {
  couponQueryInput,
  createCouponInput,
  updateCouponInput,
} from "../../shared/types/couponTypes";
import { ApiError } from "../../shared/utils/apiError";

export const createCouponService = async (input: createCouponInput) => {
  const existing = await prisma.coupon.findFirst({
    where: { code: input.code },
  });

  if (existing) throw new ApiError(400, "Coupon is already existing");

  await prisma.coupon.create({
    data: {
      code: input.code,
      discount: input.discount,
      expiresAt: input.expiresAt,
      maxUses: input.maxUses,
      type: input.type,
      isActive: input.isActive,
    },
  });

  return { message: "Coupon created successfully." };
};

export const updateCouponService = async (
  id: string,
  input: updateCouponInput,
) => {
  const coupon = await prisma.coupon.findUnique({
    where: { id },
  });

  if (!coupon) throw new ApiError(404, "Coupon not found");

  await prisma.coupon.update({ where: { id }, data: { ...input } });

  return { message: "Coupon updated successfully." };
};

export const toggleCouponService = async (id: string) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });

  if (!coupon) throw new ApiError(404, "Coupon not found.");

  await prisma.coupon.update({
    where: { id },
    data: { isActive: !coupon.isActive },
  });

  return {
    message: `Coupon is ${coupon.isActive ? "deactivated" : "activated"} successfully.`,
  };
};

export const getALlCouponsService = async (input: couponQueryInput) => {
  const { page, search, sortBy, status, type } = input;

  const limit = 10;
  const skip = (page - 1) * limit;

  const where: Prisma.CouponWhereInput = {
    ...(search && { name: { contains: search, mode: "insensitive" as const } }),
    ...(status && status === "active" && { isActive: true }),
    ...(status && status === "inactive" && { isActive: false }),
    ...(type && type === "FIXED" && { type: "FIXED" }),
    ...(type && type === "PERCENTAGE" && { type: "PERCENTAGE" }),
  };

  let orderBy: Prisma.CouponOrderByWithRelationInput = {
    createdAt: "desc",
  };

  orderBy =
    sortBy === "newest"
      ? { createdAt: "desc" }
      : sortBy === "oldest"
        ? { createdAt: "asc" }
        : sortBy === "high discount"
          ? { discount: "desc" }
          : sortBy === "low discount"
            ? { discount: "asc" }
            : {};

  const [coupons, total] = await Promise.all([
    prisma.coupon.findMany({ where, orderBy, skip, take: limit }),
    prisma.coupon.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    coupons,
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
