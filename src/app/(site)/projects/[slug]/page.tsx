import { notFound } from "next/navigation";
import { Project } from "@/types/project";
import { RichTextRenderer } from "@/components/rich-text";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Props}) : Promise<Metadata> {
    const params = await props.params;
    const { slug } = JSON.parse(JSON.stringify(params));
    const post = await getProject(slug);
    if (!post) {
      return {
        title: 'Post Not Found | How-To Guide',
        description: 'The requested how-to guide could not be found.',
      }
    }  
    const desc = post.summary;
    return {
      title: `${post.title} | Projects by camthegeek`,
      description: desc.slice(0, 160) + "...",
    }
  }


async function getProject(slug: string): Promise<Project | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.[0] || null;
}

type Props = Promise<{ params: { slug: string } }>

export default async function ProjectDetailPage(props: { params: Props }) {
    const params = await props.params;
    const { slug } = JSON.parse(JSON.stringify(params));
  const project = await getProject(slug);
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray pt-10">
      <div className="container max-w-8xl mx-auto px-4 py-8">
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
              <h1 className="text-4xl md:text-5xl font-bold text-logo-yellow mb-4 text-center md:text-left">
                {project.title}
              </h1>
              <p className="text-white text-center md:text-left mb-6">
                {project.summary}
              </p>
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
        <div className="bg-logo-dp/90 rounded-xl p-8 mb-8">
          <RichTextRenderer content={project.content} />
        </div>
      </div>
    </div>
  );
}
