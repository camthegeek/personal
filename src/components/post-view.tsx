import { Post } from '@/types/blog'
import { RichTextRenderer } from './rich-text'
import Image from 'next/image'
import { motion } from 'framer-motion';

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
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-logo-yellow mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {post.title}
              </motion.h1>
              <div className="text-white/80 mb-8 text-center">
                <p>Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main content flows after image */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className=""
      >
        <div className=" bg-gradient-to-b from-logo-dp/90 to-logo-gray/90 rounded-xl p-8">
          <RichTextRenderer content={post.content} />
        </div>
      </motion.main>
    </article>
  )
}

