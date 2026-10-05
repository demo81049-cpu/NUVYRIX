"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminSignOut() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function signOut() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Could not sign out. Please try again.");
      }
      router.refresh();
    } catch (error) {
      console.error("admin sign-out failed:", error);
      setError(
        error instanceof Error ? error.message : "Could not sign out.",
      );
      setBusy(false);
    }
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={signOut}
        disabled={busy}
        className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-primary/40 hover:text-primary disabled:opacity-60"
      >
        {busy ? "Signing out…" : "Sign out"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
