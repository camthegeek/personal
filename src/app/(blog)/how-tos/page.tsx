import { Metadata } from 'next'
import { BlogPostsList } from '@/components/blog-posts-list'

export const metadata: Metadata = {
  title: 'How-To Guides | camthegeek',
  description: 'Explore practical how-to guides and tutorials on web development, programming, and technology.',
}

export default function HowTosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray pt-10">
      <div className="container max-w-8xl mx-auto px-4 py-8">
        <BlogPostsList postType="how-to" />
      </div>
    </div>
  )
}

