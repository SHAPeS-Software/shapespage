<script setup lang="ts">
import { useSearch } from '../composables/useSearch'
import type { Post } from '../types'

const props = defineProps<{ posts: Post[] }>()

const { query, results } = useSearch(props.posts)
</script>

<template>
    <div class="relative">
        <div
            class="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors duration-150 focus-within:border-cyan-400 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-cyan-500"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 text-zinc-400"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
            </svg>
            <input
                v-model="query"
                type="text"
                placeholder="Search posts..."
                class="flex-1 border-none bg-transparent text-zinc-900 placeholder-zinc-400 outline-none dark:text-zinc-100"
            />
            <kbd
                class="hidden items-center gap-1 rounded bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-500 sm:inline-flex dark:bg-zinc-700 dark:text-zinc-400"
            >
            </kbd>
        </div>

        <div
            v-if="query && results.length > 0"
            class="absolute z-10 mt-2 w-full rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
        >
            <router-link
                v-for="post in results.slice(0, 5)"
                :key="post.id"
                :to="`/posts/${post.slug}`"
                class="block rounded-md px-3 py-2 transition-colors duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
                <div class="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {{ post.title }}
                </div>
                <div class="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {{ post.description }}
                </div>
            </router-link>
        </div>
    </div>
</template>
