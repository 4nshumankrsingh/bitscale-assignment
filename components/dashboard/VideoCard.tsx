'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { videos } from './data/grids'

export default function VideoCard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const current = videos[activeIndex]

  return (
    <div className="bg-white border border-border rounded-xl p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-500">
          Latest from Bitscale
        </span>
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i)
                setPlayingId(null)
              }}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-4 h-2 bg-blue-500'
                  : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video + description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="flex gap-3"
        >
          {/* Thumbnail / iframe */}
          <div className="relative w-30 h-18 rounded-lg overflow-hidden shrink-0 bg-muted group cursor-pointer"
            onClick={() => setPlayingId(current.id)}
          >
            {playingId === current.id ? (
              <iframe
                src={`https://www.youtube.com/embed/${current.id}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${current.id}/mqdefault.jpg`}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <Play size={14} className="text-gray-800 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
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
      </AnimatePresence>
    </div>
  )
}