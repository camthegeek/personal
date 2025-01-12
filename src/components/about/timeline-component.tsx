'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const timelineEvents = [
  {
    year: 'Youth',
    title: 'Hobby Web Designer',
    description: 'Started designing websites as a hobby, born from designing silly forum graphics, laying the foundation for my future career.'
  },
  {
    year: '2013',
    title: 'Professional Developer',
    description: 'Transitioned from hobby to profession, marking the beginning of my development career.'
  },
  {
    year: '2013-2023',
    title: 'Startup Collaborator',
    description: 'Worked with dozens of small startups, helping bring successful products to life.'
  },
  {
    year: 'Ongoing',
    title: 'E-commerce Expert',
    description: 'Developed systems for various e-commerce environments, serving both government and everyday customers.'
  },
  {
    year: 'Present',
    title: 'Full-Stack Developer',
    description: 'Continually expanding my skills across multiple languages and technologies, with a preference for JavaScript.'
  }
]

export function TimelineComponent() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="relative">
      {timelineEvents.map((event, index) => (
        <motion.div
          key={index}
          className="mb-8 flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex-shrink-0 w-24 text-right mr-4">
            <div className="text-logo-yellow font-bold">{event.year}</div>
          </div>
          <div className="border-l-2 border-logo-yellow pl-4 pb-8">
            <button
              className="text-white text-lg font-semibold mb-2 hover:text-logo-yellow transition-colors focus:outline-none"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {event.title}
            </button>
            {expandedIndex === index && (
              <motion.p
                className="text-white"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {event.description}
              </motion.p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

