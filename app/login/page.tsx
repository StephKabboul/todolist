"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/utils/services/login";

const MIN_PASSWORD_LENGTH = 6;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    let hasError = false;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    // Password validation
    if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(
        `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`,
      );
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const result = await login(formData);

    if (result?.error) {
      setEmailError(result.error);
      setPasswordError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your tasks
          </p>
        </div>

        {/* General login error */}
        {loginError && (
          <div className="mb-5 text-sm text-red-700">{loginError}</div>
        )}

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                setLoginError("");
              }}
              placeholder="you@example.com"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                emailError
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              }`}
            />

            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                setLoginError("");
              }}
              placeholder="Enter your password"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                passwordError
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              }`}
            />

            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-teal-600 hover:text-teal-700"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
