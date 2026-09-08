"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Keyboard, Timer } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModeBenefits from "@/components/mode-benefits";
import ModeFaq from "@/components/mode-faq";
import { durations, getDurationHref } from "@/lib/typing-modes";

const benefits = [
  "No account required",
  "Instant WPM and accuracy",
  "Retry whenever you want",
];

const steps = [
  { number: "01", title: "Pick a time", description: "Choose a short sprint or a longer endurance session." },
  { number: "02", title: "Type naturally", description: "Keep your eyes on the passage and let the timer do the work." },
  { number: "03", title: "Read your result", description: "See speed, accuracy, mistakes, and what to improve next." },
];

function getDurationNote(value: number) {
  if (value === 1) return "Quick baseline";
  if (value <= 5) return "Focused sprint";
  if (value <= 15) return "Balanced session";
  return "Endurance challenge";
}

export default function TypingTestHub() {
  const [duration, setDuration] = useState(1);
  const [isDurationMenuOpen, setIsDurationMenuOpen] = useState(false);
  const durationPickerRef = useRef<HTMLDivElement>(null);
  const selectedHref = getDurationHref("test", duration);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!durationPickerRef.current?.contains(event.target as Node)) {
        setIsDurationMenuOpen(false);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setIsDurationMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleDurationKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const currentIndex = durations.indexOf(duration as (typeof durations)[number]);
      setDuration(durations[Math.min(currentIndex + 1, durations.length - 1)]);
      setIsDurationMenuOpen(true);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const currentIndex = durations.indexOf(duration as (typeof durations)[number]);
      setDuration(durations[Math.max(currentIndex - 1, 0)]);
      setIsDurationMenuOpen(true);
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsDurationMenuOpen((isOpen) => !isOpen);
    }
  };

  return (
    <div className="min-h-screen bg-[#080908] text-primary">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-primary/10" aria-labelledby="typing-test-page-title">
          <div className="pointer-events-none absolute right-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute bottom-[-18rem] left-[-12rem] h-[36rem] w-[36rem] rounded-full border border-primary/10" />

          <div className="relative mx-auto grid min-h-[calc(100svh-84px)] max-w-7xl items-center gap-14 px-6 py-16 sm:px-8 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-12">
            <div>
              <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/50">
                <Keyboard className="h-4 w-4 text-primary" aria-hidden="true" />
                Typing test
              </p>
              <h1 id="typing-test-page-title" className="max-w-3xl text-balance text-5xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-[6.4rem]">
                Measure the speed in your hands.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-primary/60 sm:text-lg">
                A calm, accurate typing test that shows your real WPM, accuracy, and mistakes without getting in your way.
              </p>

              <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs text-primary/65 sm:text-sm" aria-label="Typing test benefits">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 whitespace-nowrap">
                    <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 border border-primary/10 sm:-inset-5" aria-hidden="true" />
              <div className="relative border border-primary/20 bg-primary p-1.5 text-black shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:p-2">
                <div className="border border-black/20 p-5 sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">Your next run</p>
                      <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">Choose your timing.</h2>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-primary">
                      <Timer className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-9" ref={durationPickerRef}>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-black/55">
                      Test duration
                    </span>
                    <div className="relative mt-3">
                      <button
                        type="button"
                        aria-expanded={isDurationMenuOpen}
                        aria-haspopup="listbox"
                        aria-controls="duration-options"
                        onClick={() => setIsDurationMenuOpen((isOpen) => !isOpen)}
                        onKeyDown={handleDurationKeyDown}
                        className="flex w-full items-center justify-between border border-black/25 bg-[#f7f5ec] px-4 py-3.5 text-left text-black outline-none transition hover:border-black/60 focus:border-black focus:ring-2 focus:ring-black/20"
                      >
                        <span>
                          <span className="block text-lg font-semibold tracking-[-0.03em]">{duration} minute{duration === 1 ? "" : "s"}</span>
                          <span className="mt-0.5 block text-xs text-black/50">{getDurationNote(duration)}</span>
                        </span>
                        <ChevronDown className={`h-5 w-5 text-black/60 transition-transform ${isDurationMenuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>

                      {isDurationMenuOpen ? (
                        <div id="duration-options" className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 border border-black/20 bg-[#f7f5ec] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.2)]" role="listbox" aria-label="Choose test duration">
                          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                            {durations.map((value) => {
                              const isSelected = value === duration;
                              return (
                                <button
                                  key={value}
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  onClick={() => {
                                    setDuration(value);
                                    setIsDurationMenuOpen(false);
                                  }}
                                  className={`flex min-h-16 flex-col items-start justify-center border px-3 text-left transition ${isSelected ? "border-black bg-black text-primary" : "border-black/10 text-black hover:border-black/45 hover:bg-black/5"}`}
                                >
                                  <span className="text-base font-semibold">{value} min</span>
                                  <span className={`text-[10px] ${isSelected ? "text-primary/60" : "text-black/45"}`}>{getDurationNote(value)}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <Link
                    href={selectedHref}
                    className="group mt-4 flex items-center justify-between bg-black px-5 py-4 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    Start the {duration}-minute test
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>

                  <div className="mt-7 grid grid-cols-2 gap-4 border-t border-black/15 pt-5 text-xs text-black/55">
                    <div><span className="block text-xl font-medium text-black">Live</span>WPM tracking</div>
                    <div><span className="block text-xl font-medium text-black">Clear</span>accuracy feedback</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ModeBenefits mode="test" />

        <section className="border-b border-primary/10 px-6 py-20 sm:px-8 md:px-10 md:py-24" aria-labelledby="duration-guide-title">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary/45">Find your starting point</p>
              <h2 id="duration-guide-title" className="max-w-lg text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-5xl">The right test is the one you will repeat.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-primary/50">Not sure how long to type? Start short, learn your baseline, then stay with a session length that fits your day.</p>
            </div>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {[1, 2, 5, 10].map((value) => (
                <Link key={value} href={getDurationHref("test", value)} className="group flex items-start justify-between border-b border-primary/15 pb-5 transition-colors hover:border-primary/60">
                  <span>
                    <span className="block text-xl font-medium tracking-[-0.03em]">{value} minute{value === 1 ? "" : "s"}</span>
                    <span className="mt-1 block text-xs text-primary/45">{getDurationNote(value)}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 text-primary/35 transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-primary/10 px-6 py-20 sm:px-8 md:px-10 md:py-28" aria-labelledby="test-flow-title">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 border-b border-primary/10 pb-7 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-primary/45">A better test loop</p>
                <h2 id="test-flow-title" className="text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">Simple enough to repeat.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-primary/50">The less time you spend configuring the test, the more attention you can give to typing well.</p>
            </div>

            <ol className="grid gap-3 md:grid-cols-3">
              {steps.map((step) => (
                <li key={step.number} className="border border-primary/15 bg-white/[0.02] p-6 sm:p-8">
                  <span className="text-xs tracking-[0.18em] text-primary/35">{step.number}</span>
                  <h3 className="mt-12 text-2xl font-medium tracking-[-0.04em]">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-primary/50">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <ModeFaq mode="test" duration={1} />

      <Footer />
    </div>
  );
}
