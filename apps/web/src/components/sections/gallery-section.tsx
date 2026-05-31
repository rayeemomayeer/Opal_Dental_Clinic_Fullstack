"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { ArrowUpRight } from "lucide-react";

const IMAGES = [
  { src: "/gallery/gallery_1.jpg", alt: "Opal Dental Clinic — treatment room" },
  { src: "/gallery/gallery_2.jpg", alt: "Opal Dental Clinic — dental procedure" },
  { src: "/gallery/gallery_3.jpg", alt: "Opal Dental Clinic — clinic interior" },
  { src: "/gallery/gallery_4.jpg", alt: "Opal Dental Clinic — patient care" },
] as const;

// Duplicate for seamless loop
const TRACK = [...IMAGES, ...IMAGES, ...IMAGES];

export function GallerySection() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const pausedRef = useRef(false);

  // Entrance animation
  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-gal-head]", {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });
      gsap.from("[data-gal-btn]", {
        y: 20,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-gal-btn]", start: "top 92%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Continuous scroll ticker
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of one set (4 images × item width)
    const getLoopWidth = () => track.scrollWidth / 3;

    const buildTween = () => {
      if (tweenRef.current) tweenRef.current.kill();
      tweenRef.current = gsap.to(track, {
        x: () => -getLoopWidth(),
        duration: 28,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % getLoopWidth()),
        },
      });
    };

    buildTween();

    const onResize = () => buildTween();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tweenRef.current?.kill();
    };
  }, []);

  const pause = () => {
    if (!pausedRef.current) {
      tweenRef.current?.pause();
      pausedRef.current = true;
    }
  };
  const resume = () => {
    if (pausedRef.current) {
      tweenRef.current?.resume();
      pausedRef.current = false;
    }
  };

  return (
    <section
      ref={rootRef}
      id="gallery"
      className="relative z-10 overflow-hidden pb-24 pt-20 lg:pt-28"
    >

      {/* Header */}
      <div className="container mb-12 lg:mb-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              data-gal-head
              className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-primary"
            >
              Our Gallery
            </p>
            <h2
              data-gal-head
              className="font-display text-4xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              A Glimpse of{" "}
              <span className="text-primary">Our Clinic</span>
            </h2>
          </div>
          <p
            data-gal-head
            className="max-w-sm text-base leading-relaxed text-foreground/60 sm:text-right"
          >
            State-of-the-art facilities designed for comfort, precision, and
            a premium dental experience.
          </p>
        </div>
      </div>

      {/* ── Scrolling strip ── */}
      <div
        className="relative w-full"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        {/* Left fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 lg:w-40"
          style={{
            background:
              "linear-gradient(to right, #02192d 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 lg:w-40"
          style={{
            background:
              "linear-gradient(to left, #02192d 0%, transparent 100%)",
          }}
        />

        <div ref={trackRef} className="flex will-change-transform">
          {TRACK.map(({ src, alt }, i) => (
            <div
              key={i}
              className="relative mx-3 h-64 w-80 shrink-0 overflow-hidden rounded-2xl border border-foreground/10 shadow-[0_20px_60px_rgba(2,25,45,0.5)] sm:h-72 sm:w-96 lg:h-80 lg:w-[420px]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="420px"
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              {/* Subtle brand overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(2,25,45,0.15) 0%, transparent 50%, rgba(255,148,16,0.06) 100%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── View Gallery button ── */}
      <div className="container mt-12 flex justify-center lg:mt-16">
        <Link
          data-gal-btn
          href="/gallery"
          className="group opal-button inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-primary-foreground"
        >
          View Gallery
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
