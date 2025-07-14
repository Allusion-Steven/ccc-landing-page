<script lang="ts">
	import { baseUrl } from '$lib/index';
	import { Carousel, Input, Modal, Button } from 'flowbite-svelte';
	import { fade, scale, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import SortingOptions from '$lib/components/SortingOptions.svelte';
	import { theme } from '$lib/stores/theme';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		getUniqueTypes,
		getMinMaxPrice,
		getMinMaxYear,
		filterItems,
		isAnyFilterActive as checkFiltersActive
	} from '$lib/utils/filtering';

	//TODO: PROBABLY FIX THIS AND MAKE IMAGES BETTER
	// Function to detect if an image is portrait and get appropriate object positioning
	function getImageObjectPosition(imageUrl: string): Promise<string> {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				// If image is portrait (height > width), position it to show top portion
				if (img.height > img.width) {
					resolve('object-top');
				} else {
					resolve('object-center');
				}
			};
			img.onerror = () => {
				resolve('object-center'); // Default fallback
			};
			img.src = imageUrl;
		});
	}

	// Store for image positions
	let imagePositions = $state<Record<string, string>>({});

	let { data }: { data: PageData } = $props();
	const { pickupDate: initialPickupDate, dropoffDate: initialDropoffDate, location: initialLocation, vehicles } = data;

	let currentSort = $state('default');

	// Initialize pickupDate, dropoffDate, and location with data from URL or defaults
	let pickupDate = $state(initialPickupDate || '');
	let dropoffDate = $state(initialDropoffDate || '');
	let location = $state(initialLocation || 'Miami, FL');

	// Calculate minimum date (24 hours from now)
	const minPickupDate = $derived(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

	// Handle URL parameters when the page loads
	$effect(() => {
		const searchParams = $page.url.searchParams;
		location = searchParams.get('location') || initialLocation || 'Miami, FL';
		pickupDate = searchParams.get('pickupDate') || initialPickupDate;
		dropoffDate = searchParams.get('dropoffDate') || initialDropoffDate;
	});

	// Filter states
	let searchQuery = $state('');
	let maxPrice = $state(0);
	let minYear = $state(0);
	let maxYear = $state(0);
	let showFiltersModal = $state(false);

	// Get unique tags from vehicles array
	const vehicleTypes = getUniqueTypes(vehicles);
	let selectedTypes = $state<string[]>([]);

	// Get min and max values for the filters
	const { min: minPriceAvailable, max: maxPriceAvailable } = getMinMaxPrice(vehicles);
	const { min: minYearAvailable, max: maxYearAvailable } = getMinMaxYear(vehicles);

	// Initialize filters to their full ranges
	maxPrice = maxPriceAvailable;
	minYear = minYearAvailable;
	maxYear = maxYearAvailable;

	// Update filteredVehicles to include sorting (location filtering now handled server-side)
	const filteredVehicles = $derived(filterItems(
		vehicles,
		searchQuery,
		maxPrice,
		selectedTypes,
		currentSort,
		(vehicle) => vehicle.year >= minYear && vehicle.year <= maxYear
	));

	// Check if any filters are active
	const isAnyFilterActive = $derived(checkFiltersActive(
		searchQuery,
		maxPrice,
		maxPriceAvailable,
		selectedTypes,
		{
			yearRange: minYear !== minYearAvailable || maxYear !== maxYearAvailable
		}
	));

	// Clear filters function
	function clearFilters() {
		searchQuery = '';
		maxPrice = maxPriceAvailable;
		minYear = minYearAvailable;
		maxYear = maxYearAvailable;
		selectedTypes = [];
		currentSort = 'default';
		// Keep date and location values
		updateURL();
	}

	function handleSort(sortOption: string) {
		currentSort = sortOption;
	}

	// Update URL with date parameters
	function updateURL() {
		const url = new URL(window.location.href);
		
		// Update or remove parameters
		if (pickupDate) {
			url.searchParams.set('pickupDate', pickupDate);
		} else {
			url.searchParams.delete('pickupDate');
		}
		
		if (dropoffDate) {
			url.searchParams.set('dropoffDate', dropoffDate);
		} else {
			url.searchParams.delete('dropoffDate');
		}
		
		if (location) {
			url.searchParams.set('location', location);
		} else {
			url.searchParams.delete('location');
		}
		
		// Update browser history without full page reload
		goto(url.toString(), { replaceState: true, keepFocus: true, noScroll: true });
	}

	// Handle date changes
	function handleDateChange() {
		// Validate pickup date is not before minimum date
		if (pickupDate && pickupDate < minPickupDate) {
			pickupDate = minPickupDate;
		}
		
		// Validate dropoff date is not before pickup date
		if (dropoffDate && pickupDate && dropoffDate < pickupDate) {
			dropoffDate = pickupDate;
		}
		
		updateURL();
	}

	// Search button states
	let isLocationSearching = $state(false);
	let locationChanged = $state(false);
	
	// Track location changes
	$effect(() => {
		if (location !== initialLocation) {
			locationChanged = true;
		}
	});

	// Handle location changes - trigger page navigation to refetch data
	function handleLocationChange() {
		isLocationSearching = true;
		const url = new URL(window.location.href);
		
		// Update parameters
		if (pickupDate) {
			url.searchParams.set('pickupDate', pickupDate);
		} else {
			url.searchParams.delete('pickupDate');
		}
		
		if (dropoffDate) {
			url.searchParams.set('dropoffDate', dropoffDate);
		} else {
			url.searchParams.delete('dropoffDate');
		}
		
		if (location) {
			url.searchParams.set('location', location);
		} else {
			url.searchParams.delete('location');
		}
		
		// Navigate to trigger server refetch
		window.location.href = url.toString();
	}

	// Preload image positions when component mounts
	onMount(async () => {
		for (const vehicle of vehicles) {
			if (vehicle.images && vehicle.images.length > 0) {
				const firstImage = vehicle.images.find((img: any) => img.isActive) || vehicle.images[0];
				if (firstImage) {
					const imageUrl = firstImage.urls?.large || firstImage.url || '';
					if (imageUrl) {
						imagePositions[vehicle.id] = await getImageObjectPosition(imageUrl);
					}
				}
			}
		}
	});
</script>

<svelte:head>
	<title>Available Vehicles | Macro Exotics</title>
	<meta
		name="description"
		content="Browse our collection of luxury vehicles available for rent in Miami. From supercars to luxury SUVs, find your perfect ride at Macro Exotics." />
	<meta name="title" content="Available Vehicles | Macro Exotics" />
	<meta
		name="keywords"
		content="Luxury Car Rental, Miami, Exotic Cars, Supercars, Macro Exotics" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1C1C1C" />

	<meta property="og:title" content="Available Vehicles | Macro Exotics" />
	<meta
		property="og:description"
		content="Browse our collection of luxury vehicles available for rent in Miami. From supercars to luxury SUVs, find your perfect ride at Macro Exotics." />
	<meta property="og:url" content="https://macroexotics.com/vehicles" />
	<meta property="og:image" content="https://macroexotics.com/logo-square-768.png" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Macro Exotics" />
	<link rel="canonical" href="https://macroexotics.com/vehicles" />
</svelte:head>

<!-- TODO: Fetch all vehicles from the database -->
<div class="container mx-auto px-4 py-8">
	<h1
		class="mb-8 text-center text-4xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">
		Available Vehicles
	</h1>

	<div class="mb-6 flex sm:justify-end">
		<SortingOptions onSort={handleSort} {currentSort} />
	</div>

	<div class="flex flex-col gap-8 lg:flex-row">
		<!-- Mobile Search and Filters -->
		<div class="flex flex-col gap-4 lg:hidden">
			<!-- Mobile Search Input -->
			<div class="relative w-full">
				<div class="absolute right-4 top-1/2 z-10 -translate-y-1/2">
					<svg
						class="h-5 w-5 {$theme === 'dark' ? 'text-white/70' : 'text-gray-500'}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
				<Input
					id="search-mobile"
					type="text"
					placeholder="Search by make or model..."
					bind:value={searchQuery}
					class="!h-12 w-full !rounded-2xl {$theme === 'dark' 
					? '!border-transparent !bg-white/10 dark:text-white dark:placeholder-white/50' 
					: '!border-transparent !bg-gray-100 text-gray-800 placeholder-gray-500'}" />
			</div>
			<!-- Mobile Filter Button -->
			<Button color={$theme === 'dark' ? 'dark' : 'light'} class="w-full" on:click={() => (showFiltersModal = true)}>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
					></path>
				</svg>
				Filters
				{#if isAnyFilterActive}
					<span class="ml-2 rounded-full bg-[#0bd3d3] px-2 py-0.5 text-xs text-black"
						>Active</span>
				{/if}
			</Button>
		</div>

		<!-- Filters Modal for Mobile -->
		{#if showFiltersModal}
			<div
				class="fixed inset-0 z-[60] {$theme === 'dark' ? 'bg-black/50' : 'bg-gray-800/50'} backdrop-blur-sm transition-opacity"
				on:click={() => (showFiltersModal = false)}
				on:keydown={(e) => e.key === 'Escape' && (showFiltersModal = false)}
				role="button"
				tabindex="0">
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					class="fixed right-0 top-0 h-full w-[90%] max-w-md transform overflow-y-auto {$theme === 'dark' ? 'bg-[#1c1c1c]' : 'bg-white'} p-6 shadow-xl transition-transform duration-300"
					on:click|stopPropagation
					on:keydown|stopPropagation
					role="dialog"
					tabindex="-1"
					transition:fly={{ x: 300, duration: 300 }}>
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-bold {$theme === 'dark' ? 'text-white' : 'text-gray-800'}">Filters</h3>
						<button
							class="rounded-lg p-2 {$theme === 'dark' ? 'text-white/70 hover:bg-white/10' : 'text-primary-accent hover:bg-gray-100'}"
							on:click={() => (showFiltersModal = false)}
							aria-label="Close filters">
							<svg
								class="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="flex flex-col gap-6">
						<!-- Date Range Selector for Mobile -->
						<div class="w-full">
							<label class="mb-2 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
								>Rental Dates</label>
							<div class="flex flex-col space-y-3">
								<div>
									<label class="text-xs {$theme === 'dark' ? 'text-white/50' : 'text-gray-600'}">Pickup Location</label>
									<div class="flex gap-2">
										<select
											id="location-mobile"
											bind:value={location}
											class="flex-1 mt-1 rounded-lg border {$theme === 'dark' 
											? 'border-white/20 bg-white/5 text-white' 
											: 'border-gray-300 bg-white text-gray-800'} px-3 py-2 text-sm">
											<option value="Miami, FL" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">Miami, FL</option>
											<option value="Tampa, FL" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">Tampa, FL</option>
											<option value="New York, NY" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">New York, NY</option>
											<option value="Charleston, SC" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">Charleston, SC</option>
										</select>
																			<button
										on:click={handleLocationChange}
										disabled={isLocationSearching}
										class="mt-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 {
											isLocationSearching 
												? 'bg-gray-400 cursor-not-allowed text-white' 
												: locationChanged 
													? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] animate-pulse text-white' 
													: `${$theme === 'dark' ? 'bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]' : 'bg-primary-accent text-white shadow-[0_0_20px_rgba(194,63,91,0.3)] hover:shadow-[0_0_15px_rgba(194,63,91,0.4)]'}`
										}">
											{#if isLocationSearching}
												<div class="flex items-center gap-2">
													<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
													Loading...
												</div>
											{:else if locationChanged}
												<div class="flex items-center gap-1">
													<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
													</svg>
													Update
												</div>
											{:else}
												Search
											{/if}
										</button>
									</div>
								</div>
								<div>
									<label class="text-xs {$theme === 'dark' ? 'text-white/50' : 'text-gray-600'}">Pickup Date</label>
									<input 
										type="date" 
										bind:value={pickupDate} 
										on:change={handleDateChange}
										on:blur={handleDateChange}
										min={minPickupDate}
										class="mt-1 w-full rounded-lg border {$theme === 'dark' 
											? 'border-white/20 bg-white/5 text-white placeholder-white/50' 
											: 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'} px-3 py-2 text-sm" />
								</div>
								<div>
									<label class="text-xs {$theme === 'dark' ? 'text-white/50' : 'text-gray-600'}">Dropoff Date</label>
									<input 
										type="date" 
										bind:value={dropoffDate} 
										on:change={handleDateChange}
										on:blur={handleDateChange}
										min={pickupDate}
										class="mt-1 w-full rounded-lg border {$theme === 'dark' 
											? 'border-white/20 bg-white/5 text-white placeholder-white/50' 
											: 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'} px-3 py-2 text-sm" />
								</div>
							</div>
						</div>

						<!-- Price Range -->
						<div class="w-full">
							<label
								for="price-range-mobile"
								class="mb-2 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}">
								Maximum Price ($/day)
							</label>
							<input
								type="range"
								id="price-range-mobile"
								min={minPriceAvailable}
								max={maxPriceAvailable}
								bind:value={maxPrice}
								class="w-full" />
							<div class="mt-2 flex justify-between text-sm {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}">
								<span>${new Intl.NumberFormat('en-US').format(minPriceAvailable)}</span>
								<span>${new Intl.NumberFormat('en-US').format(maxPrice)}</span>
							</div>
						</div>

						<!-- Year Range -->
						<div class="w-full">
							<label class="mb-2 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
								>Year Range</label>
							<input
								type="range"
								id="year-range-mobile"
								min={minYearAvailable}
								max={maxYearAvailable}
								bind:value={minYear}
								class="w-full" />
							<div class="mt-2 flex justify-between text-sm {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}">
								<span>{minYear}</span>
								<span>{maxYear}</span>
							</div>
						</div>

						<!-- Vehicle Type -->
						<div class="w-full">
							<label class="mb-3 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
								>Vehicle Type</label>
							<div class="flex flex-wrap gap-3">
								{#each vehicleTypes as type}
									<label class="group cursor-pointer">
										<input
											type="checkbox"
											bind:group={selectedTypes}
											value={type}
											class="peer hidden" />
										<div
											class="flex items-center rounded-full {$theme === 'dark'
												? 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
												: 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'} border px-4 py-2 transition-all peer-checked:border-[#0bd3d3] peer-checked:bg-[#0bd3d3]/10">
											<span
												class="capitalize text-sm {$theme === 'dark'
													? 'text-white/70 group-hover:text-white'
													: 'text-gray-700 group-hover:text-gray-900'} transition-colors peer-checked:text-[#0bd3d3]">
												{type}
											</span>
										</div>
									</label>
								{/each}
							</div>
						</div>

						<!-- Apply Filters Button -->
						<div class="mt-auto flex justify-end gap-4">
							{#if isAnyFilterActive}
								<Button color={$theme === 'dark' ? 'dark' : 'light'} on:click={clearFilters}>Clear All</Button>
							{/if}
							<Button color="primary" on:click={() => {
								// Always update URL to ensure date and location are included
								updateURL();
								showFiltersModal = false;
							}}>
								Apply Filters
							</Button>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Filters sidebar (desktop) -->
		<div class="hidden lg:block lg:w-80">
			<div class="sticky top-8 rounded-2xl {$theme === 'dark' 
				? 'bg-white/10 dark:shadow-none' 
				: 'bg-gray-100 shadow-md'} p-6 backdrop-blur-sm">
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-xl font-semibold {$theme === 'dark' ? 'text-white' : 'text-gray-800'}">Filters</h2>
					{#if isAnyFilterActive}
						<button
							on:click={clearFilters}
							class="text-sm text-[#0bd3d3] transition-colors hover:text-[#0bd3d3]/80">
							Clear All
						</button>
					{/if}
				</div>
				<div class="flex flex-col gap-8">
					<!-- Search input -->
					<div class="relative w-full">
						<div class="absolute right-4 top-1/2 z-10 -translate-y-1/2">
							<svg
								class="h-5 w-5 {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<Input
							id="search"
							type="text"
							placeholder="Search by make or model..."
							bind:value={searchQuery}
							class="!h-12 w-full !rounded-2xl !border-transparent {$theme === 'dark' 
								? '!bg-white/10 dark:text-white dark:placeholder-white/50' 
								: '!bg-white text-gray-800 placeholder-gray-500'}" />
					</div>

					<!-- Date Range Selector -->
					<div class="w-full">
						<label class="mb-2 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
							>Rental Dates</label>
						<div class="flex flex-col space-y-3">
							<div>
								<label class="text-xs {$theme === 'dark' ? 'text-white/50' : 'text-gray-600'}">Pickup Location</label>
								<div class="flex gap-2">
									<select
										id="location-desktop"
										bind:value={location}
										class="flex-1 mt-1 rounded-lg border {$theme === 'dark' 
										? 'border-white/20 bg-white/5 text-white' 
										: 'border-gray-300 bg-white text-gray-800'} px-3 py-2 text-sm">
										<option value="Miami, FL" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">Miami, FL</option>
										<option value="Tampa, FL" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">Tampa, FL</option>
										<option value="New York, NY" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">New York, NY</option>
										<option value="Charleston, SC" class="{$theme === 'dark' ? 'bg-gray-800' : 'bg-white'}">Charleston, SC</option>
									</select>
									<button
										on:click={handleLocationChange}
										disabled={isLocationSearching}
										class="mt-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 {
											isLocationSearching 
												? 'bg-gray-400 cursor-not-allowed text-white' 
												: locationChanged 
													? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] animate-pulse text-white' 
													: `${$theme === 'dark' ? 'bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]' : 'bg-primary-accent text-white shadow-[0_0_20px_rgba(194,63,91,0.3)] hover:shadow-[0_0_15px_rgba(194,63,91,0.4)]'}`
										}">
										{#if isLocationSearching}
											<div class="flex items-center gap-2">
												<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
												Loading...
											</div>
										{:else if locationChanged}
											<div class="flex items-center gap-1">
												<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
												</svg>
												Update
											</div>
										{:else}
											Search
										{/if}
									</button>
								</div>
							</div>
							<div>
								<label class="text-xs {$theme === 'dark' ? 'text-white/50' : 'text-gray-600'}">Pickup Date</label>
								<input 
									type="date" 
									bind:value={pickupDate} 
									on:change={handleDateChange}
									on:blur={handleDateChange}
									min={minPickupDate}
									class="mt-1 w-full rounded-lg border {$theme === 'dark' 
										? 'border-white/20 bg-white/5 text-white placeholder-white/50' 
										: 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'} px-3 py-2 text-sm" />
							</div>
							<div>
								<label class="text-xs {$theme === 'dark' ? 'text-white/50' : 'text-gray-600'}">Dropoff Date</label>
								<input 
									type="date" 
									bind:value={dropoffDate} 
									on:change={handleDateChange}
									on:blur={handleDateChange}
									min={pickupDate}
									class="mt-1 w-full rounded-lg border {$theme === 'dark' 
										? 'border-white/20 bg-white/5 text-white placeholder-white/50' 
										: 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'} px-3 py-2 text-sm" />
							</div>
						</div>
					</div>

					<!-- Price Range -->
					<div class="w-full">
						<label class="mb-2 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
							>Maximum Price ($/day)</label>
						<input
							type="range"
							id="price-range"
							min={minPriceAvailable}
							max={maxPriceAvailable}
							bind:value={maxPrice}
							class="w-full" />
						<div class="mt-2 flex justify-between text-sm {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}">
							<span>${new Intl.NumberFormat('en-US').format(minPriceAvailable)}</span>
							<span>${new Intl.NumberFormat('en-US').format(maxPrice)}</span>
						</div>
					</div>

					<!-- Year Range -->
					<div class="w-full">
						<label class="mb-2 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
							>Year Range</label>
						<input
							type="range"
							id="year-range"
							min={minYearAvailable}
							max={maxYearAvailable}
							bind:value={minYear}
							class="w-full" />
						<div class="mt-2 flex justify-between text-sm {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}">
							<span>{minYear}</span>
							<span>{maxYear}</span>
						</div>
					</div>

					<!-- Vehicle Type -->
					<div class="w-full">
						<label class="mb-3 block text-sm font-medium {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent'}"
							>Vehicle Type</label>
						<div class="flex flex-wrap gap-3">
							{#each vehicleTypes as type}
								<label class="group cursor-pointer">
									<input
										type="checkbox"
										bind:group={selectedTypes}
										value={type}
										class="peer hidden" />
									<div
										class="flex items-center rounded-full {$theme === 'dark'
											? 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
											: 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'} border px-4 py-2 transition-all
											   peer-checked:border-[#0bd3d3] peer-checked:bg-[#0bd3d3]/10">
										<span
											class="capitalize text-sm {$theme === 'dark'
												? 'text-white/70 group-hover:text-white'
												: 'text-gray-700 group-hover:text-gray-900'} transition-colors peer-checked:text-[#0bd3d3]">
											{type}
										</span>
									</div>
								</label>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Vehicle grid -->
		<div class="flex-1">
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
				{#each filteredVehicles as vehicle (vehicle.id)}
					<div animate:flip={{ duration: 300 }}>
						<a
							in:scale={{ duration: 300, start: 0.95 }}
							out:fade={{ duration: 200 }}
							href={`/vehicle/${vehicle.id}?userId=${vehicle.userId}&${new URLSearchParams(
								{
									...(pickupDate ? { pickupDate } : {}),
									...(dropoffDate ? { dropoffDate } : {}),
									...(location ? { location } : {})
								}
							).toString()}`}
							class="group relative block h-80 w-full transform overflow-hidden rounded-xl {$theme === 'dark' 
								? 'bg-white/5 dark:shadow-xl' 
								: 'bg-gray-100 shadow-lg'} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div class="aspect-[16/10] w-full overflow-hidden">
								{#if vehicle.images && vehicle.images.length > 0}
									{#if vehicle.images.filter((img) => img.isActive).length > 1}
										<Carousel
											class="pointer-events-none z-10"
											duration={Math.floor(
												Math.random() * (5000 - 3000 + 1)
											) + 3000}

											images={vehicle.images
												.filter((img) => img.isActive)
												.map((img) => ({
													src: `${img?.urls ? img?.urls.large : img?.url}`,
													alt: `${vehicle.make} ${vehicle.model}`
												}))}
											style="object-fit: cover; height:20rem; width: 100%; position: fixed; pointer-events: none;" />
									{:else}
										<img
											src={`${vehicle.images[0]?.urls ? vehicle.images[0]?.urls.large : vehicle.images[0]?.url}`}

											alt={`${vehicle.make} ${vehicle.model}`}
											class="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 {imagePositions[vehicle.id] || 'object-center'}" />
									{/if}
								{:else}
									<div
										class="flex h-full w-full items-center justify-center {$theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}">
										<span class="{$theme === 'dark' ? 'text-gray-400' : 'text-primary-accent'}">No image available</span>
									</div>
								{/if}

								<div
									class="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white">
									<h3 class="line-clamp-2 text-xl font-bold tracking-tight text-shadow-sm text-shadow-black">
										{vehicle.make}
										{vehicle.model}
									</h3>
									<div class="mt-2 flex items-center justify-between">
										<p class="text-sm {$theme === 'dark' ? 'text-gray-200' : 'text-gray-200'}">{vehicle.year}</p>
										<p class="font-semibold text-[#0bd3d3]">
											${vehicle.pricePerDay ? new Intl.NumberFormat('en-US').format(vehicle.pricePerDay) : 'N/A'}/day

										</p>
									</div>
								</div>
							</div>
						</a>
					</div>
				{/each}
			</div>

			{#if filteredVehicles.length === 0}
				<div in:fade={{ duration: 200 }} class="mt-8 text-center {$theme === 'dark' ? 'text-gray-400' : 'text-primary-accent'}">
					<p>No vehicles match your search criteria.</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	input[type='range'] {
		@apply h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-white/10;
	}
	input[type='range']::-webkit-slider-thumb {
		@apply h-4 w-4 appearance-none rounded-full bg-[#0bd3d3] hover:bg-[#0bd3d3]/80;
	}
	input[type='range']::-moz-range-thumb {
		@apply h-4 w-4 appearance-none rounded-full border-0 bg-[#0bd3d3] hover:bg-[#0bd3d3]/80;
	}
</style>
