'use client'

import { motion} from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import { useProjects } from '@/contexts/projects'

export function SkillsProjectsParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { featured, isLoading, error } = useProjects()

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
        {error && (
          <div className="text-red-500 text-center mb-8">Failed to load projects. Please try again later.</div>
        )}
        <div className="grid grid-cols-1 gap-10">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="h-64 bg-logo-dp animate-pulse" />
          ))
        ) : (
          featured.map((project, index) => {
            let bgClass = "bg-logo-dp";
            if (index >= 2 && index <= 3) {
              bgClass = "bg-logo-dp-gray-1";
            } else if (index > 3) {
              bgClass = "bg-logo-gray";
            }
            return (
              <Parallax
                key={project.id}
                translateY={[`${(index + 1) * 50}px`, `${-(index + 1) * 50}px`]}
                opacity={[0.5, 1]}
                className="mb-10 md:mb-10"
              >
                <Card className={`flex flex-col md:flex-row w-full overflow-hidden ${bgClass} border-logo-dp2`}>
                  <div className="w-full md:w-2/3 relative">
                    {project.image?.url && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.image.url}`}
                        alt={project.image.alternativeText || project.title}
                        width={600}
                        height={400}
                        className="object-contain w-full h-64 md:h-auto"
                      />
                    )}
                  </div>
                  <CardContent className={`w-full md:w-1/3 p-6 flex flex-col justify-center ${bgClass}`}>
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl font-bold text-logo-yellow">{project.title}</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-white text-sm md:text-base mb-4">{project.summary}</CardDescription>
                      <div className="p-0">
                        <Button asChild>
                          <a href={`/projects/${project.slug}`}>
                            View Project
                          </a>
                        </Button>
                      </div>
                  </CardContent>
                </Card>
              </Parallax>
            )
          })
        )}
        </div>
      </div>
    </div>
    </ParallaxProvider>
  )
}

