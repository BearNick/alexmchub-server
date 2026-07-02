export const integrationIds = [
  "microsoft-auth",
  "offline-auth",
  "hybrid-auth",
  "velocity",
  "viaversion",
  "viabackwards",
  "discord",
  "dynmap",
  "luckperms",
  "prometheus",
  "grafana",
  "server-api",
  "payment-api",
  "monitoring",
  "player-statistics",
  "map",
] as const

export type IntegrationId = (typeof integrationIds)[number]
export type IntegrationState = "not-configured" | "configured" | "disabled"

export type IntegrationDescriptor = {
  id: IntegrationId
  state: IntegrationState
  endpoint: string | null
}

export const integrationRegistry: IntegrationDescriptor[] = integrationIds.map((id) => ({ id, state: "not-configured", endpoint: null }))
