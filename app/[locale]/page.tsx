import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { LandingPage } from "@/components/pages/landing-page"
import { localizedMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return localizedMetadata(locale, "", t("home.metaTitle"), t("home.metaDescription"))
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LandingPage />
}
