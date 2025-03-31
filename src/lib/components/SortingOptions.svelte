<script lang="ts">
    import { theme } from '$lib/stores/theme';
    export let onSort: (sortOption: string) => void;
    export let currentSort: string = 'default';

    const sortOptions = [
        { value: 'default', label: 'Default' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' }
    ];

    function handleSort(event: Event) {
        const select = event.target as HTMLSelectElement;
        onSort(select.value);
    }
</script>

<style>
    select {
        appearance: none;
    }
    select:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
    }
    select::-ms-expand {
        display: none;
    }
</style>

<div class="flex items-center space-x-2">
    <label for="sort" class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-accent'}">Sort by:</label>
    <div class="relative">
        <select
            id="sort"
            class="w-full rounded-lg border {$theme === 'dark' ? 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10' : 'border-primary-accent/20 bg-primary-accent/5 text-primary-accent hover:border-primary-accent/40 hover:bg-primary-accent/10'} px-4 py-2 pr-10 transition-all focus:border-[#7ed4ac] focus:outline-none focus:ring-1 focus:ring-[#7ed4ac]"
            on:change={handleSort}
            value={currentSort}
            style:background-color={$theme === 'dark' ? '#1C1C1C' : 'white'}
        >
            {#each sortOptions as option}
                <option value={option.value} class="{$theme === 'dark' ? 'bg-[#1C1C1C] text-primary-accent' : 'bg-white text-primary-accent'}">{option.label}</option>
            {/each}
        </select>
        <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg class="h-4 w-4 {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent/70'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
</div> 