'use client'

import { motion} from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

type Project = {
  name: string
  description: string
  image: string
  url?: string
}

const projects: Project[] = [

  {
    name: "Juk.gg Gaming Clips",
    description: "A platform for sharing and discovering gaming clips, Juk.gg showcases my expertise in building scalable web applications with a focus on user engagement, revenue generation, AI integrations and community features.", 
    image: "/img/projx/jukalpha.png",
    url: "https://juk.gg"
  },
  {
    name: "State Park Explorer",
    description: "A web application designed to help users discover and explore state parks across the United States, featuring detailed information, community engagement, and premium features including personalized recommendations, and advanced search filters as well as a subscription model for businesses looking for park data.",
    image: "/img/projx/parks.png"
  },
  {
    name: "Colony Watch",
    description: "Designed to aggregate stats for a specific product, this project expanded into a full solution to monitor Bitcoin mining farms, providing comprehensive control and real-time insights.",
    image: "/img/projx/dashboard.png",
    url: "https://colonywatch.com"
  },
]

export function SkillsProjectsParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
 
  return (
    <ParallaxProvider>
    <div ref={containerRef} className="min-h-screen  bg-gradient-to-b from-logo-gray via-logo-dp to-logo-dp py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-logo-yellow mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Writing code is my passion
        </motion.h2>
        <motion.p 
          className="text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 0.9 }}
        >
          And passion drives me to create amazing projects that solve real-world problems. Here are some of my recent works.
          </motion.p>
        {projects.map((project, index) => {
            let bgClass = "bg-logo-dp";
            if (index >= 2 && index <= 3) {
              bgClass = "bg-logo-dp-gray-1";
            } else if (index > 3) {
              bgClass = "bg-logo-gray";
            }
         return (
          <Parallax
          key={project.name}
          translateY={[`${(index + 1) * 50}px`, `${-(index + 1) * 50}px`]}
          opacity={[0.5, 1]}
          className="mb-10 md:mb-10"
        >
            <Card className={`flex flex-col md:flex-row w-full overflow-hidden ${bgClass} border-logo-dp2`}>
              <div className="w-full md:w-2/3 relative">
                <Image 
                  src={project.image} 
                  alt={project.name} 
                  width={600} 
                  height={400}
                  className="object-contain w-full h-64 md:h-auto"
                />
              </div>
              <CardContent className={`w-full md:w-1/3 p-6 flex flex-col justify-center ${bgClass}`}>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-bold text-logo-yellow">{project.name}</CardTitle>
                </CardHeader>
                <CardDescription className="text-white text-sm md:text-base mb-4">{project.description}</CardDescription>
                {project.url ? (
                  <div className="p-0">
                    <Button asChild>
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                      >
                        View Project
                      </a>
                    </Button>
                  </div>
                ) : 
(
                  <div className="p-0">
                    <Button disabled>
                      In Progress
                    </Button>
                  </div>
                )}

              </CardContent>
            </Card>
          </Parallax>
        )})}
      </div>
    </div>
    </ParallaxProvider>
  )
}

