"use client"

import { motion, useReducedMotion } from "framer-motion"

export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()
  return <motion.div initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}>{children}</motion.div>
}
