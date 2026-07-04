import prisma from "../../shared/config/prisma";
import { applySellerInput } from "../../shared/types/sellerTypes";
import { ApiError } from "../../shared/utils/apiError";
import { uploadImage } from "../../shared/utils/uploadImage";

export const applySellerService = async (
  userId: string,
  input: applySellerInput,
  file: Express.Multer.File,
): Promise<{ message: string }> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(404, "User not found.");

  if (user.role === "ADMIN")
    throw new ApiError(403, "Admins can not apply as sellers.");

  const existingApplications = await prisma.seller.findUnique({
    where: { userId },
  });

  if (existingApplications) {
    if (existingApplications.status === "PENDING")
      throw new ApiError(400, "You already have a pending application.");
    if (existingApplications.status === "APPROVED")
      throw new ApiError(400, "you are already an approved seller");
    if (existingApplications.status === "REJECTED") {
      const takenSlug = await prisma.seller.findFirst({
        where: { storeSlug: input.storeSlug },
      });

      if (takenSlug) throw new ApiError(400, "this store slug is taken.");

      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const logoUrl = await uploadImage(base64, "e-shop/sellers");

      await prisma.seller.update({
        where: { userId },
        data: { userId, ...input, logo: logoUrl },
      });

      return {
        message: "Your seller application has been submitted successfully.",
      };
    }
  }

  const takenSlug = await prisma.seller.findFirst({
    where: { storeSlug: input.storeSlug, NOT: { userId } },
  });

  if (takenSlug) throw new ApiError(400, "this store slug is taken.");

  const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const logoURl = await uploadImage(base64, "e-shop/sellers");

  await prisma.seller.create({ data: { userId, ...input, logo: logoURl } });
  return {
    message: "Your seller application has been submitted successfully.",
  };
};
