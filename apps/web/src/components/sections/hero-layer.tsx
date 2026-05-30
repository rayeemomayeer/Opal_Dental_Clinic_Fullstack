import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { LocalClock } from "@/components/site/local-clock";

const EXPERTS = [
  { name: "Clara Collins", initials: "CC", from: "from-amber-200/80", to: "to-orange-400/70" },
  { name: "Mason", initials: "M", from: "from-sky-200/70", to: "to-teal-500/60" },
] as const;

const TITLE_LINES = ["Advanced", "Care for a Perfect", "Smile"] as const;

/** Hero overlay — the first screen of the pinned implant experience. */
export function HeroLayer() {
  return (
    <div className="flex h-full flex-col">
      <Navbar />

      {/* ── Desktop layout ── */}
      <div className="relative hidden flex-1 lg:block">
        <div className="container grid h-full grid-cols-12 content-center items-center gap-10">
          {/* Headline + intro */}
          <div className="z-10 col-span-7">
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
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
              className="mt-6 max-w-sm text-sm leading-relaxed text-white/65 sm:text-base"
            >
              From routine checkups to complex restorations, a comprehensive approach to your dental
              health.
            </p>
          </div>

          {/* Implant occupies the center column */}
          <div className="col-span-2" aria-hidden />

          {/* Experts */}
          <div className="z-10 col-span-3 flex justify-end">
            <div data-hero="experts" className="w-full max-w-[280px]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-white/55">
                  Our Experts
                </span>
                <span className="flex items-center gap-1 text-xs text-white/45">
                  Next 9 <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {EXPERTS.map((expert) => (
                  <figure
                    key={expert.name}
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${expert.from} ${expert.to}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-white/85">
                      {expert.initials}
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-medium text-white">
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 px-5 pb-8">
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.0]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-white">
                Advanced
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-white">
                Care for a
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-[hsl(38,91%,55%)]">
                Perfect
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-white">
                Smile
              </span>
            </span>
          </h1>

          <button
            data-hero="sub"
            className="mt-6 rounded-full bg-white px-7 py-2.5 text-sm font-medium text-[#5c1a06] shadow-lg"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* ── Desktop bottom info strip ── */}
      <div className="container hidden items-end justify-between pb-6 text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px] lg:flex">
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
