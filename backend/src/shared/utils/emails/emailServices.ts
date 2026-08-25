import { resend } from "../../config/resend";

interface sendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: sendEmailInput) => {
  await resend.emails.send({
    from: "E-Shop <noreply@contact.e-shop-dev.me>",
    to,
    subject,
    html,
  });
};
