<script lang="ts">
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

<style lang="postcss">
    select {
        @apply appearance-none bg-[#1c1c1c] text-white;
    }
    select option {
        @apply bg-[#1c1c1c] text-white;
    }
    /* For Firefox */
    select:-moz-focusring {
        @apply text-transparent shadow-none;
    }
    /* For Webkit browsers */
    select::-ms-expand {
        @apply hidden;
    }
</style>

<div class="flex items-center space-x-2">
    <label for="sort" class="text-gray-300">Sort by:</label>
    <div class="relative">
        <select
            id="sort"
            class="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 pr-10 text-white transition-all hover:border-white/40 hover:bg-white/10 focus:border-[#0bd3d3] focus:outline-none focus:ring-1 focus:ring-[#0bd3d3]"
            on:change={handleSort}
            value={currentSort}
        >
            {#each sortOptions as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
        <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg class="h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
</div> 