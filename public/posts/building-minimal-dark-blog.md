+++
title = "Building a Minimal Dark Blog with Vue 3 and Tailwind"
description = "How I built SHAPeS Page using Vue 3, Vite, Tailwind CSS v4, and TypeScript."
date = 2026-01-13T00:00:00Z
tags = ["vue", "tailwind", "typescript"]
author = "SHAPeS"
+++

## Introduction

Building a blog from scratch is one of the best ways to learn modern web development. In this post, I'll share how I built **SHAPeS Page** using a minimal tech stack that prioritizes performance and developer experience.

## The Tech Stack

Here's what I chose:

- **Vue 3** with Composition API for reactive UI
- **Vite** for lightning-fast builds
- **Tailwind CSS v4** for styling
- **TypeScript** for type safety
- **Shiki** for syntax highlighting
- **Fuse.js** for client-side search

## Why This Stack?

### Vue 3 + Composition API

The Composition API makes code organization much cleaner. Logic can be extracted into composables and reused across components:

```typescript
export function useTheme() {
    const isDark = ref(true)

    function toggleTheme() {
        isDark.value = !isDark.value
    }

    return { isDark, toggleTheme }
}
```

### Tailwind CSS v4

Tailwind v4 takes a CSS-first approach, making configuration simpler:

```css
@theme {
    --color-cyan-400: #22d3ee;
}

.btn-primary {
    @apply bg-cyan-500 text-white;
}
```

## Key Features

### Dark Mode

The blog supports dark mode with a smooth transition:

- Respects system preference by default
- Persists user choice in localStorage
- Smooth 300ms transitions

### Syntax Highlighting

Code blocks are highlighted at build time using **Shiki**:

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`)
}
```

### Search

Full-text search powered by **Fuse.js** with fuzzy matching:

- Instant results as you type
- Searches titles, descriptions, and tags
- Keyboard shortcut support (Cmd+K)

## Performance Optimizations

1. **Static Build**: All posts are pre-rendered to HTML
2. **Zero Runtime Markdown**: No client-side markdown parsing
3. **Code Splitting**: Routes are lazy-loaded
4. **System Fonts**: No font loading overhead

## Conclusion

Building SHAPeS Page was a great experience. The combination of Vue 3, Vite, and Tailwind v4 provides an excellent developer experience while delivering a fast, accessible blog.

Happy coding!
