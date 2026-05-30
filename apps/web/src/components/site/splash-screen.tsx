"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 1600);
    const removeTimer = setTimeout(() => setVisible(false), 2150);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1f33] transition-opacity duration-550 ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer expanding ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 340,
            height: 340,
            background: "radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)",
            animation: "opal-ring-pulse 1.4s ease-out 0.3s forwards",
            opacity: 0,
          }}
        />

        {/* Ambient amber glow orb */}
        <div
          className="absolute rounded-full"
          style={{
            width: 260,
            height: 260,
            background: "radial-gradient(circle, rgba(245,166,35,0.35) 0%, rgba(255,184,77,0.12) 50%, transparent 70%)",
            animation: "opal-glow-expand 1.1s ease-out 0.1s forwards",
            opacity: 0,
          }}
        />

        {/* Logo */}
        <div
          className={`relative transition-all duration-500 ease-in ${
            hiding ? "opacity-0 scale-90" : ""
          }`}
          style={{
            animation: hiding ? undefined : "opal-logo-in 0.85s cubic-bezier(0.22,1,0.36,1) forwards",
            opacity: hiding ? undefined : 0,
          }}
        >
          <Image
            src="/logo.svg"
            alt="Opal Dental Clinic"
            width={300}
            height={214}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
