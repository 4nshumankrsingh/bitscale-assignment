'use client'

import { motion } from 'framer-motion'
import { Coins, Building2, User, Plus, Menu } from 'lucide-react'
import { PiCoinsDuotone } from "react-icons/pi";
import { Button } from '@/components/ui/button'

interface TopbarProps {
  onMenuClick: () => void
  onFindPeopleClick: () => void
}

export default function Topbar({ onMenuClick, onFindPeopleClick }: TopbarProps) {
  return (
    <header className="border-b border-border bg-white shrink-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-md hover:bg-muted text-muted-foreground"
        >
          <Menu size={18} />
        </button>

        <div className="hidden lg:block" />

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-md overflow-hidden border border-[#169c33]/30">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5"
              style={{ backgroundColor: '#e8f7ec' }}
            >
              <PiCoinsDuotone size={14} style={{ color: '#169c33' }} />
              <span
                className="text-xs font-semibold"
                style={{ color: '#169c33' }}
              >
                450,000/5,500,000
              </span>
            </div>
            <div className="w-px h-5 bg-[#169c33]/20" />
            <div
              className="flex items-center px-3 py-1.5"
              style={{ backgroundColor: '#169c33' }}
            >
              <span className="text-xs font-semibold text-white">
                Booster Plan
              </span>
            </div>
          </div>

          {/* User avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tim"
              alt="Tim"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground leading-tight">
            Welcome back, Tim!
          </h1>
          <p className="text-xs text-muted-foreground">
            Here&apos;s your daily scoop on Bitscale!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1.5 text-sm h-8 border-[#169c33]/40 hover:bg-[#169c33]/5"
            style={{ color: '#0e0f0d' }}
          >
            <Building2 size={14} style={{ color: '#169c33' }} />
            Find Companies
          </Button>

          {/* Find People */}
          <Button
            variant="outline"
            size="sm"
            onClick={onFindPeopleClick}
            className="hidden md:flex items-center gap-1.5 text-sm h-8 border-[#6d088c]/40 hover:bg-[#6d088c]/5"
            style={{ color: '#0e0f0d' }}
          >
            <User size={14} style={{ color: '#6d088c' }} />
            Find People
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onFindPeopleClick}
            className="flex md:hidden items-center gap-1.5 h-8"
            style={{ color: '#6d088c', borderColor: '#6d088c40' }}
          >
            <User size={14} />
          </Button>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="sm"
              className="flex items-center gap-1.5 text-sm h-8 bg-foreground text-background hover:bg-foreground/90"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">New Grid</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}