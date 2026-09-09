"use client";

import GoogleAuthButton from "@/components/features/auth/googleButton";
import { useLogin } from "@/lib/hooks/auth/useLogin";
import { loginSchema } from "@/lib/validators/auth.schema";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const { submitLogin, isPending } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    const result = loginSchema.safeParse(loginForm);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    submitLogin(result.data);
  };

  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="flex flex-col justify-center px-12 md:px-24 py-10 h-full bg-background dark:bg-dark-background">
      <h1 className="text-2xl font-semibold text-text dark:text-dark-text tracking-tight mb-1">
        Welcome back
      </h1>
      <p className="text-[13px] text-text-secondary dark:text-dark-text-secondary mb-6">
        Sign in to continue shopping
      </p>

      <GoogleAuthButton />

      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex-1 h-px bg-border dark:bg-dark-border" />
        <span className="text-[11px] text-text-secondary dark:text-dark-text-secondary whitespace-nowrap">
          or sign in with email
        </span>
        <div className="flex-1 h-px bg-border dark:bg-dark-border" />
      </div>

      <div className="mb-3.5">
        <label className="block text-[12.5px] font-medium text-text dark:text-dark-text mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
          <input
            name="email"
            type="email"
            value={loginForm.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full pl-8 pr-3 py-2 border border-border dark:border-dark-border rounded-[7px] text-[13.5px] text-text dark:text-dark-text bg-card dark:bg-dark-card placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="mb-3.5">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-[12.5px] font-medium text-text dark:text-dark-text">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[11.5px] text-primary font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
          <input
            name="password"
            type={isHidden ? "password" : "text"}
            value={loginForm.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-8 pr-3 py-2 border border-border dark:border-dark-border rounded-[7px] text-[13.5px] text-text dark:text-dark-text bg-card dark:bg-dark-card placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
          <button
            onClick={() => setIsHidden((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-dark-text-secondary cursor-pointer"
          >
            {isHidden ? (
              <Eye className="w-full" />
            ) : (
              <EyeOff className="w-full" />
            )}
          </button>
        </div>
      </div>

      <button
        className={`w-full py-2.5 cursor-pointer text-white text-[13.5px] font-semibold rounded-[7px] transition-colors mt-1 ${isPending
            ? "bg-primary/60 cursor-not-allowed"
            : "bg-primary hover:bg-primaryHover"
          }`}
        disabled={isPending}
        onClick={handleLogin}
      >
        {isPending ? "Signing in...." : "Sign in"}
      </button>

      <p className="text-[12.5px] text-text-secondary dark:text-dark-text-secondary text-center mt-5">
        No account?{" "}
        <Link
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}