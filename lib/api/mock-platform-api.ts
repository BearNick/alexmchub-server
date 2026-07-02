import type { ApiResult, DownloadRelease, PlatformApi, PlayerProfile, ServerStatus } from "./contracts"

function unavailable<T>(): ApiResult<T> {
  return { ok: false, data: null, reason: "not-configured" }
}

export const mockPlatformApi: PlatformApi = {
  async getServerStatus(): Promise<ApiResult<ServerStatus>> {
    return unavailable()
  },
  async getCurrentProfile(): Promise<ApiResult<PlayerProfile>> {
    return unavailable()
  },
  async getDownloads(): Promise<ApiResult<DownloadRelease[]>> {
    return unavailable()
  },
}
