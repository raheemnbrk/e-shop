"use client";

import { useChangePassword } from "@/lib/hooks/auth/useChangePassword";
import { changePasswordSchema } from "@/lib/validators/auth.schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ChangePassword() {
    const { changePassword, isPending } = useChangePassword();

    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmedNewPassword: "",
    });

    const toggle = (field: keyof typeof show) => {
        setShow((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangePassword = () => {
        const result = changePasswordSchema.safeParse(passwordForm);

        if (!result.success) {
            toast.error(result.error.issues[0].message);
            return;
        }

        changePassword({
            currentPassword: result.data.currentPassword,
            newPassword: result.data.newPassword,
        });
    };

    return (
        <div className="rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-dark-text-secondary mb-4 pb-3 border-b border-border dark:border-dark-border">
                Change password
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PasswordInput
                    label="Current password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    show={show.current}
                    onChange={handleChange}
                    onToggle={() => toggle("current")}
                    placeholder="Enter current password"
                    fullWidth
                />

                <PasswordInput
                    label="New password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    show={show.new}
                    onChange={handleChange}
                    onToggle={() => toggle("new")}
                    placeholder="Enter new password"
                />

                <PasswordInput
                    label="Confirm new password"
                    name="confirmedNewPassword"
                    value={passwordForm.confirmedNewPassword}
                    show={show.confirm}
                    onChange={handleChange}
                    onToggle={() => toggle("confirm")}
                    placeholder="Confirm new password"
                />
            </div>

            <div className="flex justify-end mt-4">
                <button
                    onClick={handleChangePassword}
                    disabled={
                        isPending ||
                        !passwordForm.currentPassword ||
                        !passwordForm.newPassword ||
                        !passwordForm.confirmedNewPassword
                    }
                    className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Updating..." : "Update password"}
                </button>
            </div>
        </div>
    );
}

interface PasswordInputProps {
    label: string;
    name: string;
    value: string;
    show: boolean;
    placeholder: string;
    fullWidth?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggle: () => void;
}

function PasswordInput({
    label,
    name,
    value,
    show,
    placeholder,
    fullWidth,
    onChange,
    onToggle,
}: PasswordInputProps) {
    return (
        <div
            className={`flex flex-col gap-1.5 ${fullWidth ? "md:col-span-2" : ""
                }`}
        >
            <label className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
                {label}
            </label>

            <div className="relative flex items-center">
                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text dark:text-dark-text outline-none focus:border-primary"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 text-text-secondary dark:hover:text-dark-text cursor-pointer"
                >
                    {show ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}