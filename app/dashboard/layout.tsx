'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import FindPeopleModal from '@/components/find-people/FindPeopleModal'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [findPeopleOpen, setFindPeopleOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 lg:ml-50">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          onFindPeopleClick={() => setFindPeopleOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      <FindPeopleModal
        open={findPeopleOpen}
        onOpenChange={setFindPeopleOpen}
      />
    </div>
  )
}