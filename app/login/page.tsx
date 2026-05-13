"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!phoneNumber.trim()) {
      setErrorMessage("Phone number is required.");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace(/[\s\-\(\)]/g, ''), // Clean phone number
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Login failed. Please try again.");
        return;
      }

      // Redirect to dashboard or appropriate page
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-4xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-10">
        <div className="mb-8 flex flex-col gap-4">
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">S</span>
            Serviceman
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back Ogooluwa! 👋
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Enter your details to log in to your account.
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={onSubmitLogin}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Phone Number / Email</span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Enter your phone number or email"
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </label>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <div />
            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          {errorMessage && <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-3">
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <FaFacebookF className="h-5 w-5 text-blue-600" />
              Log In with Facebook
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <AiFillApple className="h-5 w-5" />
              Log In with Apple
            </button>
          </div>

          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account? <Link href="/signup" className="font-semibold text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
