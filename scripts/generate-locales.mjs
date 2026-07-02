import { readdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const messagesDirectory = resolve(process.cwd(), "messages")
const outputFile = resolve(process.cwd(), "i18n/locales.generated.ts")
const locales = readdirSync(messagesDirectory)
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.slice(0, -5))
  .sort((a, b) => (a === "en" ? -1 : b === "en" ? 1 : a.localeCompare(b)))

if (!locales.includes("en")) {
  throw new Error("messages/en.json is required as the default locale")
}

writeFileSync(
  outputFile,
  `// Generated from messages/*.json. Do not edit.\nexport const locales = ${JSON.stringify(locales)} as const\nexport type Locale = (typeof locales)[number]\n`,
)
