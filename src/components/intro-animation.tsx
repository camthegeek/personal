'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Cookies from 'js-cookie'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("")
  const [skipIntro, setSkipIntro] = useState(false)
  const fullText = "hey, i'm cam, the geek!"

  useEffect(() => {
    const savedSkipIntro = Cookies.get('skipIntro')
    if (savedSkipIntro === 'true') {
      onComplete()
      return
    }

    if (text.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [text, fullText, onComplete]);

  const handleSkipChange = (checked: boolean) => {
    setSkipIntro(checked)
    Cookies.set('skipIntro', checked.toString(), { expires: 365 }) // Set cookie to expire in 1 year
    if (checked) {
      onComplete()
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 4.2 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="mt-4 flex items-center justify-center"
      >
        <Checkbox 
          id="skipIntro" 
          checked={skipIntro}
          onCheckedChange={handleSkipChange}
        />
        <Label 
          htmlFor="skipIntro" 
          className="ml-2 text-xs text-gray-400"
        >
          Skip intro next time
        </Label>
      </motion.div>
    </motion.div>
  )
}

