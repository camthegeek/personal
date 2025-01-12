'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { TimelineComponent } from '@/components/about/timeline-component'
import { SkillBubbles } from '@/components/about/skill-bubbles'
import { InteractiveQuote } from '@/components/about/interactive-quote'
import { FunFactsCard } from '@/components/about/fun-facts-card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-dp">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-logo-yellow mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Cam
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center mb-12">

          <motion.p 
            className="text-white text-lg md:text-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hey there! I'm Cameron, but you can call me Cam. I'm a 36-year-old father of three with a passion for web development, technology, and creative problem-solving. My journey in the digital world started as a hobby in my youth and has since blossomed into a fulfilling career spanning over a decade.
          </motion.p>
        </div>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-logo-yellow mb-6">My Professional Journey</h2>
          <TimelineComponent />
        </motion.section>

        {/* <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-logo-yellow mb-6">Skills and Expertise</h2>
          <SkillBubbles />
        </motion.section> */}

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-logo-yellow mb-6">Personal Life</h2>
          <div className="bg-logo-dp2 rounded-lg p-6 shadow-lg">
            <p className="text-white text-lg mb-4">
              Beyond the world of coding and development, I'm a proud father of three amazing kids. They're my inspiration and the reason I strive for excellence in everything I do. Balancing work and family life teaches invaluable lessons in time management, patience, and the importance of continuous learning.
            </p>
            <InteractiveQuote />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-logo-yellow mb-6">Fun Facts</h2>
          <FunFactsCard />
        </motion.section>
      </div>
    </div>
  )
}

