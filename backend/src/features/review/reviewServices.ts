import prisma from "../../shared/config/prisma";
import { addReviewInput } from "../../shared/types/productTypes";
import { ApiError } from "../../shared/utils/apiError";

export const addReviewServices = async (
  userId: string,
  productId: string,
  input: addReviewInput,
) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new ApiError(404, "Product not found.");

  const existingReview = await prisma.review.findFirst({
    where: { userId, productId },
  });
  if (existingReview)
    throw new ApiError(404, "You already reviewed this product.");

  await prisma.review.create({
    data: { ...input, userId, productId },
  });

  return { message: "Review submitted successfully." };
};
