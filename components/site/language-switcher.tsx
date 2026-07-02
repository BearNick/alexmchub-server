"use client"

import { useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"

import { locales, type Locale } from "@/i18n/locales.generated"

type LanguageSwitcherProps = {
  currentLocale: Locale
  label: string
  options: Array<{ locale: Locale; label: string }>
}

export function LanguageSwitcher({ currentLocale, label, options }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function changeLocale(locale: Locale) {
    const segments = pathname.split("/")
    if (locales.includes(segments[1] as Locale)) segments.splice(1, 1)
    const unprefixedPath = segments.join("/") || "/"
    const localizedPath = locale === "en" ? unprefixedPath : `/${locale}${unprefixedPath === "/" ? "" : unprefixedPath}`
    // The locale cookie is intentionally written before navigation so switching
    // back to the unprefixed default locale is not overridden by the old value.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `ALEXMCHUB_LOCALE=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`
    router.replace(localizedPath)
  }

  return (
    <div className="flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] p-0.5" role="group" aria-label={label} aria-busy={isPending}>
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          onClick={() => startTransition(() => changeLocale(option.locale))}
          aria-pressed={option.locale === currentLocale}
          className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${option.locale === currentLocale ? "bg-white/[0.09] text-white" : "text-zinc-600 hover:text-zinc-300"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
