import Image from "next/image";
import Link from "next/link";
import { Phone, AtSign, Facebook } from "lucide-react";
import { FloatingActions } from "./floating-actions";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Why Choose Us", href: "/#why-us" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book Appointment", href: "#" },
  { label: "Dental Implants", href: "/#services" },
  { label: "Orthodontics", href: "/#services" },
  { label: "Cosmetic Dentistry", href: "/#services" },
] as const;

/** Footer brand logo */
function FooterLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Opal Dental Clinic & Implant Centre"
        width={160}
        height={64}
        className="h-28 w-auto"
        unoptimized
      />
    </div>
  );
}

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/opaldentalbd/",
    icon: <Facebook className="h-4 w-4" />,
  },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#011624] text-foreground">
      {/* ── Map ── */}
      <div className="h-[320px] w-full overflow-hidden border-b border-foreground/10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.199378872552!2d91.82552960000004!3d22.3516706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9542cb82ff7%3A0x7ab478a2397b5bdf!2sOpal%20Dental%20Clinic%20%26%20Implant%20Center!5e0!3m2!1sen!2sbd!4v1780204767114!5m2!1sen!2sbd"
          width="100%"
          height="320"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Opal Dental Clinic & Implant Centre — Dampara, Chattogram"
        />
      </div>

      {/* ── Main grid: nav · brand+about · clinic info ── */}
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">

          {/* Left — nav links (hidden on mobile) */}
          <nav aria-label="Footer" className="hidden lg:block">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-display text-2xl font-medium text-foreground/50 transition-colors duration-200 hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Center — logo + tagline */}
          <div className="flex flex-col items-center text-center">
            <FooterLogo />
            <p className="mt-2 text-sm text-foreground/50 tracking-wide">
              Clinic &amp; Implant Centre
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/60">
              Providing modern dental care with compassion and expertise. We are
              committed to delivering exceptional dental experiences in a
              comfortable and welcoming environment.
            </p>
          </div>

          {/* Right — clinic info */}
          <div className="flex flex-col items-start text-left lg:items-end lg:text-right">
            <h3 className="font-display text-2xl font-bold text-foreground">Opal Dental Clinic</h3>
            <address className="mt-3 text-[15px] not-italic leading-relaxed text-foreground/60">
              82, J.I.Madrasha Road,
              <br />Alif Meem Rupayan Tower,
              <br />Dampara, Chattogram
            </address>

            <h3 className="mt-8 font-display text-lg font-semibold text-foreground/70">Opening Hours</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/60">
              Saturday – Thursday: 3:00 PM – 9:00 PM
            </p>
            <p className="text-[15px] text-foreground/60">
              Friday: <span className="text-primary/80">Emergency Only</span>
            </p>

            <a
              href="tel:01330331133"
              className="mt-6 flex items-center gap-2 text-[15px] text-foreground/70 transition-colors hover:text-foreground lg:flex-row-reverse"
            >
              <Phone className="h-4 w-4 text-primary" strokeWidth={1.75} />
              01330331133
            </a>
            <a
              href="mailto:opaldentalclinic0@gmail.com"
              className="mt-3 flex items-center gap-2 text-[15px] text-foreground/70 transition-colors hover:text-foreground lg:flex-row-reverse"
            >
              <AtSign className="h-4 w-4 text-primary" strokeWidth={1.75} />
              opaldentalclinic0@gmail.com
            </a>

            <a
              href="#"
              className="opal-button mt-7 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-foreground/10">
        <div className="container flex flex-col items-center justify-between gap-5 py-6 text-sm text-foreground/40 md:flex-row">
          <span>© 2025 Opal Dental Clinic — All Rights Reserved</span>
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/55 transition-colors duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <FloatingActions />
    </footer>
  );
}
