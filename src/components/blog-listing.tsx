"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { useState } from "react";
import { articles } from "@/lib/articles";

const publishedDate = "8 September 2026";

function ArticleCard({ article, featured = false, index }: { article: (typeof articles)[number]; featured?: boolean; index: number }) {
  return (
    <Link href={article.href} className={`group flex h-full flex-col overflow-hidden border border-primary/15 bg-white/2 transition-colors hover:border-primary/45 hover:bg-white/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${featured ? "lg:col-span-1" : ""}`}>
      <div className={`relative shrink-0 overflow-hidden ${featured ? "aspect-video" : "aspect-video"}`}>
        <Image src={article.image} alt={article.title} fill sizes={featured ? "(max-width: 1024px) 100vw, 33vw" : "(max-width: 1024px) 50vw, 33vw"} className="object-cover transition duration-500 group-hover:scale-[1.03]" priority={featured} />
      </div>
      <div className="flex min-h-71.25 flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 text-[10px] uppercase tracking-[0.14em] text-primary/45"><span>{article.category}</span><span>0{index + 1}</span></div>
        <div className="mt-auto pt-10">
          <h3 className={`${featured ? "text-2xl sm:text-3xl" : "text-xl"} font-medium leading-tight tracking-tighter`}>{article.title}</h3>
          <p className="mt-3 min-h-18 text-sm leading-relaxed text-primary/55">{article.description}</p>
          <div className="mt-6 flex items-center justify-between border-t border-primary/15 pt-4 text-xs text-primary/45"><span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" />{article.readTime}</span><span>{publishedDate}</span></div>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogListing() {
  const [visibleCount, setVisibleCount] = useState(6);
  const featured = articles.slice(0, 3);
  const latest = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <>
      <section id="articles" className="border-b border-primary/10 px-4 py-24 sm:px-6 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 border-b border-primary/15 pb-7"><p className="mb-3 text-xs uppercase tracking-[0.18em] text-primary/50">Featured articles</p><h2 className="text-3xl font-medium tracking-tighter sm:text-5xl">Start with the latest useful ideas.</h2></div>
          <div className="grid items-stretch gap-4 lg:grid-cols-3">{featured.map((article, index) => <ArticleCard key={article.href} article={article} featured index={index} />)}</div>
        </div>
      </section>

      <section id="latest-articles" className="border-b border-primary/10 px-4 py-24 sm:px-6 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-primary/15 pb-7 md:flex-row md:items-end"><div><p className="mb-3 text-xs uppercase tracking-[0.18em] text-primary/50">Latest articles</p><h2 className="text-3xl font-medium tracking-tighter sm:text-5xl">Keep your next session moving.</h2></div><p className="max-w-xs text-sm leading-relaxed text-primary/50">Published articles on speed, focus, practice, and accuracy.</p></div>
          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">{latest.map((article, index) => <ArticleCard key={article.href} article={article} index={index} />)}</div>
          {hasMore ? <div className="mt-10 flex justify-center"><button type="button" onClick={() => setVisibleCount(articles.length)} className="group inline-flex items-center gap-3 rounded-full border border-primary/25 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">View more articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></div> : null}
        </div>
      </section>
    </>
  );
}
