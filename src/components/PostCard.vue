<script setup lang="ts">
defineProps<{
    title: string
    description: string
    date: string
    tags: string[]
    slug: string
    readTime: number
    coverImage?: string
}>()

function formatDate(dateStr: string): string {
    return new Date(dateStr).toISOString().split('T')[0]
}
</script>

<template>
    <article class="group cursor-pointer">
        <router-link :to="`/posts/${slug}`" class="block">
            <div
                v-if="coverImage"
                class="mb-4 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
            >
                <img
                    :src="coverImage"
                    :alt="title"
                    class="max-h-64 w-full object-contain"
                    loading="lazy"
                />
            </div>
            <div class="space-y-3">
                <div class="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <time>{{ formatDate(date) }}</time>
                    <span>·</span>
                    <span>{{ readTime }} min read</span>
                </div>
                <h2
                    class="text-xl font-semibold text-zinc-900 transition-colors duration-150 group-hover:text-cyan-500 dark:text-zinc-100 dark:group-hover:text-cyan-400"
                >
                    {{ title }}
                </h2>
                <p class="line-clamp-2 text-zinc-600 dark:text-zinc-400">
                    {{ description }}
                </p>
                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="tag in tags"
                        :key="tag"
                        class="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                        {{ tag }}
                    </span>
                </div>
            </div>
        </router-link>
    </article>
</template>
