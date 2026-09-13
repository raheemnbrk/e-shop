import prisma from "../../shared/config/prisma";
import { ApiError } from "../../shared/utils/apiError";
import {
  sellerQueryInput,
  updateOrderStatusInput,
  userQueryInput,
} from "../../shared/types/adminType";
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
            phoneNumber: true,
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

export const changeRoleService = async (id: string, role: Role) => {
  if (role === "SELLER") {
    throw new ApiError(
      400,
      "Seller role must be granted through the seller application flow",
    );
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role: role },
  });

  if (!user) throw new ApiError(404, "User not found.");

  return { message: "User role is updated successfully." };
};

export const getCustomerProfileService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      Seller: true,
      _count: {
        select: { orders: true },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          orderNumber: true,
          createdAt: true,
          total: true,
          status: true,
        },
      },
    },
  });

  if (!user) throw new ApiError(404, "User not found.");

  const { orders, _count, ...userData } = user;

  const paidOrders = await prisma.order.findMany({
    where: {
      userId,
      paymentStatus: "PAID",
      status: { not: "CANCELLED" },
    },
    select: { total: true },
  });

  const totalSpent = paidOrders.reduce((acc, o) => acc + o.total, 0);

  const lastOrderDate = orders[0]?.createdAt ?? null;

  const avgOrderValue =
    paidOrders.length > 0 ? totalSpent / paidOrders.length : 0;

  const cancelledOrders = await prisma.order.count({
    where: {
      userId,
      status: "CANCELLED",
    },
  });

  return {
    user: userData,
    stats: {
      totalOrders: _count.orders,
      totalSpent: Number(totalSpent.toFixed(2)),
      avgOrderValue: Number(avgOrderValue.toFixed(2)),
      lastOrderDate,
    },
    recentOrders: orders,
    cancelledOrders,
  };
};

export const updateOrderStatusService = async (
  id: string,
  input: updateOrderStatusInput,
) => {
  const { status } = input;
  const order = await prisma.order.findUnique({ where: { id } });

  if (!order) throw new ApiError(404, "Order not found.");

  if (order.status === status)
    throw new ApiError(400, `Order is already ${status}.`);

  if (order.paymentMethod === "CASH" && status === "DELIVERED") {
    await prisma.order.update({
      where: { id },
      data: { paymentStatus: "PAID", status: "DELIVERED" },
    });
  } else {
    await prisma.order.update({
      where: { id },
      data: { status: status },
    });
  }

  return { message: "Order is updated successfully." };
};

export const getOrderService = async (orderNumber: string) => {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true, user: true, address: true },
  });

  if (!order) throw new ApiError(404, "Order not found.");

  return order;
};
