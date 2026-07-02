"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useResetPassword } from "@/lib/hooks/auth/useResetPassword";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const { isPending, handleResetPassword } = useResetPassword();
  return (
    <div className="flex min-h-screen items-center justify-center px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set a new password</CardTitle>
          <CardDescription>
            Choose a new password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              New password
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-8 pr-3 py-2 border border-border rounded-[7px] text-[13.5px] text-text bg-card placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary cursor-pointer"
              >
                {!showPassword ? (
                  <Eye className="w-full" />
                ) : (
                  <EyeOff className="w-full" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type={showConfirmedPassword ? "text" : "password"}
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-8 pr-3 py-2 border border-border rounded-[7px] text-[13.5px] text-text bg-card placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              />
              <button
                onClick={() => setShowConfirmedPassword((prev) => !prev)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary cursor-pointer"
              >
                {!showConfirmedPassword ? (
                  <Eye className="w-full" />
                ) : (
                  <EyeOff className="w-full" />
                )}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full cursor-pointer"
            disabled={isPending}
            onClick={() => handleResetPassword(password, confirmedPassword)}
          >
            {isPending ? "Updating..." : "Update password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
