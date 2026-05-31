"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

type Service = {
  name: string;
  items: readonly string[];
  img: string;
};

const SERVICES: readonly Service[] = [
  {
    name: "Restorative Dentistry",
    items: ["Composite Fillings", "Veneers", "Crowns", "CAD/CAM Prosthesis", "Zirconia Restorations"],
    img: "/services/svc-1.webp",
  },
  {
    name: "Endodontics",
    items: ["Single-Visit Root Canal (RCT)", "Laser Root Canal", "Advanced Re-RCT"],
    img: "/services/svc-2.webp",
  },
  {
    name: "Dental Implants",
    items: ["All-on-4 Implants", "Full Mouth Rehabilitation", "Digitally Guided Implant Surgery"],
    img: "/services/svc-3.webp",
  },
  {
    name: "Orthodontics",
    items: ["Metal Braces", "Ceramic Braces", "Invisalign (Clear Aligners)"],
    img: "/services/svc-4.webp",
  },
  {
    name: "Cosmetic Dentistry",
    items: ["Smile Design", "Digital Smile Designing", "Smile Makeovers"],
    img: "/services/svc-5.webp",
  },
  {
    name: "Oral & Maxillofacial Surgery",
    items: ["PRF Therapy", "Trauma Management", "Minor Oral Surgery", "Major Oral Surgery"],
    img: "/services/svc-1.webp",
  },
  {
    name: "Laser Dentistry",
    items: ["Cosmetic Laser Treatments", "Clinical Laser Procedures", "Teeth Whitening", "Gummy Smile Correction"],
    img: "/services/svc-2.webp",
  },
  {
    name: "Specialized Treatments",
    items: ["TMJ Therapy", "CAD/CAM Splint Therapy"],
    img: "/services/svc-3.webp",
  },
];

/** Duotone image stack — only the active one is visible; cross-fades on change. */
function ServiceImageStack({ active }: { active: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-foreground/10">
      {SERVICES.map((s, i) => (
        <div
          key={s.name}
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Image
            src={s.img}
            alt={s.name}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="duotone-base object-cover"
          />
          <div className="duotone-shadow pointer-events-none absolute inset-0 opacity-60" />
          <div className="duotone-light pointer-events-none absolute inset-0 opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>
      ))}
      {/* Active service label chip */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/70 px-4 py-2 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-sm font-medium text-foreground">{SERVICES[active].name}</span>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-svc-head]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: rootRef.current, start: "top 95%" },
      });
      gsap.from("[data-svc-row]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-svc-list]", start: "top 95%" },
      });
      gsap.from("[data-svc-panel]", {
        x: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-svc-list]", start: "top 95%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="services"
      className="bg-opal-gradient relative z-10 -mt-[38vh] rounded-t-[2.5rem] pb-24 pt-20 shadow-[0_-60px_120px_rgba(2,25,45,0.85)] ring-1 ring-inset ring-foreground/10 sm:-mt-[40vh] sm:rounded-t-[3rem] lg:pt-28"
    >
      <div className="container">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              data-svc-head
              className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-foreground/55"
            >
              Our Services
            </p>
            <h2
              data-svc-head
              className="font-display text-4xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              What <span className="text-primary">Services</span>
              <br />
              We&rsquo;re Offering
            </h2>
          </div>
          <p
            data-svc-head
            className="text-base leading-relaxed text-foreground/65 lg:col-span-5"
          >
            Comprehensive, technology-led dental care — from restorative and implant dentistry to
            cosmetic smile design. Every treatment is delivered with precision, comfort, and a
            premium standard of care.
          </p>
        </div>

        {/* List + image */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16">
          {/* List */}
          <ul data-svc-list className="border-t border-foreground/10">
            {SERVICES.map((service, i) => {
              const isActive = i === active;
              return (
                <li key={service.name} data-svc-row className="border-b border-foreground/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group flex w-full items-center justify-between gap-4 py-6 text-left lg:py-7"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-primary transition-all duration-300"
                        style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(0)" }}
                      />
                      <span
                        className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl ${
                          isActive ? "text-foreground" : "text-foreground/45 group-hover:text-foreground/80"
                        }`}
                      >
                        {service.name}
                      </span>
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-foreground/25 text-foreground/60 group-hover:border-foreground/50"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Sub-items: animated expand */}
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      {/* Mobile inline image */}
                      <div className="relative mb-4 aspect-[16/10] w-full lg:hidden">
                        <ServiceImageStack active={active} />
                      </div>
                      <ul className="flex flex-wrap gap-x-6 gap-y-2 pb-6 pl-6">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-foreground/70 sm:text-base"
                          >
                            <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Sticky duotone image panel (desktop) */}
          <div className="hidden lg:block">
            <div data-svc-panel className="sticky top-24 aspect-[4/5]">
              <ServiceImageStack active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
