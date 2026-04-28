"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from "react";

type SignupStep = "signup" | "otp" | "verified";

const OTP_LENGTH = 6;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SignupPage() {
  const [step, setStep] = useState<SignupStep>("signup");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const maskedPhone = useMemo(() => {
    if (phoneNumber.length < 4) return phoneNumber;
    return `${phoneNumber.slice(0, 4)}${"*".repeat(Math.max(phoneNumber.length - 7, 0))}${phoneNumber.slice(-3)}`;
  }, [phoneNumber]);

  const sendOtp = async (phone: string) => {
    // TODO: replace with POST /api/auth/send-otp when backend phone verification is added.
    await wait(700);
    return { ok: Boolean(phone) };
  };

  const verifyOtp = async (phone: string, code: string) => {
    // TODO: replace with POST /api/auth/verify-otp and issue JWT only after successful OTP verification.
    await wait(700);
    return { ok: Boolean(phone) && code.length === OTP_LENGTH };
  };

  const onSubmitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }

    if (!/^\d{10,15}$/.test(phoneNumber.trim())) {
      setErrorMessage("Enter a valid phone number (10 to 15 digits).");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("You need to accept the terms and privacy policy.");
      return;
    }

    setIsSubmitting(true);
    const response = await sendOtp(phoneNumber.trim());
    setIsSubmitting(false);

    if (!response.ok) {
      setErrorMessage("We could not send a code. Please try again.");
      return;
    }

    setStep("otp");
  };

  const onSubmitOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const code = otpDigits.join("");
    if (code.length !== OTP_LENGTH) {
      setErrorMessage("Please enter the full 6-digit code.");
      return;
    }

    setIsSubmitting(true);
    const response = await verifyOtp(phoneNumber.trim(), code);
    setIsSubmitting(false);

    if (!response.ok) {
      setErrorMessage("Invalid code. Please try again.");
      return;
    }

    setStep("verified");
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtpDigits((current) => {
      const updated = [...current];
      updated[index] = digit;
      return updated;
    });

    if (digit && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!cleaned) return;

    const updated = Array(OTP_LENGTH).fill("");
    cleaned.split("").forEach((digit, index) => {
      updated[index] = digit;
    });
    setOtpDigits(updated);

    const targetIndex = Math.min(cleaned.length, OTP_LENGTH - 1);
    otpInputRefs.current[targetIndex]?.focus();
  };

  const resendCode = async () => {
    setErrorMessage("");
    setIsSubmitting(true);
    const response = await sendOtp(phoneNumber.trim());
    setIsSubmitting(false);

    if (!response.ok) {
      setErrorMessage("Unable to resend code right now. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image src="/painter.png" alt="Artisan working in workshop" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/25" />

      <section className="relative z-10 flex min-h-screen items-center px-6 py-10 md:px-12">
        <div className="w-full max-w-xl rounded-3xl bg-[#f3f4f8] px-8 py-10 shadow-2xl md:px-10">
          <div className="mb-10 flex items-center gap-2 font-semibold text-gray-900">
            <span role="img" aria-label="Serviceman logo">
              🛠️
            </span>
            <span className="text-2xl">Serviceman</span>
          </div>

          {step === "signup" && (
            <form className="space-y-5" onSubmit={onSubmitSignup}>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Please enter your details to start your journey with Serviceman
                </p>
              </div>

              <label className="block text-sm text-gray-700">
                Full Name
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your surname first"
                  className="mt-2 w-full rounded-md border border-blue-200 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="block text-sm text-gray-700">
                Phone Number
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value.replace(/[^\d]/g, ""))}
                  placeholder="Enter your phone number"
                  className="mt-2 w-full rounded-md border border-blue-200 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="flex items-start gap-3 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(event) => setAgreedToTerms(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300"
                />
                <span>
                  I agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and have reviewed the{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
                <span aria-hidden>↗</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="h-px flex-1 bg-gray-300" />
                <span>Or</span>
                <span className="h-px flex-1 bg-gray-300" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-blue-200 bg-transparent px-4 py-2.5 text-sm text-gray-700 transition hover:bg-blue-50"
              >
                <span className="text-base" aria-hidden>
                  🌐
                </span>
                Sign up with Google
              </button>

              <p className="text-center text-sm text-gray-600">
                I have an account ?{" "}
                <Link href="/login" className="font-medium text-gray-800 hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          )}

          {step === "otp" && (
            <form className="space-y-7" onSubmit={onSubmitOtp}>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Get Verified!</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Kindly enter the six-digit code sent to{" "}
                  <span className="font-medium text-blue-600">{maskedPhone}</span> for your phone number verification
                </p>
              </div>

              <div className="flex gap-3">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpInputRefs.current[index] = element;
                    }}
                    value={digit}
                    inputMode="numeric"
                    maxLength={1}
                    onChange={(event) => handleOtpChange(index, event.target.value)}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                    onPaste={(event) => {
                      event.preventDefault();
                      handleOtpPaste(event.clipboardData.getData("text"));
                    }}
                    className="h-12 w-12 rounded-md border border-blue-200 bg-blue-100/60 text-center text-lg font-semibold text-gray-900 outline-none transition focus:border-blue-500"
                  />
                ))}
              </div>

              {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Didn&apos;t receive a code ?{" "}
                <button
                  type="button"
                  onClick={resendCode}
                  className="font-medium text-blue-600 transition hover:underline"
                >
                  Resend code
                </button>
              </p>
            </form>
          )}

          {step === "verified" && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-2xl text-blue-600">
                ✓
              </div>
              <h1 className="text-4xl font-semibold text-gray-900">Verified!</h1>
              <p className="mt-3 max-w-sm text-sm text-gray-600">
                Your phone number has been successfully verified. You are ready to start with Serviceman.
              </p>

              <Link
                href="/"
                className="mt-8 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Continue
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
