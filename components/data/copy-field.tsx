"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyField({ value, unavailable, copyLabel, copiedLabel }: { value?: string; unavailable: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  async function copyValue() {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/25 p-2 pl-4">
      <code className={`min-w-0 flex-1 truncate font-mono text-sm ${value ? "text-zinc-300" : "text-zinc-600"}`}>{value ?? unavailable}</code>
      <Button type="button" size="icon" variant="outline" disabled={!value} onClick={copyValue} aria-label={copied ? copiedLabel : copyLabel} className="border-white/[0.08] bg-white/[0.03]">
        {copied ? <Check className="text-emerald-400" /> : <Copy />}
      </Button>
    </div>
  )
}
