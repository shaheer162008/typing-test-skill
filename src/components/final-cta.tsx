"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, LockKeyhole, Play, UserRound } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

const benefits = [
  "Free tests without signing in",
  "Save records with an account",
  "Earn verified certificates",
];

export default function FinalCta() {
  return (
    <section className="border-t border-primary/10 bg-primary px-4 py-20 text-black sm:px-6 md:px-10 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1fr_auto]"
      >
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-black/50">Your next personal best</p>
          <h2 className="max-w-4xl text-4xl font-medium leading-[0.92] tracking-tighter sm:text-6xl md:text-8xl">
            Type faster. Keep the proof.
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-black/65 sm:text-base">
            Take your first typing test for free. Sign in later with Google or email and password when you want to save results, follow your dashboard, or earn a certificate.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            {benefits.map((benefit) => (
              <span key={benefit} className="inline-flex items-center gap-2 text-xs font-medium text-black/65">
                <Check className="h-4 w-4" strokeWidth={2} />
                {benefit}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <a
            href="/typing-test"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-primary transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Play className="h-4 w-4 fill-current" />
            Take a free test
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/auth/sign-in"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/25 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <UserRound className="h-4 w-4" />
            Create free account
          </a>
          <span className="mt-1 inline-flex items-center gap-2 px-2 text-[11px] text-black/50">
            <LockKeyhole className="h-3.5 w-3.5" /> Save records and certificates securely
          </span>
          <span className="inline-flex items-center gap-2 px-2 text-[11px] text-black/50">
            <FaGoogle className="h-3 w-3" /> Google or email and password
          </span>
        </div>
      </motion.div>
    </section>
  );
}
