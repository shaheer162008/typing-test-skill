"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Download, Share2 } from "lucide-react";

export default function CertificateShowcase() {
  return (
    <section className="border-t border-primary/10 bg-black px-4 py-24 text-primary sm:px-6 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-5 text-xs uppercase tracking-[0.18em] text-primary/50">
            Certificate showcase
          </p>
          <h2 className="max-w-xl text-4xl font-medium leading-[0.95] tracking-tighter sm:text-5xl md:text-7xl">
            Get verified after every test.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-primary/55">
            Your best performance deserves more than a number on a screen. Hit a milestone,
            earn a certificate, and share proof of your progress anywhere.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-primary/55">
            <span className="inline-flex items-center gap-2 border border-primary/15 px-3 py-2">
              <Download className="h-3.5 w-3.5 text-primary" /> Downloadable
            </span>
            <span className="inline-flex items-center gap-2 border border-primary/15 px-3 py-2">
              <Share2 className="h-3.5 w-3.5 text-primary" /> Shareable
            </span>
          </div>
          <Link
            href="/typing-test/1-minute"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            See certificate milestones
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, rotate: 1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video"
        >
          <div className="absolute -inset-3 border border-primary/10 sm:-inset-5" />
          <div className="relative h-full bg-[#f7f5ec] p-2 text-[#171716] shadow-2xl sm:p-3">
            <div className="flex h-full flex-col border border-[#171716]/25 p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/55">
                    Typing Test Skill
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-black/45">
                    Certificate of typing excellence
                  </p>
                </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#171716]/30 sm:h-16 sm:w-16">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={1.4} />
                </div>
              </div>

              <div className="grid flex-1 items-center gap-5 py-5 sm:grid-cols-[1fr_0.8fr] sm:gap-8 sm:py-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">This certifies that</p>
                  <h3 className="mt-2 text-3xl font-medium tracking-tighter sm:text-5xl md:text-6xl">Maya Chen</h3>
                  <div className="mt-4 h-px w-24 bg-black/30" />
                  <p className="mt-4 max-w-xs text-xs leading-relaxed text-black/60 sm:text-sm">
                    has achieved an excellent typing performance.
                  </p>
                </div>

                <div className="grid grid-cols-2 border-y border-black/20 py-4 text-center sm:py-5">
                  <div className="border-r border-black/20">
                    <p className="text-2xl font-medium sm:text-3xl md:text-4xl">128</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/50 sm:text-[10px]">WPM</p>
                  </div>
                  <div>
                    <p className="text-2xl font-medium sm:text-3xl md:text-4xl">99.2%</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/50 sm:text-[10px]">Accuracy</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.12em] text-black/50 sm:text-[10px] sm:tracking-[0.14em]">
                <span>Issued 06 Sep 2026</span>
                <span className="inline-flex items-center gap-1.5 text-black/70">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified result
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
