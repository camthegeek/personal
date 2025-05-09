"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { RichTextRenderer } from "@/components/rich-text";
import Image from "next/image";

export default function ProjectDetails({ project }: { project: Project }) {
  if (!project) return null;

  return (
    <motion.div
        className="frogs" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
    >

      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="w-full md:w-1/2 flex justify-center">
            {project.image?.url ? (
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.image.url}`}
                  alt={project.image.alternativeText || project.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-logo-yellow mb-4 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="text-white text-center md:text-left mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {project.summary}
            </motion.p>
            {project.technologies ? (
              project.technologies.split(",").filter(Boolean).length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="font-semibold">Technologies:</span>
                  <div className="flex flex-wrap gap-2">
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
                </div>
              ) : null
            ) : null}

            {project.url ? (
              <div className="text-center mt-8">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-logo-yellow text-logo-dp px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Visit Project
                </a>
              </div>
            ) : (
              <div className="text-center mt-8">
                <span className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold">
                  In Progress
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <motion.div
        className="bg-logo-dp/90 rounded-xl p-8 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <RichTextRenderer content={project.content} />
      </motion.div>
    </motion.div>
  );
}
