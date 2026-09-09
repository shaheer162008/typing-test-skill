"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Search } from "lucide-react";

type CertificateRecord = {
  certificateId: string | null;
  name?: string;
  wpm: number;
  accuracy: number;
  completedAt: string;
};

export default function CertificateVerifier() {
  const [certificateId, setCertificateId] = useState("");
  const [result, setResult] = useState<CertificateRecord | null>(null);
  const [searched, setSearched] = useState(false);

  const verify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(true);
    try {
      const records = JSON.parse(window.localStorage.getItem("typing-test-results") ?? "[]") as CertificateRecord[];
      const normalizedId = certificateId.trim().toUpperCase();
      setResult(records.find((record) => record.certificateId?.toUpperCase() === normalizedId) ?? null);
    } catch {
      setResult(null);
    }
  };

  return (
    <section className="border-t border-primary/10 px-6 py-16 sm:px-8 md:px-10 md:py-24" aria-labelledby="verify-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div><p className="text-xs uppercase tracking-[0.18em] text-primary/45">Public lookup</p><h2 id="verify-title" className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">Verify a certificate.</h2><p className="mt-5 max-w-md text-sm leading-7 text-primary/55">Enter a certificate ID to check the learner, result, and issue date saved by Typing Test Skill.</p></div>
        <div>
          <form onSubmit={verify} className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="certificate-id">Certificate ID</label>
            <input id="certificate-id" name="certificateId" value={certificateId} onChange={(event) => setCertificateId(event.target.value)} placeholder="Enter certificate ID…" autoComplete="off" spellCheck={false} className="min-h-12 flex-1 border border-primary/20 bg-white/[0.04] px-4 text-base text-primary outline-none transition focus:border-primary/60" />
            <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 text-sm font-semibold text-black transition hover:bg-primary/85"><Search className="h-4 w-4" aria-hidden="true" /> Verify ID</button>
          </form>
          {searched && (result ? <div className="mt-5 border border-emerald-300/30 bg-emerald-300/[0.06] p-5" role="status"><div className="flex items-center gap-2 text-sm font-medium text-emerald-200"><CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Certificate verified</div><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-xs uppercase tracking-[0.14em] text-primary/40">Issued to</dt><dd className="mt-1">{result.name ?? "Typing Test Skill learner"}</dd></div><div><dt className="text-xs uppercase tracking-[0.14em] text-primary/40">Issued by</dt><dd className="mt-1">Typing Test Skill</dd></div><div><dt className="text-xs uppercase tracking-[0.14em] text-primary/40">Result</dt><dd className="mt-1">{result.wpm} WPM · {result.accuracy}% accuracy</dd></div><div><dt className="text-xs uppercase tracking-[0.14em] text-primary/40">Issued</dt><dd className="mt-1">{new Date(result.completedAt).toLocaleDateString()}</dd></div></dl></div> : <div className="mt-5 flex gap-3 border border-red-300/25 bg-red-300/[0.05] p-5 text-sm text-red-100" role="alert"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><span>No verified certificate was found for that ID.</span></div>)}
        </div>
      </div>
    </section>
  );
}
