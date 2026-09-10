"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth-provider";

type AuthFormProps = { mode: "login" | "signup" };

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus(null);
    setBusy(true);
    try {
      if (isSignup) {
        await signUpWithEmail(name, email, password);
        setStatus("Account created. Check your email to verify the account, then sign in.");
        setName("");
        setPassword("");
      } else {
        await signInWithEmail(email, password);
        router.push("/dashboard");
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Google sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const forgotPassword = async () => {
    if (!email.trim()) {
      setError("Enter your email first, then request a reset link.");
      return;
    }
    setError(null);
    setStatus(null);
    setBusy(true);
    try {
      await resetPassword(email);
      setStatus("Password reset email sent. Check your inbox.");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Could not send the reset email.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100dvh-81px)] items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-md border border-primary/15 bg-white/[0.025] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/45">Typing Test Skill</p>
        <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em]">{isSignup ? "Create your account." : "Welcome back."}</h1>
        <p className="mt-3 text-sm leading-6 text-primary/55">{isSignup ? "Save results, track your progress, and earn verified certificates." : "Sign in to access your saved tests and certificates."}</p>

        <button type="button" onClick={google} disabled={busy} className="mt-7 flex min-h-12 w-full items-center justify-center border border-primary/20 bg-white/[0.04] px-4 text-sm font-medium transition hover:bg-white/[0.08] disabled:cursor-wait disabled:opacity-60">Continue with Google</button>
        <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-primary/35"><span className="h-px flex-1 bg-primary/10" />or<span className="h-px flex-1 bg-primary/10" /></div>

        <form onSubmit={submit} className="space-y-4">
          {isSignup && <div><label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.14em] text-primary/50">Name</label><input id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" className="min-h-12 w-full border border-primary/20 bg-black/30 px-3 text-base outline-none focus:border-primary/60" /></div>}
          <div><label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.14em] text-primary/50">Email</label><input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" spellCheck={false} className="min-h-12 w-full border border-primary/20 bg-black/30 px-3 text-base outline-none focus:border-primary/60" /></div>
          <div><label htmlFor="password" className="mb-2 block text-xs uppercase tracking-[0.14em] text-primary/50">Password</label><input id="password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete={isSignup ? "new-password" : "current-password"} className="min-h-12 w-full border border-primary/20 bg-black/30 px-3 text-base outline-none focus:border-primary/60" /></div>
          <button type="submit" disabled={busy} className="min-h-12 w-full bg-primary px-5 text-sm font-semibold text-black transition hover:bg-primary/85 disabled:cursor-wait disabled:opacity-60">{busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}</button>
        </form>

        {!isSignup && <button type="button" onClick={forgotPassword} disabled={busy} className="mt-4 text-sm text-primary/60 underline decoration-primary/25 underline-offset-4 hover:text-primary">Forgot password?</button>}
        {error && <p className="mt-5 border border-red-300/25 bg-red-300/[0.05] p-3 text-sm text-red-100" role="alert">{error}</p>}
        {status && <p className="mt-5 border border-emerald-300/25 bg-emerald-300/[0.05] p-3 text-sm text-emerald-100" role="status">{status}</p>}
        <p className="mt-7 text-center text-sm text-primary/50">{isSignup ? "Already have an account?" : "New here?"} <Link href={isSignup ? "/login" : "/signup"} className="text-primary underline decoration-primary/25 underline-offset-4">{isSignup ? "Sign in" : "Create an account"}</Link></p>
      </section>
    </main>
  );
}
