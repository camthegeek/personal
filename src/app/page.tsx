'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IntroAnimation } from "@/components/intro-animation"
import { Nav } from "@/components/nav"
import { ParallaxText } from "@/components/parallax-text"
import { SkillsProjectsParallax } from "@/components/skills-projects-parallax"
import { BlogPosts } from "@/components/blog-posts"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isIntroComplete) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isIntroComplete])

  return (
    <main className="relative">
      <AnimatePresence>
        {!isIntroComplete && (
          <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
        )}
      </AnimatePresence>
      <Nav isInitialAnimationComplete={isIntroComplete} />
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ParallaxText />
            <SkillsProjectsParallax />
            <BlogPosts />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

