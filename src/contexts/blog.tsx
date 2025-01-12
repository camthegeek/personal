'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Post, PostsResponse, PostType } from '@/types/blog'

type BlogPostsContextType = {
  posts: {
    'how-to': Post[]
    opinion: Post[]
  }
  isLoading: boolean
  error: Error | null
}

const BlogPostsContext = createContext<BlogPostsContextType>({
  posts: {
    'how-to': [],
    opinion: []
  },
  isLoading: false,
  error: null
})

export function useBlogPosts() {
  return useContext(BlogPostsContext)
}

export function BlogPostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPostsContextType['posts']>({
    'how-to': [],
    opinion: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchPosts = async (type: PostType) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${type}s?sort=publishedAt:desc&populate=*`, {
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} posts`)
      }

      const data: PostsResponse = await response.json()
      return data.data
    } catch (err) {
      throw err
    }
  }

  const fetchAllPosts = useCallback(async () => {
    setIsLoading(true)
    try {
      const [howTos, opinions] = await Promise.all([
        fetchPosts('how-to'),
        fetchPosts('opinion')
      ])
      setPosts({
        'how-to': howTos,
        opinion: opinions
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching posts'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllPosts()
    // Fetch posts every 5 minutes
    const interval = setInterval(fetchAllPosts, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchAllPosts])

  return (
    <BlogPostsContext.Provider value={{ posts, isLoading, error }}>
      {children}
    </BlogPostsContext.Provider>
  )
}

