export interface Frontmatter {
    title: string
    description?: string
    date: string
    tags?: string[]
    cover_image?: string
    draft?: boolean
    author?: string
}

export interface Post {
    id: string
    slug: string
    title: string
    description: string
    content: string
    html: string
    date: string
    tags: string[]
    coverImage: string
    author: string
    readTime: number
    draft: boolean
}

export interface PostCollection {
    posts: Post[]
    tags: string[]
}
