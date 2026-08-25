"use client";

import { Banknote, CreditCard, ShieldCheck, Tag } from "lucide-react";
import { usePlaceOrder } from "@/lib/hooks/orders/usePlaceOrder";
import { toast } from "sonner";
import { placeOrderSchema } from "@/lib/validators/order.schema";
import { useState } from "react";
import type { CartItem } from "@/types/cartTypes";

interface Props {
    cartItems: CartItem[];
    selectedAddress: string;
    deliveryMethod: string;
    note?: string;
    couponCode: string;
    onCouponChange: (code: string) => void;
    shippingCost: number;
}

export default function CheckoutSummary({
    cartItems,
    selectedAddress,
    deliveryMethod,
    note,
    couponCode,
    onCouponChange,
    shippingCost,
}: Props) {
    const { placeOrder, isPending } = usePlaceOrder();

    const [paymentMethod, setPaymentMethod] =
        useState<"CASH" | "ONLINE">("CASH");

    const subtotal = cartItems.reduce((sum, item) => {
        const finalPrice =
            Number(item.price) *
            (1 - Number(item.discount) / 100);

        return sum + finalPrice * item.quantity;
    }, 0);

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const total = subtotal + shippingCost;

    const handleSubmit = () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        const result = placeOrderSchema.safeParse({
            addressId: selectedAddress,
            deliveryMethod,
            paymentMethod,
            note,
            couponCode: couponCode || undefined,
        });

        if (!result.success) {
            const firstError = result.error.issues[0];
            toast.error(firstError.message);
            return;
        }

        placeOrder(result.data);
    };

    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-text dark:text-dark-text uppercase tracking-widest">
                Order summary
            </h2>

            <div className="flex flex-col divide-y divide-border dark:divide-dark-border">
                {cartItems.map((item) => {
                    const finalPrice =
                        Number(item.price) *
                        (1 - Number(item.discount) / 100);

                    const itemTotal = finalPrice * item.quantity;

                    return (
                        <div
                            key={item.productId}
                            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-8 w-8 rounded-lg object-cover border border-border dark:border-dark-border shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-text dark:text-dark-text line-clamp-1">
                                    {item.name}
                                </p>

                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                    {item.quantity} × ${finalPrice.toFixed(2)}
                                </p>
                            </div>

                            <span className="text-sm font-bold text-text dark:text-dark-text shrink-0">
                                ${itemTotal.toFixed(2)}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col gap-2 text-sm mt-4">
                <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
                    <span>
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"})
                    </span>

                    <span className="font-medium text-text dark:text-dark-text">
                        ${subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between text-text-secondary dark:text-dark-text-secondary">
                    <span>Shipping</span>

                    {shippingCost === 0 ? (
                        <span className="font-medium text-green-600">
                            Free
                        </span>
                    ) : (
                        <span className="font-medium text-text dark:text-dark-text">
                            ${shippingCost.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="flex justify-between font-bold text-base text-text dark:text-dark-text border-t border-border dark:border-dark-border pt-2 mt-1">
                    <span>Total</span>

                    <span className="text-primary">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-border dark:border-dark-border px-3 py-2">
                    <Tag className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary shrink-0" />

                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) =>
                            onCouponChange(e.target.value.toUpperCase())
                        }
                        placeholder="Coupon code"
                        className="bg-transparent text-sm outline-none w-full text-text dark:text-dark-text placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary"
                    />
                </div>

                <button className="px-3 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer">
                    Apply
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <button
                    onClick={() => setPaymentMethod("CASH")}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                        paymentMethod === "CASH"
                            ? "border-primary bg-blue-50 dark:bg-blue-950"
                            : "border-border dark:border-dark-border"
                    }`}
                >
                    <Banknote className="h-5 w-5" />

                    <div className="text-left">
                        <p className="text-sm font-semibold">
                            Cash on delivery
                        </p>

                        <p className="text-xs text-text-secondary">
                            Pay when you receive
                        </p>
                    </div>
                </button>

                <button
                    onClick={() => setPaymentMethod("ONLINE")}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                        paymentMethod === "ONLINE"
                            ? "border-primary bg-blue-50 dark:bg-blue-950"
                            : "border-border dark:border-dark-border"
                    }`}
                >
                    <CreditCard className="h-5 w-5" />

                    <div className="text-left">
                        <p className="text-sm font-semibold">
                            Online payment
                        </p>

                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            Coming soon
                        </p>
                    </div>
                </button>
            </div>

            <button
                onClick={handleSubmit}
                disabled={
                    isPending ||
                    !selectedAddress ||
                    cartItems.length === 0
                }
                className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primaryHover transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ShieldCheck className="h-4 w-4" />

                {isPending
                    ? "Placing order..."
                    : `Place order · $${total.toFixed(2)}`}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secured with 256-bit SSL encryption
            </p>
        </div>
    );
}