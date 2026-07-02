import {
  Activity,
  BookOpen,
  Boxes,
  CircleUserRound,
  Download,
  Gamepad2,
  Gauge,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Waypoints,
} from "lucide-react"

export const sections = ["play", "downloads", "documentation", "wiki", "status", "statistics", "store", "dashboard", "profile", "settings", "api", "admin"] as const
export type Section = (typeof sections)[number]

export const sectionConfig = {
  play: { icon: Gamepad2, primary: "/status", secondary: "/downloads" },
  downloads: { icon: Download, primary: "/documentation", secondary: "/status" },
  documentation: { icon: BookOpen, primary: "/api", secondary: "/play" },
  wiki: { icon: Boxes, primary: "/documentation", secondary: "/profile" },
  status: { icon: Activity, primary: "/api", secondary: "/documentation" },
  statistics: { icon: Gauge, primary: "/status", secondary: "/dashboard" },
  store: { icon: ShoppingBag, primary: "/documentation", secondary: "/profile" },
  dashboard: { icon: LayoutDashboard, primary: "/profile", secondary: "/settings" },
  profile: { icon: CircleUserRound, primary: "/settings", secondary: "/dashboard" },
  settings: { icon: Settings, primary: "/profile", secondary: "/documentation" },
  api: { icon: Waypoints, primary: "/documentation", secondary: "/status" },
  admin: { icon: ShieldCheck, primary: "/status", secondary: "/api" },
} as const satisfies Record<Section, { icon: typeof Activity; primary: `/${string}`; secondary: `/${string}` }>

export function isSection(value: string): value is Section {
  return sections.includes(value as Section)
}
