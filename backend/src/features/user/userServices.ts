import prisma from "../../shared/config/prisma";
import {
  addAddressInput,
  updateAddressInput,
  updateProfileInput,
} from "../../shared/types/userTypes";
import { ApiError } from "../../shared/utils/apiError";
import { uploadImage } from "../../shared/utils/uploadImage";

export const getMeService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
  if (!user) throw new ApiError(404, "User not found.");

  return { user };
};

export const getAllAddressesService = async (userId: string) => {
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return addresses;
};

export const addAddressService = async (
  userId: string,
  input: addAddressInput,
) => {
  if (input.isDefault) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({ data: { ...input, userId } });

  return address;
};

export const updateProfileService = async (
  id: string,
  input: updateProfileInput,
  file?: Express.Multer.File,
) => {
  let user = await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
  if (!user) throw new ApiError(404, "User not found.");

  const { firstName, lastName, phoneNumber } = input;
  let imageURl: string | undefined;
  if (file) {
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    imageURl = await uploadImage(base64, `e-shop/users`);
  }

  user = await prisma.user.update({
    where: { id },
    data: {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phoneNumber && { phoneNumber }),
      ...(imageURl && { image: imageURl }),
    },
  });

  return { user };
};

export const updateAddressService = async (
  userId: string,
  addressId: string,
  input: updateAddressInput,
) => {
  const address = await prisma.address.findFirst({
    where: { id: addressId, userId },
  });
  if (!address) throw new ApiError(404, "Address not found.");

  if (input.isDefault) {
    await prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  return await prisma.address.update({
    where: { id: addressId },
    data: input,
  });
};

export const deleteAddress = async (userId: string, addressId: string) => {
  const address = await prisma.address.findFirst({
    where: { id: addressId, userId },
  });

  if (!address) throw new ApiError(404, "Address not found.");

  await prisma.address.delete({ where: { id: addressId, userId } });

  return { message: "Address deleted successfully." };
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

export const getAllProductsService = async () => {
  const products = await prisma.product.findMany({
    where: { available: true },
    include: { category: true, seller: true },
    orderBy: { createdAt: "desc" },
  });

  return products;
};

