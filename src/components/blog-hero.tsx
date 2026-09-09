import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { articles } from "@/lib/articles";

export default function BlogHero() {
  const featuredArticle = articles[0];

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-black text-primary" aria-labelledby="blog-hero-title">
      <div className="pointer-events-none absolute right-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full border border-primary/10" />
      <div className="relative mx-auto grid min-h-[min(78svh,720px)] max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-12">
        <div>
          <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/50">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            The typing journal
          </p>
          <h1 id="blog-hero-title" className="max-w-2xl text-balance text-5xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-[6rem]">
            Ideas for typing with more intent.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-primary/60 sm:text-lg">
            Practical guides for typing speed, accuracy, practice habits, WPM goals, and the small changes that make every session better.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#articles" className="group inline-flex items-center gap-3 bg-primary px-5 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5">
              Explore articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/typing-test/1-minute" className="inline-flex items-center border border-primary/20 px-5 py-3 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/5">
              Take a typing test
            </Link>
          </div>
        </div>

        <Link href={featuredArticle.href} className="group relative block">
          <div className="absolute -inset-3 border border-primary/10 sm:-inset-5" aria-hidden="true" />
          <article className="relative overflow-hidden border border-primary/20 bg-white/[0.03]">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
              <Image src={featuredArticle.image} alt={featuredArticle.title} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 border border-white/25 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-primary backdrop-blur-sm">Featured guide</div>
              <div className="absolute bottom-0 p-5 sm:p-7">
                <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-primary/65">{featuredArticle.category}</p>
                <h2 className="max-w-xl text-2xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">{featuredArticle.title}</h2>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-primary/10 px-5 py-4 text-xs text-primary/50 sm:px-7">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" />{featuredArticle.readTime}</span>
              <span className="inline-flex items-center gap-2 font-medium text-primary">Read guide<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}
