import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import type { Post } from '../types'

export function useSearch(posts: Post[]): {
    query: import('vue').Ref<string>
    results: import('vue').ComputedRef<Post[]>
} {
    const query = ref('')

    const fuse = new Fuse(posts, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.4,
        includeMatches: true
    })

    const results = computed(() => {
        if (!query.value.trim()) return posts
        return fuse.search(query.value).map((r) => r.item)
    })

    return { query, results }
}
