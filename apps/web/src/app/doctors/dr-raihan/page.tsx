import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Dr. Raihan — Opal Dental Clinic & Implant Centre",
  description: "Implant Specialist at Opal Dental Clinic & Implant Centre, Chattogram.",
};

export default function DrRaihanPage() {
  return (
    <main className="bg-opal-gradient flex min-h-screen flex-col items-center justify-center px-6">
      <Link
        href="/"
        className="group mb-16 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-foreground/90"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Home
      </Link>

      <div className="text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(11,79,125,0.8) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <p className="relative mb-6 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Coming Soon
        </p>
        <h1 className="font-display relative text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Developing<span className="text-primary">…</span>
        </h1>
        <p className="relative mt-6 text-base leading-relaxed text-foreground/55">
          Dr. Raihan&apos;s profile page is being prepared. Check back soon.
        </p>
      </div>
    </main>
  );
}
