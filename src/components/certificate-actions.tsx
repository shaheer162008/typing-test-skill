"use client";

import { Copy, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CertificateActions({ certificateId }: { certificateId: string }) {
  const [copied, setCopied] = useState(false);
  const href = `/certificates/${certificateId}`;
  const copy = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}${href}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const download = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };
  return <div className="mt-4 flex flex-wrap gap-2"><Link href={href} className="inline-flex items-center gap-1.5 border border-black/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em]"><ExternalLink className="h-3.5 w-3.5" /> View</Link><button type="button" onClick={() => void copy()} className="inline-flex items-center gap-1.5 border border-black/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em]"><Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Share"}</button><button type="button" onClick={download} className="inline-flex items-center gap-1.5 border border-black/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em]"><Download className="h-3.5 w-3.5" /> PNG</button></div>;
}
