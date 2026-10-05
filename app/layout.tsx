import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { services, siteConfig } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.fullName} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web development Kolkata",
    "website development Kolkata",
    "mobile app development Kolkata",
    "UI UX design Kolkata",
    "web development West Bengal",
    "website development West Bengal",
    "app developers Kolkata",
    "digital product studio India",
  ],
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.fullName,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.fullName,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.fullName,
    locale: "en_IN",
    countryName: "India",
    url: siteConfig.url,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.fullName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      logo: new URL("/logo.png", siteConfig.url).toString(),
      email: siteConfig.email,
      telephone: siteConfig.phoneDisplay,
      areaServed: [
        {
          "@type": "City",
          name: "Kolkata",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "West Bengal",
          },
        },
        {
          "@type": "AdministrativeArea",
          name: "West Bengal",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      knowsAbout: [
        "Web development",
        "Mobile app development",
        "UI/UX design",
        "Product development",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: siteConfig.phoneDisplay,
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.fullName,
      description: siteConfig.description,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: "en-IN",
      about: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${siteConfig.url}/#services`,
      name: "Web and app development services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: {
            "@id": `${siteConfig.url}/#organization`,
          },
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${nunito.variable} h-full`}
    >
      <body
        className="grain relative flex min-h-full flex-col"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        <main className="relative z-0 flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
