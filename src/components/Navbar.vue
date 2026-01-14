<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const isMenuOpen = ref(false)

const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'GitHub', path: 'https://github.com/SHAPeS-software', external: true }
]

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
    <header
        class="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95"
    >
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <router-link
                    to="/"
                    class="text-xl font-bold text-zinc-900 transition-colors duration-150 hover:text-cyan-500 dark:text-zinc-100 dark:hover:text-cyan-400"
                >
                    SHAPeS Page
                </router-link>

                <nav class="hidden md:flex md:items-center md:gap-1">
                    <router-link
                        v-for="link in navLinks.filter((l) => !l.external)"
                        :key="link.name"
                        :to="link.path"
                        class="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-cyan-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-cyan-400"
                        active-class="!text-cyan-500 dark:!text-cyan-400"
                    >
                        {{ link.name }}
                    </router-link>
                    <a
                        v-for="link in navLinks.filter((l) => l.external)"
                        :key="link.name"
                        :href="link.path"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-cyan-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-cyan-400"
                    >
                        {{ link.name }}
                    </a>
                    <ThemeToggle />
                </nav>

                <div class="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        @click="toggleMenu"
                        class="rounded-lg bg-zinc-100 p-2 text-zinc-600 transition-colors duration-150 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
                    >
                        <svg
                            v-if="!isMenuOpen"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-5 w-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-5 w-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
        >
            <nav
                v-if="isMenuOpen"
                class="border-t border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
            >
                <div class="flex flex-col gap-1">
                    <router-link
                        v-for="link in navLinks.filter((l) => !l.external)"
                        :key="link.name"
                        :to="link.path"
                        class="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-cyan-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-cyan-400"
                        active-class="!text-cyan-500 dark:!text-cyan-400"
                        @click="isMenuOpen = false"
                    >
                        {{ link.name }}
                    </router-link>
                    <a
                        v-for="link in navLinks.filter((l) => l.external)"
                        :key="link.name"
                        :href="link.path"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-cyan-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-cyan-400"
                        @click="isMenuOpen = false"
                    >
                        {{ link.name }}
                    </a>
                </div>
            </nav>
        </Transition>
    </header>
</template>
