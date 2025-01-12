'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const funFacts = [
  {
    title: "Server Whisperer",
    content: "I've set up countless Linux-based servers for everything from web hosting to game servers. I speak fluent command line!",
    icon: "🖥️"
  },
  {
    title: "Code Polyglot",
    content: "While JavaScript is my favorite, I'm fluent in multiple programming languages. It's like being a linguistic chameleon in the coding world!",
    icon: "🗣️"
  },
  {
    title: "Self-Taught Maven",
    content: "From development to business management to marketing, I've self-taught my way through various disciplines. Who needs traditional schooling when you have determination and the internet?",
    icon: "🧠"
  },
  {
    title: "Family CLI",
    content: "As a father of three, I often joke that I'm running a mini command-line interface at home. 'sudo make_breakfast --plate=bacon,homemade biscuits and gravy,scrambled eggs,pancakes with strawberries' anyone?",
    icon: "👨‍👧‍👦"
  },
  {
    title: "Startup Enthusiast",
    content: "I've worked with so many startups, I sometimes dream in pitch decks and MVPs. It's like being a digital midwife for the next big thing!",
    icon: "🚀"
  }
]

export function FunFactsCard() {
  const [currentFact, setCurrentFact] = useState(0)

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % funFacts.length)
  }

  return (
    <Card className="bg-logo-dp2">
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFact}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">{funFacts[currentFact].icon}</div>
            <h3 className="text-xl font-bold text-logo-yellow mb-2">{funFacts[currentFact].title}</h3>
            <p className="text-white mb-4">{funFacts[currentFact].content}</p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={nextFact}
          className="bg-logo-yellow text-logo-dp px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
        >
          Next Fun Fact
        </button>
      </CardContent>
    </Card>
  )
}

