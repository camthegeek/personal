'use client'

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { navItems } from '@/lib/navigation'

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-logo-dp bg-opacity-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={`/logo.png`}
              alt="camthegeek avatar surrounded by a yellow border"
              aria-description='camthegeek avatar surrounded by a yellow border'
              width={48}
              height={48}
              className="rounded-full border-2 border-logo-yellow"
            />
            <span className="text-white font-bold text-xl">
              camthegeek
            </span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Button variant="link" asChild>
                    <Link href={item.href} className="text-white hover:text-logo-yellow transition-colors">
                      {item.name}
                    </Link>
                  </Button>
                </li>
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
          className="md:hidden bg-logo-dp2 bg-opacity-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4">
            {navItems.map((item) => (
              <li key={item.name} className="px-4 py-2">
                <Link 
                  href={item.href}
                  className="text-white hover:text-logo-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}

