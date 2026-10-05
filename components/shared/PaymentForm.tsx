"use client";

import { FormEvent, useMemo, useState } from "react";
import Script from "next/script";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { siteConfig } from "@/lib/site";

type Status =
  | { type: "idle" }
  | { type: "loading"; message: string }
  | { type: "error"; message: string }
  | {
      type: "success";
      paymentId: string;
      orderId: string;
      amountLabel: string;
      reason: string;
      emailSent: boolean;
    };

function loadCheckoutScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Razorpay checkout.")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Razorpay checkout."));
    document.body.appendChild(script);
  });
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [copied, setCopied] = useState<string | null>(null);

  const amountPaise = useMemo(() => {
    const rupees = Number(amount);
    if (!Number.isFinite(rupees) || rupees <= 0) return 0;
    return Math.round(rupees * 100);
  }, [amount]);

  async function handleCopy(label: string, value: string) {
    const ok = await copyText(value);
    if (ok) {
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1600);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "loading", message: "Creating secure order…" });

    try {
      if (amountPaise < 100) {
        throw new Error("Minimum payment is ₹1.00");
      }
      if (!reason.trim()) {
        throw new Error("Please enter a reason for this payment.");
      }

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          reason: reason.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Could not create payment order.");
      }
      if (!orderData.key_id) {
        throw new Error("Razorpay key is missing from the order response.");
      }

      await loadCheckoutScript();
      if (!window.Razorpay) {
        throw new Error("Razorpay checkout is unavailable.");
      }

      setStatus({ type: "loading", message: "Opening payment window…" });

      const payerName = name.trim();
      const payerEmail = email.trim();
      const payerPhone = phone.trim();
      const paymentReason = reason.trim();

      const rzp = new window.Razorpay({
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: siteConfig.fullName,
        description: paymentReason,
        order_id: orderData.order_id,
        prefill: {
          name: payerName || undefined,
          email: payerEmail || undefined,
          contact: payerPhone || undefined,
        },
        notes: {
          reason: paymentReason,
        },
        theme: { color: "#0284C7" },
        modal: {
          ondismiss: () => {
            setStatus({
              type: "error",
              message: "Payment cancelled. You can try again anytime.",
            });
          },
        },
        handler: async (response) => {
          setStatus({ type: "loading", message: "Verifying & saving payment…" });
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(
                verifyData.error || "Payment verification failed.",
              );
            }

            setStatus({
              type: "success",
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amountLabel: `₹${(amountPaise / 100).toFixed(2)}`,
              reason: paymentReason,
              emailSent: Boolean(verifyData.email_sent),
            });
          } catch (err) {
            setStatus({
              type: "error",
              message:
                err instanceof Error
                  ? err.message
                  : "Could not verify payment.",
            });
          }
        },
      });

      rzp.on("payment.failed", (response) => {
        setStatus({
          type: "error",
          message:
            response.error.description ||
            response.error.reason ||
            "Payment failed. Please try again.",
        });
      });

      rzp.open();
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <div className="relative overflow-hidden rounded-[2rem] rounded-tr-[3.5rem] border border-border/50 bg-card shadow-[0_20px_50px_-20px_rgba(2,132,199,0.28)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-br from-sky-400/25 via-blue-500/15 to-violet-500/25" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 top-20 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative p-8 text-center md:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-600 text-white shadow-[0_10px_30px_-8px_rgba(124,58,237,0.45)]">
            <CheckCircle2 size={34} strokeWidth={2.25} />
          </div>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles size={14} />
            Confirmed
          </p>

          <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Payment successful
          </h3>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Thanks — we received{" "}
            <span className="font-semibold text-foreground">
              {status.amountLabel}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-foreground">
              “{status.reason}”
            </span>
            .
          </p>

          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-border/60 bg-white/70 text-left shadow-inner backdrop-blur">
            <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-gradient-to-r from-sky-50 to-violet-50 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Amount paid
                </p>
                <p className="mt-1 font-serif text-3xl font-bold brand-gradient-text">
                  {status.amountLabel}
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 px-3 py-2 text-right text-xs font-semibold text-secondary">
                INR
                <br />
                Verified
              </div>
            </div>

            <dl className="space-y-0 divide-y divide-border/50 p-2">
              <div className="flex items-start justify-between gap-3 px-3 py-3">
                <div className="min-w-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Reason
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">
                    {status.reason}
                  </dd>
                </div>
              </div>
              <div className="flex items-start justify-between gap-3 px-3 py-3">
                <div className="min-w-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Payment ID
                  </dt>
                  <dd className="mt-1 break-all font-mono text-xs font-semibold text-foreground sm:text-sm">
                    {status.paymentId}
                  </dd>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("payment", status.paymentId)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-primary transition hover:bg-primary hover:text-white"
                  aria-label="Copy payment ID"
                >
                  <Copy size={15} />
                </button>
              </div>
              <div className="flex items-start justify-between gap-3 px-3 py-3">
                <div className="min-w-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Order ID
                  </dt>
                  <dd className="mt-1 break-all font-mono text-xs font-semibold text-foreground sm:text-sm">
                    {status.orderId}
                  </dd>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("order", status.orderId)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-primary transition hover:bg-primary hover:text-white"
                  aria-label="Copy order ID"
                >
                  <Copy size={15} />
                </button>
              </div>
            </dl>
          </div>

          {copied && (
            <p className="mt-3 text-xs font-semibold text-primary">
              {copied === "payment" ? "Payment ID" : "Order ID"} copied
            </p>
          )}

          <p className="mt-5 text-sm text-muted-foreground">
            {status.emailSent
              ? "A confirmation email was sent to our team."
              : "Payment is verified and saved. Email notify may be delayed."}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="primary"
              onClick={() => {
                setAmount("");
                setReason("");
                setName("");
                setEmail("");
                setPhone("");
                setStatus({ type: "idle" });
              }}
            >
              Make another payment
            </Button>
            <Button href="/" variant="outline">
              Back home
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const busy = status.type === "loading";

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-[2rem] border border-border/50 bg-card p-8 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.12)] md:p-10"
      >
        <div className="flex items-start gap-3 rounded-[1.5rem] bg-primary/5 p-4 text-sm text-foreground/80">
          <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={20} />
          <p>
            Secure Razorpay checkout. After payment we verify the signature,
            save the record, and email our team.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-foreground">
            Amount (INR)
          </span>
          <Input
            name="amount"
            type="number"
            inputMode="decimal"
            min={1}
            step="0.01"
            required
            placeholder="e.g. 1500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={busy}
          />
          <span className="text-xs text-muted-foreground">
            Minimum ₹1.00 · Charged securely in INR
          </span>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-foreground">
            Reason for payment
          </span>
          <Textarea
            name="reason"
            required
            placeholder="e.g. Website development advance, App milestone 2, Support retainer…"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={busy}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block space-y-2 sm:col-span-2">
            <span className="text-sm font-semibold text-foreground">
              Your name{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </span>
            <Input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              disabled={busy}
              autoComplete="name"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-foreground">
              Email{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </span>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={busy}
              autoComplete="email"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-foreground">
              Phone{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </span>
            <Input
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile"
              disabled={busy}
              autoComplete="tel"
            />
          </label>
        </div>

        {status.type === "error" && (
          <p
            role="alert"
            className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          >
            {status.message}
          </p>
        )}

        {status.type === "loading" && (
          <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            <Loader2 className="animate-spin" size={16} />
            {status.message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={busy}
        >
          {busy
            ? "Processing…"
            : `Pay ${amountPaise >= 100 ? `₹${(amountPaise / 100).toFixed(2)}` : "now"}`}
        </Button>
      </form>
    </>
  );
}
