import type { Metadata } from "next"

import { locales } from "@/i18n/locales.generated"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexmchub.com"

export function localizedPath(locale: string, pathname = "") {
  const suffix = pathname ? `/${pathname}` : ""
  return locale === "en" ? `${siteUrl}${suffix || "/"}` : `${siteUrl}/${locale}${suffix}`
}

export function localizedMetadata(locale: string, pathname: string, title: string, description: string): Metadata {
  const languages = Object.fromEntries(locales.map((item) => [item, localizedPath(item, pathname)]))
  languages["x-default"] = localizedPath("en", pathname)

  return {
    title,
    description,
    alternates: { canonical: localizedPath(locale, pathname), languages },
    openGraph: {
      type: "website",
      siteName: "AlexMCHub",
      locale,
      url: localizedPath(locale, pathname),
      title,
      description,
    },
  }
}
