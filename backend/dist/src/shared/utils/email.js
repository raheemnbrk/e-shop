"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
const resend_1 = require("../config/resend");
const sendOtpEmail = async (email, otp) => {
    await resend_1.resend.emails.send({
        from: "E-Shop <noreply@contact.e-shop-dev.me>",
        to: email,
        subject: "Verify your email",
        html: `
      <div style="font-family:sans-serif;max-width:400px;margin:0 auto">
        <h2>Your verification code</h2>
        <p>Enter this code to verify your email. It expires in 10 minutes.</p>
        <div style="font-size:32px;font-weight:700;letter-spacing:8px;padding:16px;background:#f1f5f9;border-radius:8px;text-align:center">
          ${otp}
        </div>
        <p style="color:#64748b;font-size:13px;margin-top:16px">
          If you didn't request this, ignore this email.
        </p>
      </div>
    `,
    });
};
exports.sendOtpEmail = sendOtpEmail;
