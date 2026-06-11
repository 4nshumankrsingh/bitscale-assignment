'use client'

import { Lock, Search } from 'lucide-react'
import EmptyState from './EmptyState'

const columns = [
  'NAME',
  'TITLE',
  'HEADLINE',
  'LINKEDIN URL',
  'COMPANY',
  'COMPANY URL',
  'COMPANY HQ',
]

interface ResultsPanelProps {
  resultCount: number
  usedCredits: number
  totalCredits: number
}

export default function ResultsPanel({
  resultCount,
  usedCredits,
  totalCredits,
}: ResultsPanelProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0 flex-wrap gap-2">
        <p className="text-xs text-muted-foreground">
          Found{' '}
          <span className="font-semibold text-foreground">{resultCount}</span>{' '}
          companies. Click preview to view results
        </p>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
          <Lock size={11} />
          <span>
            Unlock{' '}
            <span className="font-bold text-amber-800">100,000</span> leads
            with Enterprise Plan*
          </span>
        </div>
      </div>

      {/* Credit counter */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border shrink-0">
        <Search size={13} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {usedCredits.toLocaleString('en-US')}
          </span>
          /{totalCredits.toLocaleString('en-US')}
        </span>
      </div>

      <div className="shrink-0 overflow-x-auto border-b border-border">
        <div className="flex min-w-max">
          {columns.map((col) => (
            <div
              key={col}
              className="px-4 py-2 text-xs font-semibold text-muted-foreground tracking-wide min-w-30"
            >
              {col}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {resultCount === 0 ? (
          <EmptyState />
        ) : (
          <div className="p-4 text-sm text-muted-foreground">
            Results will appear here.
          </div>
        )}
      </div>
    </div>
  )
}