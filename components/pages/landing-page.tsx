import { ArrowRight, Box, Globe2, Waypoints, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/motion/reveal"
import { ServerStatusCard } from "@/components/server/server-status-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { sectionConfig, sections } from "@/lib/routes"

const features = [
  { key: "performance", icon: Zap },
  { key: "global", icon: Globe2 },
  { key: "observable", icon: Waypoints },
] as const

const featuredSections = sections.slice(0, 6)

export async function LandingPage() {
  const t = await getTranslations()

  return (
    <main id="main-content" className="relative flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_50%_-10%,rgba(52,211,153,0.13),transparent_55%)]" />
      <div className="voxel-grid pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-50" />

      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-28">
        <Reveal>
          <Badge variant="outline" className="mb-7 h-7 border-emerald-400/20 bg-emerald-400/[0.07] px-3 text-emerald-300">{t("home.eyebrow")}</Badge>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-7xl lg:text-[5.25rem] lg:leading-[0.96]">{t("home.title")}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">{t("home.description")}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 bg-emerald-400 px-5 text-black hover:bg-emerald-300"><Link href="/play">{t("home.primaryAction")}<ArrowRight data-icon="inline-end" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="h-11 border-white/10 bg-white/[0.03] px-5 hover:bg-white/[0.07]"><Link href="/documentation">{t("home.secondaryAction")}</Link></Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ServerStatusCard />
        </Reveal>
      </section>

      <section className="relative border-y border-white/[0.06] bg-white/[0.015] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl"><p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">{t("home.sectionEyebrow")}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">{t("home.sectionTitle")}</h2><p className="mt-5 max-w-2xl leading-7 text-zinc-500">{t("home.sectionDescription")}</p></Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">{features.map((feature, index) => <Reveal key={feature.key} delay={index * 0.06}><Card className="h-full min-h-64 border border-white/[0.06] bg-[#0d0f0e] ring-0"><CardHeader><div className="mb-7 grid size-10 place-items-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06]"><feature.icon className="size-5 text-emerald-400" aria-hidden="true" /></div><CardTitle>{t(`home.features.${feature.key}.title`)}</CardTitle><CardDescription className="mt-2 leading-6">{t(`home.features.${feature.key}.description`)}</CardDescription></CardHeader></Card></Reveal>)}</div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-7xl"><Reveal className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">{t("home.platformTitle")}</h2><p className="mt-4 leading-7 text-zinc-500">{t("home.platformDescription")}</p></Reveal><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featuredSections.map((section, index) => { const Icon = sectionConfig[section].icon; return <Reveal key={section} delay={index * 0.04}><Link href={`/${section}`} className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-emerald-400/20 hover:bg-white/[0.04]"><Icon className="size-4 text-emerald-400" aria-hidden="true" /><span className="text-sm text-zinc-300">{t(`navigation.${section}`)}</span><ArrowRight className="ml-auto size-4 text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400" aria-hidden="true" /></Link></Reveal> })}</div></div></section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32"><Reveal className="mx-auto max-w-5xl rounded-3xl border border-white/[0.07] bg-[#0d0f0e] px-6 py-16 text-center sm:px-12"><Box className="mx-auto size-6 text-emerald-400" aria-hidden="true" /><h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-6xl">{t("home.ctaTitle")}</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-500">{t("home.ctaDescription")}</p><Button asChild className="mt-8 bg-emerald-400 text-black hover:bg-emerald-300"><Link href="/play">{t("home.primaryAction")}<ArrowRight data-icon="inline-end" /></Link></Button></Reveal></section>
    </main>
  )
}
