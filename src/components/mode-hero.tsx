import Link from "next/link";
import { ArrowRight, ChartNoAxesColumnIncreasing, Check, Clock3, Target } from "lucide-react";
import type { ReactNode } from "react";
import type { TypingMode } from "@/lib/typing-modes";

type ModeHeroProps = {
  mode: TypingMode;
  title: string;
  description: string;
  eyebrow?: string;
  primaryHref?: string;
  primaryLabel?: string;
  sessionPanel?: ReactNode;
};

export default function ModeHero({ mode, title, description, eyebrow, primaryHref, primaryLabel, sessionPanel }: ModeHeroProps) {
  const isPractice = mode === "practice";
  const isWords = mode === "words";
  const Icon = isWords ? Target : isPractice ? ChartNoAxesColumnIncreasing : Clock3;
  const modeLabel = isWords ? "Fixed word count" : isPractice ? "Pressure-free practice" : "Timed performance";
  const actionLabel = primaryLabel ?? (isWords ? "Try 50 words" : isPractice ? "Start 5 minute practice" : "Start 1 minute test");
  const proofPoints = isWords
    ? ["No countdown pressure", "Fixed passage length", "WPM and accuracy result"]
    : ["Live WPM tracking", "Accuracy feedback", "Repeatable sessions"];

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-black text-primary">
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute -bottom-48 -left-20 h-96 w-96 rounded-full border border-primary/10" />
      <div className="relative mx-auto grid min-h-[min(78svh,720px)] max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-12">
        <div>
          <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/50">
            <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
            {eyebrow ?? modeLabel}
          </p>
          <h1 className="max-w-3xl text-balance text-5xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-[6.4rem]">{title}</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-primary/60 sm:text-lg">{description}</p>
          <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs text-primary/65 sm:text-sm" aria-label={`${modeLabel} benefits`}>
            {proofPoints.map((point) => <li key={point} className="flex items-center gap-2 whitespace-nowrap"><Check className="h-4 w-4 text-primary" aria-hidden="true" />{point}</li>)}
          </ul>
        </div>

        <div className="relative">
          {sessionPanel ?? (
            <>
          <div className="absolute -inset-3 border border-primary/10 sm:-inset-5" aria-hidden="true" />
          <div className="relative border border-primary/20 bg-primary p-1.5 text-black shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-2">
            <div className="border border-black/20 p-5 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">Your next session</p>
                  <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{isWords ? "Set the finish line." : "Choose your pace."}</h2>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></div>
              </div>
              <div className="mt-9 border border-black/20 bg-[#f7f5ec] p-4 text-black">
                <p className="text-xs uppercase tracking-[0.16em] text-black/50">{isWords ? "Recommended start" : "Recommended session"}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{isWords ? "50 words" : "5 minutes"}</p>
                <p className="mt-1 text-xs text-black/50">{isWords ? "Balanced passage" : "Focused practice"}</p>
              </div>
              {primaryHref ? <Link href={primaryHref} className="group mt-4 flex items-center justify-between bg-black px-5 py-4 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary">{actionLabel}<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link> : null}
              <p className="mt-5 text-center text-xs text-black/50">{isWords ? "Type at your own pace. No countdown." : "Repeat often, improve steadily."}</p>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
