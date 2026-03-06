import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDemo } from "@/lib/demo-registry";
import DemoImpressumContent from "./content";

export const metadata: Metadata = {
  title: "Impressum",
};

export default async function DemoImpressumPage({
  params,
}: {
  params: Promise<{ demoId: string }>;
}) {
  const { demoId } = await params;
  const demo = await getDemo(demoId);
  if (!demo) notFound();

  return <DemoImpressumContent legal={demo.config.legal} />;
}
