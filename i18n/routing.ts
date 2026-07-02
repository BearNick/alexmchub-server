import { defineRouting } from "next-intl/routing"

import { locales } from "./locales.generated"

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
  localeCookie: {
    name: "ALEXMCHUB_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
})
