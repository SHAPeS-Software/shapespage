<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import type { PostCollection } from './types'

const props = defineProps<{ postsData: PostCollection }>()

onMounted(() => {
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault()
            const searchInput = document.querySelector<HTMLInputElement>('input[type="text"]')
            searchInput?.focus()
        }
    })
})
</script>

<template>
    <div
        class="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100"
    >
        <Navbar />

        <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <RouterView :posts-data="postsData.posts" />
        </main>

        <footer class="border-t border-zinc-200 dark:border-zinc-800">
            <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <p class="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    © {{ new Date().getFullYear() }} SHAPeS. Using
                    <a class="text-cyan-400 underline" href="https://vuejs.org" target="_blank"
                        >Vue 3</a
                    >
                </p>
            </div>
        </footer>
    </div>
</template>
