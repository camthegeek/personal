'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Stay hungry, stay foolish.",
  "Your time is limited, don't waste it living someone else's life.",
  "Have the courage to follow your heart and intuition."
]

export function InteractiveQuote() {
  const [currentQuote, setCurrentQuote] = useState(0)

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length)
  }

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <p className="text-logo-yellow text-xl italic">&quot;{quotes[currentQuote]}&quot;</p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={nextQuote}
        className="bg-logo-yellow text-logo-dp px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
      >
        Next Quote
      </button>
    </div>
  )
}

