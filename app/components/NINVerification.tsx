"use client";

import { FormEvent, useState } from "react";

interface NINVerificationProps {
  onVerificationSuccess?: () => void;
  onVerificationError?: (error: string) => void;
}

export default function NINVerification({ onVerificationSuccess, onVerificationError }: NINVerificationProps) {
  const [nin, setNin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateNIN = (value: string): boolean => {
    // NIN should be exactly 11 digits
    const ninRegex = /^[0-9]{11}$/;
    return ninRegex.test(value);
  };

  const handleNINChange = (value: string) => {
    // Only allow digits and limit to 11 characters
    const cleanValue = value.replace(/\D/g, "").slice(0, 11);
    setNin(cleanValue);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const onSubmitNIN = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateNIN(nin)) {
      const error = "Please enter a valid 11-digit NIN";
      setErrorMessage(error);
      onVerificationError?.(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/artisan/verify-nin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nin }),
      });

      const data = await response.json();

      if (!response.ok) {
        const error = data.error || "NIN verification failed";
        setErrorMessage(error);
        onVerificationError?.(error);
        return;
      }

      const success = "NIN verified successfully! You are now a verified artisan.";
      setSuccessMessage(success);
      onVerificationSuccess?.();
    } catch (error) {
      const errorMsg = "Network error. Please check your connection and try again.";
      setErrorMessage(errorMsg);
      onVerificationError?.(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verify Your Identity</h2>
          <p className="text-sm text-gray-600">
            As an artisan, please verify your identity with your National Identification Number (NIN)
          </p>
        </div>

        <form onSubmit={onSubmitNIN} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            National Identification Number (NIN)
            <input
              type="text"
              value={nin}
              onChange={(event) => handleNINChange(event.target.value)}
              placeholder="Enter your 11-digit NIN"
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              maxLength={11}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter exactly 11 digits (numbers only)
            </p>
          </label>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="rounded-md bg-green-50 p-3">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || nin.length !== 11}
            className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:hover:bg-blue-400"
          >
            {isSubmitting ? "Verifying..." : "Verify NIN"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your NIN is required for verification and will be securely stored.
            This helps maintain trust and quality in our artisan community.
          </p>
        </div>
      </div>
    </div>
  );
}