'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterAccordionProps {
  icon: React.ReactNode
  label: string
  placeholder: string
  values: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
}

export default function FilterAccordion({
  icon,
  label,
  placeholder,
  values,
  onAdd,
  onRemove,
}: FilterAccordionProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      onAdd(input.trim())
      setInput('')
    }
  }

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 w-full px-4 py-3 hover:bg-muted/40 transition-colors text-left"
      >
        <span className="text-muted-foreground shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
            {values.length > 0 && (
              <span className="text-xs bg-blue-100 text-blue-600 font-medium px-1.5 py-0.5 rounded-full leading-none">
                {values.length}
              </span>
            )}
          </div>
          {!open && values.length === 0 && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {placeholder}
            </p>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={15} className="text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 flex flex-col gap-2">
              {/* Selected tags */}
              {values.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {values.map((v) => (
                    <span
                      key={v}
                      className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full"
                    >
                      {v}
                      <button
                        onClick={() => onRemove(v)}
                        className="hover:text-blue-900 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Type and press Enter — e.g. ${placeholder}`}
                className="w-full text-xs border border-border rounded-md px-3 py-1.5 outline-none focus:ring-1 focus:ring-blue-400 bg-muted/30 placeholder:text-muted-foreground/60"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}