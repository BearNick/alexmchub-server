import { FileQuestion } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export default async function NotFound() {
  const t = await getTranslations()

  return (
    <main id="main-content" className="grid min-h-[70vh] place-items-center px-5 py-20 text-center">
      <div className="max-w-lg">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03]"><FileQuestion className="size-5 text-emerald-400" aria-hidden="true" /></div>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">{t("common.notFoundTitle")}</h1>
        <p className="mt-4 leading-7 text-zinc-500">{t("common.notFoundDescription")}</p>
        <Button asChild className="mt-8 bg-emerald-400 text-black hover:bg-emerald-300"><Link href="/">{t("common.backHome")}</Link></Button>
      </div>
    </main>
  )
}
