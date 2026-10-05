"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not sign in.");
      }

      setPassword("");
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Could not sign in.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] border border-border/60 bg-card p-8 shadow-[0_20px_60px_-30px_rgba(2,132,199,0.3)] sm:p-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LockKeyhole size={22} aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Private area
        </p>
        <h1 className="mt-2 text-3xl font-bold">Admin sign in</h1>
        <p className="mt-3 leading-6 text-muted-foreground">
          Sign in to review contact inquiries and payment records.
        </p>

        <label className="mt-7 block space-y-2">
          <span className="text-sm font-semibold">Username</span>
          <input
            autoComplete="username"
            required
            maxLength={128}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={busy}
            className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </label>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-semibold">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            maxLength={1024}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={busy}
            className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </label>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </main>
  );
}
