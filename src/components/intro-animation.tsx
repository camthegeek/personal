'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("")
  const fullText = "hey, i'm cam, the geek!"

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [text, fullText]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-logo-dp"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 4.2 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 2, y: 0, x: 0 }}
        animate={{ 
          scale: 1, 
          y: "0vh",
          x: "0vw",
        }}
        transition={{ 
          duration: 1,
          ease: "easeInOut",
          delay: 1.7,
        }}
      >
        <Image
          src="https://avatars.githubusercontent.com/u/15266249?v=4"
          alt="Developer Avatar"
          width={200}
          height={200}
          className="rounded-full border-4 border-logo-yellow"
          priority
        />
      </motion.div>
      <AnimatePresence>
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-white text-2xl font-bold"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

