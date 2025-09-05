import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
    if (!browser) return 'dark';
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Create the theme store
const theme = writable<Theme>(getInitialTheme());

// Subscribe to theme changes and update localStorage and document class
if (browser) {
    // Align store with the class set early in app.html to avoid post-hydration flips
    const root = document.documentElement;
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';

    // Ensure the store reflects the actual DOM theme immediately
    theme.set(initialTheme);

    // Ensure the class is present/absent (no-op if already correct)
    if (initialTheme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    theme.subscribe((value) => {
        localStorage.setItem('theme', value);
        if (value === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    });
}

// Function to toggle theme
function toggleTheme() {
    theme.update(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
}

export { theme, toggleTheme }; 