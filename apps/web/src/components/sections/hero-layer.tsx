import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { LocalClock } from "@/components/site/local-clock";

const EXPERTS = [
  { name: "Dr. Raihan", role: "Implant Specialist", img: "/doctor1.webp", href: "/doctors/dr-raihan" },
  { name: "Dr. Nadia",  role: "Cosmetic Dentist",   img: "/doctor2.jpg",  href: "/doctors/dr-nadia"  },
] as const;

const TITLE_LINES = ["Advanced", "Care for a Perfect", "Smile"] as const;

/** Hero overlay — the first screen of the pinned implant experience. */
export function HeroLayer() {
  return (
    <div className="flex h-full flex-col">
      <Navbar />

      {/* ── Desktop layout ── */}
      <div className="relative hidden flex-1 lg:block">
        <div className="container grid h-full grid-cols-12 content-center items-center gap-12">
          {/* Headline + intro */}
          <div className="z-10 col-span-7">
            <h1 className="font-display text-4xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-[90px]">
              {TITLE_LINES.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-hero-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p
              data-hero="sub"
              className="mt-8 max-w-md text-base leading-relaxed text-foreground/70 sm:text-lg lg:text-2xl"
            >
              From routine checkups to complex restorations, a comprehensive approach to your dental
              health.
            </p>
          </div>

          {/* Implant occupies the center column */}
          <div className="col-span-1" aria-hidden />

          {/* Experts */}
          <div className="z-10 col-span-3 flex justify-end">
            <div data-hero="experts" className="w-full max-w-[300px]">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.2em] text-foreground/60">
                  Our Experts
                </span>
                <span className="flex items-center gap-1 text-sm text-foreground/50">
                  Next 9 <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="flex gap-6">
                {EXPERTS.map((expert) => (
                  <Link key={expert.name} href={expert.href} className="group flex flex-col items-center gap-3">
                    {/* Circle photo — 1.5× = h-36 w-36 */}
                    <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-2 border-primary/40 shadow-[0_0_0_4px_rgba(255,148,16,0.12),0_16px_48px_rgba(2,25,45,0.65)] transition-all duration-300 group-hover:border-primary/80 group-hover:shadow-[0_0_0_6px_rgba(255,148,16,0.2),0_20px_60px_rgba(255,148,16,0.18)]">
                      <Image
                        src={expert.img}
                        alt={expert.name}
                        fill
                        sizes="144px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    {/* Name + role + arrow */}
                    <figcaption className="text-center">
                      <p className="flex items-center justify-center gap-1 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                        {expert.name}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </p>
                      <p className="mt-0.5 text-[11px] tracking-wide text-foreground/50">{expert.role}</p>
                    </figcaption>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout — title pinned to bottom ── */}
      <div className="relative flex-1 lg:hidden" />
      <div className="lg:hidden">
        {/* gradient scrim for text legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

        <div className="relative z-10 px-6 pb-10">
          <h1 className="font-display text-[3.25rem] font-semibold leading-[1.0]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-foreground">
                Advanced
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-foreground">
                Care for a
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-primary">
                Perfect
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-foreground">
                Smile
              </span>
            </span>
          </h1>

          <button
            data-hero="sub"
            className="mt-8 rounded-full px-8 py-3 text-base font-medium bg-[linear-gradient(180deg,#ffab2e,#f58b00)] shadow-[0_8px_30px_rgba(255,145,0,.25)]"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* ── Desktop bottom info strip ── */}
      <div className="container hidden items-center justify-center gap-20 pb-7 text-[11px] uppercase tracking-[0.18em] text-foreground/50 sm:text-xs lg:flex">
        <span data-hero="meta" className="leading-snug">
        Best Dental Clinic
          <br />
          Chattogram
        </span>
        <span data-hero="meta" className="flex flex-col items-center gap-0.5 text-center">
          <span>Dampara, Chattogram</span>
          <LocalClock />
        </span>
        <span data-hero="meta" className="text-right leading-snug">
          Advanced Dental
          <br />
          Technologies
        </span>
      </div>
    </div>
  );
}
