'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollPosition } from '@/hooks/useScrollPosition'

const words = ["cam", "the geek", "a web dev", "human", "an animal lover", "looking for a new career"]

export function ParallaxText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPosition = useScrollPosition()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollableDistance = containerHeight - viewportHeight

      const scrollProgress = Math.max(0, Math.min(1, (scrollPosition - containerTop) / scrollableDistance))
      const newIndex = Math.min(Math.floor(scrollProgress * words.length), words.length - 1)
      
      setActiveIndex(newIndex)
    }
  }, [scrollPosition])

  return (
    <div ref={containerRef} className="h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="w-1/3 text-right pr-4 flex flex-col items-end">
          <div className="translate-y-[-1.25rem]">
            <h3 className="text-3xl font-medium text-yellow-300/80 mb-2">hey,</h3>
            <h2 className="text-6xl font-bold text-yellow-400">i&apos;m</h2>
          </div>
        </div>
        <div className="w-2/3 h-screen flex flex-col justify-center relative pl-4">
          {words.map((word, index) => (
            <motion.div
              key={word}
              className="absolute left-4 w-full"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ 
                opacity: activeIndex === index ? 1 : 0,
                y: `${(index - activeIndex) * 100}%`
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h2 className="text-6xl font-bold text-white">
                {word}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

