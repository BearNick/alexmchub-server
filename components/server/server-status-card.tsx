"use client"

import { Server } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerStatus } from "@/lib/api/status"
import type { ServerStatus } from "@/types/status"

type RequestState =
  | { state: "loading" }
  | { state: "unavailable" }
  | { state: "ready"; status: ServerStatus }

export function ServerStatusCard() {
  const t = useTranslations("statusCard")
  const [request, setRequest] = useState<RequestState>({ state: "loading" })

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 8000)
    let active = true

    getServerStatus(controller.signal)
      .then((status) => {
        if (active) setRequest({ state: "ready", status })
      })
      .catch(() => {
        if (active) setRequest({ state: "unavailable" })
      })
      .finally(() => window.clearTimeout(timeout))

    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  const status = request.state === "ready" ? request.status : null
  const stateLabel = request.state === "loading"
    ? t("loading")
    : request.state === "unavailable"
      ? t("unavailable")
      : request.status.online
        ? t("online")
        : t("offline")
  const dotClass = request.state === "ready" && request.status.online
    ? "bg-emerald-400"
    : request.state === "ready"
      ? "bg-red-400"
      : "bg-zinc-700"

  return (
    <Card className="gap-0 border border-white/[0.07] bg-[#0d0f0e]/90 py-0 shadow-2xl shadow-black/40 ring-0 backdrop-blur-xl">
      <CardHeader className="border-b border-white/[0.06] p-6">
        <div className="grid size-11 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.04]"><Server className="size-5 text-emerald-400" aria-hidden="true" /></div>
        <CardTitle className="mt-6">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="p-6" aria-live="polite">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/20 p-4" role="status">
          <span className={`size-2 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
          <span className="text-sm text-zinc-400">{stateLabel}</span>
        </div>
        {status && (status.players_online !== null || status.version !== null || status.latency_ms !== null) && (
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            {status.players_online !== null && (
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4"><dt className="text-zinc-500">{t("players")}</dt><dd className="mt-1 text-zinc-200">{status.players_max !== null ? t("playerCount", { online: status.players_online, max: status.players_max }) : status.players_online}</dd></div>
            )}
            {status.version !== null && (
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4"><dt className="text-zinc-500">{t("version")}</dt><dd className="mt-1 text-zinc-200">{status.version}</dd></div>
            )}
            {status.latency_ms !== null && (
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4"><dt className="text-zinc-500">{t("latency")}</dt><dd className="mt-1 text-zinc-200">{t("latencyValue", { value: Math.round(status.latency_ms) })}</dd></div>
            )}
          </dl>
        )}
      </CardContent>
    </Card>
  )
}
