"use client";

import { useEffect, useState } from "react";
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
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const { submitOtp, isPending, handleResend, isResending } =
    useVerifyOtp(email);

  useEffect(() => {
    const stored = sessionStorage.getItem("verify_email");

    if (!stored) {
      toast.error("Session expired, please register again");
      return;
    }

    setEmail(stored);
  }, []);

  const handleSubmit = () => {
    if (otp.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    submitOtp(otp);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Enter the verification code we sent to:{" "}
            <span className="font-medium text-text">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[12.5px] font-medium text-text">
              Verification code
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResend}
              disabled={isResending}
            >
              <RefreshCwIcon className={isResending ? "animate-spin" : ""} />
              {isResending ? "Sending..." : "Resend Code"}
            </Button>
          </div>

          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator className="mx-2" />

            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isPending || otp.length < 6}
          >
            {isPending ? "Verifying..." : "Verify email"}
          </Button>

          <p className="text-center text-[12px] text-text-secondary">
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
