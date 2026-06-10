'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Map,
  Users,
  Building2,
  FileText,
  Zap,
  ChevronDown,
  AlignJustify,
} from 'lucide-react'
import { SiGoogle, SiGooglemaps, SiHubspot } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { RiFileDownloadLine } from "react-icons/ri";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { grids, GridRow } from './data/grids'
import { cn } from '@/lib/utils'

const iconMap: Record<GridRow['type'], React.ReactNode> = {
  workbook: <FileText size={14} className="text-red-400" />,
  linkedin: <FaLinkedin size={13} color="#0077b5" />,
  nav: <Zap size={14} className="text-orange-400" />,
  company: <Building2 size={14} className="text-emerald-500" />,
  csv: <RiFileDownloadLine size={14} className="text-purple-500" />,
  people: <Users size={14} className="text-gray-400" />,
  maps: <SiGooglemaps size={14} className="text-red-400" />,
  search: <SiGoogle size={13} color="#4285F4" />,
  factors: <Zap size={14} className="text-orange-400" />,
  hubspot: <SiHubspot size={13} color="#ff7a59" />,
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border">
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
          <div className="h-3 w-48 bg-muted rounded animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-4 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-20 bg-muted rounded animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-4 hidden md:table-cell">
        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
      </td>
      <td className="py-3 px-4">
        <div className="h-3 w-6 bg-muted rounded animate-pulse" />
      </td>
    </tr>
  )
}

export default function GridsTable() {
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('my-grids')
  const [search, setSearch] = useState('')
  const [rows, setRows] = useState(grids)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const toggleStar = (id: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, starred: !r.starred } : r))
    )
  }

  const filtered = rows.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchesTab = tab === 'starred' ? r.starred : true
    return matchesSearch && matchesTab
  })

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      {/* Tabs + search bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-0 gap-4 flex-wrap">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-transparent p-0 gap-4 h-auto">
            <TabsTrigger
              value="my-grids"
              className={cn(
                'bg-transparent px-0 pb-2 text-sm rounded-none border-b-2 data-[state=active]:shadow-none transition-colors',
                tab === 'my-grids'
                  ? 'border-blue-500 text-blue-600 font-semibold data-[state=active]:bg-transparent'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              My Grids
            </TabsTrigger>
            <TabsTrigger
              value="starred"
              className={cn(
                'bg-transparent px-0 pb-2 text-sm rounded-none border-b-2 data-[state=active]:shadow-none transition-colors',
                tab === 'starred'
                  ? 'border-blue-500 text-blue-600 font-semibold data-[state=active]:bg-transparent'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              Starred
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search + view toggle */}
        <div className="flex items-center gap-2 mb-2">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search grids and workbooks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm w-52 bg-muted/40 border-border"
            />
          </div>
          <button className="p-1.5 rounded-md border border-border hover:bg-muted transition-colors">
            <AlignJustify size={15} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Name
                  <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">
                Edited by
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">
                Last edited
              </th>
              <th className="text-left py-2.5 px-4 text-xs font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-muted-foreground text-sm"
                >
                  No grids found.
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {filtered.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border hover:bg-slate-50 transition-colors group"
                  >
                    {/* Name cell */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2 min-w-0">
                        {row.hasChildren ? (
                          <ChevronDown
                            size={14}
                            className="text-muted-foreground shrink-0"
                          />
                        ) : (
                          <span className="w-3.5 shrink-0" />
                        )}

                        {/* Star toggle */}
                        <motion.button
                          onClick={() => toggleStar(row.id)}
                          whileTap={{ scale: 0.8 }}
                          className="shrink-0"
                        >
                          <Star
                            size={14}
                            className={cn(
                              'transition-colors',
                              row.starred
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground/40 group-hover:text-muted-foreground'
                            )}
                          />
                        </motion.button>

                        {/* Row icon */}
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                          style={{ backgroundColor: row.iconBg }}
                        >
                          {iconMap[row.type]}
                        </span>

                        {/* Name */}
                        <span className="truncate text-sm text-foreground max-w-70">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    {/* Edited by */}
                    <td className="py-2.5 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.editedBy.seed}`}
                          alt={row.editedBy.name}
                          className="w-6 h-6 rounded-full shrink-0"
                          loading="lazy"
                        />
                        <span className="text-sm text-muted-foreground">
                          {row.editedBy.name}
                        </span>
                      </div>
                    </td>

                    {/* Last edited */}
                    <td className="py-2.5 px-4 text-sm text-muted-foreground hidden md:table-cell">
                      {row.lastEdited}
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-4">
                      <button className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}