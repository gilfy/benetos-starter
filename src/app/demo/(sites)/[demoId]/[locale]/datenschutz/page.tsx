import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDemo } from "@/lib/demo-registry";
import DemoDatenschutzContent from "./content";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default async function DemoDatenschutzPage({
  params,
}: {
  params: Promise<{ demoId: string }>;
}) {
  const { demoId } = await params;
  const demo = await getDemo(demoId);
  if (!demo) notFound();

  return <DemoDatenschutzContent legal={demo.config.legal} />;
}
