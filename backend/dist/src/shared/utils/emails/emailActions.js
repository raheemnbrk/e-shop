"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderConfirmationEmail = exports.sendPasswordResetOtpEmail = exports.sendOtpEmail = void 0;
const emailServices_1 = require("./emailServices");
const emailTemplates_1 = require("./emailTemplates");
const sendOtpEmail = async (email, otp) => {
    await (0, emailServices_1.sendEmail)({
        to: email,
        subject: "Verify your email",
        html: (0, emailTemplates_1.sendOtpTemplate)(otp),
    });
};
exports.sendOtpEmail = sendOtpEmail;
const sendPasswordResetOtpEmail = async (email, otp) => {
    await (0, emailServices_1.sendEmail)({
        to: email,
        subject: "Reset your password",
        html: (0, emailTemplates_1.passwordResetTemplate)(otp),
    });
};
exports.sendPasswordResetOtpEmail = sendPasswordResetOtpEmail;
const sendOrderConfirmationEmail = async (email, firstName, orderNumber, items, subtotal, discount, shippingCost, total, deliveryMethod) => {
    await (0, emailServices_1.sendEmail)({
        to: email,
        subject: `Order #${orderNumber} confirmed`,
        html: (0, emailTemplates_1.orderConfirmationTemplate)({
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
exports.sendOrderConfirmationEmail = sendOrderConfirmationEmail;
