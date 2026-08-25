"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { SelectDemo } from "@/components/features/layout/select";
import { DatePickerInput } from "@/components/ui/date-picker";

import { createCouponSchema } from "@/lib/validators/couponSchema";
import { useCreateCoupon } from "@/lib/hooks/admin/coupons/useCreateCoupon";
import { useUpdateCoupon } from "@/lib/hooks/admin/coupons/useUpdateCoupon";

import type { Coupon, updateCouponInput } from "@/types/couponTypes";

type CouponDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    coupon?: Coupon | null;
};

type CouponFormValues = z.input<typeof createCouponSchema>;

export default function CouponDialog({
    open,
    onOpenChange,
    coupon,
}: CouponDialogProps) {
    const isEdit = !!coupon;

    const { createCoupon, creating } = useCreateCoupon();
    const { updateCoupon, updating } = useUpdateCoupon();

    const isPending = creating || updating;

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<CouponFormValues>({
        resolver: zodResolver(createCouponSchema),
        defaultValues: {
            code: "",
            discount: 0,
            type: "PERCENTAGE",
            maxUses: 1,
            expiresAt: "",
            isActive: true,
        },
    });

    const type = watch("type");
    const isActive = watch("isActive");
    const expiresAt = watch("expiresAt");

    useEffect(() => {
        if (!open) return;

        if (coupon) {
            reset({
                code: coupon.code,
                discount: coupon.discount,
                type: coupon.type,
                maxUses: coupon.maxUses,
                expiresAt: coupon.expiresAt,
                isActive: coupon.isActive,
            });
        } else {
            reset({
                code: "",
                discount: 0,
                type: "PERCENTAGE",
                maxUses: 1,
                expiresAt: "",
                isActive: true,
            });
        }
    }, [open, coupon, reset]);

    const onSubmit = (values: CouponFormValues) => {
        if (isEdit && coupon) {
            const updateData: updateCouponInput = {};

            if (values.discount !== coupon.discount) {
                updateData.discount = values.discount;
            }

            if (values.type !== coupon.type) {
                updateData.type = values.type;
            }

            if (values.maxUses !== coupon.maxUses) {
                updateData.maxUses = values.maxUses;
            }

            if (values.expiresAt !== coupon.expiresAt) {
                updateData.expiresAt = values.expiresAt;
            }

            if (values.isActive !== coupon.isActive) {
                updateData.isActive = values.isActive;
            }

            updateCoupon(
                {
                    id: coupon.id,
                    input: updateData,
                },
                {
                    onSuccess: () => {
                        onOpenChange(false);
                    },
                }
            );

            return;
        }

        createCoupon(
            {
                ...values,
                type: values.type ?? "PERCENTAGE",
                isActive: values.isActive ?? true,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto bg-card dark:bg-dark-card sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl text-text dark:text-dark-text">
                        {isEdit ? "Edit Coupon" : "Add Coupon"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">
                            Coupon Code
                        </label>

                        <Input
                            {...register("code")}
                            placeholder="Enter coupon code"
                            readOnly={isEdit}
                            className={`mt-2 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary ${isEdit ? "cursor-not-allowed opacity-60" : ""
                                }`}
                        />

                        {errors.code && (
                            <p className="text-xs text-red-500">
                                {errors.code.message}
                            </p>
                        )}

                        {isEdit && (
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                Coupon code cannot be modified after creation.
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">
                            Discount Type
                        </label>

                        <SelectDemo
                            items={[
                                {
                                    value: "PERCENTAGE",
                                    label: "Percentage (%)",
                                },
                                {
                                    value: "FIXED",
                                    label: "Fixed Amount ($)",
                                },
                            ]}
                            label="Select discount type"
                            defaultValue={type}
                            onchange={(value) =>
                                setValue(
                                    "type",
                                    value as "PERCENTAGE" | "FIXED",
                                    { shouldValidate: true }
                                )
                            }
                        />

                        {errors.type && (
                            <p className="text-xs text-red-500">
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">
                            {type === "PERCENTAGE"
                                ? "Discount Percentage"
                                : "Discount Amount"}
                        </label>

                        <div className="relative mt-2">
                            <Input
                                type="number"
                                step={type === "PERCENTAGE" ? "1" : "0.01"}
                                min={type === "PERCENTAGE" ? 1 : 0.01}
                                max={type === "PERCENTAGE" ? 90 : undefined}
                                {...register("discount", {
                                    valueAsNumber: true,
                                })}
                                placeholder={
                                    type === "PERCENTAGE"
                                        ? "Enter percentage"
                                        : "Enter amount"
                                }
                                className="border-border bg-background pr-12 text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />

                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary dark:text-dark-text-secondary">
                                {type === "PERCENTAGE" ? "%" : "$"}
                            </span>
                        </div>

                        {errors.discount && (
                            <p className="text-xs text-red-500">
                                {errors.discount.message}
                            </p>
                        )}

                        {type === "PERCENTAGE" && (
                            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                Maximum discount is 90%.
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">
                            Maximum Uses
                        </label>

                        <Input
                            type="number"
                            min={1}
                            {...register("maxUses", {
                                valueAsNumber: true,
                            })}
                            placeholder="Enter maximum uses"
                            className="border-border bg-background pr-12 text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />

                        {errors.maxUses && (
                            <p className="text-xs text-red-500">
                                {errors.maxUses.message}
                            </p>
                        )}

                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            Maximum number of times this coupon can be used.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <DatePickerInput
                            label="Expiration Date"
                            value={expiresAt ? new Date(expiresAt) : undefined}
                            onChange={(date) =>
                                setValue(
                                    "expiresAt",
                                    date ? date.toISOString() : "",
                                    {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    }
                                )
                            }
                            placeholder="Select expiration date"
                        />

                        {errors.expiresAt && (
                            <p className="text-xs text-red-500">
                                {errors.expiresAt.message}
                            </p>
                        )}

                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            Coupon will expire on the selected date.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-dark-text">
                            Status
                        </label>

                        <SelectDemo
                            items={[
                                {
                                    value: "true",
                                    label: "Active",
                                },
                                {
                                    value: "false",
                                    label: "Inactive",
                                },
                            ]}
                            label="Select status"
                            defaultValue={String(isActive)}
                            onchange={(value) =>
                                setValue("isActive", value === "true", {
                                    shouldValidate: true,
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t border-border pt-5 dark:border-dark-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="cursor-pointer bg-primary text-white hover:bg-primaryHover"
                        >
                            {isPending
                                ? "Saving..."
                                : isEdit
                                    ? "Update Coupon"
                                    : "Create Coupon"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}