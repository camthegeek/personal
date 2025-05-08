import ProjectsList from '@/components/projects-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | camthegeek',
  description: 'Explore my portfolio of projects, each showcasing different skills, technologies, and creative solutions.',
}

export default function ProjectsPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray pt-10">
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        <h1 className="text-4xl md:text-5xl font-bold text-logo-yellow mb-8 text-center">
          Projects
        </h1>
        <p className="text-white text-center mb-12">
          Explore my portfolio of projects, each showcasing different skills, technologies, and creative solutions.
        </p>
       <ProjectsList />
      </div>
    </div>
  )
}
