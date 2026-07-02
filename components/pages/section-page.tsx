import { ArrowRight, CircleOff, Download } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { DocumentSearch } from "@/components/data/document-search"
import { Reveal } from "@/components/motion/reveal"
import { ServerStatusCard } from "@/components/server/server-status-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { sectionConfig, type Section } from "@/lib/routes"

const featureKeys = ["one", "two", "three"] as const

export async function SectionPage({ section }: { section: Section }) {
  const t = await getTranslations()
  const config = sectionConfig[section]
  const Icon = config.icon
  const namespace = `pages.${section}` as const
  const items = featureKeys.map((key) => ({ title: t(`${namespace}.features.${key}.title`), description: t(`${namespace}.features.${key}.description`) }))
  const launcherUrl = process.env.NEXT_PUBLIC_LAUNCHER_DOWNLOAD_URL

  return (
    <main id="main-content" className="relative flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_50%_-20%,rgba(52,211,153,0.12),transparent_56%)]" />
      <div className="voxel-grid pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-40" />

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32">
        <Reveal className="max-w-4xl">
          <div className="mb-7 grid size-12 place-items-center rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.07]"><Icon className="size-6 text-emerald-400" aria-hidden="true" /></div>
          <Badge variant="outline" className="mb-5 border-white/[0.08] bg-white/[0.025] text-zinc-400">{t(`${namespace}.eyebrow`)}</Badge>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-balance sm:text-7xl">{t(`${namespace}.title`)}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{t(`${namespace}.description`)}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild className="h-10 bg-emerald-400 px-4 text-black hover:bg-emerald-300"><Link href={config.primary}>{t(`${namespace}.primaryAction`)}<ArrowRight data-icon="inline-end" /></Link></Button>
            <Button asChild variant="outline" className="h-10 border-white/10 bg-white/[0.03] px-4 hover:bg-white/[0.07]">{section === "play" ? <a href="https://www.minecraft.net/download" target="_blank" rel="noreferrer">{t(`${namespace}.secondaryAction`)}</a> : <Link href={config.secondary}>{t(`${namespace}.secondaryAction`)}</Link>}</Button>
          </div>
        </Reveal>
      </section>

      {section === "play" && (
        <section className="relative mx-auto grid max-w-7xl gap-4 px-5 pb-20 sm:px-8 md:grid-cols-2">
          <ServerStatusCard playEdition={{ javaTitle: items[0].title, javaDescription: items[0].description, bedrockTitle: items[1].title, bedrockDescription: items[1].description }} />
        </section>
      )}

      {section === "downloads" && (
        <section className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8"><Card className="border border-white/[0.06] bg-[#0d0f0e] ring-0"><CardContent className="flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center"><div><h2 className="font-medium text-zinc-200">{items[0].title}</h2><p className="mt-2 text-sm text-zinc-500">{items[0].description}</p></div>{launcherUrl ? <Button asChild className="bg-emerald-400 text-black hover:bg-emerald-300"><a href={launcherUrl} download><Download data-icon="inline-start" />{t(`${namespace}.primaryAction`)}</a></Button> : <Button disabled><CircleOff data-icon="inline-start" />{t("common.unavailable")}</Button>}</CardContent></Card></section>
      )}

      {section === "documentation" && <section className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8"><DocumentSearch items={items} label={t("common.searchLabel")} empty={t("common.searchEmpty")} /></section>}

      {section === "status" && <section className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8"><ServerStatusCard /></section>}

      <section className="relative border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {items.map((item, index) => <Reveal key={item.title} delay={index * 0.06}><Card className="h-full min-h-56 border border-white/[0.06] bg-[#0d0f0e] ring-0"><CardHeader><span className="mb-6 font-mono text-xs text-emerald-400">0{index + 1}</span><CardTitle>{item.title}</CardTitle><CardDescription className="mt-2 leading-6">{item.description}</CardDescription></CardHeader></Card></Reveal>)}
        </div>
      </section>
    </main>
  )
}
