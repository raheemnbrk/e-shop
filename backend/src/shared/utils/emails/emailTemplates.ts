import { CartItem } from "../../../generated/prisma";

export const sendOtpTemplate = (otp: string) => `
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
`;

export const passwordResetTemplate = (otp: string) =>
  `
   <div style="font-family:sans-serif;max-width:400px;margin:0 auto">
    <h2>Reset your password</h2>

    <p>
      Use the code below to reset your E-Shop password.
      It expires in 10 minutes.
    </p>

    <div style="
      font-size:32px;
      font-weight:700;
      letter-spacing:8px;
      padding:16px;
      background:#f1f5f9;
      border-radius:8px;
      text-align:center;
    ">
      ${otp}
    </div>

    <p style="color:#64748b;font-size:13px;margin-top:16px">
      If you didn't request a password reset, ignore this email.
    </p>
  </div>
    `;

interface OrderItemEmail {
  productName: string;
  quantity: number;
  price: number;
  discount: number;
}

interface OrderConfirmationInput {
  firstName: string;
  orderNumber: string;
  items: OrderItemEmail[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  deliveryMethod: string;
}

export const orderConfirmationTemplate = ({
  firstName,
  orderNumber,
  items,
  subtotal,
  discount,
  shippingCost,
  total,
  deliveryMethod,
}: OrderConfirmationInput) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">

        <h2>Order confirmed</h2>

        <p>
            Hi ${firstName},
        </p>

        <p>
            Thank you for your order. Your order has been successfully placed.
        </p>

        <div style="
            padding:16px;
            background:#f1f5f9;
            border-radius:8px;
            margin:16px 0;
        ">
            <p style="margin:0;color:#64748b;font-size:13px">
                Order number
            </p>

            <p style="margin:6px 0 0;font-size:20px;font-weight:700">
                #${orderNumber}
            </p>
        </div>

        <h3>Order items</h3>

        ${items
          .map(
            (item) => `
                    <div style="
                        padding:12px 0;
                        border-bottom:1px solid #e2e8f0;
                    ">
                        <p style="
                            margin:0;
                            font-weight:600;
                        ">
                            ${item.productName}
                        </p>

                        <p style="
                            margin:4px 0 0;
                            color:#64748b;
                            font-size:13px;
                        ">
                            ${item.quantity} × $${item.price.toFixed(2)}
                        </p>

                        <p style="
                            margin:4px 0 0;
                            font-weight:600;
                        ">
                            $${(
                              item.price *
                              (1 - item.discount / 100) *
                              item.quantity
                            ).toFixed(2)}
                        </p>
                    </div>
                `,
          )
          .join("")}

        <div style="margin-top:20px">

            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:8px;
            ">
                <span style="color:#64748b">
                    Subtotal
                </span>

                <span>
                    $${subtotal.toFixed(2)}
                </span>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:8px;
            ">
                <span style="color:#64748b">
                    Discount
                </span>

                <span>
                    -$${discount.toFixed(2)}
                </span>
            </div>

            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:8px;
            ">
                <span style="color:#64748b">
                    Shipping
                </span>

                <span>
                    ${
                      shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`
                    }
                </span>
            </div>

            <div style="
                border-top:1px solid #e2e8f0;
                padding-top:12px;
                margin-top:12px;
                display:flex;
                justify-content:space-between;
                font-weight:700;
                font-size:18px;
            ">
                <span>Total</span>

                <span>
                    $${total.toFixed(2)}
                </span>
            </div>

        </div>

        <div style="
            padding:16px;
            background:#f8fafc;
            border-radius:8px;
            margin-top:20px;
        ">
            <p style="margin:0;font-weight:600">
                Delivery method
            </p>

            <p style="
                margin:6px 0 0;
                color:#64748b;
            ">
                ${deliveryMethod}
            </p>
        </div>

        <p style="
            color:#64748b;
            font-size:13px;
            margin-top:20px;
        ">
            You can view your order details from your E-Shop account.
        </p>

        <p style="
            color:#64748b;
            font-size:13px;
        ">
            Thank you for shopping with E-Shop.
        </p>

    </div>
`;

export const sellerApplicationStatusTemplate = ({
  firstName,
  storeName,
  status,
}: {
  firstName: string;
  storeName: string;
  status: "APPROVED" | "REJECTED";
}) => `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2>Seller application ${status === "APPROVED" ? "approved" : "rejected"}</h2>
        <p>Hi ${firstName},</p>
        <p>Your seller application for <strong>${storeName}</strong> has been ${status.toLowerCase()}.</p>
        ${status === "APPROVED" ? "<p>You can now start selling on E-Shop.</p>" : "<p>You can submit a new application after reviewing your store information.</p>"}
    </div>
`;
