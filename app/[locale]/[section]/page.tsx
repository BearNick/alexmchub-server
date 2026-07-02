import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { SectionPage } from "@/components/pages/section-page"
import { isSection, sections } from "@/lib/routes"
import { localizedMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return sections.map((section) => ({ section }))
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[section]">): Promise<Metadata> {
  const { locale, section } = await params
  if (!isSection(section)) return {}
  const t = await getTranslations({ locale })
  return localizedMetadata(locale, section, t(`pages.${section}.metaTitle`), t(`pages.${section}.metaDescription`))
}

export default async function Page({ params }: PageProps<"/[locale]/[section]">) {
  const { locale, section } = await params
  if (!isSection(section)) notFound()
  setRequestLocale(locale)
  return <SectionPage section={section} />
}
