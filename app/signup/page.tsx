"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillApple } from "react-icons/ai";

type Role = "CUSTOMER" | "ARTISAN";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("CUSTOMER");
  const [category, setCategory] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const validatePhoneNumber = (phone: string): boolean => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    const phoneRegex = /^(0|\+234)[0-9]{10}$/;
    return phoneRegex.test(cleanPhone);
  };

  const onSubmitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("First name and last name are required.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage(
        "Enter a valid Nigerian phone number (11 digits, starting with 0 or +234)."
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (role === "ARTISAN" && !category.trim()) {
      setErrorMessage("Please specify your trade category.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage("You need to accept the terms and privacy policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace(/[\s\-\(\)]/g, ""),
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          role,
          category: role === "ARTISAN" ? category.trim() : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Signup failed. Please try again.");
        return;
      }

      router.push("/dashboard")
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-4xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-10">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">S</span>
              Serviceman
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Sign Up
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Enter your details to create account with Serviceman.
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={onSubmitSignup}>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter your first name"
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter your last name"
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Phone Number</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Enter your phone number"
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Create Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Retype your password"
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Role</span>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as Role)}
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ARTISAN">Artisan</option>
              </select>
            </label>
            {role === "ARTISAN" ? (
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Trade Category</span>
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="e.g., Plumber, Electrician"
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>
            ) : (
              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Select artisan role to add category.
              </div>
            )}
          </div>

          <label className="flex items-start gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(event) => setAgreedToTerms(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <span>
              I agree to the <Link href="#" className="font-semibold text-blue-600 hover:underline">Terms and Conditions</Link> and have reviewed the <Link href="#" className="font-semibold text-blue-600 hover:underline">Privacy Policy</Link>.
            </span>
          </label>

          {errorMessage && <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            <span>Or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-3">
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <FcGoogle className="h-5 w-5" />
              Sign Up with Google
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <FaFacebookF className="h-5 w-5 text-blue-600" />
              Sign Up with Facebook
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <AiOutlineMail className="h-5 w-5" />
              Sign Up with Email
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <AiFillApple className="h-5 w-5" />
              Sign Up with Apple
            </button>
          </div>

          <p className="text-center text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-semibold text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

