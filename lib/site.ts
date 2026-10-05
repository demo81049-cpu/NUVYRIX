import {
  Code2,
  Smartphone,
  Palette,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "NUVYRIX",
  fullName: "NUVYRIX TECHNOLOGIES",
  tagline: "Build. Launch. Grow.",
  description:
    "NUVYRIX TECHNOLOGIES designs and builds websites, mobile apps, and digital products for businesses in Kolkata, West Bengal, and across India.",
  serviceAreas: ["Kolkata", "West Bengal", "India"],
  email: "rishibakshi1234@gmail.com",
  phone: "8617384050",
  phoneDisplay: "+91 86173 84050",
  phoneHref: "tel:+918617384050",
  whatsappHref: "https://wa.me/918617384050",
  url: "https://nuvyrix.online",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/payment", label: "Pay" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Fast, accessible websites and web apps built with modern stacks—crafted to convert and easy to maintain.",
    icon: Code2,
    points: [
      "Marketing sites & landing pages",
      "Custom web applications",
      "Performance & SEO foundations",
    ],
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform and native-feeling mobile experiences that put your product in customers’ pockets.",
    icon: Smartphone,
    points: [
      "iOS & Android with React Native",
      "MVP to production roadmap",
      "App store launch support",
    ],
  },
  {
    title: "UI / UX Design",
    description:
      "Interfaces that feel human—clear flows, soft hierarchy, and brand-true visuals your users remember.",
    icon: Palette,
    points: [
      "Product & marketing design",
      "Design systems & components",
      "Prototypes & usability reviews",
    ],
  },
  {
    title: "Launch & Growth",
    description:
      "Beyond ship day: iteration, analytics, and ongoing development so your product keeps gaining momentum.",
    icon: Rocket,
    points: [
      "Post-launch support retainers",
      "Feature roadmaps & sprints",
      "Integrations & automation",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  gradient: string;
  image: string;
  url: string;
};

export const projects: Project[] = [
  {
    slug: "bringbasket",
    title: "BringBasket",
    category: "Web + App",
    summary:
      "Fresh grocery delivery platform with wallet cashback, 45-minute delivery, and franchise growth across India.",
    outcome: "Live at bringbasket.in",
    gradient: "from-emerald-400 via-sky-500 to-violet-600",
    image: "/projects/bringbasket.jpg",
    url: "https://bringbasket.in/",
  },
  {
    slug: "cirkle",
    title: "cirKle Market",
    category: "Web + App",
    summary:
      "B2B kirana wholesale FMCG platform—wholesale pricing and 60-minute delivery for retailers in Noida & Greater Noida.",
    outcome: "Live at cirkle.market",
    gradient: "from-orange-400 via-rose-500 to-violet-600",
    image: "/projects/cirkle.jpg",
    url: "https://cirkle.market/",
  },
  {
    slug: "vnoras",
    title: "Vnoras",
    category: "Web",
    summary:
      "Founding membership site for international travel safety—human concierge, trip planning, and pre-launch reservations.",
    outcome: "Live at vnoras.com",
    gradient: "from-sky-400 via-indigo-500 to-violet-700",
    image: "/projects/vnoras.jpg",
    url: "https://vnoras.com/",
  },
  {
    slug: "paykash",
    title: "PayKash",
    category: "App",
    summary:
      "Cashback rewards app for recharges, bill pay, insurance, and credit card payments with instant redeemable savings.",
    outcome: "Live at paykash.in",
    gradient: "from-cyan-400 via-blue-600 to-fuchsia-500",
    image: "/projects/paykash.jpg",
    url: "https://paykash.in/",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We listen hard—goals, users, constraints—then map a clear path from idea to shipped product.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Flows and visuals take shape with organic clarity: usable, on-brand, and ready to build.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Clean code, thoughtful architecture, and iterative demos so you always see progress.",
  },
  {
    step: "04",
    title: "Grow",
    description:
      "Launch with confidence, then refine with data—features, performance, and new markets.",
  },
];

export const values = [
  {
    title: "Craft over templates",
    description:
      "Every project gets intentional design and code—not a one-size-fits-all theme.",
  },
  {
    title: "Clarity in collaboration",
    description:
      "Plain language, visible milestones, and no surprise invoices. You’re always in the loop.",
  },
  {
    title: "Built to last",
    description:
      "Accessible, maintainable products that grow with you—not tech debt that holds you back.",
  },
];

export const projectTypes = [
  "Website",
  "Web App",
  "Mobile App",
  "UI / UX Design",
  "Ongoing Support",
  "Not sure yet",
] as const;
