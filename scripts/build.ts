import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'fs'
import { basename, join } from 'path'
import { parse } from 'toml'
import { createHighlighter } from 'shiki'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const fontData = readFileSync(
    require.resolve('@fontsource/inter/files/inter-latin-400-normal.woff')
)

const POSTS_DIR = join(process.cwd(), 'public', 'posts')
const DIST_DIR = join(process.cwd(), 'dist')
const ASSET_DIR = join(process.cwd(), 'dist/assets')
if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true })
    console.log('Created dist directory')
}

interface Frontmatter {
    title: string
    description?: string
    date: string
    tags?: string[]
    cover_image?: string
    draft?: boolean
    author?: string
}

interface Post {
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

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim()
}

function calculateReadTime(content: string): number {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
    const match = content.match(/^[-+]{3}\n([\s\S]*?)\n[-+]{3}\n([\s\S]*)$/)
    if (!match) {
        return { frontmatter: { title: '', date: new Date().toISOString() }, body: content }
    }
    const frontmatter = parse(match[1]) as unknown as Frontmatter
    const body = match[2]
    return { frontmatter, body }
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

function markdownToHtml(body: string, highlighter: any): string {
    const codeBlockPlaceholders: string[] = []
    let processed = body.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        const placeholder = `%%CODEBLOCK${codeBlockPlaceholders.length}%%`
        codeBlockPlaceholders.push(
            `<pre class="code-block"><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`
        )
        return placeholder
    })

    processed = processed.replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    processed = processed.replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    processed = processed.replace(/^# (.+)$/gm, '<h1 id="$1">$1</h1>')

    processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>')

    processed = processed.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" class="content-image" loading="lazy" />'
    )

    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    processed = processed.replace(/^- (.+)$/gm, '<li>$1</li>')
    processed = processed.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

    processed = processed.replace(/`(.+?)`/g, '<code class="inline-code">$1</code>')

    processed = processed.replace(/\n\n/g, '</p><p>')
    processed = `<p>${processed}</p>`

    processed = processed.replace(/<p><\/p>/g, '')

    for (let i = 0; i < codeBlockPlaceholders.length; i++) {
        processed = processed.replace(`%%CODEBLOCK${i}%%`, codeBlockPlaceholders[i])
    }

    return processed
}

async function generateOgImage(post: Post): Promise<Buffer> {
    const svg = await satori(
        {
            type: 'div',
            props: {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 1200,
                    height: 630,
                    backgroundColor: '#09090b',
                    padding: 80
                },
                children: [
                    {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 24
                            },
                            children: [
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            color: '#22d3ee',
                                            fontSize: 32,
                                            fontWeight: 600
                                        },
                                        children: 'SHAPeS Page'
                                    }
                                },
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            color: '#f4f4f5',
                                            fontSize: 64,
                                            fontWeight: 700,
                                            textAlign: 'center',
                                            lineHeight: 1.2
                                        },
                                        children: post.title
                                    }
                                },
                                {
                                    type: 'div',
                                    props: {
                                        style: {
                                            color: '#a1a1aa',
                                            fontSize: 28,
                                            textAlign: 'center'
                                        },
                                        children: post.description
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: 'Inter',
                    data: fontData,
                    weight: 400,
                    style: 'normal'
                }
            ]
        }
    )

    const resvg = new Resvg(svg)
    return resvg.render().asPng()
}

async function build() {
    console.log('Building posts...')

    if (!existsSync(POSTS_DIR)) {
        console.log('No posts directory found, creating empty posts.json')
        writeFileSync(
            join(ASSET_DIR, 'posts.json'),
            JSON.stringify({ posts: [], tags: [] }, null, 2)
        )
        writeFileSync(
            join(DIST_DIR, 'posts.json'),
            JSON.stringify({ posts: [], tags: [] }, null, 2)
        )
        return
    }

    const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
    console.log(`Found ${files.length} markdown files`)

    const highlighter = await createHighlighter({
        themes: ['github-dark'],
        langs: ['javascript', 'typescript', 'vue', 'html', 'css', 'bash', 'json', 'yaml']
    })

    const posts: Post[] = []
    const allTags = new Set<string>()

    for (const file of files) {
        const content = readFileSync(join(POSTS_DIR, file), 'utf-8')
        const { frontmatter, body } = parseFrontmatter(content)

        const slug = frontmatter.title ? slugify(frontmatter.title) : basename(file, '.md')
        const html = markdownToHtml(body, highlighter)
        const readTime = calculateReadTime(body)

        if (frontmatter.tags) {
            frontmatter.tags.forEach((tag) => allTags.add(tag))
        }

        const post: Post = {
            id: slug,
            slug,
            title: frontmatter.title,
            description: frontmatter.description || '',
            content: body,
            html,
            date: frontmatter.date,
            tags: frontmatter.tags || [],
            coverImage: frontmatter.cover_image || '',
            author: frontmatter.author || 'SHAPeS',
            readTime,
            draft: frontmatter.draft || false
        }

        posts.push(post)
        console.log(`Processed: ${post.title}`)
    }

    const sortedPosts = posts
        .filter((p) => !p.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const tags = [...allTags].sort()

    const output = { posts: sortedPosts, tags }
    writeFileSync(join(ASSET_DIR, 'posts.json'), JSON.stringify(output, null, 2))
    writeFileSync(join(DIST_DIR, 'posts.json'), JSON.stringify(output, null, 2))
    console.log(`Generated posts.json with ${sortedPosts.length} posts and ${tags.length} tags`)

    if (!existsSync(join(DIST_DIR, 'og-images'))) {
        mkdirSync(join(DIST_DIR, 'og-images'), { recursive: true })
    }

    for (const post of sortedPosts) {
        try {
            const ogBuffer = await generateOgImage(post)
            writeFileSync(join(DIST_DIR, 'og-images', `${post.slug}.png`), ogBuffer)
            console.log(`Generated OG image: ${post.slug}.png`)
        } catch (error) {
            console.warn(`Failed to generate OG image for ${post.title}:`, error)
        }
    }

    console.log('Build complete!')
}

build().catch(console.error)
