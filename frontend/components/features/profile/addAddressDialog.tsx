"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { addAddressSchema } from "@/lib/validators/addressSchema";
import { Address, addAddressInput } from "@/types/addressType";
import { useAddAddress } from "@/lib/hooks/addresses/useAddAddress";
import { useUpdateAddress } from "@/lib/hooks/addresses/useUpdateAddress";

interface AddAddressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    address?: Address | null;
}

type AddAddressForm = z.input<typeof addAddressSchema>;

export function AddAddressDialog({
    open,
    onOpenChange,
    address,
}: AddAddressDialogProps) {
    const { addAddress, isPending: isAdding } = useAddAddress();
    const { updateAddress, isPending: isUpdating } = useUpdateAddress();

    const isEditing = !!address;
    const isPending = isAdding || isUpdating;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<AddAddressForm>({
        resolver: zodResolver(addAddressSchema),
        defaultValues: {
            label: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
            isDefault: false,
        },
    });

    const isDefault = watch("isDefault");

    useEffect(() => {
        if (address) {
            reset({
                label: address.label ?? "",
                street: address.street,
                city: address.city,
                state: address.state,
                country: address.country,
                zipCode: address.zipCode,
                isDefault: address.isDefault,
            });
        } else {
            reset({
                label: "",
                street: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
                isDefault: false,
            });
        }
    }, [address, reset]);

    const onSubmit = (data: AddAddressForm) => {
        if (isEditing && address) {
            updateAddress(
                {
                    id: address.id,
                    input: data as addAddressInput,
                },
                {
                    onSuccess: () => {
                        reset();
                        onOpenChange(false);
                    },
                },
            );

            return;
        }

        addAddress(data as addAddressInput, {
            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    };

    const handleClose = () => {
        if (isPending) return;

        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className="max-h-[90vh] overflow-y-auto border-border bg-card text-text sm:max-w-lg dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
            >
                <DialogHeader>
                    <DialogTitle className="text-text dark:text-dark-text">
                        {isEditing ? "Edit address" : "Add new address"}
                    </DialogTitle>

                    <DialogDescription className="text-text-secondary dark:text-dark-text-secondary">
                        {isEditing
                            ? "Update your delivery address."
                            : "Add a delivery address to your account."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="text-sm font-medium text-text dark:text-dark-text">
                                Label
                            </label>

                            <Input
                                {...register("label")}
                                placeholder="Home, Work..."
                                disabled={isPending}
                                className="mt-1.5 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                            />

                            {errors.label && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.label.message}
                                </p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="text-sm font-medium text-text dark:text-dark-text">
                                Street
                            </label>

                            <Input
                                {...register("street")}
                                placeholder="123 Main Street"
                                disabled={isPending}
                                className="mt-1.5 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                            />

                            {errors.street && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.street.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text dark:text-dark-text">
                                City
                            </label>

                            <Input
                                {...register("city")}
                                placeholder="Algiers"
                                disabled={isPending}
                                className="mt-1.5 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                            />

                            {errors.city && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text dark:text-dark-text">
                                State
                            </label>

                            <Input
                                {...register("state")}
                                placeholder="Algiers"
                                disabled={isPending}
                                className="mt-1.5 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                            />

                            {errors.state && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.state.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text dark:text-dark-text">
                                Country
                            </label>

                            <Input
                                {...register("country")}
                                placeholder="Algeria"
                                disabled={isPending}
                                className="mt-1.5 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                            />

                            {errors.country && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.country.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text dark:text-dark-text">
                                ZIP code
                            </label>

                            <Input
                                {...register("zipCode")}
                                placeholder="16000"
                                inputMode="numeric"
                                disabled={isPending}
                                className="mt-1.5 border-border bg-background text-text placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-border dark:bg-dark-background dark:text-dark-text dark:placeholder:text-dark-text-secondary"
                            />

                            {errors.zipCode && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.zipCode.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="isDefault"
                            checked={isDefault}
                            disabled={isPending}
                            onCheckedChange={(checked) =>
                                setValue(
                                    "isDefault",
                                    checked === true,
                                )
                            }
                            className="cursor-pointer border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:border-dark-border"
                        />

                        <label
                            htmlFor="isDefault"
                            className="cursor-pointer text-sm font-medium text-text dark:text-dark-text"
                        >
                            Set as default address
                        </label>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                            className="cursor-pointer border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="cursor-pointer bg-primary text-white hover:bg-primaryHover disabled:cursor-not-allowed"
                        >
                            {isPending && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}

                            {isPending
                                ? isEditing
                                    ? "Updating..."
                                    : "Adding..."
                                : isEditing
                                    ? "Update address"
                                    : "Add address"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}