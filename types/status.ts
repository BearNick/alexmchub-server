export type ServerStatus = {
  online: boolean
  host: string
  port: number
  version: string | null
  players_online: number | null
  players_max: number | null
  latency_ms: number | null
  motd: string | null
}
