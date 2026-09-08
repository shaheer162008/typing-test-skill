import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FinalCta from "@/components/final-cta";

export interface BlogArticleSection {
  title: string;
  content: ReactNode;
}

interface BlogArticleLayoutProps {
  category: string;
  title: string;
  intro: string;
  readTime: string;
  image: string;
  sections: BlogArticleSection[];
  faqs: [string, string][];
}

export default function BlogArticleLayout({ category, title, intro, readTime, image, sections, faqs }: BlogArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-primary">
      <Navbar />
      <main>
        <header className="border-b border-primary/10 px-4 py-16 sm:px-6 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Link href="/blogs" className="mb-10 inline-flex items-center gap-2 text-sm text-primary/55 transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to blogs</Link>
            <p className="mb-5 text-xs uppercase tracking-[0.18em] text-primary/50">{category}</p>
            <h1 className="max-w-5xl text-balance text-4xl font-medium leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">{title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-primary/60">{intro}</p>
            <div className="mt-8 flex items-center gap-3 text-xs text-primary/45"><Clock3 className="h-4 w-4" /> {readTime} <span>/</span> Typing Test Skill journal</div>
          </div>
        </header>
        <article className="px-4 py-20 sm:px-6 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl text-[17px] leading-[1.8] text-primary/70">
            <div className="relative mb-16 aspect-video overflow-hidden border border-primary/15 sm:mb-20"><Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" priority /></div>
            {sections.map((section) => <section key={section.title} className="mt-14 border-t border-primary/15 pt-8"><h2 className="text-3xl font-medium leading-tight tracking-tighter text-primary sm:text-4xl">{section.title}</h2><div className="mt-5">{section.content}</div></section>)}
            <section className="mt-16 border-t border-primary/15 pt-10"><h2 className="text-3xl font-medium tracking-tighter text-primary sm:text-4xl">Frequently Asked Questions</h2><div className="mt-8 space-y-8">{faqs.map(([question, answer]) => <div key={question}><h3 className="text-lg font-medium text-primary">{question}</h3><p className="mt-2">{answer}</p></div>)}</div></section>
            <Link href="/typing-test" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-black">Take a typing test <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </article>
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export function TipList({ items }: { items: string[] }) {
  return <ul className="space-y-4">{items.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" /><span>{item}</span></li>)}</ul>;
}
