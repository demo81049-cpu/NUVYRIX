import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { navLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-0 border-t border-white/10 bg-[#05070d] text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative flex h-14 w-14 overflow-hidden rounded-full bg-black ring-1 ring-white/10">
                <Image
                  src="/logo.png"
                  alt=""
                  width={56}
                  height={56}
                  className="object-cover object-top scale-150"
                />
              </span>
              <span>
                <span className="block font-serif text-xl font-bold tracking-wide">
                  {siteConfig.name.slice(0, -1)}
                  <span className="brand-gradient-text">X</span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                  Technologies
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <p className="mt-4 font-serif text-lg brand-gradient-text">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Connect
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <Mail size={18} className="text-sky-400" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <Phone size={18} className="text-violet-400" />
              {siteConfig.phoneDisplay}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white/5 px-5 text-sm font-semibold text-sky-300 transition-all duration-300 hover:bg-sky-500 hover:text-white"
              >
                WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white/5 px-5 text-sm font-semibold text-violet-300 transition-all duration-300 hover:bg-violet-500 hover:text-white"
              >
                Contact form
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights
            reserved.
          </p>
          <p>Freelance web &amp; app development</p>
        </div>
      </Container>
    </footer>
  );
}
