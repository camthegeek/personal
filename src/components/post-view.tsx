import { Post } from '@/types/blog'
import { RichTextRenderer } from './rich-text'
import Image from 'next/image'

export function PostView({ post }: { post: Post }) {
  return (
    <article>
      {/* Cover image as background, not fixed */}
      {post?.cover && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
            alt={post.cover.alternativeText || post.title}
            priority
            fill
            className="object-cover"
          />
          {/* Article header overlays image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="bg-black/60 shadow-lg max-w-7xl w-full mx-4 p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-logo-yellow mb-4 text-center">{post.title}</h1>
              <div className="text-white/80 mb-8 text-center">
                <p>Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main content flows after image */}
      <main className="">
        <div className=" bg-gradient-to-b from-logo-dp/90 to-logo-gray/90 rounded-xl p-8">
          <RichTextRenderer content={post.content} />
        </div>
      </main>
    </article>
  )
}

