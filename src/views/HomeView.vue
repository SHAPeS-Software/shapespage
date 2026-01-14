<script setup lang="ts">
import { usePosts } from '../composables/usePosts'
import PostCard from '../components/PostCard.vue'
import SearchBar from '../components/SearchBar.vue'
import type { Post } from '../types'

const props = defineProps<{ postsData: Post[] }>()

const { posts, tags } = usePosts(props.postsData)
</script>

<template>
    <div class="space-y-12">
        <SearchBar :posts="posts" />

        <section class="space-y-4">
            <h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100">SHAPeS Page</h1>
            <p class="max-w-xl text-zinc-600 dark:text-zinc-400">
                Welcome to SHAPeS Page! My person blog site. I mostly talk about tech stuff or
                random things on my mind (which may also be tech related). Check out About for more
                info.
            </p>
            <hr />
        </section>

        <section>
            <div class="mb-6 flex items-center gap-2">
                <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">All Posts</h2>
                <span
                    class="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
                >
                    {{ posts.length }}
                </span>
            </div>

            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <PostCard
                    v-for="post in posts"
                    :key="post.id"
                    :title="post.title"
                    :description="post.description"
                    :date="post.date"
                    :tags="post.tags"
                    :slug="post.slug"
                    :read-time="post.readTime"
                    :cover-image="post.coverImage"
                />
            </div>

            <p v-if="posts.length === 0" class="py-12 text-center text-zinc-500 dark:text-zinc-400">
                No posts yet. Check back soon!
            </p>
        </section>

        <section v-if="tags.length > 0">
            <h2 class="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Tags</h2>
            <div class="flex flex-wrap gap-2">
                <router-link
                    v-for="tag in tags"
                    :key="tag"
                    :to="`/tags/${tag}`"
                    class="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-cyan-100 hover:text-cyan-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-400"
                >
                    {{ tag }}
                </router-link>
            </div>
        </section>
    </div>
</template>
