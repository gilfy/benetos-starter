import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo Showcase | Benetos",
  description:
    "Explore live demos of the Benetos website template. See how it looks for a café, fitness studio, and craftsman business.",
  metadataBase: new URL("https://demo.benetos.dev"),
};

export default function DemoChooserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root {
  --background: #0A0A0B;
  --surface: #141416;
  --border: #27272A;
  --primary: #6366F1;
  --primary-foreground: #FFFFFF;
  --accent: #A78BFA;
  --accent-foreground: #FFFFFF;
  --text: #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-muted: #52525B;
}
            `.trim(),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} font-sans antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}
