import prisma from "../../shared/config/prisma";
import { addToCartInput } from "../../shared/types/productTypes";
import { ApiError } from "../../shared/utils/apiError";

export const getOrCreateCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              stock: true,
              available: true,
              images: true,
              discount: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                discount: true,
                images: true,
                stock: true,
                available: true,
                slug: true,
              },
            },
          },
        },
      },
    });
  }

  return cart;
};

export const getCartService = async (userId: string) => {
  const cart = await getOrCreateCart(userId);
  return cart;
};

export const addToCartServices = async (
  userId: string,
  input: addToCartInput,
) => {
  const { productId, quantity } = input;
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new ApiError(404, "Product not found.");
  if (!product.available) throw new ApiError(400, "Product is not available.");
  if (product.stock < quantity) throw new ApiError(400, "Not enough stock.");

  const cart = await getOrCreateCart(userId);

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existingItem) {
    const newQty = existingItem.quantity + quantity;
    await prisma.cartItem.update({
      where: { cartId_productId: { cartId: cart.id, productId } },
      data: { quantity: newQty },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  return { message: "Product added to cart." };
};
