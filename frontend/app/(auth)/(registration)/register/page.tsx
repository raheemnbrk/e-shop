"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import GoogleAuthButton from "@/components/features/auth/googleButton";
import { registerSchema } from "@/lib/validators/auth.schema";
import { toast } from "sonner";
import { useRegister } from "@/lib/hooks/auth/useRegister";

export default function RegisterForm() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmHidden, setIsConfirmHidden] = useState(true);
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { submitRegister, isPending } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = () => {
    const result = registerSchema.safeParse(registerForm);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    const { confirmPassword, ...rest } = result.data;
    submitRegister(rest);
  };

  return (
    <div className="flex flex-col justify-center px-12 md:px-24 py-10 h-full bg-background dark:bg-dark-background">
      <h1 className="text-2xl font-semibold text-text dark:text-dark-text tracking-tight mb-1">
        Create an account
      </h1>
      <p className="text-[13px] text-text-secondary dark:text-dark-text-secondary mb-6">
        Join us and start shopping today
      </p>

      <GoogleAuthButton />

      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex-1 h-px bg-border dark:bg-dark-border" />
        <span className="text-[11px] text-text-secondary dark:text-dark-text-secondary whitespace-nowrap">
          or register with email
        </span>
        <div className="flex-1 h-px bg-border dark:bg-dark-border" />
      </div>

      <div className="flex gap-3 mb-3.5">
        <div className="flex-1">
          <label className="block text-[12.5px] font-medium text-text dark:text-dark-text mb-1.5">
            First name
          </label>
          <div className="relative">
            <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
            <input
              name="firstName"
              type="text"
              value={registerForm.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full pl-8 pr-3 py-2 border border-border dark:border-dark-border rounded-[7px] text-[13.5px] text-text dark:text-dark-text bg-card dark:bg-dark-card placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-[12.5px] font-medium text-text dark:text-dark-text mb-1.5">
            Last name
          </label>
          <div className="relative">
            <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
            <input
              name="lastName"
              type="text"
              value={registerForm.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full pl-8 pr-3 py-2 border border-border dark:border-dark-border rounded-[7px] text-[13.5px] text-text dark:text-dark-text bg-card dark:bg-dark-card placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
            />
          </div>
        </div>
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
            value={registerForm.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full pl-8 pr-3 py-2 border border-border dark:border-dark-border rounded-[7px] text-[13.5px] text-text dark:text-dark-text bg-card dark:bg-dark-card placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="mb-3.5">
        <label className="block text-[12.5px] font-medium text-text dark:text-dark-text mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
          <input
            name="password"
            type={isPasswordHidden ? "password" : "text"}
            value={registerForm.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-8 pr-10 py-2 border border-border dark:border-dark-border rounded-[7px] text-[13.5px] text-text dark:text-dark-text bg-card dark:bg-dark-card placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
          <button
            onClick={() => setIsPasswordHidden((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-dark-text-secondary cursor-pointer"
          >
            {isPasswordHidden ? (
              <Eye className="w-full" />
            ) : (
              <EyeOff className="w-full" />
            )}
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-[12.5px] font-medium text-text dark:text-dark-text mb-1.5">
          Confirm password
        </label>
        <div className="relative">
          <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary dark:text-dark-text-secondary" />
          <input
            name="confirmPassword"
            type={isConfirmHidden ? "password" : "text"}
            value={registerForm.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-8 pr-10 py-2 border border-border dark:border-dark-border rounded-[7px] text-[13.5px] text-text dark:text-dark-text bg-card dark:bg-dark-card placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
          <button
            onClick={() => setIsConfirmHidden((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-dark-text-secondary cursor-pointer"
          >
            {isConfirmHidden ? (
              <Eye className="w-full" />
            ) : (
              <EyeOff className="w-full" />
            )}
          </button>
        </div>
      </div>

      <button
        disabled={isPending}
        onClick={handleRegister}
        className={`w-full py-2.5 cursor-pointer text-white text-[13.5px] font-semibold rounded-[7px] transition-colors mt-1 ${isPending
            ? "bg-primary/60 cursor-not-allowed"
            : "bg-primary hover:bg-primaryHover"
          }`}
      >
        {isPending ? "Creating account...." : "Create account"}
      </button>

      <p className="text-[12.5px] text-text-secondary dark:text-dark-text-secondary text-center mt-5">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}