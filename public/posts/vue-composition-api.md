+++
title = "Understanding Vue 3 Composition API"
description = "A deep dive into the Composition API and how it improves code organization in Vue 3."
date = 2026-01-10T00:00:00Z
tags = ["vue", "javascript", "tutorial"]
author = "SHAPeS"
+++

## What's the Composition API?

The Composition API is a set of APIs that allows you to write Vue components using imported functions instead of declaring options.

## Why Use It?

### Better Code Organization

Instead of grouping code by option type (data, methods, computed), you can group by logical concern:

```typescript
// Before (Options API)
export default {
    data() {
        return { count: 0 }
    },
    methods: {
        increment() {
            this.count++
        }
    },
    computed: {
        doubled() {
            return this.count * 2
        }
    }
}

// After (Composition API)
export default {
    setup() {
        const count = ref(0)

        function increment() {
            count.value++
        }

        const doubled = computed(() => count.value * 2)

        return { count, increment, doubled }
    }
}
```

### Improved Type Inference

The Composition API works much better with TypeScript. No more type magic with `this`.

### Logic Reuse

Extract and reuse logic across components:

```typescript
// composables/useMouse.ts
export function useMouse() {
    const x = ref(0)
    const y = ref(0)

    function update(event) {
        x.value = event.clientX
        y.value = event.clientY
    }

    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    return { x, y }
}
```

## Core Functions

### ref()

Creates a reactive reference:

```typescript
const count = ref(0)
count.value // Access value
```

### computed()

Creates a computed property:

```typescript
const doubled = computed(() => count.value * 2)
```

### watch() / watchEffect()

Reactive effects:

```typescript
watch(count, (newVal) => {
    console.log(`Count changed to ${newVal}`)
})

watchEffect(() => {
    console.log(`Count is ${count.value}`)
})
```

## Best Practices

1. Use `<script setup>` for cleaner syntax
2. Keep composables focused and small
3. Name composables with `use` prefix
4. Return only what's needed

The Composition API is a game-changer for Vue development!
