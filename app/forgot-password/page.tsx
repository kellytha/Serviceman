"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!identifier.trim()) {
      setMessage("Please enter your phone number or email.");
      return;
    }

    setIsSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMessage("If this account exists, a reset link has been sent.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-4xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Forget password</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Enter your details to reset your password.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Phone Number / Email</span>
            <input
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="08012345678 or email@example.com"
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </label>

          {message && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{message}</p>}

          <button
            type="submit"
            disabled={isSending}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Back to Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
