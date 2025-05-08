import { Metadata } from 'next'
import { PostView } from '@/components/post-view'
import { Post } from '@/types/blog'
import { getFirstParagraph } from '@/lib/utils'

type Props = Promise<{ params: { slug: string } }>

export async function generateMetadata(props: { params: Props}) : Promise<Metadata> {
  const params = await props.params;
  const { slug } = JSON.parse(JSON.stringify(params));
  const post = await getPost(slug);
  if (!post) {
    return {
      title: 'Post Not Found | How-To Guide',
      description: 'The requested how-to guide could not be found.',
    }
  }  
  const desc = getFirstParagraph(post.content);
  return {
    title: `${post.title} | How-To Guide`,
    description: desc.slice(0, 160) + "..." || 'A comprehensive guide on how to do something.',
  }
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/how-tos?filters[slug][$eq]=${slug}&populate=*`, {
    next: { revalidate: 3600 } // Revalidate every hour
  })

  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }

  const data = await res.json()
  return data.data[0]
}

export default async function HowToPage(props: { params: Props }) {
  const params = await props.params;
  const { slug } = JSON.parse(JSON.stringify(params));
  const post = await getPost(slug);

  if (!post) {
    return <div className="max-w-8xl mx-auto px-4 py-10 text-center text-white">Post not found</div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-logo-dp via-logo-gray to-logo-gray pt-10">
      <div className="container max-w-8xl mx-auto px-4 py-8">
        <PostView post={post} />
      </div>
    </div>
  )
}