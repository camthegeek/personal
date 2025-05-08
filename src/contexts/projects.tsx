'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Project, ProjectsResponse } from '@/types/project'

export type ProjectsContextType = {
  projects: Project[]
  featured: Project[]
  isLoading: boolean
  error: Error | null
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  featured: [],
  isLoading: false,
  error: null
})

export function useProjects() {
  return useContext(ProjectsContext)
}

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchProjects = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?sort=publishedAt:desc&populate=*`)
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data: ProjectsResponse = await response.json()
      setProjects(data.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching projects'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
    // Optionally, refetch every 5 minutes
    const interval = setInterval(fetchProjects, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchProjects])

  const featured = projects.filter(p => p.featured)

  return (
    <ProjectsContext.Provider value={{ projects, featured, isLoading, error }}>
      {children}
    </ProjectsContext.Provider>
  )
}
