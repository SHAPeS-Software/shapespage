    <script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    import type { Post } from '../types'

    const props = defineProps<{ postsData: Post[] }>()

    const route = useRoute()

    const slug = computed<string>(() => {
        const param = route.params.slug
        if (typeof param === 'string') return param
        if (Array.isArray(param)) return param[0] ?? ''
        return ''
    })

    const post = computed<Post | null>(() => {
        return props.postsData.find((p) => p.slug === slug.value) ?? null
    })

    function formatDate(dateStr: string | undefined): string {
        if (!dateStr) return '—';
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
}

    function decodeHtmlEntities(text: string): string {
        const doc = new DOMParser().parseFromString(text, 'text/html')
        return doc.documentElement.textContent || ''
    }

    function extractHeadings(html: string): { id: string; text: string; level: number }[] {
        const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g
        const headings: { id: string; text: string; level: number }[] = []
        let match
        while ((match = headingRegex.exec(html)) !== null) {
            const rawText = match[3].replace(/<[^>]+>/g, '')
            headings.push({
                level: parseInt(match[1]),
                id: match[2],
                text: decodeHtmlEntities(rawText)
            })
        }
        return headings
    }

    const headings = computed(() => (post.value ? extractHeadings(post.value.html) : []))
    </script>

    <template>
        <div v-if="post" class="grid gap-8 lg:grid-cols-[1fr_250px]">
            <article class="min-w-0">
                <header class="mb-8 space-y-4">
                    <img
                        v-if="post.coverImage"
                        :src="post.coverImage"
                        :alt="post.title"
                        class="h-auto w-full rounded-lg bg-zinc-100 object-contain dark:bg-zinc-800"
                    />
                    <div class="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <time>{{ formatDate(post.date) }}</time>
                        <span>·</span>
                        <span>{{ post.readTime }} min read</span>
                    </div>
                    <h1 class="text-3xl font-bold text-zinc-900 md:text-4xl dark:text-zinc-100">
                        {{ post.title }}
                    </h1>
                    <div class="flex flex-wrap gap-2">
                        <router-link
                            v-for="tag in post.tags"
                            :key="tag"
                            :to="`/tags/${tag}`"
                            class="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 transition-colors duration-150 hover:bg-cyan-100 hover:text-cyan-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-400"
                        >
                            {{ tag }}
                        </router-link>
                    </div>
                </header>

                <div
                    class="prose prose-zinc dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-cyan-500 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-code:text-cyan-600 dark:prose-code:text-cyan-400 prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-img:rounded-lg max-w-none"
                    v-html="post.html"
                />
            </article>

            <aside class="hidden lg:block">
                <div class="sticky top-8 space-y-4">
                    <nav v-if="headings.length > 0" class="space-y-2">
                        <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            On this page
                        </h3>
                        <ul class="space-y-1 text-sm">
                            <li v-for="heading in headings" :key="heading.id">
                                <a
                                    :href="`#${heading.id}`"
                                    class="block text-zinc-500 transition-colors duration-150 hover:text-cyan-500 dark:text-zinc-400 dark:hover:text-cyan-400"
                                    :class="{ 'pl-4': heading.level === 3 }"
                                >
                                    {{ heading.text }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>

        <div v-else class="py-12 text-center">
            <h1 class="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Post not found</h1>
            <p class="mb-4 text-zinc-500 dark:text-zinc-400">
                The post you're looking for doesn't exist.
            </p>
            <router-link to="/" class="text-cyan-500 hover:underline"> ← Back to home </router-link>
        </div>
    </template>
