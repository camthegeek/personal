'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  url: string
}

export function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Replace this with your actual API call to fetch blog posts
    const fetchPosts = async () => {
      // Simulating an API call
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      setPosts(data.slice(0, 3).map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.body.slice(0, 100) + '...',
        url: `https://yourblog.com/posts/${post.id}`
      })))
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray">
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-5xl font-bold text-logo-yellow mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          And sometimes I write to teach or vent..
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-logo-dp border-logo-dp2">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-yellow-400">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild>
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                    >
                      Read More
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

