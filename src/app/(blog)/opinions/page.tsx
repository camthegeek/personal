import { Metadata } from 'next'
import { BlogPostsList } from '@/components/blog-posts-list'

export const metadata: Metadata = {
  title: 'Opinions | camthegeek',
  description: 'Read my thoughts and opinions on various topics including web development, relationships, travel and other tech!',
}

export default function OpinionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray pt-10">
       <div className="container mx-auto px-4 py-8 max-w-8xl">
        <BlogPostsList postType="opinion" />
      </div>
    </div>
  )
}

