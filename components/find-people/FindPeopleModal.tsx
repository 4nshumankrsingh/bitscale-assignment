'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Briefcase,
  Globe,
  MapPin,
  Building2,
  Users,
  BarChart2,
  BookMarked,
  Eye,
  ChevronDown,
  X,
  Search,
  Lock,
} from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/components/ui/button'
import FilterAccordion from './FilterAccordion'
import EmptyState from './EmptyState'

interface FilterState {
  jobTitle: string[]
  companyWebsite: string[]
  personLocation: string[]
  companyLocation: string[]
  companyHeadcount: string[]
  managementLevel: string[]
}

const emptyFilters: FilterState = {
  jobTitle: [],
  companyWebsite: [],
  personLocation: [],
  companyLocation: [],
  companyHeadcount: [],
  managementLevel: [],
}

const filterConfig: {
  key: keyof FilterState
  label: string
  placeholder: string
  icon: React.ReactNode
}[] = [
  {
    key: 'jobTitle',
    label: 'Job Title',
    placeholder: 'E.g: Manager, Software Engineer',
    icon: <Briefcase size={15} />,
  },
  {
    key: 'companyWebsite',
    label: 'Company Website',
    placeholder: 'E.g: Google.com, LinkedIn.com',
    icon: <Globe size={15} />,
  },
  {
    key: 'personLocation',
    label: 'Person Location',
    placeholder: 'E.g: London, Great New York City',
    icon: <MapPin size={15} />,
  },
  {
    key: 'companyLocation',
    label: 'Company Location',
    placeholder: 'E.g: United States, UAE',
    icon: <Building2 size={15} />,
  },
  {
    key: 'companyHeadcount',
    label: 'Company Headcount',
    placeholder: 'E.g: 11-50, 10000+',
    icon: <Users size={15} />,
  },
  {
    key: 'managementLevel',
    label: 'Management Level',
    placeholder: 'E.g: Owner, Founder',
    icon: <BarChart2 size={15} />,
  },
]

const columns = [
  'NAME', 'TITLE', 'HEADLINE', 'LINKEDIN URL',
  'COMPANY', 'COMPANY URL', 'COMPANY HQ',
]

interface FindPeopleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function FindPeopleModal({ open, onOpenChange }: FindPeopleModalProps) {
  const [filterState, setFilterState] = useState<FilterState>(emptyFilters)
  const [keyword, setKeyword] = useState('')
  const [previewLoading, setPreviewLoading] = useState(false)

  const totalFiltersApplied =
    Object.values(filterState).reduce((acc, arr) => acc + arr.length, 0) +
    (keyword.trim() ? 1 : 0)

  const addFilter = (key: keyof FilterState, value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key] : [...prev[key], value],
    }))
  }

  const removeFilter = (key: keyof FilterState, value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== value),
    }))
  }

  const handlePreview = () => {
    setPreviewLoading(true)
    setTimeout(() => setPreviewLoading(false), 1200)
  }

  const handleSaveSearch = () => {
    setFilterState(emptyFilters)
    setKeyword('')
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Modal content */}
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-275 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          style={{ maxHeight: '88vh' }}
        >
          <VisuallyHidden asChild>
            <DialogPrimitive.Title>Find People</DialogPrimitive.Title>
          </VisuallyHidden>

          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-foreground">
                Find People
              </span>
              <button className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md px-2.5 py-1.5 transition-colors">
                <ChevronDown size={13} />
                Saved Search
              </button>
              <AnimatePresence>
                {totalFiltersApplied > 0 && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full"
                  >
                    {totalFiltersApplied} filter
                    {totalFiltersApplied > 1 ? 's' : ''} applied
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="sm"
                  onClick={handlePreview}
                  disabled={previewLoading}
                  className="flex items-center gap-1.5 text-sm h-8 bg-foreground text-background hover:bg-foreground/90 min-w-32.5 justify-center"
                >
                  {previewLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                    />
                  ) : (
                    <>
                      <Eye size={14} />
                      Preview Result
                    </>
                  )}
                </Button>
              </motion.div>
              <DialogPrimitive.Close className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                <X size={16} />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden">

            <div className="w-75 shrink-0 border-r border-border flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-border shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <User size={15} className="text-foreground shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    People Keyword
                  </span>
                </div>
                <div className="relative">
                  <Search
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                  />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter single keyword here..."
                    className="w-full text-xs border border-border rounded-md pl-7 pr-3 py-2 outline-none focus:ring-1 focus:ring-blue-400 bg-transparent placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Accordion filters */}
              <div className="flex-1 overflow-y-auto">
                {filterConfig.map((f) => (
                  <FilterAccordion
                    key={f.key}
                    icon={f.icon}
                    label={f.label}
                    placeholder={f.placeholder}
                    values={filterState[f.key]}
                    onAdd={(v) => addFilter(f.key, v)}
                    onRemove={(v) => removeFilter(f.key, v)}
                  />
                ))}
              </div>

              <div className="px-4 py-3 border-t border-border shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveSearch}
                  className="flex items-center gap-1.5 text-sm h-9 w-full bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-600"
                >
                  <BookMarked size={14} />
                  Save Search
                </Button>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0 flex-wrap gap-2">
                <p className="text-xs text-muted-foreground">
                  Found 0 companies. Click preview to view results
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                    <Search size={11} />
                    8,000/50,000
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                    <Lock size={11} />
                    Unlock{' '}
                    <span className="font-bold text-amber-800 mx-0.5">
                      100,000
                    </span>{' '}
                    leads with Enterprise Plan*
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-b border-border overflow-x-auto">
                <div className="flex min-w-max">
                  {columns.map((col) => (
                    <div
                      key={col}
                      className="px-4 py-2 text-xs font-semibold text-muted-foreground tracking-wide min-w-30 whitespace-nowrap"
                    >
                      {col}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <EmptyState />
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}