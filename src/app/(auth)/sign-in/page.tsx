"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // For redirection
import { Loader2 } from "lucide-react"; // Optional: for a nice spinner

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const router = useRouter();

  const handleSignin = async () => {
    // Basic guard
    if (!email || !password) {
      return toast.error("Please enter both email and password");
    }

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
        rememberMe: true,
      },
      {
        // 2. Use callbacks for cleaner state management
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success("Successfully Signed In");
          router.push("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message || "Invalid credentials");
          console.error(ctx.error);
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-brand-indigo via-brand-purple to-brand-pink bg-clip-text text-transparent inline-block">
          Welcome Back
        </h1>
        <p className="text-gray-400 mb-6">Sign in to continue</p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo disabled:opacity-50"
            placeholder="Email"
            type="email"
            value={email} // Controlled input
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} // Disable input while loading
          />

          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-purple disabled:opacity-50"
            placeholder="Password"
            value={password} // Controlled input
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading} // Disable input while loading
          />
        </div>

        {/* Button with Loading Logic */}
        <button
          onClick={handleSignin}
          disabled={isLoading}
          className="w-flex justify-center items-center w-full mt-6 py-3 rounded-lg bg-linear-to-r from-brand-indigo via-brand-purple to-brand-pink font-semibold hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-brand-purple hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}