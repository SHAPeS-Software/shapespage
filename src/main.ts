import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import type { PostCollection } from './types'

let postsData: PostCollection = { posts: [], tags: [] }

async function loadPosts(): Promise<PostCollection> {
    try {
        const response = await fetch('/shapespage/assets/posts.json')
        if (response.ok) {
            return await response.json()
        }
    } catch {
        console.warn('posts.json not found, using empty data')
    }
    return { posts: [], tags: [] }
}

loadPosts().then((data) => {
    postsData = data

    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: '/',
                name: 'home',
                component: HomeView
            },
            {
                path: '/posts/:slug',
                name: 'post',
                component: () => import('./views/PostView.vue')
            },
            {
                path: '/tags/:tag',
                name: 'tag',
                component: () => import('./views/TagView.vue')
            }
        ]
    })

    const app = createApp(App, { postsData })
    app.use(router)
    app.mount('#app')
})
