"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock3, Sparkles } from "lucide-react";
import { useState } from "react";
import type { TypingMode } from "@/lib/typing-modes";
import { useFirestoreLessons } from "@/lib/firestore-lessons";

type DurationLessonPickerProps = { mode: Exclude<TypingMode, "words">; duration: number };

export default function DurationLessonPicker({ mode, duration }: DurationLessonPickerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lessons: firestoreLessons, loading, error } = useFirestoreLessons(`${mode === "practice" ? "practice" : "timed"}-${duration}-minute`);
  const lessons = firestoreLessons.map((item) => ({ id: item.id, title: item.title, label: `Lesson ${String(item.order).padStart(2, "0")}`, preview: item.text, description: item.focus ?? "Focused typing practice." }));
  const lesson = lessons[Math.min(activeIndex, Math.max(lessons.length - 1, 0))];
  const startHref = lesson ? `/test?mode=${mode}&duration=${duration}&lesson=${lesson.id}` : "#";
  const move = (direction: number) => setActiveIndex((current) => (current + direction + lessons.length) % lessons.length);
  const sessionLabel = mode === "practice" ? "practice" : "test";

  return (
    <div className="relative">
      <div className="absolute -inset-3 border border-primary/10 sm:-inset-5" aria-hidden="true" />
      <div className="relative border border-primary/20 bg-primary p-1.5 text-black shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-2">
        <div className="border border-black/20 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50"><Sparkles className="h-3 w-3" aria-hidden="true" /> Choose a lesson</p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{loading ? "Loading lesson…" : lesson?.title ?? "Lessons unavailable"}</h2>
              <p className="mt-1 text-xs text-black/50">{loading ? "Connecting to Firestore" : error ?? `${lesson?.label ?? "No lesson"} · ${duration} minute ${sessionLabel}`}</p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-primary"><Clock3 className="h-5 w-5" aria-hidden="true" /></div>
          </div>

          <div className="mt-7 border border-black/20 bg-[#f7f5ec] p-4 text-black sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-black/45">Lesson preview</p>
                <p className="mt-3 text-lg font-medium leading-relaxed tracking-[-0.02em] sm:text-xl">{lesson?.preview ?? "The lesson preview will appear here when Firestore responds."}</p>
                <p className="mt-3 text-xs leading-5 text-black/55">{lesson?.description ?? "No local placeholder lesson is being shown."}</p>
          </div>

          <div className="mt-5 grid gap-2 text-xs text-black/60 sm:grid-cols-3">
            {[`${duration}-minute session`, "Live WPM", "Instant result"].map((item) => <span key={item} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" aria-hidden="true" />{item}</span>)}
          </div>

          <Link href={startHref} aria-disabled={!lesson} onClick={(event) => { if (!lesson) event.preventDefault(); }} className={`group mt-5 flex items-center justify-between bg-black px-5 py-4 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${lesson ? "" : "pointer-events-none opacity-50"}`}>
            Start {duration}-minute {sessionLabel} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <div className="mt-5 flex items-center justify-between gap-4">
            <button type="button" onClick={() => move(-1)} aria-label="Previous lesson" className="flex h-9 w-9 items-center justify-center border border-black/20 transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></button>
            <div className="flex items-center gap-2" aria-label="Lesson selector">
              {lessons.map((item, index) => <button key={item.label} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${item.title}`} aria-pressed={index === activeIndex} className={`h-2 transition-all ${index === activeIndex ? "w-8 bg-black" : "w-2 bg-black/25"}`} />)}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Next lesson" className="flex h-9 w-9 items-center justify-center border border-black/20 transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"><ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
