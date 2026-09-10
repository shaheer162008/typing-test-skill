import type { Metadata } from "next";
import CertificatePublicView from "@/components/certificate-public-view";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Certificate ${id} | Typing Test Skill`, description: "Publicly verify a Typing Test Skill certificate." };
}

export default async function PublicCertificatePage({ params }: PageProps) {
  const { id } = await params;
  return <CertificatePublicView certificateId={id} />;
}
