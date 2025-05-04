"use client";
import { JSX } from "react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Link from "next/link";

export function RichTextRenderer({ content }: { content: BlocksContent }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          heading: ({ children, level }) => {
            const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag className="text-3xl font-bold my-4">
                {children}
              </HeadingTag>
            );
          },
          list: ({ children }) => {
            const ListTag = "ul" as keyof JSX.IntrinsicElements;
            return (
              <ListTag className="list-disc list-inside my-4">
                {children}
              </ListTag>
            );
          },
          paragraph: ({ children }) => {
            // paragraphs sometimes contain other blocks, so we need to handle that. for example, a paragraph might contain code block.

            if (Array.isArray(children)) {
              return (
                <p className="my-4">
                  {children.map((child, index) => {
                    if (child.props && child.props.code) {
                      console.log(child.props)
                      return (
                        <code
                          key={index}
                          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-1 rounded"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {child.props.text}
                        </code>
                      );
                    }
                    return child;
                  })}
                </p>
              );
            }
            return <p className="my-4">{children}</p>;
                  
          },
          link: ({ children, url }) => {
            // Ensure href is defined and valid
            if (!url) {
              return <span className="text-red-500">Invalid link</span>;
            }
            return (
              <Link
                href={url}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </Link>
            );
          }
        }}
      />
    </div>
  );
}
