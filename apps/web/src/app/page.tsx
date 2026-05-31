import { ImplantExperience } from "@/components/sections/implant-experience";
import { ServicesSection } from "@/components/sections/services-section";

export default function HomePage() {
  return (
    <main>
      {/* Hero → Service: pinned, scroll-scrubbed implant animation */}
      <ImplantExperience />

      {/* Services list with hover-driven duotone imagery (overlaps the section above) */}
      <ServicesSection />
    </main>
  );
}
