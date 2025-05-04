import { Post } from '@/types/blog'
import { RichTextRenderer } from './rich-text'
import Image from 'next/image'

export function PostView({ post }: { post: Post }) {
  return (
    <article className="relative min-h-screen">
      {post?.cover ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
            alt={post.cover.alternativeText || post.title}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      ) : null}
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-logo-dp/90 to-logo-gray/90 backdrop-blur-sm py-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-4xl md:text-5xl font-bold text-logo-yellow mb-4">{post.title}</h1>
          <div className="text-white/80 mb-8">
            <p>Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
          </div>
          {post ? 
          <div className="prose prose-invert prose-lg max-w-none">
            <RichTextRenderer content={post.content} />
          </div>
          : null}
        </div>
      </div>
    </article>
  )
}

