import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import AdminDashboard from "@/components/admin-dashboard";

export const metadata: Metadata = { title: "Admin Console | Typing Test Skill", description: "Manage Typing Test Skill content, users, messages, and certificate criteria." };

export default function AdminPage() {
  return <div className="min-h-screen bg-[#080908] text-primary"><Navbar /><AdminDashboard /></div>;
}
