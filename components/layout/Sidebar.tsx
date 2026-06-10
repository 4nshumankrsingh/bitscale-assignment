'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  FileText,
  Settings,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navHome = [
  { label: 'My Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Playbooks', href: '/playbooks', icon: BookOpen, badge: '🚀' },
  { label: 'Integrations', href: '/integrations', icon: Zap },
]

const navOther = [
  { label: 'Documentation', href: '/documentation', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [supportCollapsed, setSupportCollapsed] = useState(false)

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-50 flex-col bg-white border-r border-border z-10">
        <SidebarContent
          pathname={pathname}
          supportCollapsed={supportCollapsed}
          setSupportCollapsed={setSupportCollapsed}
        />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-50 flex flex-col bg-white border-r border-border z-30 lg:hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted text-muted-foreground"
            >
              <X size={16} />
            </button>
            <SidebarContent
              pathname={pathname}
              supportCollapsed={supportCollapsed}
              setSupportCollapsed={setSupportCollapsed}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

function SidebarContent({
  pathname,
  supportCollapsed,
  setSupportCollapsed,
}: {
  pathname: string
  supportCollapsed: boolean
  setSupportCollapsed: (v: boolean) => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <Image
          src="/bitscale-logo.png"
          alt="Bitscale"
          width={120}
          height={28}
          className="invert"
          priority
        />
      </div>

      <div className="px-3 py-2 border-b border-border">
        <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-muted transition-colors group">
          <div className="w-6 h-6 rounded-full bg-muted-foreground/20 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=GTMSpaces"
              alt="workspace"
              className="w-full h-full"
            />
          </div>
          <span className="text-sm font-medium text-foreground truncate flex-1 text-left">
            GTM Spaces
          </span>
          <ChevronsUpDown size={14} className="text-muted-foreground shrink-0" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-1">
            Home
          </p>
          <ul className="space-y-0.5">
            {navHome.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors relative group',
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-blue-600 rounded-full" />
                    )}
                    <item.icon size={16} className="shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.label === 'My Dashboard' && isActive && (
                      <ChevronDown size={14} className="text-blue-400" />
                    )}
                    {item.badge && (
                      <span className="text-base leading-none">{item.badge}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-1">
            Other
          </p>
          <ul className="space-y-0.5">
            {navOther.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors relative',
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-blue-600 rounded-full" />
                    )}
                    <item.icon size={16} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <div className="border-t border-border">
        <button
          onClick={() => setSupportCollapsed(!supportCollapsed)}
          className="flex items-center gap-2 w-full px-4 py-3 hover:bg-muted transition-colors"
        >
          <Image
            src="/bitscale-logo.png"
            alt="Bitscale"
            width={72}
            height={16}
            className="invert opacity-70"
          />
          <span className="flex-1" />
          {supportCollapsed ? (
            <ChevronDown size={14} className="text-muted-foreground" />
          ) : (
            <ChevronUp size={14} className="text-muted-foreground" />
          )}
        </button>
        <AnimatePresence>
          {!supportCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3">
                <p className="text-xs text-muted-foreground">
                  Get Support at Bitscale
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}