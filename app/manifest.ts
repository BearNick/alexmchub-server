import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "AlexMCHub",
    short_name: "AlexMCHub",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#080a09",
    theme_color: "#080a09",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  }
}
