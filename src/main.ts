import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import type { PostCollection } from './types'
import pkgjson from '../package.json' assert { type: 'json' };

let postsData: PostCollection = { posts: [], tags: [] }
const debug = pkgjson.debug ?? false;

async function loadPosts(): Promise<PostCollection> {
    try {
        if (!debug) {
            const response = await fetch('/shapespage/assets/posts.json')
            if (response.ok) {
                return await response.json()
            }
        } else {
            console.warn("Currently in Debug mode!")
            const response = await fetch('./public/posts.json')
            if (response.ok) {
                return await response.json()
            }
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
                path: '/about',
                name: 'about',
                component: () => import('./views/AboutView.vue')
            },
            {
                path: '/contact',
                name: 'contact',
                component: () => import('./views/ContactView.vue')
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
    
console.log(` _______  __   __  _______  _______  _______  _______ 
|       ||  | |  ||   _   ||       ||       ||       |
|  _____||  |_|  ||  |_|  ||    _  ||    ___||  _____|
| |_____ |       ||       ||   |_| ||   |___ | |_____ 
|_____  ||       ||       ||    ___||    ___||_____  |
 _____| ||   _   ||   _   ||   |    |   |___  _____| |
|_______||__| |__||__| |__||___|    |_______||_______|
Software `)
})
