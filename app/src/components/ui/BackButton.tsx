"use client";

import { useRouter } from "next/navigation";

export function BackButton({ href, label = "Retour" }: { href?: string; label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => href ? router.push(href) : router.back()}
      className="bg-ss-card border border-ss-border rounded-xl px-3.5 py-2 text-[13px] text-ss-muted cursor-pointer active:opacity-70"
    >
      &larr; {label}
    </button>
  );
}
