"use client";

import CheckoutAddress from "@/components/features/orders/checkoutAddress";
import CheckoutNote from "@/components/features/orders/checkoutNote";
import CheckoutSummary from "@/components/features/orders/checkoutSummary";
import CheckoutDelivery from "@/components/features/orders/deliveryMethod";
import { useGetCart } from "@/lib/hooks/cart/useCart";
import { usePlaceOrder } from "@/lib/hooks/orders/usePlaceOrder";
import { placeOrderSchema } from "@/lib/validators/order.schema";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
    const [selectedAddress, setSelectedAddress] = useState<string>("")
    const [deliveryMethod, setDeliveryMethod] = useState<"STANDARD" | "EXPRESS">("STANDARD")
    const [note, setNote] = useState("")
    const [couponCode, setCouponCode] = useState("")
    const [paymentMethod, setPaymentMethod] = useState<"CASH" | "ONLINE">("CASH")

    const { items: cartItems } = useGetCart()
    const { placeOrder, isPending } = usePlaceOrder()

    const shippingCost = deliveryMethod === "EXPRESS" ? 9.99 : 0

    const handlePlaceOrder = () => {
        const result = placeOrderSchema.safeParse({
            addressId: selectedAddress,
            deliveryMethod,
            paymentMethod,
            couponCode: couponCode || undefined,
            note: note || undefined,
        })

        if (!result.success) {
            toast.error(result.error.issues[0].message)
            return
        }

        placeOrder(result.data)
    }

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold text-text dark:text-dark-text">
                    Checkout
                </h1>
                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    Complete your order in a few simple steps
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">
                <div className="flex flex-col gap-4">
                    <CheckoutAddress
                        selectedAddress={selectedAddress}
                        onSelectAddress={setSelectedAddress}
                    />
                    <CheckoutDelivery
                        deliveryMethod={deliveryMethod}
                        onSelectDelivery={setDeliveryMethod}
                    />
                    <CheckoutNote
                        note={note}
                        onNoteChange={setNote}
                    />
                </div>

                <div className="sticky top-20">
                    <CheckoutSummary
                        cartItems={cartItems}
                        selectedAddress={selectedAddress}
                        deliveryMethod={deliveryMethod}
                        note={note}
                        couponCode={couponCode}
                        onCouponChange={setCouponCode}
                        shippingCost={shippingCost}
                        isPending={isPending}
                        onPlaceOrder={handlePlaceOrder}
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                    />
                </div>
            </div>
        </div>
    )
}