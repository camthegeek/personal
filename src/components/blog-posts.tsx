'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBlogPosts } from '@/contexts/blog'
import { Skeleton } from "@/components/ui/skeleton"
import { Post } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'

function PostCard({ post, type }: { post: Post, type: 'how-to' | 'opinion' }) {
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
        )
        }
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
          <a 
            href={`/${type}s/${post.slug}`}
            className="text-logo-dp"
          >
            Read More
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function BlogPosts() {
  const { posts, isLoading, error } = useBlogPosts()

  const allPosts = [...posts['how-to'], ...posts.opinion]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray">
      <div className="container mx-auto px-4 py-4">
        <motion.h2 
          className="text-5xl font-bold text-yellow-400 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Occasionally, I write to teach or engage
        </motion.h2>
        {error && (
          <div className="text-red-500 text-center mb-8">
            Failed to load blog posts. Please try again later.
          </div>
        )}
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
            allPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PostCard post={post} type={posts['how-to'].includes(post) ? 'how-to' : 'opinion'} />
              </motion.div>
            ))
          )}
        </div>
        <div className="mt-12 text-center">
          <Link href="/how-tos" className="inline-block bg-logo-yellow text-logo-dp px-6 py-3 rounded-lg font-semibold mr-4 hover:bg-yellow-400 transition-colors">
            View All How-Tos
          </Link>
          <Link href="/opinions" className="inline-block bg-logo-yellow text-logo-dp px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
            View All Opinions
          </Link>
        </div>
      </div>
    </div>
  )
}

