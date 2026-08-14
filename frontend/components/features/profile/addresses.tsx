"use client";

import { AddressInformationSkeleton } from "@/components/loading/addressLoader";
import { useGetAddresses } from "@/lib/hooks/addresses/useGetAddresses";
import {
    MapPin,
    Plus,
    Pencil,
    Trash2,
    Star,
} from "lucide-react";
import { useState } from "react";
import { AddAddressDialog } from "./addAddressDialog";


export function AddressInformation() {
    const { data: addresses, isLoading } = useGetAddresses()
    const addressList = Array.isArray(addresses) ? addresses : addresses ? [addresses] : []

    const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

    if (isLoading) return <AddressInformationSkeleton />
    return (
        <div className="rounded-xl border border-border bg-card p-6 dark:border-dark-border dark:bg-dark-card">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4 dark:border-dark-border">
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-text dark:text-dark-text">
                        My addresses
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                        Manage your saved delivery addresses.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsAddAddressOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryHover"
                >
                    <Plus className="h-4 w-4" />
                    Add address
                </button>
            </div>

            {addressList.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-10 dark:border-dark-border">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-6 w-6" />
                    </div>

                    <h3 className="text-sm font-semibold text-text dark:text-dark-text">
                        No saved addresses
                    </h3>

                    <p className="mt-1 text-center text-sm text-text-secondary dark:text-dark-text-secondary">
                        Add an address to make checkout faster.
                    </p>

                    <button
                        type="button"
                        onClick={() => setIsAddAddressOpen(true)}
                        className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                    >
                        <Plus className="h-4 w-4" />
                        Add your first address
                    </button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {addressList.map((address) => (
                        <div
                            key={address.id}
                            className={`relative rounded-xl border p-4 transition ${address.isDefault
                                ? "border-primary bg-primary/5"
                                : "border-border dark:border-dark-border"
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary dark:bg-dark-background">
                                        <MapPin className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-text dark:text-dark-text">
                                                {address.label || "Address"}
                                            </h3>

                                            {address.isDefault && (
                                                <span className="flex items-center gap-1 rounded-full bg-primary/10 dark:bg-dark-background px-2 py-0.5 text-[11px] font-semibold text-primary">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    Default
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">
                                            {address.street}
                                            <br />
                                            {address.city}, {address.state}
                                            <br />
                                            {address.zipCode}, {address.country}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-1">
                                    <button
                                        type="button"
                                        // onClick={() => onEdit(address)}
                                        className="cursor-pointer rounded-lg p-2 text-text-secondary transition hover:bg-background hover:text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background"
                                        aria-label="Edit address"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        // onClick={() => onDelete(address.id)}
                                        className="cursor-pointer rounded-lg p-2 text-text-secondary transition hover:bg-red-50 hover:text-red-500 dark:text-dark-text-secondary dark:hover:bg-red-950"
                                        aria-label="Delete address"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {!address.isDefault && (
                                <button
                                    type="button"
                                    // onClick={() => onSetDefault(address.id)}
                                    className="mt-4 cursor-pointer text-sm font-medium text-primary hover:underline"
                                >
                                    Set as default
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <AddAddressDialog
                open={isAddAddressOpen}
                onOpenChange={setIsAddAddressOpen}
            />
        </div>
    );
}