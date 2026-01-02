<script lang="ts">
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import VehicleCardUpdated from './VehicleCardUpdated.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { Vehicle, Yacht } from '$lib/types';
	import { theme } from '$lib/stores/theme';

	interface Props {
		items?: Vehicle[] | Yacht[];
		title?: string;
		viewAllLink?: string;
		itemType?: 'car' | 'yacht';
	}

	let { items = [], title = '', viewAllLink = '', itemType = 'car' }: Props = $props();

	let visible = $state(false);
	onMount(() => {
		visible = true;
	});
</script>

<div
	class="w-full {itemType === 'yacht' && $theme === 'dark' ? 'bg-[#2A3236]' : ''}
	{itemType === 'yacht' && $theme === 'light' ? 'bg-white' : ''}
	{$theme === 'dark' && itemType !== 'yacht' ? 'bg-transparent' : ''}
	{$theme === 'light' && itemType !== 'yacht' ? 'bg-white' : ''}">
	<div class="max-w-8xl container mx-auto px-4 sm:py-8 py-8">
		{#if visible}
			<h3
				in:fly={{ y: 30, duration: 200, delay: 50 }}
				class="py-8 text-center tracking-tight text-4xl md:text-5xl font-bold leading-tight {$theme ===
				'dark'
					? 'text-white'
					: 'text-black'}">
				{title}
			</h3>
			<div class="my-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each items as item, index}
					{#if itemType === 'car' ? index < 8 : index < 4}
						<VehicleCardUpdated {item} {itemType} {index} />
					{/if}
				{/each}
			</div>
			<div in:fly={{ y: 30, duration: 200, delay: 400 }} class="flex justify-center">
				<SecondaryButton
					href={viewAllLink}
					type="submit"
					text="View All"
					colorScheme={$theme === 'dark' ? 'dark' : 'light'} />
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.carousel-item) {
		transition: transform 0.5s ease-in-out !important;
	}
</style>
