"use client";

import { useGetAddresses } from "@/lib/hooks/addresses/useGetAddresses";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddAddressDialog } from "../profile/addAddressDialog";
import { Address } from "@/types/addressType";

interface Props {
    selectedAddress: string;
    onSelectAddress: (id: string) => void;
}

export default function CheckoutAddress({ selectedAddress, onSelectAddress }: Props) {
    const { data: addresses, isLoading } = useGetAddresses();
    const normalizedAddresses = Array.isArray(addresses) ? addresses : [];

    const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

    return (
        <>
            <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shrink-0">1</div>
                    <h2 className="text-sm font-semibold text-text dark:text-dark-text">Shipping address</h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 gap-3 animate-pulse">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="h-28 rounded-xl bg-border dark:bg-dark-border" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {normalizedAddresses.map((address: Address) => (
                            <button
                                key={address.id}
                                onClick={() => onSelectAddress(address.id)}
                                className={`relative text-left rounded-xl border-2 p-3.5 transition-all cursor-pointer ${selectedAddress === address.id
                                    ? "border-primary bg-blue-50 dark:bg-blue-950"
                                    : "border-border dark:border-dark-border hover:border-primary/50"
                                    }`}
                            >
                                <span className={`absolute top-3 right-3 h-4 w-4 rounded-full border-2 flex items-center justify-center ${selectedAddress === address.id
                                    ? "border-primary bg-primary"
                                    : "border-border dark:border-dark-border"
                                    }`}>
                                    {selectedAddress === address.id && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                    )}
                                </span>

                                {address.isDefault && (
                                    <span className="inline-block mb-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-primary">
                                        Default
                                    </span>
                                )}
                                {address.label && (
                                    <p className="text-xs font-semibold text-text dark:text-dark-text mb-1">{address.label}</p>
                                )}
                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary leading-6">
                                    {address.street}<br />
                                    {address.city}, {address.zipCode}<br />
                                    {address.country}
                                </p>
                            </button>
                        ))}
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border dark:border-dark-border p-3.5 text-sm text-text-secondary dark:text-dark-text-secondary hover:border-primary hover:text-primary transition-colors cursor-pointer min-h-25"
                            onClick={() => setIsAddAddressOpen(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Add new address
                        </button>
                    </div>
                )}
            </div>

            <AddAddressDialog
                open={isAddAddressOpen}
                onOpenChange={setIsAddAddressOpen}
            />
        </>
    );
}