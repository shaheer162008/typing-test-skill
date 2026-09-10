export type CertificateTier = {
  id: "beginner" | "intermediate" | "advanced" | "expert" | "master";
  label: string;
  minWpm: number;
  maxWpm: number | null;
  description: string;
};

export const certificateTiers: CertificateTier[] = [
  { id: "master", label: "Master", minWpm: 90, maxWpm: null, description: "Elite speed. Certificate proves it." },
  { id: "expert", label: "Expert", minWpm: 71, maxWpm: 89, description: "Top tier. Consistency is your advantage." },
  { id: "advanced", label: "Advanced", minWpm: 51, maxWpm: 70, description: "Solid technique. Ready for certification." },
  { id: "intermediate", label: "Intermediate", minWpm: 31, maxWpm: 50, description: "Building speed. Daily practice pays off." },
  { id: "beginner", label: "Beginner", minWpm: 0, maxWpm: 30, description: "Just starting out. Focus on accuracy first." },
];

export function getCertificateTier(rawWpm: number) {
  return certificateTiers.find((tier) => rawWpm >= tier.minWpm && (tier.maxWpm === null || rawWpm <= tier.maxWpm)) ?? certificateTiers.at(-1)!;
}
