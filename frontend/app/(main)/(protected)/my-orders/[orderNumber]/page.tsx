"use client"

import OrderActions from "@/components/features/orders/orderActions"
import OrderDeliveryInfo from "@/components/features/orders/orderDeliveryInfo"
import OrderHeader from "@/components/features/orders/orderHeader"
import OrderItems from "@/components/features/orders/orderItems"
import OrderPaymentInfo from "@/components/features/orders/orderPaymentInfo"
import OrderStatusTimeline from "@/components/features/orders/orderStatusTimeLine"
import OrderSummary from "@/components/features/orders/orderSummary"
import OrderDetailsSkeleton from "@/components/loading/orderDetailSkeleton"
import { useGetSingleOrder } from "@/lib/hooks/orders/useGetSingleOrder"
import { useParams, useRouter } from "next/navigation"

export default function Order() {
    const { orderNumber } = useParams<{ orderNumber: string }>()

    const { data, isLoading } = useGetSingleOrder(orderNumber)

    const router = useRouter()

    const order = data?.order

    if (isLoading) return <OrderDetailsSkeleton />


    return (
        <div className="space-y-6">
            <OrderHeader order={order} />

            <OrderStatusTimeline status={order.status} />

            <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                <OrderItems order={order} />
                <OrderSummary order={order} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <OrderDeliveryInfo order={order} />
                <OrderPaymentInfo order={order} />

                <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                    <h2 className="mb-4 font-semibold text-text dark:text-dark-text">
                        Coupon
                    </h2>

                    {Array.isArray(order.coupon) && order.coupon.length > 0 ? (
                        <div>
                            {order.coupon.map((coupon) => (
                                <p
                                    key={coupon.id ?? coupon.code}
                                    className="font-semibold text-green-500"
                                >
                                    {coupon.code ?? "Coupon"}
                                </p>
                            ))}
                            <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                                Coupon applied successfully
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            No coupon applied
                        </p>
                    )}
                </div>
            </div>

            {order.note && (
                <div className="rounded-xl border border-border bg-card p-5 dark:border-dark-border dark:bg-dark-card">
                    <h2 className="mb-3 font-semibold text-text dark:text-dark-text">
                        Order Note
                    </h2>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        {order.note}
                    </p>
                </div>
            )}

            <OrderActions order={order} />
        </div>
    )
}