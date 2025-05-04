import { Metadata } from 'next'
import { PostView } from '@/components/post-view'
import { Post } from '@/types/blog'
import { getFirstParagraph } from '@/lib/utils';

type Props = Promise<{ params: { slug: string } }>

export async function generateMetadata(props: { params: Props}) : Promise<Metadata> {
  const params = await props.params;
  const { slug } = JSON.parse(JSON.stringify(params));

  const post = await getPost(slug);
  const desc = getFirstParagraph(post.content);
  
  return {
    title: `${post.title} | Opinion`,
    description: desc || 'No description available for this post.',
  }
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/opinions?filters[slug][$eq]=${slug}&populate=*`, {
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

  return <PostView post={post} />
}