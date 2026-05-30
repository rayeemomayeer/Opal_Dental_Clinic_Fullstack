/**
 * Implant frame-sequence metadata.
 *
 * Frames were generated from `assets/screw_tooth.mov` (see scripts/encode-sequence.sh)
 * into `public/sequence/frame_0001.webp` … `frame_0192.webp` at 1600×900 with alpha.
 *
 * The canvas-based scroll scrubber (built next) preloads these and draws the
 * frame matching scroll progress through the hero → service transition.
 */
export const SEQUENCE = {
  frameCount: 192,
  width: 1600,
  height: 900,
  basePath: "/sequence",
  /** Zero-padded path for a 1-based frame index. */
  frameSrc(index: number): string {
    const clamped = Math.min(Math.max(index, 1), this.frameCount);
    return `${this.basePath}/frame_${String(clamped).padStart(4, "0")}.webp`;
  },
} as const;
