'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const skills = [
  { name: 'JavaScript', color: 'bg-yellow-400', textColor: 'text-gray-900' },
  { name: 'React', color: 'bg-blue-400', textColor: 'text-white' },
  { name: 'Node.js', color: 'bg-green-500', textColor: 'text-white' },
  { name: 'PHP', color: 'bg-purple-500', textColor: 'text-white' },
  { name: 'Python', color: 'bg-blue-500', textColor: 'text-white' },
  { name: '.NET', color: 'bg-indigo-500', textColor: 'text-white' },
  { name: 'Linux', color: 'bg-orange-500', textColor: 'text-white' },
  { name: 'E-commerce', color: 'bg-green-400', textColor: 'text-gray-900' },
  { name: 'Business Management', color: 'bg-red-400', textColor: 'text-white' },
  { name: 'Marketing', color: 'bg-pink-400', textColor: 'text-gray-900' },
]

export function SkillBubbles() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className={`rounded-full px-4 py-2 cursor-pointer ${skill.color} ${skill.textColor}`}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onMouseEnter={() => setHoveredSkill(skill.name)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          {skill.name}
        </motion.div>
      ))}
    </div>
  )
}

