import { notFound } from "next/navigation";
import { Project } from "@/types/project";
import { Metadata } from "next";
import ProjectDetails from "@/components/projects/details";

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
        <ProjectDetails project={project} />
      </div>
    </div>
  );
}
