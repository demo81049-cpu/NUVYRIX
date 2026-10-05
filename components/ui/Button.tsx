import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_4px_20px_-2px_rgba(2,132,199,0.15)] hover:shadow-[0_6px_24px_-4px_rgba(2,132,199,0.25)]",
  outline:
    "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary/10",
  ghost: "bg-transparent text-primary hover:bg-primary/10",
  secondary:
    "bg-secondary text-secondary-foreground shadow-[0_4px_20px_-2px_rgba(124,58,237,0.2)] hover:shadow-[0_6px_24px_-4px_rgba(124,58,237,0.3)]",
  white: "bg-white text-foreground shadow-soft hover:bg-white/90",
} as const;

const sizes = {
  sm: "h-10 px-6 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-14 px-10 text-lg",
} as const;

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:")
  );
}

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = Common &
  (
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({
        href: string;
        external?: boolean;
      } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
  );

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props;
    const treatExternal = external ?? isExternalHref(href);

    if (treatExternal) {
      const isWeb = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(isWeb
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
