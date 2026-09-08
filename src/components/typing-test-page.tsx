"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/navbar";

const sampleText =
  "Practice makes progress. Focus on rhythm, accuracy, and calm keystrokes. The best typists do not rush. They stay relaxed, keep their eyes on the text, and let the fingers follow the pattern naturally with confidence. Great typing is not about speed alone. It is about timing, control, and consistency. When you keep your posture balanced and your hands light, the words begin to flow without tension. Every careful session builds a stronger habit. Consistency over long stretches matters more than any single fast burst, because the fingers only get faster once the pattern stops requiring conscious thought. That is the whole point of a longer passage: it forces the rhythm to hold past the first few easy lines.";

const keyboardRows = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ["Space"],
];

const keyWidth: Record<string, number> = {
  Backspace: 2,
  Tab: 1.5,
  "Caps Lock": 1.75,
  Enter: 2,
  Shift: 2.25,
  Ctrl: 1.25,
  Alt: 1.25,
  Space: 6,
};

// Same formula used in the WPM guide article: characters typed divided by
// 5 (average word length), divided by minutes elapsed. Using correctChars
// here gives "net WPM" — speed that actually counts, not raw keystrokes.
function getWpm(correctChars: number, elapsedMs: number) {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return Math.max(0, Math.round(correctChars / 5 / minutes || 0));
}

export default function TypingTestPage() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const lastLineOffset = useRef<number>(0);

  const [typed, setTyped] = useState("");
  // The point (character index) before which the user can no longer
  // backspace. It advances every time a word is locked in with a space,
  // so a completed word can never be edited again — matches how a real
  // strict-mode typing test scores mistakes as permanent once you move on.
  const [lockBoundary, setLockBoundary] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!startedAt) return;
    const timer = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAt);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt]);

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

  // No visible scrollbar: the passage box uses overflow-hidden, and we
  // move it ourselves with scrollTop whenever typing reaches a new line.
  // The user can never drag or wheel-scroll it manually.
  useEffect(() => {
    const charEl = currentCharRef.current;
    const box = scrollBoxRef.current;
    if (!charEl || !box) return;
    const offsetTop = charEl.offsetTop;
    if (offsetTop !== lastLineOffset.current) {
      box.scrollTop = Math.max(0, offsetTop - 8);
      lastLineOffset.current = offsetTop;
    }
  }, [typed]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Backspace" && typed.length <= lockBoundary) {
      event.preventDefault();
    }
  };

  const handleChange = (value: string) => {
    if (!startedAt) setStartedAt(Date.now());
    // Never allow the buffer to shrink below the lock boundary, even if
    // something other than a plain Backspace keystroke tries to edit it
    // (e.g. cut, or selecting and deleting a range).
    if (value.length < lockBoundary) return;
    if (value.length <= sampleText.length) {
      setTyped(value);
      if (value.endsWith(" ") && value.length > lockBoundary) {
        setLockBoundary(value.length);
      }
    }
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

  const correctChars = useMemo(
    () => typed.split("").filter((char, index) => char === sampleText[index]).length,
    [typed],
  );

  const mistakes = Math.max(0, typed.length - correctChars);
  const accuracy = typed.length === 0 ? 100 : Math.max(0, Math.round((correctChars / typed.length) * 100));
  const wpm = getWpm(correctChars, elapsedMs);
  const completed = typed.length >= sampleText.length;

  const stats = [
    { label: "WPM", value: wpm },
    { label: "Accuracy", value: `${accuracy}%` },
    { label: "Time", value: `${Math.max(0, Math.floor(elapsedMs / 1000))}s` },
    { label: "Mistakes", value: mistakes },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0a0a] text-primary">
      <Navbar />

      <div className="mx-auto flex h-[calc(100vh-72px)] min-h-0 w-full max-w-[1400px] flex-1 flex-col justify-center gap-4 overflow-hidden px-4 py-4 sm:px-6 lg:flex-row lg:items-stretch lg:gap-5 lg:px-8">
        <aside className="order-1 hidden w-full flex-shrink-0 lg:block lg:w-[300px] xl:w-[340px]">
          <div className="flex h-full flex-col rounded-2xl border border-primary/15 bg-white/[0.02] p-4">
            <div className="mb-4 text-[11px] uppercase tracking-[0.14em] text-primary/45">Live stats</div>
            <div className="grid grid-cols-2 gap-2.5">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-black/40 px-2 py-4 text-center">
                  <div className="text-[9px] uppercase tracking-[0.14em] text-primary/45">{stat.label}</div>
                  <div className="mt-2 text-xl font-medium text-primary">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="mb-3 text-[11px] uppercase tracking-[0.14em] text-primary/45">Keyboard</div>

              <div className="flex flex-col gap-1.5">
                {keyboardRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-1">
                    {row.map((key) => {
                      const isPressed = pressedKey === key;
                      const flexGrow = keyWidth[key] ?? 1;
                      return (
                        <div
                          key={key}
                          style={{ flexGrow, flexBasis: 0 }}
                          className={`flex h-8 items-center justify-center rounded-md border text-[9px] font-medium transition-colors ${
                            isPressed
                              ? "border-primary bg-primary text-black"
                              : "border-primary/15 bg-black text-primary/70"
                          }`}
                        >
                          {key}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="order-2 min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-primary/45">
            <span>Typing test</span>
            <span>{typed.length}/{sampleText.length} chars</span>
          </div>

          <div className="mb-3 grid grid-cols-4 gap-2 rounded-xl border border-primary/15 bg-white/[0.02] p-3 lg:hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[9px] uppercase tracking-[0.14em] text-primary/45">{stat.label}</div>
                <div className="mt-1 text-base font-medium text-primary">{stat.value}</div>
              </div>
            ))}
          </div>

          <div
            className="group relative min-h-[420px] cursor-text rounded-2xl border border-primary/15 bg-white/[0.02] p-5 transition-colors focus-within:border-primary/35 sm:min-h-[500px] sm:p-6"
            onClick={() => inputRef.current?.focus()}
          >
            <div
              ref={scrollBoxRef}
              className="h-[260px] overflow-hidden text-lg leading-8 text-primary/40 [scroll-behavior:smooth] sm:h-[340px] sm:text-xl sm:leading-9"
            >
              {sampleText.split("").map((char, index) => {
                const typedChar = typed[index];
                const isCurrent = index === typed.length && !completed;
                const isLocked = index < lockBoundary;
                const isCorrect = typedChar !== undefined && typedChar === char;
                const isWrong = typedChar !== undefined && typedChar !== char;

                let className = "rounded-sm";
                if (isCurrent) className += " border-b-2 border-primary text-primary";
                else if (isWrong) className += isLocked ? " bg-red-500/25 text-red-300" : " bg-red-500/15 text-red-300";
                else if (isCorrect) className += " text-primary";

                return (
                  <span key={index} ref={isCurrent ? currentCharRef : null} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>

            {typed.length === 0 && (
              <div className="pointer-events-none absolute inset-x-5 bottom-5 text-xs text-primary/35 sm:inset-x-6 sm:bottom-6">
                Click anywhere in the passage to start typing
              </div>
            )}

            <textarea
              ref={inputRef}
              value={typed}
              onChange={(event) => handleChange(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Typing input"
              className="pointer-events-none absolute inset-0 h-full w-full resize-none border-0 bg-transparent p-5 text-transparent caret-transparent outline-none focus:outline-none sm:p-6"
            />
          </div>

          <p className="mt-2 text-xs text-primary/35">
            Strict mode: once you press space, that word is locked in. Backspace won&apos;t undo it.
          </p>

          {completed && (
            <div className="mt-3 flex items-center justify-between rounded-xl border border-primary/15 bg-white/[0.02] px-4 py-3 text-sm text-primary/60">
              <span>Done — {wpm} WPM, {accuracy}% accuracy</span>
              <button
                type="button"
                onClick={resetTest}
                className="rounded-lg border border-primary/20 px-3 py-1.5 text-primary transition hover:bg-primary/10"
              >
                Try again
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}