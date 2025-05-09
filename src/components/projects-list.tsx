"use client";
import { useProjects } from "@/contexts/projects";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectsList() {
  const { projects, isLoading, error } = useProjects();

  return (
    <>
      {error && (
        <div className="text-red-500 text-center mb-8">
          Failed to load projects. Please try again later.
        </div>
      )}
      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className={`text-4xl md:text-5xl font-bold text-logo-yellow mb-8 text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h1>
        <motion.p
          className={`text-white text-center mb-12`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Explore my portfolio of projects, each showcasing different skills,
          technologies, and creative solutions.
        </motion.p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-96 bg-logo-dp animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col overflow-hidden border border-logo-yellow/30 shadow-lg bg-logo-dp hover:scale-[1.025] hover:shadow-2xl transition-transform duration-200">
                <div className="relative w-full h-48">
                  {project.image?.url && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.image.url}`}
                      alt={project.image.alternativeText || project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="flex-1 flex flex-col justify-between p-6">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl font-bold text-logo-yellow mb-1 line-clamp-2">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="text-white mb-3 line-clamp-3">
                    {project.summary}
                  </CardDescription>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies
                        .split(",")
                        .map((tech) => tech.trim())
                        .filter((tech) => tech.length > 0)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="bg-logo-yellow text-logo-dp px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="mt-auto p-6 pt-0">
                  <Link href={`/projects/${project.slug}`} className="w-full">
                    <button className="w-full bg-logo-yellow text-logo-dp font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition-colors">
                      View Details
                    </button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
