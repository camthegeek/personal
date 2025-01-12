import { PostView } from '@/components/post-view'
import { Post } from '@/types/blog'

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/how-tos?filters[slug][$eq]=${slug}&populate=*`, {
  })

  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }

  const data = await res.json();
  return data.data[0];
}

export default async function HowToPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return <PostView post={post} />
}

