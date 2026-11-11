"use client";

import { Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Copie un texte (l'email) et affiche « Copié ✓ » pendant deux secondes. */
export function CopyButton({ value, label, copiedLabel, ariaLabel, className, showIcon = true }: {
  value: string;
  label: string;
  copiedLabel: string;
  ariaLabel?: string;
  className?: string;
  showIcon?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Navigateur sans presse-papiers : on ouvre la messagerie à la place.
      window.location.href = `mailto:${value}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={copy} aria-label={ariaLabel} className={className}>
      {showIcon && <Copy size={16} aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
