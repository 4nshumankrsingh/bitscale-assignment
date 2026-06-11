'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { videos } from './data/grids'

export default function VideoCard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const current = videos[activeIndex]
  const isExpanded = expandedId !== null

  // Auto-advance every 5s unless a video is expanded
  useEffect(() => {
    if (isExpanded) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isExpanded])

  const goTo = (i: number) => {
    setActiveIndex(i)
    setExpandedId(null)
  }

  const goPrev = () => goTo((activeIndex - 1 + videos.length) % videos.length)
  const goNext = () => goTo((activeIndex + 1) % videos.length)

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="border border-[#3e71b5]/25 rounded-xl p-4 flex flex-col gap-3 overflow-hidden"
      style={{ backgroundColor: '#eef3fb' }}
    >
      <motion.div layout className="flex items-center justify-between shrink-0">
        <span className="text-sm font-semibold" style={{ color: '#3e71b5' }}>
          Latest from Bitscale
        </span>
        <div className="flex items-center gap-1.5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? '16px' : '8px',
                height: '8px',
                backgroundColor: i === activeIndex ? '#3e71b5' : '#3e71b530',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Expanded video player */}
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <div className="relative w-full rounded-lg overflow-hidden bg-black"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${current.id}?autoplay=1`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
              {/* Close button */}
              <button
                onClick={() => setExpandedId(null)}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <X size={13} className="text-white" />
              </button>
            </div>

            {/* Title + description below video */}
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-foreground leading-snug">
                {current.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {current.description}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">
                {current.postedAt}
              </p>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={goPrev}
                className="flex items-center gap-1 text-xs text-[#3e71b5] hover:text-[#2d5a9e] transition-colors font-medium"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
              <span className="text-xs text-muted-foreground">
                {activeIndex + 1} / {videos.length}
              </span>
              <button
                onClick={goNext}
                className="flex items-center gap-1 text-xs text-[#3e71b5] hover:text-[#2d5a9e] transition-colors font-medium"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Compact thumbnail view */
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="flex gap-3"
          >
            {/* Thumbnail */}
            <div
              className="relative w-30 h-18 rounded-lg overflow-hidden shrink-0 bg-muted group cursor-pointer"
              onClick={() => setExpandedId(current.id)}
            >
              <img
                src={`https://img.youtube.com/vi/${current.id}/mqdefault.jpg`}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                >
                  <Play size={14} className="text-gray-800 ml-0.5" fill="currentColor" />
                </motion.div>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 min-w-0">
              <p
                className="text-sm font-semibold text-foreground leading-snug line-clamp-2 cursor-pointer hover:text-[#3e71b5] transition-colors"
                onClick={() => setExpandedId(current.id)}
              >
                {current.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {current.description}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-auto">
                {current.postedAt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}