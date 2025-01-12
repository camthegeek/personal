'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Post } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'

type PostType = 'how-to' | 'opinion'

function PostCard({ post, type }: { post: Post, type: PostType }) {
  return (
    <Card className="h-full flex flex-col bg-logo-dp overflow-hidden">
      <div className="relative">
        {post.cover ? (
          <div className="relative w-full pt-[50%]">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.formats.small.url}`}
              alt={post.cover.alternativeText || post.title}
              layout="fill"
              objectFit="cover"
              className="opacity-50"
            />
          </div>
        ) : (
          <div className="relative w-full pt-[50%] bg-logo-dp" />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-logo-dp/90 p-4" style={{ transform: 'translateY(0%)' }}>
          <CardTitle className="text-xl font-semibold text-yellow-400 mb-2">
            {post.title}
          </CardTitle>
          {post.post ? (
          <CardDescription className="text-white/90 line-clamp-2">        
            {post.post[0].children[0].text}...
          </CardDescription>
          ) : null}
        </div>
      </div>
      <CardFooter className="mt-auto pt-16">
        <Button asChild>
          <Link 
            href={`/${type}s/${post.slug}`}
            className="text-logo-dp"
          >
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function BlogPostsList({ postType }: { postType: PostType }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${postType}s?sort=publishedAt:desc&populate=*`)
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPosts(data.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [postType])

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {isLoading ? (
        // Loading skeletons
        Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="h-full flex flex-col bg-logo-dp">
            <div className="relative w-full pt-[75%]">
              <Skeleton className="absolute inset-0" />
            </div>
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-purple-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full bg-purple-800" />
            </CardContent>
            <CardFooter className="mt-auto">
              <Skeleton className="h-9 w-24 bg-purple-800" />
            </CardFooter>
          </Card>
        ))
      ) : (
        posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PostCard post={post} type={postType} />
          </motion.div>
        ))
      )}
    </div>
  )
}

