import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Download, Share2 } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import CertificateVerifier from "@/components/certificate-verifier";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#080908] text-primary">
      <Navbar />
      <main>
        <section className="border-b border-primary/10 px-6 py-20 sm:px-8 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div><p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/50"><Award className="h-4 w-4" aria-hidden="true" /> Verified milestones</p><h1 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-7xl">Keep the proof of your progress.</h1><p className="mt-6 max-w-xl text-base leading-7 text-primary/55 sm:text-lg">Earn a clean, shareable typing certificate when your speed and accuracy reach a milestone worth keeping.</p><div className="mt-8 flex flex-wrap gap-4 text-sm text-primary/65"><span className="flex items-center gap-2"><Download className="h-4 w-4" aria-hidden="true" />Downloadable</span><span className="flex items-center gap-2"><Share2 className="h-4 w-4" aria-hidden="true" />Shareable</span></div><Link href="/typing-test/1-minute" className="group mt-9 inline-flex items-center gap-3 bg-primary px-5 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5">Work toward a certificate<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
            <div className="relative aspect-video"><div className="absolute -inset-3 border border-primary/10 sm:-inset-5" aria-hidden="true" /><div className="relative h-full bg-[#f7f5ec] p-2 text-[#171716] shadow-2xl sm:p-3"><div className="flex h-full flex-col border border-[#171716]/25 p-4 sm:p-7"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/50">Typing Test Skill</p><p className="mt-2 text-xs uppercase tracking-[0.15em] text-black/40">Certificate of typing excellence</p></div><Award className="h-8 w-8" strokeWidth={1.4} aria-hidden="true" /></div><div className="flex flex-1 flex-col justify-center"><p className="text-[10px] uppercase tracking-[0.18em] text-black/45">This certifies that</p><h2 className="mt-2 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">Your name</h2><div className="mt-4 h-px w-24 bg-black/25" /><p className="mt-4 max-w-sm text-xs leading-5 text-black/55 sm:text-sm">has achieved a verified typing milestone.</p></div><div className="flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-black/45"><span>WPM milestone</span><span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />Verified</span></div></div></div></div>
          </div>
        </section>
        <CertificateVerifier />
      </main>
      <Footer />
    </div>
  );
}
