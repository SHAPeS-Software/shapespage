<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../composables/usePosts'
import PostCard from '../components/PostCard.vue'
import type { Post } from '../types'

const props = defineProps<{ postsData: Post[] }>()

const route = useRoute()
const { posts } = usePosts(props.postsData)

const filteredPosts = computed(() => {
    const tag = route.params.tag as string
    return posts.value.filter((p) => p.tags.includes(tag))
})

const tag = computed(() => route.params.tag as string)
</script>

<template>
    <div class="space-y-8">
        <header class="space-y-2">
            <div class="flex items-center gap-2">
                <router-link
                    to="/"
                    class="text-zinc-500 transition-colors duration-150 hover:text-cyan-500 dark:text-zinc-400 dark:hover:text-cyan-400"
                >
                    ← All posts
                </router-link>
            </div>
            <h1 class="text-2xl font-bold text-zinc-900 md:text-3xl dark:text-zinc-100">
                Posts tagged with <span class="text-cyan-500 dark:text-cyan-400">#{{ tag }}</span>
            </h1>
            <p class="text-zinc-600 dark:text-zinc-400">
                {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post' : 'posts' }}
            </p>
        </header>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <PostCard
                v-for="post in filteredPosts"
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

        <p
            v-if="filteredPosts.length === 0"
            class="py-12 text-center text-zinc-500 dark:text-zinc-400"
        >
            No posts found with this tag.
        </p>
    </div>
</template>
