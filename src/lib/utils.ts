import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstParagraph(content: any[]): string {
  if (!content || content.length === 0) {
    return '';
  }
  const firstParagraph = content.find(block => block.type === 'paragraph');
  if (firstParagraph && firstParagraph.children && firstParagraph.children.length > 0) {
    return firstParagraph.children[0].text || '';
  }
  return '';
}