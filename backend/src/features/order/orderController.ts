import { NextFunction, Request, Response } from "express";
import { placeOrderInput } from "../../shared/types/orderTypes";
import {
  ordersQuerySchema,
  placeOrderSchema,
} from "../../shared/validations/orderValidation";
import * as orderServices from "./orderServices";
import Stripe from "stripe";
import stripe from "../../shared/config/stripe";
import prisma from "../../shared/config/prisma";
import { sendOrderConfirmationEmail } from "../../shared/utils/emails/emailActions";

export const placeOrderController = async (
  req: Request<{ id: string }, {}, placeOrderInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;

    const input = placeOrderSchema.parse(req.body);

    const result = await orderServices.placeOrderService(userId, input);

    return res.status(201).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const stripeWebhookController = async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).json({
      message: "Missing Stripe signature.",
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);

    return res.status(400).json({
      message: "Invalid Stripe signature.",
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const orderId = session.metadata?.orderId;

      if (!orderId) {
        console.error("No orderId in Stripe session metadata.");

        return res.status(400).json({
          message: "Order ID missing.",
        });
      }

      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          user: true,
          items: true,
        },
      });

      if (!order) {
        console.error(`Order ${orderId} not found.`);

        return res.status(404).json({
          message: "Order not found.",
        });
      }

      if (order.paymentStatus === "PAID") {
        return res.status(200).json({
          received: true,
        });
      }

      if (session.payment_status !== "paid") {
        return res.status(200).json({
          received: true,
        });
      }

      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null;

      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentStatus: "PAID",

          status: "CONFIRMED",

          ...(paymentIntentId && {
            paymentIntentId,
          }),
        },
      });

      await sendOrderConfirmationEmail(
        order.user.email,
        order.user.firstName,
        order.orderNumber,
        order.items,
        order.subtotal,
        order.discount,
        order.shippingCost,
        order.total,
        order.deliveryMethod,
      );

      return res.status(200).json({
        received: true,
      });
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;

      const orderId = session.metadata?.orderId;

      if (!orderId) {
        return res.status(200).json({
          received: true,
        });
      }

      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          items: true,
        },
      });

      if (!order) {
        return res.status(200).json({
          received: true,
        });
      }

      if (order.paymentStatus === "PAID") {
        return res.status(200).json({
          received: true,
        });
      }

      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: "CANCELLED",
          },
        });

        for (const item of order.items) {
          if (!item.productId) {
            continue;
          }

          await tx.product.update({
            where: {
              id: item.productId,
            },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      });

      return res.status(200).json({
        received: true,
      });
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return res.status(500).json({
      message: "Webhook processing failed.",
    });
  }
};

export const getMyOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id as string;

    const input = ordersQuerySchema.parse((req as any).query);

    const { orders, statusCounts, totalOrders, pagination } =
      await orderServices.getMyOrdersService(userId, input);

    return res
      .status(200)
      .json({ success: true, orders, statusCounts, totalOrders, pagination });
  } catch (err) {
    next(err);
  }
};

export const getMySingleOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderNumber } = (req as any).params as { orderNumber: string };

    const userId = (req as any).user.id as string;

    const order = await orderServices.getMySingleOrderService(
      orderNumber,
      userId,
    );

    return res.status(200).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

export const getAdminOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = (req as any).query;

    const { orders, pagination } =
      await orderServices.getAdminOrdersService(input);

    return res.status(200).json({ success: true, orders, pagination });
  } catch (err) {
    next(err);
  }
};

export const cancelOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id as string;
    const { id } = (req as any).params as { id: string };

    const { message } = await orderServices.cancelOrderService(id, userId);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
export const adminCancelOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params as { id: string };

    const { message } = await orderServices.adminCancelOrderService(id);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
