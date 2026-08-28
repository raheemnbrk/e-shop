import { sendEmail } from "./emailServices";
import {
  orderConfirmationTemplate,
  passwordResetTemplate,
  sendOtpTemplate,
} from "./emailTemplates";

export const sendOtpEmail = async (email: string, otp: string) => {
  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: sendOtpTemplate(otp),
  });
};

export const sendPasswordResetOtpEmail = async (email: string, otp: string) => {
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: passwordResetTemplate(otp),
  });
};

export const sendOrderConfirmationEmail = async (
  email: string,
  firstName: string,
  orderNumber: string,
  items: {
    productName: string;
    quantity: number;
    price: number;
    discount: number;
  }[],
  subtotal: number,
  discount: number,
  shippingCost: number,
  total: number,
  deliveryMethod: string,
) => {
  await sendEmail({
    to: email,
    subject: `Order #${orderNumber} confirmed`,
    html: orderConfirmationTemplate({
      firstName,
      orderNumber,
      items,
      subtotal,
      discount,
      shippingCost,
      total,
      deliveryMethod,
    }),
  });
};
