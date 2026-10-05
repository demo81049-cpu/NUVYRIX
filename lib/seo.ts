import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const pageTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    publisher: siteConfig.fullName,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.fullName,
      countryName: "India",
      locale: "en_IN",
      title: pageTitle,
      description,
      url: new URL(path, siteConfig.url).toString(),
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
      title: pageTitle,
      description,
      images: ["/opengraph-image"],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
