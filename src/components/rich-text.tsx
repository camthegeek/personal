'use client';
import { JSX } from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

export function RichTextRenderer({ content }: { content: any }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <BlocksRenderer 
        content={content} 
        blocks={{
          heading: ({ children, level }) => {
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            return <HeadingTag className="text-3xl font-bold my-4">{children}</HeadingTag>;
          },
          list: ({ children }) => {
            const ListTag = 'ul' as keyof JSX.IntrinsicElements;   
            return <ListTag className="list-disc list-inside my-4">{children}</ListTag>;
          },
          paragraph: ({ children }) => {
            return <p className="my-4">{children}</p>;
          }
        }}
      />
    </div>
  )
}

