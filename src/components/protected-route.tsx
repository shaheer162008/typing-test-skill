"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import { useAuth } from "@/components/auth-provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
}

export function ProtectedRoute({ children, loadingFallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPath = searchParams.get("_path") || typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    if (loading) return;

    if (!user) {
      // Redirect to login with redirect parameter
      const redirectPath = encodeURIComponent(currentPath || "/dashboard");
      router.push(`/login?redirect=${redirectPath}`);
    }
  }, [user, loading, router, currentPath]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080908] text-primary">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-12 text-primary/60">
          {loadingFallback || "Loading…"}
        </main>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect above
  }

  return <>{children}</>;
}
