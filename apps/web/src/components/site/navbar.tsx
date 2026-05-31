"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Implants", href: "#implants" },
  { label: "Treatment", href: "#treatment" },
  { label: "Preventive Care", href: "#preventive-care" },
] as const;

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-nav-item]", {
        y: -18,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-14"
      aria-label="Primary"
    >
      <a href="#" data-nav-item className="relative z-10">
        <Logo />
      </a>

      <ul className="hidden items-center gap-10 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.label} data-nav-item>
            <a
              href={link.href}
              className="text-[15px] font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3" data-nav-item>
        <Button className="hidden rounded-full px-6 py-5 text-[15px] font-semibold sm:inline-flex">
          Book Appointment
        </Button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute left-4 right-4 top-20 z-20 rounded-2xl border border-foreground/10 bg-background/95 p-4 backdrop-blur lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button className="mt-3 w-full rounded-full font-semibold">Book Appointment</Button>
        </div>
      )}
    </nav>
  );
}
