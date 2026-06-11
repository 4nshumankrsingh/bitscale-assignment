'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ClipboardList } from 'lucide-react'

const checklistItems = [
  { label: 'Create your data list', done: true },
  { label: 'Learn about BitAgent', done: true },
  { label: 'Connect an integration', done: true },
  { label: 'Customise waterfall providers', done: false },
]

export default function ProductDemo() {
  const progress = 75

  return (
    <div className="bg-white border border-border rounded-xl p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#c2c2c2' }}>
          <ClipboardList size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Complete product demo
          </p>
          <p className="text-xs text-muted-foreground">
            92% of users nailed BitScale after this walkthrough
          </p>
        </div>
      </div>

      {/* Progress bar — green */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#169c33' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-medium w-8 text-right">
          {progress}%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {checklistItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            {item.done ? (
              <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
            ) : (
              <Circle size={15} className="text-muted-foreground/40 shrink-0" />
            )}
            <span
              className={`text-xs leading-tight ${
                item.done ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}