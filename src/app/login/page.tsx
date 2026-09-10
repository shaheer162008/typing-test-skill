import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import AuthForm from "@/components/auth-form";

export const metadata: Metadata = { title: "Login | Typing Test Skill", description: "Sign in to save your typing tests and certificates." };

export default function LoginPage() {
  return <div className="min-h-screen bg-[#080908] text-primary"><Navbar /><AuthForm mode="login" /></div>;
}
