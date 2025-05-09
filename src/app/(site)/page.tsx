'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IntroAnimation } from "@/components/intro-animation"
import { Nav } from "@/components/nav"
import { ParallaxText } from "@/components/parallax-text"
import { SkillsProjectsParallax } from "@/components/skills-projects-parallax"
import { BlogPosts } from "@/components/blog-posts"
import { BlogPostsProvider } from "@/contexts/blog"
import Cookies from 'js-cookie'

export default function Home() {
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const skipIntro = Cookies.get('skipIntro')
    if (skipIntro === 'true') {
      setIsIntroComplete(true)
      setShowContent(true)
    }
  }, [])

  useEffect(() => {
    if (isIntroComplete) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isIntroComplete])

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <AnimatePresence>
        {!isIntroComplete && (
          <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-grow"
          >
            <main>
              <ParallaxText />
              <SkillsProjectsParallax />
              <BlogPostsProvider>
                <BlogPosts />
              </BlogPostsProvider>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

