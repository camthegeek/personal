'use client';

import Link from 'next/link'
import { navItems } from '@/lib/navigation'
import { SocialIcon } from 'react-social-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from 'react'

// Define the social icons data
const socialIcons = [
  { network: 'facebook', url: 'https://facebook.com/camchadwell' },
  { network: 'discord', url: '#', tooltip: '@camthegeek on Discord (Add as friend)' },
  { network: 'x', url: 'https://x.com/camthegeek' },
  { network: 'github', url: 'https://github.com/camthegeek' },
  // Add more social icons here as needed
]

export function Footer() {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>(
    Object.fromEntries(socialIcons.map(icon => [icon.network, false]))
  )

  const handleMouseEnter = (network: string) => {
    setHoverStates(prev => ({ ...prev, [network]: true }))
  }

  const handleMouseLeave = (network: string) => {
    setHoverStates(prev => ({ ...prev, [network]: false }))
  }

  return (
    <footer className="bg-logo-dp text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-logo-yellow font-bold hover:text-logo-yellow transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-6 mb-8">
            {socialIcons.map((icon) => (
              <TooltipProvider key={icon.network}>
                <Tooltip>
                  <TooltipTrigger>
                    <SocialIcon 
                      url={icon.url}
                      network={icon.network}
                      bgColor="transparent"
                      fgColor={hoverStates[icon.network] ? "rgb(236, 227, 40)" : "white"}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => handleMouseEnter(icon.network)}
                      onMouseLeave={() => handleMouseLeave(icon.network)}
                    />
                  </TooltipTrigger>
                  {icon.tooltip && (
                    <TooltipContent side="top">
                      <p>{icon.tooltip}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} camthegeek. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

