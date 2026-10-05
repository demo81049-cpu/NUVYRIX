"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { projectTypes, siteConfig } from "@/lib/site";

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success" };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          type: String(data.get("type") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });
      const payload = await res.json();
      if (!res.ok || !payload.success) {
        throw new Error(payload.error || "Could not send your message.");
      }
      form.reset();
      setStatus({ type: "success" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error ? err.message : "Could not send your message.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card p-10 text-center shadow-[0_20px_50px_-20px_rgba(2,132,199,0.25)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-sky-400/20 to-violet-500/20" />
        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-600 text-white">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="mt-5 text-2xl font-bold">Message sent</h3>
          <p className="mt-3 text-muted-foreground">
            Thanks — your inquiry was emailed to{" "}
            <span className="font-semibold text-foreground">
              {siteConfig.email}
            </span>
            . We’ll reply soon.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" onClick={() => setStatus({ type: "idle" })}>
              Send another message
            </Button>
            <Button href={siteConfig.whatsappHref} variant="secondary">
              WhatsApp us
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const busy = status.type === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[2rem] border border-border/50 bg-card p-8 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.12)] md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-foreground">Name</span>
          <Input
            name="name"
            required
            placeholder="Your name"
            autoComplete="name"
            disabled={busy}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-foreground">Email</span>
          <Input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
            disabled={busy}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-foreground">
          Project type
        </span>
        <Select name="type" required defaultValue="" disabled={busy}>
          <option value="" disabled>
            Select a type
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-foreground">Message</span>
        <Textarea
          name="message"
          required
          placeholder="Tell us about your goals, timeline, and anything else that matters…"
          disabled={busy}
        />
      </label>

      {status.type === "error" && (
        <p
          role="alert"
          className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          {status.message}
        </p>
      )}

      {busy && (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          <Loader2 className="animate-spin" size={16} />
          Sending your message…
        </p>
      )}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
