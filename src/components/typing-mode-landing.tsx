"use client";

import { useState } from "react";
import TypingTestPage from "@/components/typing-test-page";
import { modeCopy, type TypingMode } from "@/lib/typing-modes";

type TypingModeLandingProps = {
  mode: TypingMode;
  durationMinutes?: number;
  wordCount?: number;
};

export default function TypingModeLanding({ mode, durationMinutes, wordCount }: TypingModeLandingProps) {
  const [started, setStarted] = useState(false);
  const [lesson, setLesson] = useState("lesson-1");
  const copy = modeCopy[mode];
  const sessionName = mode === "words" ? `${wordCount}-word typing test` : `${durationMinutes}-minute ${mode === "practice" ? "typing practice" : "typing test"}`;

  if (started) return <TypingTestPage mode={mode} durationMinutes={durationMinutes} wordCount={wordCount} />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-3xl border border-primary/15 bg-white/[0.025] shadow-[0_24px_100px_rgba(0,0,0,0.3)]">
          <div className="border-b border-primary/10 px-5 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-primary/40">
              <span>{copy.label}</span>
              <span>Typing Test Skill</span>
            </div>
          </div>
          <div className="grid gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-14 lg:py-20">
            <article>
              <p className="text-xs uppercase tracking-[0.18em] text-primary/45">Your session</p>
              <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">{sessionName}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-primary/55">{copy.description} Settle into a comfortable rhythm, keep your eyes on the next character, and let the feedback guide your progress.</p>
              <div className="mt-8 grid gap-3 border-t border-primary/10 pt-6 text-sm text-primary/55 sm:grid-cols-3">
                <div><span className="block text-lg font-medium text-primary">Live</span>WPM tracking</div>
                <div><span className="block text-lg font-medium text-primary">Clear</span>accuracy feedback</div>
                <div><span className="block text-lg font-medium text-primary">Calm</span>focused interface</div>
              </div>
            </article>
            <div className="flex flex-col justify-end rounded-2xl border border-primary/15 bg-black/35 p-5 sm:p-6">
              <label className="text-xs uppercase tracking-[0.16em] text-primary/45" htmlFor="lesson-select">Choose a lesson</label>
              <select id="lesson-select" value={lesson} onChange={(event) => setLesson(event.target.value)} className="mt-3 w-full rounded-xl border border-primary/15 bg-white/[0.04] px-4 py-3 text-sm text-primary outline-none focus:border-primary/45">
                <option value="lesson-1" className="bg-[#111]">Lesson 01 · Home row</option>
                <option value="lesson-2" className="bg-[#111]">Lesson 02 · Common words</option>
                <option value="lesson-3" className="bg-[#111]">Lesson 03 · Mixed rhythm</option>
              </select>
              <button type="button" onClick={() => setStarted(true)} className="mt-4 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-primary/85">Start {mode === "practice" ? "practice" : "test"}</button>
              <p className="mt-4 text-center text-xs leading-5 text-primary/35">No account required. Your result appears as soon as you finish.</p>
            </div>
          </div>
        </div>
        <section className="mx-auto mt-12 max-w-3xl border-t border-primary/10 pt-8 text-sm leading-7 text-primary/50">
          <p>{copy.seo} This {sessionName.toLowerCase()} is designed for focused repetition, with a clean reading passage and immediate performance feedback.</p>
        </section>
      </main>
    </div>
  );
}
