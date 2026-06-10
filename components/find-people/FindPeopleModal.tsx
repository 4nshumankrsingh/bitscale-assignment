'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'

interface FindPeopleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function FindPeopleModal({ open, onOpenChange }: FindPeopleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <p className="text-muted-foreground text-sm">
          Find People modal (coming soon)
        </p>
      </DialogContent>
    </Dialog>
  )
}