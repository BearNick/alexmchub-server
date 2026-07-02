export type Availability = "available" | "unavailable" | "degraded"

export type ApiResult<T> =
  | { ok: true; data: T; receivedAt: string }
  | { ok: false; data: null; reason: "not-configured" | "network" | "invalid-response" }

export type ServerStatus = {
  availability: Availability
  players: { online: number; capacity: number } | null
  version: string | null
  latencyMs: number | null
}

export type PlayerProfile = {
  id: string
  displayName: string
  avatarUrl: string | null
  identityProvider: "microsoft" | "offline" | "hybrid"
}

export type DownloadRelease = {
  id: string
  version: string
  platform: "windows" | "macos" | "linux"
  url: string
  sha256: string
  publishedAt: string
}

export interface PlatformApi {
  getServerStatus(): Promise<ApiResult<ServerStatus>>
  getCurrentProfile(): Promise<ApiResult<PlayerProfile>>
  getDownloads(): Promise<ApiResult<DownloadRelease[]>>
}
