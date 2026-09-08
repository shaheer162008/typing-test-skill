import Link from "next/link";
import { ArrowUpRight, ChartNoAxesColumnIncreasing, Clock3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TypingMode } from "@/lib/typing-modes";

type ModeHeroProps = {
  mode: TypingMode;
  title: string;
  description: string;
  eyebrow?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export default function ModeHero({ mode, title, description, eyebrow, primaryHref, primaryLabel }: ModeHeroProps) {
  const isPractice = mode === "practice";
  const isWords = mode === "words";
  const Icon = isWords ? Target : isPractice ? ChartNoAxesColumnIncreasing : Clock3;
  const accent = isWords ? "text-lime-200" : isPractice ? "text-sky-200" : "text-amber-100";
  const modeLabel = isWords ? "Fixed word count" : isPractice ? "Pressure-free practice" : "Timed performance";

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-black px-4 py-24 text-primary sm:px-8 md:px-16 md:py-32">
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute -bottom-48 -left-20 h-96 w-96 rounded-full border border-primary/10" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-primary/70"><Icon className={`h-3.5 w-3.5 ${accent}`} aria-hidden="true" />{eyebrow ?? modeLabel}</div>
        <div className="mx-auto max-w-4xl"><h1 className="text-balance text-4xl font-medium leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">{title}</h1><p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-primary/60 sm:text-lg">{description}</p></div>
        {primaryHref && primaryLabel && <div className="mt-10 flex justify-center"><Button asChild size="lg"><Link href={primaryHref}>{primaryLabel}<ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div>}
        <p className="mt-8 text-xs text-primary/40">{isWords ? "Choose a passage length and type at your own pace." : isPractice ? "Repeat often, improve steadily, and keep the pressure low." : "Choose a duration and get a clear read on your typing."}</p>
      </div>
    </section>
  );
}
