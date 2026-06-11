'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center h-full gap-3 px-8 py-8 text-center"
    >
      <Image
        src="/illustrations/find-people.svg"
        alt="No results"
        width={140}
        height={140}
        priority
        className="opacity-90"
      />
      <div className="flex flex-col gap-1 max-w-65">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Start your Company search, preview, and import companies for enrichment
          by applying any filter in the left panel.
        </p>
        <p className="text-sm text-muted-foreground font-semibold">OR</p>
        <p className="text-sm text-muted-foreground">
          Import companies from saved Search.
        </p>
      </div>
      <a
        href="https://storyset.com/work"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors mt-1"
      >
        Work illustrations by Storyset
      </a>
    </motion.div>
  )
}