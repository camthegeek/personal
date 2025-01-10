'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const words = ["cam", "the geek", "a web dev", "human", "an animal lover", "looking for a new career"]

export function ParallaxText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  return (
    <div ref={containerRef} className="h-[700vh]  bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="w-1/3 text-right pr-4 flex flex-col items-end">
          <div className="translate-y-[-1.25rem]">
            <h3 className="text-3xl font-medium text-logo-yellow mb-2">hey,</h3>
            <h2 className="text-6xl font-bold text-logo-yellow">i'm</h2>
          </div>
        </div>
        <div className="w-2/3 h-screen flex flex-col justify-center relative pl-4">
          {words.map((word, index) => {
            const start = index / (words.length + 0.5)
            const mid = (index + 0.5) / (words.length + 0.5)
            const end = (index + 1) / (words.length + 0.5)
            
            return (
              <motion.h2
                key={word}
                className="text-6xl font-bold text-white absolute left-4 translate-y-[-1rem]"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [start, mid, end],
                    index === 0 ? [1, 1, 0] : [0, 1, 0]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [start, mid, end],
                    index === 0 ? ["0%", "0%", "-100%"] : ["100%", "0%", "-100%"]
                  )
                }}
              >
                {word}
              </motion.h2>
            )
          })}
          <div style={{ height: '100vh' }} />
        </div>
      </div>
    </div>
  )
}

