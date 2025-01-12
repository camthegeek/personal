import React from 'react'
import { RichTextBlock, RichTextChild } from '@/types/blog'

export function RichTextRenderer({ content }: { content: RichTextBlock[] }) {
  const renderChild = (child: RichTextChild, index: number) => {
    let text = child.text

    if (child.bold) {
      text = <strong key={index}>{text}</strong>
    }
    if (child.italic) {
      text = <em key={index}>{text}</em>
    }
    if (child.underline) {
      text = <u key={index}>{text}</u>
    }
    // Add more formatting options as needed

    return text
  }

  const renderBlock = (block: RichTextBlock, blockIndex: number) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={blockIndex} className="mb-6 text-white/90">{block.children.map((child, childIndex) => renderChild(child, childIndex))}</p>
      case 'heading':
        return <h2 key={blockIndex} className="text-2xl font-bold mb-4 text-yellow-400">{block.children.map((child, childIndex) => renderChild(child, childIndex))}</h2>
      // Add more block types as needed
      default:
        return <p key={blockIndex} className="mb-6 text-white/90">{block.children.map((child, childIndex) => renderChild(child, childIndex))}</p>
    }
  }

  return <div>{content.map((block, index) => renderBlock(block, index))}</div>
}

