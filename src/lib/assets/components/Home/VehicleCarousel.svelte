<script lang="ts">
	import { baseUrl } from '$lib/index';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import VehicleCard from '../VehicleCard.svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { Vehicle, Yacht, VehicleTag, YachtTag, YachtPricing } from '$lib/types';
	import { theme } from '$lib/stores/theme';
	import { page } from '$app/stores';

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

	// Function to build the vehicle/yacht link with all required parameters
	function buildItemLink(item: Vehicle | Yacht): string {
		const urlType = itemType === 'car' ? 'vehicle' : 'yacht';
		const baseLink = `/${urlType}/${item.id}`;

		// Get current URL parameters
		const currentUrl = $page.url;
		const pickupDate = currentUrl.searchParams.get('pickupDate') || '';
		const dropoffDate = currentUrl.searchParams.get('dropoffDate') || '';
		const location = currentUrl.searchParams.get('location') || '';

		// Build query parameters
		const params = new URLSearchParams();

		// Always add userId if available
		params.set('userId', item.userId);

		// Add vehicleType
		params.set('vehicleType', itemType === 'car' ? 'car' : 'yacht');

		// Add optional parameters only if they exist
		params.set('pickupDate', pickupDate);

		params.set('dropoffDate', dropoffDate);

		params.set('location', location);

		const queryString = params.toString();
		return queryString ? `${baseLink}?${queryString}` : baseLink;
	}
</script>

<div
	class="w-full {itemType === 'yacht' && $theme === 'dark' ? 'bg-gradient-to-br' : ''} 
	{itemType === 'yacht' && $theme === 'dark' ? 'from-[#1C1C1C] via-[#1e1e1e] to-[#141414]' : ''}
	{itemType === 'yacht' && $theme === 'light' ? 'bg-white' : ''}
	{$theme === 'dark' && itemType !== 'yacht' ? 'bg-transparent' : ''}
	{$theme === 'light' && itemType !== 'yacht' ? 'bg-white' : ''}">
	<div class="max-w-8xl container mx-auto px-4 sm:py-16">
		{#if visible}
			<h3
				in:fly={{ y: 30, duration: 200, delay: 50 }}
				class="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl {$theme ===
				'dark'
					? 'text-white'
					: 'text-black'}">
				{title}
			</h3>
			<div class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each items as item, index}
					{#if itemType === 'car' ? index < 8 : index < 4}
						<div in:fly={{ y: 30, duration: 200, delay: 100 + index * 50 }}>
							<VehicleCard
								{item}
								{itemType}
								href={buildItemLink(item)}
							/>
						</div>
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
