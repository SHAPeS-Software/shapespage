Minimal Dark Blog - Project Plan
Overview
A fully static, beautifully minimal dark blog using Vue 3, Vite, Tailwind CSS v4, and TypeScript. Blog posts are authored in Markdown files with TOML frontmatter and stored in public/posts/. During the build process, a script parses all markdown files, renders them to HTML, calculates read times, and produces a single posts.json file that all frontend components import directly. Lightning-fast, zero-server website with an elegant, modern dark aesthetic — perfect for deployment on GitHub Pages.
Tech Stack

- Framework: Vue 3 with Composition API
- Build Tool: Vite
- Styling: Tailwind CSS v4 (CSS-first approach)
- Language: TypeScript
- Routing: Vue Router (hash mode for GitHub Pages)
- Syntax Highlighting: Shiki (build-time)
- Search: Fuse.js (client-side)
- OG Images: Satori + Resvg (auto-generated)
  Design System
- Base Theme: Deep dark (slate/zinc palette) with light mode toggle
- Dark Mode: Deep dark (slate/zinc palette)
- Light Mode: Clean white/gray palette
- Accent Color: Subtle cyan (#22d3ee / cyan-400)
- Typography: Segoe UI for UI, Segoe UI for code blocks
- Animations: 150-200ms ease-out transitions
- Responsive: Mobile-first
  Animation Timing
  | Interaction | Duration | Easing |
  |-------------|----------|--------|
  | Page transitions | 200ms | ease-out |
  | Hover states | 150ms | ease-out |
  | Scroll reveals | 300ms | ease-out |
  | Theme switch | 300ms | ease-in-out |
  Frontmatter Schema (TOML)
  title = ""
  description = ""
  date = 2026-01-13
  tags = ["tag1", "tag2"]
  cover_image = "/images/..."
  draft = false
  author = "Your Name"
  TypeScript Rules
- No any: Use unknown for truly unknown types
- Return types required: Every function must return a value
- Explicit return types: Function signatures include return types
- Strict null checks: Enabled
- Fonts: Segoe UI for UI, Segoe UI for code blocks
  Project Structure
  ├── public/
  │ └── posts/
  │ └── \*.md # Blog posts
  ├── src/
  │ ├── components/
  │ │ ├── PostCard.vue
  │ │ ├── PostList.vue
  │ │ ├── HeroSection.vue
  │ │ ├── SearchBar.vue
  │ │ ├── ThemeToggle.vue
  │ │ ├── TableOfContents.vue
  │ │ └── CodeBlock.vue
  │ ├── views/
  │ │ ├── HomeView.vue
  │ │ ├── PostView.vue
  │ │ └── TagView.vue
  │ ├── composables/
  │ │ ├── usePosts.ts
  │ │ ├── useSearch.ts
  │ │ └── useTheme.ts
  │ ├── utils/
  │ │ ├── markdown.ts
  │ │ ├── og-generator.ts
  │ │ └── helpers.ts
  │ ├── router/
  │ │ └── index.ts
  │ ├── App.vue
  │ └── main.ts
  ├── scripts/
  │ └── build.ts # Build pipeline
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts
  └── tailwind.config.js
  Type Definitions
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
  interface Frontmatter {
  title: string
  description?: string
  date: string
  tags?: string[]
  cover_image?: string
  draft?: boolean
  author?: string
  }
  interface PostCollection {
  posts: Post[]
  tags: string[]
  }
  Build Pipeline (scripts/build.ts)

1. Scan public/posts/\*.md
2. Parse TOML frontmatter + markdown body
3. Render markdown → HTML with Shiki syntax highlighting
4. Calculate read times
5. Generate Open Graph images (Satori + Resvg)
6. Output dist/posts.json + dist/og-images/
   Build Outputs
   dist/
   ├── posts.json # All post metadata + HTML content
   ├── og-images/ # Generated Open Graph PNGs
   ├── index.html
   └── posts.json.map # Source map for debugging
   Pages
7. Home - Hero intro + recent posts grid + search
8. Post - Full article with TOC, code blocks, reading progress
9. Tag - Filtered post list by tag
   Features
   | Feature | Implementation |
   |---------|----------------|
   | Search | Fuse.js with expanding Cmd+K bar |
   | Draft Handling | Excluded from build completely |
   | Syntax Highlighting | Shiki (build-time, GitHub Dark theme) |
   | Lazy Loading | Native loading="lazy" + blur placeholders |
   | OG Images | Auto-generated with Satori |
   | Theme Toggle | Dark/Light with localStorage |
   | Page Transitions | Vue <Transition> with slide/fade |
   | Scroll Animations | Intersection Observer |
   | Table of Contents | Auto-generated from headings |
   Composables API
   function usePosts(): { posts: Ref<Post[]> }
   function useSearch(posts: Post[]): { query: Ref<string>, results: ComputedRef<Post[]> }
   function useTheme(): { isDark: Ref<boolean>, toggle: () => boolean }
   function useReadingProgress(post: Post): { progress: Ref<number> }
   Utility Functions
   function calculateReadTime(content: string): number
   function formatDate(date: string): string
   function slugify(text: string): string
   function parseFrontmatter(content: string): Frontmatter
   function highlightCode(code: string, lang: string): string
   function generateOgImage(post: Post): Promise<string>
   Deployment (GitHub Pages)

- Build output: dist/ folder
- SPA routing: 404.html fallback
- CNAME support included
- Workflow: GitHub Actions or manual push
  SEO
- Meta tags per page (title, description)
- Open Graph protocol
- Twitter cards
- Auto-generated OG images with post title/cover
- Canonical URLs
- Sitemap generation (optional)
