'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { videos } from './data/grids'

export default function VideoCard() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playingId, setPlayingId] = useState<string | null>(null)

  // Auto-advance every 5 seconds unless a video is playing
  useEffect(() => {
    if (playingId) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [playingId])

  const current = videos[activeIndex]

  return (
    <div
      className="border border-[#3e71b5]/25 rounded-xl p-4 flex flex-col gap-3"
      style={{ backgroundColor: '#eef3fb' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: '#3e71b5' }}>
          Latest from Bitscale
        </span>
        <div className="flex items-center gap-1.5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i)
                setPlayingId(null)
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? '16px' : '8px',
                height: '8px',
                backgroundColor:
                  i === activeIndex ? '#3e71b5' : '#3e71b530',
              }}
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
          <div
            className="relative w-30 h-18 rounded-lg overflow-hidden shrink-0 bg-muted group cursor-pointer"
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <Play
                      size={14}
                      className="text-gray-800 ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Text */}
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