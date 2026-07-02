import type { MetadataRoute } from "next"

import { locales } from "@/i18n/locales.generated"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexmchub.com"
const privateRoutes = ["admin", "dashboard", "profile", "settings"]

export default function robots(): MetadataRoute.Robots {
  const localizedPrivateRoutes = locales.flatMap((locale) => privateRoutes.map((route) => locale === "en" ? `/${route}` : `/${locale}/${route}`))

  return {
    rules: { userAgent: "*", allow: "/", disallow: localizedPrivateRoutes },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
