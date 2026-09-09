"use client";

import { useState } from "react";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtp } from "@/lib/hooks/auth/useVerifyOtp";
import { otpType } from "@/types/authTypes";
import { useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");

  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as otpType) ?? "register";

  const { submitOtp, isPending, handleResend, isResending, email } =
    useVerifyOtp(type);

  return (
    <div className="flex min-h-screen items-center justify-center px-8 bg-background dark:bg-dark-background">
      <Card className="w-full max-w-md bg-card dark:bg-dark-card border-border dark:border-dark-border">
        <CardHeader>
          <CardTitle className="text-text dark:text-dark-text">
            Verify your email
          </CardTitle>
          <CardDescription className="text-text-secondary dark:text-dark-text-secondary">
            Enter the verification code we sent to:{" "}
            <span className="font-medium text-text dark:text-dark-text">
              {email}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[12.5px] font-medium text-text dark:text-dark-text">
              Verification code
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResend}
              disabled={isResending}
              className="cursor-pointer border-border dark:border-dark-border text-text dark:text-dark-text hover:bg-background dark:hover:bg-dark-background"
            >
              <RefreshCwIcon className={isResending ? "animate-spin" : ""} />
              {isResending ? "Sending..." : "Resend Code"}
            </Button>
          </div>

          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:bg-background *:data-[slot=input-otp-slot]:dark:bg-dark-background *:data-[slot=input-otp-slot]:border-border *:data-[slot=input-otp-slot]:dark:border-dark-border *:data-[slot=input-otp-slot]:text-text *:data-[slot=input-otp-slot]:dark:text-dark-text">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator className="mx-2 text-text-secondary dark:text-dark-text-secondary" />

            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:bg-background *:data-[slot=input-otp-slot]:dark:bg-dark-background *:data-[slot=input-otp-slot]:border-border *:data-[slot=input-otp-slot]:dark:border-dark-border *:data-[slot=input-otp-slot]:text-text *:data-[slot=input-otp-slot]:dark:text-dark-text">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full cursor-pointer bg-primary hover:bg-primaryHover text-white"
            onClick={() => submitOtp(otp)}
            disabled={isPending || otp.length < 6}
          >
            {isPending ? "Verifying..." : "Verify email"}
          </Button>

          <p className="text-center text-[12px] text-text-secondary dark:text-dark-text-secondary">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}