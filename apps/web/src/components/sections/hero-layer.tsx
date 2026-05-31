import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { LocalClock } from "@/components/site/local-clock";

const EXPERTS = [
  { name: "Clara Collins", initials: "CC", from: "from-primary/40", to: "to-secondary/50" },
  { name: "Mason", initials: "M", from: "from-secondary/50", to: "to-primary/25" },
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
            <h1 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
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
              className="mt-8 max-w-md text-base leading-relaxed text-foreground/70 sm:text-lg"
            >
              From routine checkups to complex restorations, a comprehensive approach to your dental
              health.
            </p>
          </div>

          {/* Implant occupies the center column */}
          <div className="col-span-2" aria-hidden />

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
              <div className="grid grid-cols-2 gap-3">
                {EXPERTS.map((expert) => (
                  <figure
                    key={expert.name}
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-foreground/10"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${expert.from} ${expert.to}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-foreground/90">
                      {expert.initials}
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-3 text-sm font-medium text-foreground">
                      {expert.name}
                    </figcaption>
                  </figure>
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
            className="mt-8 rounded-full bg-foreground px-8 py-3 text-base font-medium text-background shadow-lg"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* ── Desktop bottom info strip ── */}
      <div className="container hidden items-end justify-between pb-7 text-[11px] uppercase tracking-[0.18em] text-foreground/50 sm:text-xs lg:flex">
        <span data-hero="meta" className="leading-snug">
          Best Dentistry
          <br />
          2025
        </span>
        <span data-hero="meta" className="flex flex-col items-center gap-0.5 text-center">
          <span>Barcelona, Spain</span>
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
