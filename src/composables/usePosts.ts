import { ref, computed } from 'vue'
import type { Post } from '../types'

export function usePosts(postsData: Post[]): {
    posts: import('vue').Ref<Post[]>
    tags: import('vue').ComputedRef<string[]>
} {
    const posts = ref(postsData.filter((p) => !p.draft))

    const tags = computed(() => {
        const allTags = posts.value.flatMap((p) => p.tags)
        return [...new Set(allTags)].sort()
    })

    return { posts, tags }
}
