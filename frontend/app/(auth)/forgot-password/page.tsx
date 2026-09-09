"use client";

import { useForgetPassword } from "@/lib/hooks/auth/useForgetPassword";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { isPending, handleForgetPassword } = useForgetPassword();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-text dark:text-dark-text tracking-tight mb-1">
          Forgot password?
        </h1>

        <p className="text-[13px] text-text-secondary dark:text-dark-text-secondary mb-6">
          Enter your email and we'll send you a verification code.
        </p>

        <div className="mb-4">
          <label className="block text-[12.5px] font-medium text-text dark:text-dark-text mb-1.5">
            Email
          </label>

          <div className="relative">
            <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-[7px] border border-border dark:border-dark-border bg-card dark:bg-dark-card py-2 pl-8 pr-3 text-[13.5px] text-text dark:text-dark-text placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <button
          onClick={() => handleForgetPassword(email)}
          disabled={isPending}
          className={`w-full rounded-[7px] py-2.5 text-[13.5px] font-semibold text-white transition-colors ${isPending
              ? "cursor-not-allowed bg-primary/60"
              : "cursor-pointer bg-primary hover:bg-primaryHover"
            }`}
        >
          {isPending ? "Sending..." : "Send verification code"}
        </button>

        <p className="mt-5 text-center text-[12.5px] text-text-secondary dark:text-dark-text-secondary">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}