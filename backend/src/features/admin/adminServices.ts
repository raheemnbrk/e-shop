import prisma from "../../shared/config/prisma";
import { ApiError } from "../../shared/utils/apiError";
import { Role } from "../../generated/prisma";
import { userQueryInput } from "../../shared/types/adminType";

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

export const getAllUsersService = async (id: string, input: userQueryInput) => {
  const { page, search, role } = input;
  const limit = 10;
  const skip = (page - 1) * 10;
  const searchTerm = search?.trim();

  const where = {
    id: { not: id },
    ...(role && { role }),
    ...(searchTerm && {
      OR: [
        {
          firstName: {
            contains: searchTerm,
            mode: "insensitive" as const,
          },
        },
        {
          lastName: {
            contains: searchTerm,
            mode: "insensitive" as const,
          },
        },
        ...(searchTerm.includes(" ")
          ? [
              {
                AND: [
                  {
                    firstName: {
                      contains: searchTerm.split(/\s+/)[0],
                      mode: "insensitive" as const,
                    },
                  },
                  {
                    lastName: {
                      contains: searchTerm.split(/\s+/).slice(1).join(" "),
                      mode: "insensitive" as const,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    }),
  };

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      omit: { password: true },
    }),

    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    pagination: {
      currentPage: page,
      totalPages,
      totalUsers,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
