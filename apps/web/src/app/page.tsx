import { ImplantExperience } from "@/components/sections/implant-experience";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { Footer } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <main>
        {/* Hero → Service: pinned, scroll-scrubbed implant animation */}
        <ImplantExperience />

        {/* Services list with hover-driven duotone imagery (overlaps the section above) */}
        <ServicesSection />

        {/* Why Choose Us — video + 6-card feature grid */}
        <WhyUsSection />

        {/* Gallery — continuous horizontal scroll strip */}
        <GallerySection />
      </main>

      {/* Map + Footer */}
      <Footer />
    </>
  );
}
