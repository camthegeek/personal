import type { BlocksContent } from "@strapi/blocks-react-renderer"

export type Project = {
  id: number
  title: string
  slug: string
  summary: string
  image: {
    url: string
    alternativeText?: string | null
    formats?: Record<string, { url: string; width: number; height: number }>
  } | null
  url?: string | null
  featured: boolean
  technologies?: string,
  content: BlocksContent
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export type ProjectsResponse = {
  data: Project[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
