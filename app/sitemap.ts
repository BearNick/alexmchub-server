import type { MetadataRoute } from "next"

import { locales } from "@/i18n/locales.generated"
import { sections } from "@/lib/routes"
import { localizedPath } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...sections]

  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, localizedPath(locale, path)]))
    languages["x-default"] = localizedPath("en", path)

    return locales.map((locale) => ({
      url: localizedPath(locale, path),
      changeFrequency: path === "status" ? "hourly" as const : "weekly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages },
    }))
  })
}
