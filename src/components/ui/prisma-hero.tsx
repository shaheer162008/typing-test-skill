"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useRef, type CSSProperties } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute right-[-0.3em] top-[0.65em] text-[0.31em]">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words: { word: string; className?: string }[] = [];

  segments.forEach((segment) => {
    segment.text.split(" ").forEach((word) => {
      if (word) words.push({ word, className: segment.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word.word}-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${word.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {word.word}
        </motion.span>
      ))}
    </div>
  );
};

export const PrismaHero = () => {
  const stories = [
    {
      image: "/hero/hero-typing-workspace.jpg",
      label: "Typing workspace",
      title: "Build a faster daily rhythm",
    },
    {
      image: "/hero/hero-rgb-keyboard-typing.jpg",
      label: "Speed practice",
      title: "Turn every keystroke into progress",
    },
    {
      image: "/hero/hero-focused-typing-practice.jpg",
      label: "Focused practice",
      title: "Stay in the flow while you type",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-black text-primary lg:min-h-[calc(100svh-84px)]" aria-labelledby="typing-test-hero-title">
      <div className="relative mx-auto flex max-w-7xl items-center px-6 py-10 sm:px-8 sm:py-14 md:px-10 lg:min-h-[calc(100svh-84px)] lg:py-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.92fr_1.35fr] lg:gap-16">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary/55"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Your typing, in motion
            </motion.div>

            <h1 id="typing-test-hero-title" className="max-w-xl text-balance text-5xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[5.6rem]">
              Type faster. Work with confidence.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-relaxed text-primary/60 sm:text-lg">
              Start with a focused 1-minute typing test, then build better speed, accuracy, and confidence with every session.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/typing-test/1-minute"
                className="group inline-flex items-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
              >
                Start a 1-minute test
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/typing-practice"
                className="inline-flex items-center rounded-md border border-primary/20 px-5 py-3 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                Explore practice
              </Link>
            </div>

            <ul className="mt-10 flex flex-nowrap items-center gap-x-3 text-xs text-primary/70 sm:gap-x-5 sm:text-sm" aria-label="Typing Test Skill benefits">
              {["Instant WPM score", "Accuracy tracking", "Progress that stays yours"].map((item) => (
                <li key={item} className="flex shrink-0 items-center gap-1.5 whitespace-nowrap sm:gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/25">
                    <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto min-h-[360px] w-full max-w-2xl overflow-hidden border border-white/10 bg-white/[0.02] p-3 sm:min-h-[440px] sm:p-5 lg:h-[min(58svh,500px)] lg:min-h-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(225,224,204,0.12),transparent_42%)]" />
            <div className="relative grid h-full grid-cols-3 gap-2 sm:gap-3">
              {stories.map((story, index) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  className={`group relative overflow-hidden ${index === 1 ? "-translate-y-7 sm:-translate-y-10" : "translate-y-5 sm:translate-y-8"}`}
                >
                  <Image src={story.image} alt={story.title} fill sizes="(max-width: 640px) 33vw, 28vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute bottom-0 p-3 sm:p-5">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-primary/55">{story.label}</p>
                    <p className="text-sm font-medium leading-tight text-primary sm:text-lg">{story.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
