import Link from "next/link";
import { ArrowRight, Crown, Medal, Trophy } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const previewRows = [
  { rank: "01", name: "Maya Chen", speed: "128", accuracy: "99.2%" },
  { rank: "02", name: "Noah Williams", speed: "117", accuracy: "98.7%" },
  { rank: "03", name: "Ava Patel", speed: "109", accuracy: "98.4%" },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#080908] text-primary">
      <Navbar />
      <main>
        <section className="border-b border-primary/10 px-6 py-20 sm:px-8 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/50"><Trophy className="h-4 w-4" aria-hidden="true" /> Community leaderboard</p>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div><h1 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-7xl">Find your next target.</h1><p className="mt-6 max-w-xl text-base leading-7 text-primary/55 sm:text-lg">See the fastest recent results, then use them as a reason to make your next session a little sharper.</p></div>
              <Link href="/typing-test/1-minute" className="group inline-flex items-center gap-3 self-start bg-primary px-5 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5 lg:self-end">Set a score<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </div>
        </section>
        <section className="px-6 py-16 sm:px-8 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl border border-primary/15 bg-white/[0.02]">
            <div className="flex items-center justify-between border-b border-primary/10 p-5 sm:px-7"><div className="flex items-center gap-3"><Crown className="h-5 w-5 text-primary" aria-hidden="true" /><span className="text-sm font-medium">Recent top scores</span></div><span className="text-xs text-primary/40">1-minute tests</span></div>
            <div className="hidden grid-cols-[5rem_1fr_8rem_8rem] gap-4 border-b border-primary/10 px-7 py-4 text-[10px] uppercase tracking-[0.16em] text-primary/35 sm:grid"><span>Rank</span><span>Typist</span><span>Speed</span><span>Accuracy</span></div>
            {previewRows.map((row, index) => <div key={row.rank} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-primary/10 px-5 py-5 last:border-0 sm:grid-cols-[5rem_1fr_8rem_8rem] sm:px-7"><span className="flex items-center gap-2 text-sm font-medium">{index === 1 ? <Medal className="hidden h-4 w-4 sm:block" aria-hidden="true" /> : null}{row.rank}</span><span className="font-medium">{row.name}</span><span className="text-sm font-medium sm:text-left">{row.speed} <span className="text-xs text-primary/40">WPM</span></span><span className="hidden text-sm text-primary/65 sm:block">{row.accuracy}</span></div>)}
            <div className="border-t border-primary/10 p-6 text-sm text-primary/50">Live rankings and personal placements will appear here when accounts and score history are connected.</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
