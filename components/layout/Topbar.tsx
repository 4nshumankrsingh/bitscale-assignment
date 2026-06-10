'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Building2, Users, Plus, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface TopbarProps {
  onMenuClick: () => void
  onFindPeopleClick: () => void
}

export default function Topbar({ onMenuClick, onFindPeopleClick }: TopbarProps) {
  const used = 450000
  const total = 5500000
  const percentage = (used / total) * 100

  return (
    <header className="h-14 border-b border-border bg-white flex items-center px-4 gap-3 shrink-0">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-md hover:bg-muted text-muted-foreground"
      >
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
          <MessageSquare size={15} className="text-muted-foreground" />
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground">
              {used.toLocaleString('en-US')}
            </span>
            <span>/</span>
            <span>{total.toLocaleString('en-US')}</span>
          </div>
          {/* Animated progress bar */}
          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden ml-1">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>

        <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full hidden sm:flex">
          Booster Plan
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-1.5 text-sm h-8"
        >
          <Building2 size={14} />
          Find Companies
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onFindPeopleClick}
          className="hidden md:flex items-center gap-1.5 text-sm h-8"
        >
          <Users size={14} />
          Find People
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onFindPeopleClick}
          className="flex md:hidden items-center gap-1.5 text-sm h-8"
        >
          <Users size={14} />
        </Button>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            size="sm"
            className="flex items-center gap-1.5 text-sm h-8 bg-foreground text-background hover:bg-foreground/90"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Grid</span>
          </Button>
        </motion.div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tim"
            alt="Tim"
            className="w-full h-full"
          />
        </div>
      </div>
    </header>
  )
}