import { ArrowRight } from "lucide-react";
import { Blob } from "@/components/ui/Blob";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { siteConfig } from "@/lib/site";

export function FinalCTA() {
  return (
    <Section tone="dark" width="5xl" className="text-center">
      <Blob
        shapeIndex={3}
        className="left-[-5%] top-10 h-56 w-56 opacity-40"
        tone="cyan"
      />
      <Blob
        shapeIndex={4}
        className="bottom-0 right-[-5%] h-64 w-64 opacity-40"
        tone="violet"
      />

      <div data-reveal>
<p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
        Ready when you are
      </p>
      <h2 className="mt-4 text-4xl text-white md:text-5xl">
        Ready to build, launch, and grow?
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
        Tell us about your website or app idea. We’ll reply with a clear next
        step—no pressure, no jargon.
      </p>
      </div>
      <div data-stagger className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
        <Button href="/contact" variant="white" size="lg">
          Get in touch
          <ArrowRight size={20} />
        </Button>
        <Button
          href={`mailto:${siteConfig.email}`}
          variant="outline"
          size="lg"
          className="border-white/40 text-white hover:bg-white/10"
        >
          {siteConfig.email}
        </Button>
        <Button
          href={siteConfig.phoneHref}
          variant="outline"
          size="lg"
          className="border-white/40 text-white hover:bg-white/10"
        >
          {siteConfig.phoneDisplay}
        </Button>
      </div>
    </Section>
  );
}
