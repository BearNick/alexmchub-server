"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

type SearchItem = { title: string; description: string }

export function DocumentSearch({ items, label, empty }: { items: SearchItem[]; label: string; empty: string }) {
  const [query, setQuery] = useState("")
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase()
    if (!normalized) return items
    return items.filter((item) => `${item.title} ${item.description}`.toLocaleLowerCase().includes(normalized))
  }, [items, query])

  return (
    <div className="mt-8">
      <div className="relative max-w-xl"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-600" aria-hidden="true" /><Input value={query} onChange={(event) => setQuery(event.target.value)} aria-label={label} placeholder={label} className="h-11 border-white/[0.08] bg-white/[0.03] pl-10 focus-visible:border-emerald-400/30 focus-visible:ring-emerald-400/10" /></div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">{results.map((item) => <div key={item.title} className="rounded-xl border border-white/[0.06] bg-black/20 p-5"><h3 className="text-sm font-medium text-zinc-200">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{item.description}</p></div>)}</div>
      {results.length === 0 && <p className="mt-5 text-sm text-zinc-500" role="status">{empty}</p>}
    </div>
  )
}
