"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { SEQUENCE } from "@/lib/sequence";
import { HeroLayer } from "./hero-layer";
import { ServiceLayer } from "./service-layer";

const TOTAL = SEQUENCE.frameCount;

/**
 * Solid (alpha-thresholded) content bounding box per phase, as fractions of the
 * frame — measured from the actual WebP frames. A narrow centered screw in the
 * hero widens as the gum forms, then becomes a near-full-width gum whose bottom
 * touches the frame bottom. Used to anchor the gum to the canvas bottom/left so
 * no empty space shows, instead of floating the frame in the center.
 */
type ContentBox = { i: number; wf: number; hf: number; cx: number; cy: number };
const CONTENT_KEYS: ReadonlyArray<ContentBox> = [
  { i: 0, wf: 0.198, hf: 0.796, cx: 0.508, cy: 0.496 },
  { i: 47, wf: 0.297, hf: 1.0, cx: 0.556, cy: 0.5 },
  { i: 71, wf: 0.938, hf: 1.0, cx: 0.474, cy: 0.5 },
  { i: 95, wf: 0.954, hf: 0.936, cx: 0.477, cy: 0.532 },
  { i: 119, wf: 0.96, hf: 0.827, cx: 0.48, cy: 0.587 },
  { i: 143, wf: 0.967, hf: 0.848, cx: 0.483, cy: 0.576 },
  { i: 167, wf: 0.977, hf: 0.852, cx: 0.488, cy: 0.574 },
  { i: 191, wf: 0.984, hf: 0.902, cx: 0.492, cy: 0.549 },
];

function contentBox(idx: number): Omit<ContentBox, "i"> {
  const k = CONTENT_KEYS;
  if (idx <= k[0].i) return k[0];
  for (let n = 1; n < k.length; n++) {
    const a = k[n - 1];
    const b = k[n];
    if (idx <= b.i) {
      const f = (idx - a.i) / (b.i - a.i);
      return {
        wf: a.wf + (b.wf - a.wf) * f,
        hf: a.hf + (b.hf - a.hf) * f,
        cx: a.cx + (b.cx - a.cx) * f,
        cy: a.cy + (b.cy - a.cy) * f,
      };
    }
  }
  return k[k.length - 1];
}

const MOBILE_MAX = 1024; // < this width uses the simple centered mobile renderer
const SVC_FILL = 1.12; // service: cover canvas width with overscan (no left/right gaps)
const SVC_HCENTER = 0.45; // service: implant biased left of center (drifts left, fills left)
const PHASE_START = 46; // frame where hero→service positioning blend begins
const PHASE_END = 78; // completes as the gum widens (kills transient bottom gap)

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => x * x * (3 - 2 * x); // smoothstep
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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

      // ── Mobile (<1024px): previous behavior — centered, full-height fit. ──
      if (w < MOBILE_MAX) {
        const scale = (h / SEQUENCE.height) * state.scaleMultiplier;
        const dw = SEQUENCE.width * scale;
        const dh = SEQUENCE.height * scale;
        ctx2d.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        return;
      }

      // ── Desktop (≥1024px): content-box positioning. ──
      // Hero centers the screw; service anchors the gum to the bottom and biases
      // it left (fills below/left, implant drifts left from hero → service).
      const m = contentBox(index);
      const t = smooth(clamp01((index - PHASE_START) / (PHASE_END - PHASE_START)));

      const heroScale = (h / SEQUENCE.height) * 0.92 * state.scaleMultiplier;
      const svcScale = (w / (m.wf * SEQUENCE.width)) * SVC_FILL; // cover width
      const scale = lerp(heroScale, svcScale, t);

      const dw = SEQUENCE.width * scale;
      const dh = SEQUENCE.height * scale;

      const heroDx = w / 2 - m.cx * dw;
      const heroDy = h / 2 - m.cy * dh;
      const svcDx = SVC_HCENTER * w - m.cx * dw;
      const svcDy = h - (m.cy + m.hf / 2) * dh; // content bottom → canvas bottom

      const dx = lerp(heroDx, svcDx, t);
      const dy = lerp(heroDy, svcDy, t);

      ctx2d.drawImage(img, dx, dy, dw, dh);
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

      // --- Reduced motion: show first frame + hero only, skip pinning ---
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
    <section ref={sectionRef} className="relative overflow-x-hidden">
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
