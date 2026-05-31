"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

const REASONS = [
  {
    title: "Experienced Dentists",
    body: "Our team of dental professionals ensures safe, comfortable, effective experience.",
  },
  {
    title: "Modern Equipment",
    body: "State-of-the-art dental technology for accurate diagnosis and treatment.",
  },
  {
    title: "Quality Dental Care",
    body: "Quality dental care at competitive prices with flexible payment options.",
  },
  {
    title: "Comfortable Environment",
    body: "Calming atmosphere with amenities to make your visit pleasant.",
  },
  {
    title: "Quick Appointments",
    body: "Same-day appointments available for emergencies and urgent care.",
  },
  {
    title: "Sterile & Safe",
    body: "Strict sterilization protocols and safety measures for your protection.",
  },
] as const;

export function WhyUsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-why-head]", {
        y: 30,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.13,
        scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
      });

      gsap.from("[data-why-video]", {
        x: 50,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      gsap.from("[data-why-card]", {
        y: 28,
        autoAlpha: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-why-grid]", start: "top 88%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Lazy-load: set src only when near viewport
  useIsomorphicLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          video.src = "/why_choose_us.webm";
          video.load();
          void video.play().catch(() => {});
          obs.disconnect();
        }
      },
      { rootMargin: "240px" },
    );

    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="why-us"
      className="bg-opal-gradient relative z-10 pb-24 pt-20 lg:pt-28"
    >
      {/* Top divider glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
      />

      <div className="container">
        {/* ── Row 1: title (1/3) + video (2/3) ── */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[1fr_2fr] lg:gap-14">

          {/* Left — heading block */}
          <div className="flex flex-col justify-center">
            <p
              data-why-head
              className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-primary"
            >
              Why Choose Us
            </p>
            <h2
              data-why-head
              className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
            >
              Why Choose{" "}
              <span className="text-primary">Opal Dental</span>{" "}
              for Your Smile?
            </h2>
            <p
              data-why-head
              className="mt-6 text-base leading-relaxed text-foreground/60"
            >
              We are committed to providing exceptional dental care with these
              key advantages.
            </p>
          </div>

          {/* Right — video (2/3 width) */}
          <div data-why-video className="relative">
            {/* Blue atmospheric glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 75% 65% at 55% 50%, rgba(11,79,125,0.35), transparent 72%)",
                filter: "blur(28px)",
              }}
            />

            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_40px_100px_rgba(2,25,45,0.65)] ring-1 ring-inset ring-foreground/8">
              <div className="relative aspect-[16/10] w-full bg-[#021520]">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label="Why choose Opal Dental Clinic"
                />
                {/* Subtle navy-to-orange brand tint */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(2,25,45,0.22) 0%, transparent 55%, rgba(255,148,16,0.06) 100%)",
                  }}
                />

                {/* Mute / unmute button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="group absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md transition-all duration-200 hover:border-primary/50 hover:bg-background/70 hover:shadow-[0_0_20px_rgba(255,145,0,0.2)]"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4 text-foreground/70 transition-colors group-hover:text-primary" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-primary" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: 3-column plain-text features (like the inspiration) ── */}
        <div
          data-why-grid
          className="mt-14 border-t border-foreground/10 pt-14 lg:mt-20 lg:pt-20"
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-12">
            {REASONS.map(({ title, body }) => (
              <div key={title} data-why-card>
                {/* Orange accent dash */}
                <div className="mb-4 h-[3px] w-8 rounded-full bg-primary" />
                <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/58 lg:text-base">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
