import { sendEmail } from "./emailServices";
import { passwordResetTemplate, sendOtpTemplate } from "./emailTemplates";

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
