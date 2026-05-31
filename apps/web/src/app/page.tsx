import { ImplantExperience } from "@/components/sections/implant-experience";

export default function HomePage() {
  return (
    <main>
      {/* Hero → Service: pinned, scroll-scrubbed implant animation */}
      <ImplantExperience />

      {/* Placeholder for the next sections (Treatment, Preventive Care, …) */}
      <section
        id="treatment"
        className="bg-opal-gradient-service flex min-h-[60vh] items-center justify-center px-6 text-center"
      >
        <p className="max-w-md text-base uppercase tracking-[0.2em] text-foreground/40">
          Next sections coming soon
        </p>
      </section>
    </main>
  );
}
