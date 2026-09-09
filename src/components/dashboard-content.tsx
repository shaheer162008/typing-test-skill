"use client";

import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Clock3, Gauge, LockKeyhole, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

type TestResult = {
  mode: "test" | "practice" | "words";
  durationMinutes?: number;
  wordCount?: number;
  wpm: number;
  accuracy: number;
  mistakes: number;
  completedAt: string;
  certificateId: string | null;
};

const milestones = [
  { name: "First result", detail: "Complete one typing session", check: (results: TestResult[]) => results.length >= 1 },
  { name: "Clean hands", detail: "Reach 95% accuracy", check: (results: TestResult[]) => results.some((result) => result.accuracy >= 95) },
  { name: "40 WPM", detail: "Reach 40 WPM with 95% accuracy", check: (results: TestResult[]) => results.some((result) => result.wpm >= 40 && result.accuracy >= 95) },
];

function readResults() {
  try {
    return JSON.parse(window.localStorage.getItem("typing-test-results") ?? "[]") as TestResult[];
  } catch {
    return [];
  }
}

export default function DashboardContent() {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const refresh = () => setResults(readResults());
    refresh();
    window.addEventListener("typing-test-result", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("typing-test-result", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const bestSpeed = results.length ? Math.max(...results.map((result) => result.wpm)) : 0;
  const bestAccuracy = results.length ? Math.max(...results.map((result) => result.accuracy)) : 0;
  const stats = [
    { label: "Best speed", value: bestSpeed ? `${bestSpeed} WPM` : "--", icon: Gauge },
    { label: "Best accuracy", value: bestAccuracy ? `${bestAccuracy}%` : "--", icon: Target },
    { label: "Tests completed", value: results.length, icon: Clock3 },
    { label: "Certificates", value: results.filter((result) => result.certificateId).length, icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#080908] text-primary">
      <div className="shrink-0"><Navbar /></div>
      <main className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 md:px-10 md:py-10">
        <div className="flex shrink-0 flex-col justify-between gap-4 border-b border-primary/10 pb-6 sm:flex-row sm:items-end">
          <div><p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary/50">Dashboard</p><h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Your progress, at a glance.</h1></div>
          <Link href="/typing-test/1-minute" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5">Start a test <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <section className="shrink-0 border-b border-primary/10 py-5" aria-label="Typing statistics">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => { const Icon = stat.icon; return <article key={stat.label} className="border border-primary/15 bg-white/[0.02] p-5"><Icon className="h-5 w-5 text-primary/60" aria-hidden="true" /><p className="mt-8 text-xs uppercase tracking-[0.16em] text-primary/40">{stat.label}</p><p className="mt-2 text-3xl font-medium tracking-[-0.04em]">{stat.value}</p></article>; })}
          </div>
        </section>

        <div className="grid gap-8 py-7 lg:grid-cols-[1.2fr_0.8fr]">
          <section aria-labelledby="recent-tests-title"><div className="flex items-end justify-between border-b border-primary/10 pb-3"><div><p className="text-xs uppercase tracking-[0.18em] text-primary/45">History</p><h2 id="recent-tests-title" className="mt-2 text-2xl font-medium">Recent tests</h2></div><TrendingUp className="h-5 w-5 text-primary/45" aria-hidden="true" /></div>{results.length ? <div className="divide-y divide-primary/10">{results.slice(0, 6).map((result, index) => <div key={`${result.completedAt}-${index}`} className="flex items-center justify-between gap-4 py-3"><div><p className="text-sm font-medium">{result.mode === "words" ? `${result.wordCount}-word test` : `${result.durationMinutes}-minute ${result.mode}`}</p><p className="mt-1 text-xs text-primary/45">{new Date(result.completedAt).toLocaleDateString()} · {result.mistakes} mistakes</p></div><div className="text-right"><p className="font-variant-numeric text-lg font-medium">{result.wpm} WPM</p><p className="text-xs text-primary/45">{result.accuracy}% accuracy</p></div></div>)}</div> : <div className="border border-dashed border-primary/15 px-5 py-8 text-sm text-primary/50">Your completed sessions will appear here. Start with a one-minute test.</div>}</section>

          <section aria-labelledby="certificates-title"><div className="border-b border-primary/10 pb-4"><p className="text-xs uppercase tracking-[0.18em] text-primary/45">Milestones</p><h2 id="certificates-title" className="mt-2 text-2xl font-medium">Certificate progress</h2></div><div className="divide-y divide-primary/10">{milestones.map((milestone) => { const unlocked = milestone.check(results); const certificate = results.find((result) => result.certificateId); return <div key={milestone.name} className="flex items-center gap-4 py-4"><div className={`flex h-10 w-10 shrink-0 items-center justify-center border ${unlocked ? "border-primary/40 bg-primary text-black" : "border-primary/15 text-primary/35"}`}>{unlocked ? <CheckCircle2 className="h-5 w-5" /> : <LockKeyhole className="h-4 w-4" />}</div><div><p className="text-sm font-medium">{milestone.name}</p><p className="mt-1 text-xs text-primary/45">{unlocked ? "Unlocked" : milestone.detail}</p>{unlocked && certificate?.certificateId ? <p className="mt-1 font-mono text-[10px] text-primary/55">ID: {certificate.certificateId}</p> : null}</div></div>; })}</div><Link href="/certificates" className="mt-5 inline-flex items-center gap-2 text-sm text-primary/65 underline decoration-primary/25 underline-offset-4">Verify a certificate <ArrowRight className="h-4 w-4" /></Link></section>
        </div>
      </main>
    </div>
  );
}
