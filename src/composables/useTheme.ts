import { ref, onMounted, onUnmounted } from 'vue'

export function useTheme(): {
    isDark: import('vue').Ref<boolean>
    toggleTheme: () => void
    hasUserPreference: import('vue').Ref<boolean>
} {
    const isDark = ref(true)
    const hasUserPreference = ref(false)
    let mediaQuery: MediaQueryList | null = null

    function getInitialTheme(): { isDark: boolean; hasPreference: boolean } {
        const saved = localStorage.getItem('theme')
        if (saved) {
            return { isDark: saved === 'dark', hasPreference: true }
        }
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return { isDark: prefersDark, hasPreference: false }
    }

    function applyTheme(dark: boolean) {
        if (dark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }

    function handleSystemChange(e: MediaQueryListEvent) {
        if (!hasUserPreference.value) {
            isDark.value = e.matches
            applyTheme(isDark.value)
        }
    }

    onMounted(() => {
        const { isDark: initialDark, hasPreference } = getInitialTheme()
        isDark.value = initialDark
        hasUserPreference.value = hasPreference
        applyTheme(isDark.value)

        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', handleSystemChange)
    })

    onUnmounted(() => {
        mediaQuery?.removeEventListener('change', handleSystemChange)
    })

    function toggleTheme() {
        hasUserPreference.value = true
        isDark.value = !isDark.value
        applyTheme(isDark.value)
        return isDark.value
    }

    return { isDark, toggleTheme, hasUserPreference }
}
