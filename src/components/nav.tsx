'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

export function Nav({ isInitialAnimationComplete }: { isInitialAnimationComplete: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = ["Home", "About", "Projects", "Skills", "Contact"]

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-logo-dp bg-opacity-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 4.2 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <motion.div
              className="relative"
              initial={{ scale: 4, left: "calc(50vw - 96px)", top: "calc(50vh - 72px)" }}
              animate={{ scale: 1, left: 0, top: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 3.2 }}
            >
              <Image
                src="https://avatars.githubusercontent.com/u/15266249?v=4"
                alt="Developer Avatar"
                width={48}
                height={48}
                className="rounded-full border-2 border-logo-yellow"
              />
            </motion.div>
            <motion.span 
              className="text-white font-bold text-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 4.4 }}
            >
              camthegeek
            </motion.span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 4.4 + index * 0.1 }}
                >
                  <Button variant="link" asChild>
                    <Link href={item === "Home" ? "/" : `#${item.toLowerCase()}`} className="text-white hover:text-logo-yellow transition-colors">
                      {item}
                    </Link>
                  </Button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-purple-900 bg-opacity-90"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4">
            {navItems.map((item) => (
              <li key={item} className="px-4 py-2">
                <Link 
                  href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                  className="text-white hover:text-logo-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}

