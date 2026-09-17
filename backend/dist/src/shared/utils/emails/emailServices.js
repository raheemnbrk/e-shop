"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const resend_1 = require("../../config/resend");
const sendEmail = async ({ to, subject, html }) => {
    await resend_1.resend.emails.send({
        from: "E-Shop <noreply@contact.e-shop-dev.me>",
        to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
