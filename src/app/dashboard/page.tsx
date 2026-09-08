import Link from "next/link";
import { ArrowRight, Gauge, History, Target, TrendingUp } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const stats = [
  { label: "Best speed", value: "--", icon: Gauge },
  { label: "Best accuracy", value: "--", icon: Target },
  { label: "Tests completed", value: "--", icon: History },
  { label: "Current streak", value: "--", icon: TrendingUp },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#080908] text-primary">
      <Navbar />
      <main>
        <section className="border-b border-primary/10 px-6 py-20 sm:px-8 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-primary/50">Your progress</p>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <h1 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-7xl">Make every session count.</h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-primary/55 sm:text-lg">Your speed, accuracy, practice history, and personal bests will live here once you start testing.</p>
              </div>
              <Link href="/typing-test/1-minute" className="group inline-flex items-center gap-3 self-start bg-primary px-5 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5 lg:self-end">Start a test<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </div>
        </section>

        <section className="border-b border-primary/10 px-6 py-16 sm:px-8 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return <article key={stat.label} className="border border-primary/15 bg-white/[0.02] p-6"><Icon className="h-5 w-5 text-primary/60" aria-hidden="true" /><p className="mt-10 text-xs uppercase tracking-[0.16em] text-primary/40">{stat.label}</p><p className="mt-2 text-4xl font-medium tracking-[-0.05em]">{stat.value}</p></article>;
              })}
            </div>
            <div className="mt-3 border border-primary/15 bg-primary/[0.04] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-primary/45">Getting started</p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">Your first result is one minute away.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-primary/55">Take a free test without signing in. Create an account later when you want to keep your history and compare your progress.</p>
              <Link href="/typing-test/1-minute" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4">Take your first test<ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
