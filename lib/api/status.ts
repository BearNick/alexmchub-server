import { apiGet } from "@/lib/api/client"
import type { ServerStatus } from "@/types/status"

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string"
}

function isNullableNonNegativeNumber(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value) && value >= 0)
}

function isServerStatus(value: unknown): value is ServerStatus {
  if (!value || typeof value !== "object") return false

  const status = value as Record<string, unknown>
  return (
    typeof status.online === "boolean" &&
    typeof status.host === "string" &&
    typeof status.port === "number" &&
    Number.isInteger(status.port) &&
    status.port >= 1 &&
    status.port <= 65535 &&
    isNullableString(status.version) &&
    isNullableNonNegativeNumber(status.players_online) &&
    isNullableNonNegativeNumber(status.players_max) &&
    isNullableNonNegativeNumber(status.latency_ms) &&
    isNullableString(status.motd)
  )
}

export async function getServerStatus(signal?: AbortSignal): Promise<ServerStatus> {
  const data = await apiGet("/api/status", signal)
  if (!isServerStatus(data)) throw new Error("Invalid status API response")
  return data
}
