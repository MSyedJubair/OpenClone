"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Added for redirection

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const router = useRouter();

  const handleSignup = async () => {
    // Basic validation to prevent unnecessary API calls
    if (!email || !password || !name) {
      return toast.error("Please fill in all fields");
    }

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Account created successfully!");
          router.push("/dashboard"); // Redirect the user
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-brand-indigo via-brand-purple to-brand-pink bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-gray-400 mb-6">Start your journey 🚀</p>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={isLoading} // Prevent double submissions
          className="w-full mt-6 py-3 rounded-lg bg-linear-to-r from-brand-indigo via-brand-purple to-brand-pink font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <a href="/sign-in" className="text-brand-indigo hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}