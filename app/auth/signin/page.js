"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-2">Name.AI</h1>
                    <p className="text-muted-foreground">Sign in to continue</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                        <FaGoogle className="w-5 h-5" />
                        <span>Continue with Google</span>
                    </button>

                    <button
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                        <FaGithub className="w-5 h-5" />
                        <span>Continue with GitHub</span>
                    </button>

                    <button
                        onClick={() => signIn("twitter", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                        <FaTwitter className="w-5 h-5" />
                        <span>Continue with Twitter</span>
                    </button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}
