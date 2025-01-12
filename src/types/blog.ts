export type RichTextChild = {
  text: string
  type: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  // Add other text formatting properties as needed
}

export type RichTextBlock = {
  type: string
  children: RichTextChild[]
}

type ImageFormat = {
  url: string
  width: number
  height: number
}

type CoverImage = {
  id: number
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large: ImageFormat
    small: ImageFormat
    medium: ImageFormat
    thumbnail: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type Post = {
  id: number
  documentId: string
  title: string
  post: RichTextBlock[]
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  cover: CoverImage | null
}

export type PostsResponse = {
  data: Post[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type PostType = 'how-to' | 'opinion'

