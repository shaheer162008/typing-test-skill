"use client";

import type React from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CTAButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  primaryCta: CTAButton;
  secondaryCta: CTAButton;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-primary/10 bg-black px-4 py-24 text-primary sm:px-8 md:px-16 md:py-32",
        className,
      )}
      role="region"
      aria-label="Typing Test Skill blog hero"
    >
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute -bottom-48 -left-20 h-96 w-96 rounded-full border border-primary/10" />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-primary/70">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          The Typing Test Skill journal
        </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="text-balance text-4xl font-medium leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">
            {title}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-primary/60 sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            onClick={primaryCta.onClick}
            disabled={primaryCta.disabled}
            aria-label={primaryCta.label}
          >
            <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
            {primaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={secondaryCta.onClick}
            disabled={secondaryCta.disabled}
            aria-label={secondaryCta.label}
          >
            {secondaryCta.label}
          </Button>
        </div>

        <p className="mt-8 text-xs text-primary/40">
          Practical guides for typing speed, accuracy, focus, and progress.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
