import { FeaturedWork } from "@/components/home/FeaturedWork";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TechMarquee } from "@/components/home/TechMarquee";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Web & App Development in Kolkata",
  description:
    "NUVYRIX designs and builds websites, mobile apps, and digital products for businesses in Kolkata, across West Bengal, and throughout India.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesPreview />
      <Process />
      <FeaturedWork />
      <FinalCTA />
    </>
  );
}
