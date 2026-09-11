"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, RotateCcw, X, Award } from "lucide-react";
import { getDifficultyLabel, type DifficultyLevel, type TypingMode } from "@/lib/typing-modes";

type ResultModalProps = {
  wpm: number;
  accuracy: number;
  mistakes: number;
  elapsedMs: number;
  mode: TypingMode;
  durationMinutes?: number | null;
  wordCount?: number | null;
  difficulty: DifficultyLevel;
  completedAt: Date;
  onClose: () => void;
  onRetry: () => void;
};

function formatDuration(milliseconds: number) {
  const totalSeconds = Math.round(milliseconds / 1000);
  return `${Math.floor(totalSeconds / 60)}m ${totalSeconds % 60}s`;
}

export default function ResultModal({
  wpm,
  accuracy,
  mistakes,
  elapsedMs,
  mode,
  durationMinutes,
  wordCount,
  difficulty,
  completedAt,
  onClose,
  onRetry,
}: ResultModalProps) {
  const sessionTitle = mode === "words"
    ? `${wordCount}-word ${getDifficultyLabel(difficulty).toLowerCase()} test`
    : `${durationMinutes}-minute ${mode === "practice" ? "practice" : "typing test"} · ${getDifficultyLabel(difficulty)}`;
  const completionTime = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(completedAt);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-primary/15 bg-[#080808] text-primary shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-primary/10 bg-[#0a0a0a]/95 px-6 py-4 backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary/45">Session complete</p>
            <h2 className="mt-1 text-lg font-medium tracking-[-0.04em]">A clear result to build on.</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/15 text-primary/60 transition hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close result modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6 sm:p-8">
          <div>
            <p className="text-xs text-primary/50">{sessionTitle} · Completed {completionTime}</p>
          </div>

          {/* Stats Grid */}
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Test result summary">
            {[
              ["WPM", wpm],
              ["Accuracy", `${accuracy}%`],
              ["Time", formatDuration(elapsedMs)],
              ["Mistakes", mistakes],
            ].map(([label, value]) => (
              <article key={String(label)} className="border border-primary/15 bg-white/[0.025] p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-primary/40">{label}</p>
                <p className="mt-3 text-2xl font-medium">{value}</p>
              </article>
            ))}
          </section>

          {/* Next Steps */}
          <section className="border-t border-primary/10 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-5 w-5 text-primary/60" />
              <h3 className="text-lg font-medium">What to do next</h3>
            </div>
            <p className="text-sm leading-7 text-primary/55 mb-5">
              Your result is saved. Keep accuracy above 95%, then repeat a longer test to make your speed more consistent.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                href="/dashboard"
                className="flex items-center justify-between border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium transition hover:border-primary/50 hover:bg-primary/10 rounded-lg"
              >
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/typing-practice"
                className="flex items-center justify-between border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium transition hover:border-primary/50 hover:bg-primary/10 rounded-lg"
              >
                Practice more
                <BookOpen className="h-4 w-4" />
              </Link>
              <Link
                href="/certificates"
                className="flex items-center justify-between border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium transition hover:border-primary/50 hover:bg-primary/10 rounded-lg"
              >
                Certificates
                <Award className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="grid gap-3 border-t border-primary/10 pt-6 sm:grid-cols-2">
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-black transition hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RotateCcw className="h-4 w-4" /> Try again
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-primary/20 px-4 py-3 text-sm font-medium transition hover:border-primary/50 hover:bg-primary/5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
