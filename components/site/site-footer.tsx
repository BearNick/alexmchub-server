import { Box } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"

const footerRoutes = ["wiki", "statistics", "dashboard", "profile", "settings", "api", "admin"] as const

export async function SiteFooter() {
  const t = await getTranslations()

  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-[#080a09]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div><div className="flex items-center gap-2 text-sm font-medium"><Box className="size-4 text-emerald-400" aria-hidden="true" />{t("common.brand")}</div><p className="mt-2 text-xs text-zinc-600">{t("common.tagline")}</p></div>
          <nav aria-label={t("common.footerNavigation")} className="flex max-w-3xl flex-wrap gap-x-5 gap-y-3">{footerRoutes.map((route) => <Link key={route} href={`/${route}`} className="text-xs text-zinc-600 transition-colors hover:text-zinc-300">{t(`navigation.${route}`)}</Link>)}</nav>
        </div>
        <div className="mt-10 border-t border-white/[0.05] pt-6 text-xs text-zinc-700">{t("common.copyright", { year: new Date().getUTCFullYear() })}</div>
      </div>
    </footer>
  )
}
