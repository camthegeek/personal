'use client';
import { useProjects } from "@/contexts/projects";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function ProjectsList() {
  const { projects, isLoading, error } = useProjects();

  return (
    <>
      {error && (
        <div className="text-red-500 text-center mb-8">
          Failed to load projects. Please try again later.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-96 bg-logo-dp animate-pulse" />
            ))
          : projects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col overflow-hidden border border-logo-yellow/30 shadow-lg bg-logo-dp hover:scale-[1.025] hover:shadow-2xl transition-transform duration-200"
              >
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
            ))}
      </div>
    </>
  );
}
