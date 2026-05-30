import { cn } from "@/lib/utils";

/** Opal wordmark with a tooth/gem glyph. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 text-white", className)}>
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 shrink-0"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3c-3.4 0-5.2 1.8-7.7 1.8C5.6 4.8 3 6.8 3 11.2c0 3.6 1.2 6.4 2.3 10.1C6.4 25 7.2 29 9.3 29c2 0 2.3-3.4 3.3-6 .7-1.8 1.4-2.6 3.4-2.6s2.7.8 3.4 2.6c1 2.6 1.3 6 3.3 6 2.1 0 2.9-4 4-7.7C30.8 17.6 32 14.8 32 11.2 32 6.8 29.4 4.8 26.7 4.8 24.2 4.8 22.4 3 19 3h-3Z"
          className="fill-white"
        />
        <path
          d="M16 3c-3.4 0-5.2 1.8-7.7 1.8 2 .6 3.4 1.9 4.4 3.4.8 1.2 1.9 2 3.3 2s2.5-.8 3.3-2c1-1.5 2.4-2.8 4.4-3.4C24.2 4.8 22.4 3 19 3h-3Z"
          className="fill-primary"
        />
      </svg>
      <span className="font-display text-[15px] font-semibold tracking-[0.18em]">OPAL DENTAL</span>
    </span>
  );
}
