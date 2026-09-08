"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Clock3, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { durations, getDurationHref, getWordHref, wordCounts } from "@/lib/typing-modes";

type ModeSessionPanelProps = { mode: "practice" | "words" };

function getNote(mode: ModeSessionPanelProps["mode"], value: number) {
  if (mode === "words") return value === 25 ? "Quick warm-up" : value === 50 ? "Balanced passage" : value === 75 ? "Rhythm builder" : "Full benchmark";
  return value <= 3 ? "Easy daily start" : value <= 10 ? "Focused practice" : "Deep work session";
}

export default function ModeSessionPanel({ mode }: ModeSessionPanelProps) {
  const isWords = mode === "words";
  const options = isWords ? wordCounts : durations;
  const [selected, setSelected] = useState(isWords ? 50 : 5);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const selectedHref = isWords ? getWordHref(selected) : getDurationHref("practice", selected);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <div className="absolute -inset-3 border border-primary/10 sm:-inset-5" aria-hidden="true" />
      <div className="relative border border-primary/20 bg-primary p-1.5 text-black shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-2">
        <div className="border border-black/20 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">Your next session</p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{isWords ? "Choose your word count." : "Choose your practice time."}</h2>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-primary">{isWords ? <Target className="h-5 w-5" aria-hidden="true" /> : <Clock3 className="h-5 w-5" aria-hidden="true" />}</div>
          </div>

          <div className="mt-8">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-black/55">{isWords ? "Passage length" : "Practice duration"}</span>
            <div className="relative mt-3">
              <button type="button" aria-expanded={isOpen} aria-haspopup="listbox" aria-controls={`${mode}-hero-options`} onClick={() => setIsOpen((open) => !open)} className="flex w-full items-center justify-between border border-black/25 bg-[#f7f5ec] px-4 py-3.5 text-left text-black outline-none transition hover:border-black/60 focus:border-black focus:ring-2 focus:ring-black/20">
                <span><span className="block text-lg font-semibold tracking-[-0.03em]">{isWords ? `${selected} words` : `${selected} minutes`}</span><span className="mt-0.5 block text-xs text-black/50">{getNote(mode, selected)}</span></span>
                <ChevronDown className={`h-5 w-5 text-black/60 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isOpen ? <div id={`${mode}-hero-options`} className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 border border-black/20 bg-[#f7f5ec] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.2)]" role="listbox" aria-label={isWords ? "Choose word count" : "Choose practice duration"}>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">{options.map((value) => <button key={value} type="button" role="option" aria-selected={value === selected} onClick={() => { setSelected(value); setIsOpen(false); }} className={`flex min-h-16 flex-col items-start justify-center border px-3 text-left transition ${value === selected ? "border-black bg-black text-primary" : "border-black/10 text-black hover:border-black/45 hover:bg-black/5"}`}><span className="text-base font-semibold">{isWords ? `${value} words` : `${value} min`}</span><span className={`text-[10px] ${value === selected ? "text-primary/60" : "text-black/45"}`}>{getNote(mode, value)}</span></button>)}</div>
              </div> : null}
            </div>
          </div>

          <Link href={selectedHref} className="group mt-4 flex items-center justify-between bg-black px-5 py-4 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
            {isWords ? `Start the ${selected}-word test` : `Start ${selected}-minute practice`}<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-black/55"><span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" aria-hidden="true" />No account required</span><span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" aria-hidden="true" />Instant feedback</span></div>
        </div>
      </div>
    </div>
  );
}
