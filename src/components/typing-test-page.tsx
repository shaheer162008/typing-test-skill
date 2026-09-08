"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import type { TypingMode } from "@/lib/typing-modes";

const passage =
  "Practice makes progress. Focus on rhythm, accuracy, and calm keystrokes. The best typists do not rush. They stay relaxed, keep their eyes on the text, and let the fingers follow the pattern naturally with confidence. Great typing is not about speed alone. It is about timing, control, and consistency. When you keep your posture balanced and your hands light, the words begin to flow without tension. Every careful session builds a stronger habit. Consistency over long stretches matters more than any single fast burst, because the fingers only get faster once the pattern stops requiring conscious thought.";

const keyboardRows = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ["Space"],
];

const keyWidth: Record<string, number> = { Space: 6 };

type TypingTestPageProps = { mode: TypingMode; durationMinutes?: number; wordCount?: number };

function getWpm(correctChars: number, elapsedMs: number) {
  if (elapsedMs <= 0) return 0;
  return Math.max(0, Math.round(correctChars / 5 / (elapsedMs / 60000) || 0));
}

export default function TypingTestPage({ mode, durationMinutes, wordCount }: TypingTestPageProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const lastLineOffset = useRef(0);
  const [typed, setTyped] = useState("");
  const [lockBoundary, setLockBoundary] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [lesson, setLesson] = useState("lesson-1");
  const targetText = useMemo(() => {
    if (mode === "words" && wordCount) return passage.split(" ").slice(0, wordCount).join(" ");
    const targetLength = Math.max(passage.length, (durationMinutes ?? 1) * 300);
    return passage.repeat(Math.ceil(targetLength / passage.length)).slice(0, targetLength);
  }, [durationMinutes, mode, wordCount]);
  const timeLimitMs = durationMinutes ? durationMinutes * 60000 : null;
  const finishedByTime = Boolean(timeLimitMs && elapsedMs >= timeLimitMs);
  const completed = mode === "words" ? typed.length >= targetText.length : finishedByTime || typed.length >= targetText.length;

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!startedAt || completed) return;
    const timer = window.setInterval(() => {
      const nextElapsed = Date.now() - startedAt;
      setElapsedMs(timeLimitMs ? Math.min(nextElapsed, timeLimitMs) : nextElapsed);
    }, 250);
    return () => window.clearInterval(timer);
  }, [completed, startedAt, timeLimitMs]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1 || event.key === "Backspace") {
        setPressedKey(event.key === " " ? "Space" : event.key.toUpperCase());
        window.setTimeout(() => setPressedKey(null), 160);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const charEl = currentCharRef.current;
    const box = scrollBoxRef.current;
    if (!charEl || !box) return;
    if (charEl.offsetTop !== lastLineOffset.current) {
      box.scrollTop = Math.max(0, charEl.offsetTop - 18);
      lastLineOffset.current = charEl.offsetTop;
    }
  }, [typed]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Backspace" && typed.length <= lockBoundary) event.preventDefault();
  };

  const handleChange = (value: string) => {
    if (completed || value.length < lockBoundary || value.length > targetText.length) return;
    if (!startedAt && value.length > 0) setStartedAt(Date.now());
    setTyped(value);
    if (value.endsWith(" ") && value.length > lockBoundary) setLockBoundary(value.length);
  };

  const resetTest = () => {
    setTyped("");
    setLockBoundary(0);
    setStartedAt(null);
    setElapsedMs(0);
    lastLineOffset.current = 0;
    if (scrollBoxRef.current) scrollBoxRef.current.scrollTop = 0;
    inputRef.current?.focus();
  };

  const correctChars = useMemo(() => typed.split("").filter((char, index) => char === targetText[index]).length, [targetText, typed]);
  const mistakes = Math.max(0, typed.length - correctChars);
  const accuracy = typed.length === 0 ? 100 : Math.max(0, Math.round((correctChars / typed.length) * 100));
  const wpm = getWpm(correctChars, elapsedMs);
  const displayedTime = timeLimitMs ? Math.ceil(Math.max(0, timeLimitMs - elapsedMs) / 1000) : Math.floor(elapsedMs / 1000);
  const stats = [
    { label: "WPM", value: wpm },
    { label: "Accuracy", value: `${accuracy}%` },
    { label: timeLimitMs ? "Left" : "Time", value: `${displayedTime}s` },
    { label: "Mistakes", value: mistakes },
  ];
  const title = mode === "words" ? `${wordCount} word typing test` : `${durationMinutes}-minute ${mode === "practice" ? "typing practice" : "typing test"}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-primary">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-6 flex flex-col gap-4 border-b border-primary/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-primary/45">{mode === "words" ? "Word mode" : mode === "practice" ? "Practice mode" : "Timed test"}</p>
            <h1 className="text-2xl font-medium tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary/50">Stay relaxed, follow the highlighted character, and let accuracy lead your speed.</p>
          </div>
          <label className="flex w-full items-center justify-between gap-3 rounded-xl border border-primary/15 bg-white/[0.03] px-3 py-2 text-xs text-primary/55 sm:w-auto">
            <span className="uppercase tracking-[0.14em]">Lesson</span>
            <select value={lesson} onChange={(event) => setLesson(event.target.value)} className="bg-transparent text-right text-primary outline-none">
              <option value="lesson-1" className="bg-[#111]">Lesson 01 · Home row</option>
              <option value="lesson-2" className="bg-[#111]">Lesson 02 · Common words</option>
              <option value="lesson-3" className="bg-[#111]">Lesson 03 · Mixed rhythm</option>
            </select>
          </label>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-primary/40"><span>{completed ? "Session complete" : startedAt ? "In progress" : "Ready when you are"}</span><span>{typed.length}/{targetText.length} chars</span></div>
            <div className="rounded-2xl border border-primary/15 bg-white/[0.025] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.2)] sm:p-7">
              <div className="relative cursor-text rounded-xl border border-primary/10 bg-black/30 px-4 py-5 transition-colors focus-within:border-primary/35 sm:px-6 sm:py-7" onClick={() => inputRef.current?.focus()}>
                <div ref={scrollBoxRef} className="h-[270px] overflow-hidden text-lg leading-9 text-primary/35 sm:h-[330px] sm:text-xl sm:leading-10">
                  {targetText.split("").map((char, index) => {
                    const typedChar = typed[index];
                    const isCurrent = index === typed.length && !completed;
                    const isLocked = index < lockBoundary;
                    const isCorrect = typedChar !== undefined && typedChar === char;
                    const isWrong = typedChar !== undefined && typedChar !== char;
                    let className = "rounded-sm";
                    if (isCurrent) className += " border-b-2 border-primary text-primary";
                    else if (isWrong) className += isLocked ? " bg-red-500/25 text-red-300" : " bg-red-500/15 text-red-300";
                    else if (isCorrect) className += " text-primary";
                    return <span key={index} ref={isCurrent ? currentCharRef : null} className={className}>{char}</span>;
                  })}
                </div>
                {typed.length === 0 && <p className="pointer-events-none mt-5 text-xs text-primary/35">Click the passage, then start typing</p>}
                <textarea ref={inputRef} value={typed} onChange={(event) => handleChange(event.target.value)} onKeyDown={handleKeyDown} aria-label="Typing input" disabled={completed} className="absolute inset-0 h-full w-full resize-none border-0 bg-transparent p-0 text-transparent caret-transparent outline-none" />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-primary/40"><span>Strict mode · completed words stay locked</span><button type="button" onClick={resetTest} className="rounded-lg border border-primary/20 px-3 py-1.5 text-primary transition hover:bg-primary/10">Reset session</button></div>
            </div>
            {completed && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/15 bg-primary/[0.06] px-4 py-3 text-sm"><span>Finished at {wpm} WPM with {accuracy}% accuracy.</span><button type="button" onClick={resetTest} className="font-medium text-primary underline decoration-primary/30 underline-offset-4">Try again</button></div>}
          </section>

          <aside className="rounded-2xl border border-primary/15 bg-white/[0.02] p-4 sm:p-5">
            <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-primary/45">Live performance</div>
            <div className="grid grid-cols-2 gap-2.5">{stats.map((stat) => <div key={stat.label} className="rounded-xl bg-black/45 px-2 py-4 text-center"><div className="text-[9px] uppercase tracking-[0.14em] text-primary/40">{stat.label}</div><div className="mt-2 text-xl font-medium">{stat.value}</div></div>)}</div>
            <div className="mt-8 border-t border-primary/10 pt-5"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.18em] text-primary/45">Keyboard</span><span className="text-[10px] text-primary/35">Live keys</span></div><div className="flex flex-col gap-1.5">{keyboardRows.map((row, rowIndex) => <div key={rowIndex} className="flex gap-1">{row.map((key) => <div key={key} style={{ flexGrow: keyWidth[key] ?? 1, flexBasis: 0 }} className={`flex h-8 items-center justify-center rounded-md border text-[9px] font-medium transition-colors ${pressedKey === key ? "border-primary bg-primary text-black" : "border-primary/15 bg-black text-primary/70"}`}>{key}</div>)}</div>)}</div></div>
          </aside>
        </div>

        <section className="mt-12 max-w-3xl border-t border-primary/10 pt-8"><p className="text-[10px] uppercase tracking-[0.18em] text-primary/40">About this session</p><h2 className="mt-3 text-xl font-medium">A calmer way to improve your typing.</h2><p className="mt-3 text-sm leading-7 text-primary/50">This {mode === "words" ? `${wordCount}-word` : `${durationMinutes}-minute`} {mode === "practice" ? "practice session" : "typing test"} tracks your speed, accuracy, and mistakes as you type. Use the lesson selector for a fresh training focus, then repeat the same format until accurate movement feels natural.</p></section>
      </main>
    </div>
  );
}