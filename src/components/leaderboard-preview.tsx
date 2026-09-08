"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, ArrowUpRight, Crown, Medal, Timer, Zap } from "lucide-react";

const entries = [
  { rank: "01", name: "Maya Chen", initials: "MC", wpm: "128", accuracy: "99.2%", time: "1 min", tone: "text-primary" },
  { rank: "02", name: "Noah Williams", initials: "NW", wpm: "117", accuracy: "98.7%", time: "1 min", tone: "text-primary/75" },
  { rank: "03", name: "Ava Patel", initials: "AP", wpm: "109", accuracy: "98.4%", time: "1 min", tone: "text-primary/65" },
  { rank: "04", name: "Leo Martin", initials: "LM", wpm: "104", accuracy: "97.9%", time: "1 min", tone: "text-primary/55" },
];

export default function LeaderboardPreview() {
  return (
    <section className="border-t border-primary/10 bg-black px-4 py-24 text-primary sm:px-6 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <p className="text-xs uppercase tracking-[0.18em] text-primary/55">Live leaderboard</p>
            </div>
            <h2 className="max-w-2xl text-4xl font-medium leading-[0.95] tracking-tighter sm:text-5xl md:text-7xl">
              A little competition makes speed addictive.
            </h2>
          </motion.div>
          <p className="max-w-xs text-sm leading-relaxed text-primary/55 md:pb-1">
            See what the community is typing right now, then set a target for your next run.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border border-primary/15 bg-white/2"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-primary/10 p-5 sm:flex-row sm:items-center sm:px-7 sm:py-5">
            <div className="flex items-center gap-2 text-sm text-primary/60">
              <Activity className="h-4 w-4 text-primary" strokeWidth={1.7} />
              <span>1,284 typists active today</span>
            </div>
            <div className="flex w-fit rounded-full border border-primary/15 p-1 text-xs">
              <button className="rounded-full bg-primary px-4 py-2 font-medium text-black">Today</button>
              <button className="rounded-full px-4 py-2 text-primary/50 transition-colors hover:text-primary">This week</button>
            </div>
          </div>

          <div className="hidden grid-cols-[4rem_1fr_6rem_7rem_6rem] gap-4 border-b border-primary/10 px-7 py-4 text-[10px] uppercase tracking-[0.16em] text-primary/35 sm:grid">
            <span>Rank</span>
            <span>Typist</span>
            <span>Speed</span>
            <span>Accuracy</span>
            <span>Mode</span>
          </div>

          <div>
            {entries.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-primary/10 px-5 py-4 last:border-b-0 sm:grid-cols-[4rem_1fr_6rem_7rem_6rem] sm:gap-4 sm:px-7 sm:py-5"
              >
                <div className={`flex items-center gap-2 text-sm font-medium ${entry.tone}`}>
                  {index === 0 ? <Crown className="hidden h-4 w-4 sm:block" strokeWidth={1.7} /> : null}
                  {index === 1 ? <Medal className="hidden h-4 w-4 sm:block" strokeWidth={1.7} /> : null}
                  {entry.rank}
                </div>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-xs font-medium text-primary/70">
                    {entry.initials}
                  </span>
                  <span className="truncate text-sm font-medium text-primary">{entry.name}</span>
                </div>
                <span className="text-right text-sm font-medium text-primary sm:text-left">{entry.wpm} <span className="text-xs text-primary/40">WPM</span></span>
                <span className="hidden text-sm text-primary/65 sm:block">{entry.accuracy}</span>
                <span className="hidden items-center gap-1 text-xs text-primary/45 sm:flex"><Timer className="h-3.5 w-3.5" />{entry.time}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between gap-5 border-t border-primary/10 p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">
            <div className="flex items-center gap-2 text-sm text-primary/50">
              <Zap className="h-4 w-4 text-primary" strokeWidth={1.7} />
              <span>Your next personal best starts with one test.</span>
            </div>
            <Link
              href="/typing-test/1-minute"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              View full leaderboard
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
