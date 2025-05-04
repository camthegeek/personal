import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BlocksContent } from '@strapi/blocks-react-renderer'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstParagraph(content: BlocksContent | null): string {
  if (!content || content.length === 0) {
    return '';
  }
  const firstParagraph = content.find(block => block.type === 'paragraph');
  if (firstParagraph && firstParagraph.children && firstParagraph.children.length > 0) {
    const firstChild = firstParagraph.children[0] as { text?: string };
    return firstChild.text || '';
  }
  return '';
}