import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock3 } from "lucide-react";
import { PrismaHero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SkillPaths from "@/components/skill-paths";
import HowItWorks from "@/components/how-it-works";
import LeaderboardPreview from "@/components/leaderboard-preview";
import CertificateShowcase from "@/components/certificate-showcase";
import { Features } from "@/components/ui/features-4";
import FaqSection from "@/components/faq-section";
import FinalCta from "@/components/final-cta";
import { articles } from "@/lib/articles";

const homeArticles = articles.slice(0, 3);

export default function Home() {
  return (
    <div>
      <Navbar />
      <PrismaHero />
      <Features />
      <SkillPaths />
      <HowItWorks />
      <LeaderboardPreview />
      <CertificateShowcase />

      <section className="border-t border-white/10 bg-black px-4 py-24 sm:px-6 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-primary/50">Featured articles</p>
              <h2 className="text-3xl font-medium tracking-tighter sm:text-5xl">Fresh ideas to improve your typing.</h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-black"
            >
              View all blogs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {homeArticles.map((article, index) => (
              <Link
                key={article.href}
                href={article.href}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-primary/40 hover:bg-white/[0.04]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-primary/45">
                    <span>{article.category}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-medium leading-tight tracking-tight text-primary">{article.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary/55">{article.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-primary/45">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-primary">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
}
