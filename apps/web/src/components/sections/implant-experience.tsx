"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { SEQUENCE } from "@/lib/sequence";
import { HeroLayer } from "./hero-layer";
import { ServiceLayer } from "./service-layer";

const TOTAL = SEQUENCE.frameCount;

/**
 * Pinned, scroll-scrubbed implant animation.
 *
 * A full-screen canvas renders the 192-frame WebP sequence. As the user scrolls,
 * GSAP ScrollTrigger pins the stage and scrubs the frames — the screw rotates
 * (hero) and then plants into the gum (service) — while the hero overlay fades
 * out and the service overlay fades in.
 */
export function ImplantExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const serviceBgRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d");
    if (!canvas || !ctx2d) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const images: HTMLImageElement[] = [];
    // scaleMultiplier starts at 0.65 (35% smaller) and grows to 1.0 on scroll.
    const state = { frame: 0, scaleMultiplier: 0.65 };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const index = Math.min(TOTAL - 1, Math.max(0, Math.round(state.frame)));
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx2d.clearRect(0, 0, w, h);
      // Mobile: fill full height (no padding) so gum is never cut off.
      // Desktop: 92% to give breathing room around the implant.
      const padding = w < 1024 ? 1.0 : 0.92;
      const scale = (h / SEQUENCE.height) * padding * state.scaleMultiplier;
      const dw = SEQUENCE.width * scale;
      const dh = SEQUENCE.height * scale;
      ctx2d.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    sizeCanvas();

    // Preload all frames; draw the first as soon as it's ready.
    let firstDrawn = false;
    for (let i = 0; i < TOTAL; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = SEQUENCE.frameSrc(i + 1);
      img.onload = () => {
        if (!firstDrawn) {
          render();
          firstDrawn = true;
        }
        if (i === TOTAL - 1) ScrollTrigger.refresh();
      };
      images[i] = img;
    }

    const onResize = () => {
      sizeCanvas();
      render();
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      // --- Entrance (on load) ---
      if (!reduce) {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from("[data-hero-line]", { yPercent: 110, duration: 0.9, stagger: 0.12 }, 0.1)
          .from("[data-hero='sub']", { y: 20, autoAlpha: 0, duration: 0.7 }, 0.5)
          .from("[data-hero='experts']", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.6)
          .from("[data-hero='meta']", { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, 0.7);
      }

      // --- Reduced motion: show first frame at full size + hero only, skip pinning ---
      if (reduce) {
        state.scaleMultiplier = 1;
        render();
        gsap.set([serviceRef.current, serviceBgRef.current], { autoAlpha: 0 });
        return;
      }

      // --- Scroll-scrubbed timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2.6,
          pin: pinRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Frame scrub spans the whole timeline (duration 3).
      tl.to(state, { frame: TOTAL - 1, ease: "none", duration: 3, onUpdate: render }, 0);

      // Implant grows from 65% → 100% size over the first half of the scroll.
      tl.to(state, { scaleMultiplier: 1, ease: "power1.out", duration: 1.5, onUpdate: render }, 0);

      // Hero overlay fades/lifts out as the screw finishes rotating.
      tl.to(heroRef.current, { autoAlpha: 0, y: -60, ease: "power1.in", duration: 0.7 }, 0.9);

      // Background transitions from navy hero to teal service (behind the implant).
      tl.to(serviceBgRef.current, { autoAlpha: 1, ease: "none", duration: 0.9 }, 1.2);

      // Service overlay rises in as the implant plants.
      tl.fromTo(
        serviceRef.current,
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, ease: "power1.out", duration: 0.9 },
        1.5,
      );
      tl.from("[data-svc-item]", { x: -24, autoAlpha: 0, stagger: 0.15, duration: 0.5 }, 1.9);
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="hero-backdrop relative h-screen w-full overflow-hidden">
        {/* Service backdrop — sits behind the implant so the planted implant stays visible */}
        <div
          ref={serviceBgRef}
          className="bg-opal-gradient-service pointer-events-none absolute inset-0 z-0 opacity-0"
          aria-hidden
        />

        {/* Warm glow behind the implant */}
        <div className="implant-glow pointer-events-none absolute inset-0 z-[1]" aria-hidden />

        {/* Frame-sequence canvas (implant is always on top of the backdrops) */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full" aria-hidden />

        {/* Service text content (fades in; left column, doesn't cover the implant) */}
        <div ref={serviceRef} className="absolute inset-0 z-20 opacity-0">
          <ServiceLayer />
        </div>

        {/* Hero overlay (on top initially, fades out) */}
        <div ref={heroRef} className="absolute inset-0 z-30">
          <HeroLayer />
        </div>
      </div>
    </section>
  );
}
