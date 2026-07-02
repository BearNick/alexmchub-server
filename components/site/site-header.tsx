import { Box } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { Locale } from "@/i18n/locales.generated"
import { locales } from "@/i18n/locales.generated"
import { Link } from "@/i18n/navigation"
import { LanguageSwitcher } from "./language-switcher"

const primaryRoutes = ["play", "downloads", "documentation", "status", "store"] as const

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale })

  return (
    <>
      <a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-black transition-transform focus:translate-y-0">{t("common.skipToContent")}</a>
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#080a09]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={t("common.brand")}>
            <span className="grid size-8 place-items-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.08]"><Box className="size-4 text-emerald-400" aria-hidden="true" /></span>
            <span className="text-sm font-semibold tracking-tight">{t("common.brand")}</span>
          </Link>
          <nav aria-label={t("common.primaryNavigation")} className="hidden items-center gap-1 md:flex">
            {primaryRoutes.map((route) => <Link key={route} href={`/${route}`} className="rounded-lg px-3 py-2 text-xs text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-white">{t(`navigation.${route}`)}</Link>)}
          </nav>
          <div className="ml-auto"><LanguageSwitcher currentLocale={locale} label={t("common.selectLanguage")} options={locales.map((item) => ({ locale: item, label: t(`common.languageNames.${item}`) }))} /></div>
          <Link href="/play" className="hidden rounded-lg bg-emerald-400 px-3.5 py-2 text-xs font-medium text-black transition-colors hover:bg-emerald-300 sm:block">{t("navigation.play")}</Link>
        </div>
        <nav aria-label={t("common.primaryNavigation")} className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {primaryRoutes.map((route) => <Link key={route} href={`/${route}`} className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-zinc-500 hover:text-white">{t(`navigation.${route}`)}</Link>)}
        </nav>
      </header>
    </>
  )
}
