import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import AuthForm from "@/components/auth-form";

export const metadata: Metadata = { title: "Sign Up | Typing Test Skill", description: "Create an account to save your typing tests and certificates." };

export default function SignupPage() {
  return <div className="min-h-screen bg-[#080908] text-primary"><Navbar /><AuthForm mode="signup" /></div>;
}
