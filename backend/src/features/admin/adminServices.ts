import prisma from "../../shared/config/prisma";
import { ApiError } from "../../shared/utils/apiError";
import { sellerQueryInput, userQueryInput } from "../../shared/types/adminType";

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
  const skip = (page - 1) * limit;

  const where = {
    id: { not: id },
    ...(role && { role }),
    ...(search && {
      OR: [
        {
          firstName: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        ...(search.includes(" ")
          ? [
              {
                AND: [
                  {
                    firstName: {
                      contains: search.split(/\s+/)[0],
                      mode: "insensitive" as const,
                    },
                  },
                  {
                    lastName: {
                      contains: search.split(/\s+/).slice(1).join(" "),
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

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.delete({ where: { id } });

  if (!user) throw new ApiError(404, "User not found");

  return {
    message: "User deleted successfully.",
  };
};

export const getAllSellersService = async (input: sellerQueryInput) => {
  const { search, page, status } = input;

  const limit = 10;
  const skip = (page - 1) * limit;

  const where = {
    ...(status && { status }),

    ...(search && {
      OR: [
        {
          storeName: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          user: {
            firstName: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        },
        {
          user: {
            lastName: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        },

        ...(search.includes(" ")
          ? [
              {
                user: {
                  AND: [
                    {
                      firstName: {
                        contains: search.split(/\s+/)[0],
                        mode: "insensitive" as const,
                      },
                    },
                    {
                      lastName: {
                        contains: search.split(/\s+/).slice(1).join(" "),
                        mode: "insensitive" as const,
                      },
                    },
                  ],
                },
              },
            ]
          : []),
      ],
    }),
  };

  const [sellers, totalSellers] = await Promise.all([
    prisma.seller.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        user: {
          createdAt: "desc",
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            phoneNumber : true ,
            createdAt: true,
          },
        },
      },
    }),

    prisma.seller.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(totalSellers / limit);

  return {
    sellers: sellers.map(({ user, ...seller }) => ({
      ...user,
      Seller: seller,
    })),
    pagination: {
      currentPage: page,
      totalPages,
      totalSellers,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
