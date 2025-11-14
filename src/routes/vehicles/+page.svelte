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
	import { CITIES, DEFAULT_CITY } from '$lib/data/cities';
	import { getClosestCity } from '$lib/utils/geolocation';
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

	let currentSort = $state('default');

	console.log('Data', data);

	const initialLocation = $state(data.location || DEFAULT_CITY);

	let pickupDate = $state(data.pickupDate || '');
	let dropoffDate = $state(data.dropoffDate || '');

	let location = $state(data.location || DEFAULT_CITY || 'all');
	let vehicles = $state(data.vehicles || []);
	let allVehicles = $state(data.allVehicles || []);
	let maxPrice = $state(0);
	let minYear = $state(0);
	let maxYear = $state(0);
	/* 	let maxPrice = $state(getMinMaxPrice(vehicles).max);
	let minYear = $state(getMinMaxYear(vehicles).min); */

	$inspect('Location', location);
	$inspect('Vehicles', vehicles);
	$inspect('All Vehicles', allVehicles);

	// Calculate minimum date (24 hours from now)
	const minPickupDate = $derived(
		new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
	);

	// Filter states
	let searchQuery = $state('');

	let showFiltersModal = $state(false);
	let locationFilter = $state(false);

	// Get unique tags from vehicles array
	const vehicleTypes = getUniqueTypes(vehicles);
	let selectedTypes = $state<string[]>([]);

	// Filter vehicles by location first
	let vehiclesByLocation = $derived.by(() => {
		if (location === 'all') {
			return allVehicles;
		}
		return allVehicles.filter(
			(vehicle: any) => vehicle.pickupLocation?.state === location.split(',')[1].trim()
		);
	});

	// Get min and max values for the filters (based on location-filtered vehicles)
	const minPriceAvailable = $derived(getMinMaxPrice(vehiclesByLocation).min);
	const maxPriceAvailable = $derived(getMinMaxPrice(vehiclesByLocation).max);
	const minYearAvailable = $derived(getMinMaxYear(vehiclesByLocation).min);
	const maxYearAvailable = $derived(getMinMaxYear(vehiclesByLocation).max);

	// Apply all filters (location, price, year, search, types) and sorting
	let filteredVehicles = $derived.by(() => {
		let filtered = vehiclesByLocation;

		// Apply price filter
		filtered = filtered.filter((vehicle: any) => vehicle.pricePerDay <= maxPrice);

		// Apply year filter
		filtered = filtered.filter(
			(vehicle: any) => vehicle.year >= minYear && vehicle.year <= maxYear
		);

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(vehicle: any) =>
					vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
					vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		// Apply type filter
		if (selectedTypes.length > 0) {
			filtered = filtered.filter((vehicle: any) =>
				vehicle.tags?.some((tag: string) => selectedTypes.includes(tag))
			);
		}

		if (currentSort === 'price-asc') {
			filtered = filtered.sort((a: any, b: any) => a.pricePerDay - b.pricePerDay);
		} else if (currentSort === 'price-desc') {
			filtered = [...filtered].sort((a: any, b: any) => b.pricePerDay - a.pricePerDay);
		} else if (currentSort === 'year-desc') {
			filtered = [...filtered].sort((a: any, b: any) => b.year - a.year);
		} else if (currentSort === 'year-asc') {
			filtered = [...filtered].sort((a: any, b: any) => a.year - b.year);
		} else if (currentSort === 'name-asc') {
			filtered = [...filtered].sort((a: any, b: any) =>
				`${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)
			);
		} else if (currentSort === 'name-desc') {
			filtered = [...filtered].sort((a: any, b: any) =>
				`${b.make} ${b.model}`.localeCompare(`${a.make} ${a.model}`)
			);
		}
		return filtered;
	});

	// Initialize filter values
	$effect(() => {
		if (!maxPrice) maxPrice = maxPriceAvailable;
		if (!minYear) minYear = minYearAvailable;
		if (!maxYear) maxYear = maxYearAvailable;
	});

	// Update filter ranges when location changes
	$effect(() => {
		if (location) {
			maxPrice = maxPriceAvailable;
			minYear = minYearAvailable;
			maxYear = maxYearAvailable;
		}
	});

	// Check if any filters are active
	const isAnyFilterActive = $derived(
		checkFiltersActive(searchQuery, maxPrice, maxPriceAvailable, selectedTypes, {
			yearRange: minYear !== minYearAvailable || maxYear !== maxYearAvailable
		})
	);

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
		console.log('Sort option', sortOption);
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
			console.log('Location changed', location);
			locationChanged = true;
		}
	});

	// Preload image positions when component mounts
	onMount(async () => {
		// Detect user's closest city if no location is set
		if (!location || location === DEFAULT_CITY) {
			try {
				const closestCity = await getClosestCity();
				location = closestCity;
				// Update URL with detected location
				updateURL();
			} catch (error) {
				console.warn('Failed to detect user location:', error);
			}
		}

		for (const vehicle of filteredVehicles) {
			if (vehicle.images && vehicle.images.length > 0) {
				const firstImage =
					vehicle.images.find((img: any) => img.isActive) || vehicle.images[0];
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
	<meta name="title" content={`Available Vehicles | Macro Exotics | ${location ?? location}`} />
	<meta
		name="keywords"
		content="Luxury Car Rental, Miami, Exotic Cars, Supercars, Macro Exotics" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1C1C1C" />

	<meta
		property="og:title"
		content={`Available Vehicles | Macro Exotics | ${location ?? location}`} />
	<meta
		property="og:description"
		content="Browse our collection of luxury vehicles available for rent in Miami. From supercars to luxury SUVs, find your perfect ride at Macro Exotics." />
	<meta
		property="og:url"
		content={`https://macroexotics.com/vehicles?${location ? `location=${location}&` : ''}${pickupDate ? `pickupDate=${pickupDate}&` : ''}${dropoffDate ? `dropoffDate=${dropoffDate}&` : ''}`} />
	<meta property="og:image" content="https://macroexotics.com/logo-square-768.png" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Macro Exotics" />
	<link
		rel="canonical"
		href={`https://macroexotics.com/vehicles?${location ? `location=${location}&` : ''}${pickupDate ? `pickupDate=${pickupDate}&` : ''}${dropoffDate ? `dropoffDate=${dropoffDate}&` : ''}`} />
</svelte:head>

<!-- TODO: Fetch all vehicles from the database -->
<div class="container mx-auto px-4 py-8">
	<h1
		class="mb-8 text-center text-4xl font-bold {$theme === 'dark'
			? 'text-white'
			: 'text-primary-accent'}">
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
			<Button
				color={$theme === 'dark' ? 'dark' : 'light'}
				class="w-full"
				on:click={() => (showFiltersModal = true)}>
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
				class="fixed inset-0 z-[60] {$theme === 'dark'
					? 'bg-black/50'
					: 'bg-gray-800/50'} backdrop-blur-sm transition-opacity"
				onclick={() => (showFiltersModal = false)}
				onkeydown={(e) => e.key === 'Escape' && (showFiltersModal = false)}
				role="button"
				tabindex="0">
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					class="fixed right-0 top-0 h-full w-[90%] max-w-md transform overflow-y-auto {$theme ===
					'dark'
						? 'bg-[#1c1c1c]'
						: 'bg-white'} p-6 shadow-xl transition-transform duration-300"
					role="dialog"
					tabindex="1"
					onclick={(e) => {
						e.stopPropagation();
					}}
					transition:fly={{ x: 300, duration: 300 }}>
					<div class="mb-4 flex items-center justify-between">
						<h3
							class="text-xl font-bold {$theme === 'dark'
								? 'text-white'
								: 'text-gray-800'}">
							Filters
						</h3>
						<button
							class="rounded-lg p-2 {$theme === 'dark'
								? 'text-white/70 hover:bg-white/10'
								: 'text-primary-accent hover:bg-gray-100'}"
							onclick={() => (showFiltersModal = false)}
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
							<label
								class="mb-2 block text-sm font-medium {$theme === 'dark'
									? 'text-white/70'
									: 'text-primary-accent'}">Rental Dates</label>
							<div class="flex flex-col space-y-3">
								<div>
									<label
										class="text-xs {$theme === 'dark'
											? 'text-white/50'
											: 'text-gray-600'}">Pickup Location</label>
									<div class="flex gap-2">
										<select
											id="location-mobile"
											bind:value={location}
											class="mt-1 flex-1 rounded-lg border {$theme === 'dark'
												? 'border-white/20 bg-white/5 text-white'
												: 'border-gray-300 bg-white text-gray-800'} px-3 py-2 text-sm">
											{#each CITIES as city}
												<option
													value={city.value}
													class={$theme === 'dark'
														? 'bg-gray-800'
														: 'bg-white'}>{city.label}</option>
											{/each}
										</select>
										<!-- <button
											onclick={handleLocationChange}
											disabled={isLocationSearching}
											class="mt-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 {isLocationSearching
												? 'cursor-not-allowed bg-gray-400 text-white'
												: locationChanged
													? 'animate-pulse bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]'
													: `${$theme === 'dark' ? 'bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]' : 'bg-primary-accent text-white shadow-[0_0_20px_rgba(194,63,91,0.3)] hover:shadow-[0_0_15px_rgba(194,63,91,0.4)]'}`}">
											{#if isLocationSearching}
												<div class="flex items-center gap-2">
													<div
														class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent">
													</div>
													Loading...
												</div>
											{:else if locationChanged}
												<div class="flex items-center gap-1">
													<svg
														class="h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24">
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
														></path>
													</svg>
													Update
												</div>
											{:else}
												Search
											{/if}
										</button> -->
									</div>
								</div>
								<div>
									<label
										class="text-xs {$theme === 'dark'
											? 'text-white/50'
											: 'text-gray-600'}">Pickup Date</label>
									<input
										type="date"
										bind:value={pickupDate}
										onchange={handleDateChange}
										onblur={handleDateChange}
										min={minPickupDate}
										class="mt-1 w-full rounded-lg border {$theme === 'dark'
											? 'border-white/20 bg-white/5 text-white placeholder-white/50'
											: 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'} px-3 py-2 text-sm" />
								</div>
								<div>
									<label
										class="text-xs {$theme === 'dark'
											? 'text-white/50'
											: 'text-gray-600'}">Dropoff Date</label>
									<input
										type="date"
										bind:value={dropoffDate}
										onchange={handleDateChange}
										onblur={handleDateChange}
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
								class="mb-2 block text-sm font-medium {$theme === 'dark'
									? 'text-white/70'
									: 'text-primary-accent'}">
								Maximum Price ($/day)
							</label>
							<input
								type="range"
								id="price-range-mobile"
								min={minPriceAvailable}
								max={maxPriceAvailable}
								bind:value={maxPrice}
								class="w-full" />
							<div
								class="mt-2 flex justify-between text-sm {$theme === 'dark'
									? 'text-white/70'
									: 'text-primary-accent'}">
								<span
									>${new Intl.NumberFormat('en-US').format(
										minPriceAvailable
									)}</span>
								<span>${new Intl.NumberFormat('en-US').format(maxPrice)}</span>
							</div>
						</div>

						<!-- Year Range -->
						<div class="w-full">
							<label
								class="mb-2 block text-sm font-medium {$theme === 'dark'
									? 'text-white/70'
									: 'text-primary-accent'}">Year Range</label>
							<input
								type="range"
								id="year-range-mobile"
								min={minYearAvailable}
								max={maxYearAvailable}
								bind:value={minYear}
								class="w-full" />
							<div
								class="mt-2 flex justify-between text-sm {$theme === 'dark'
									? 'text-white/70'
									: 'text-primary-accent'}">
								<span>{minYear}</span>
								<span>{maxYear}</span>
							</div>
						</div>

						<!-- Vehicle Type -->
						<div class="w-full">
							<label
								class="mb-3 block text-sm font-medium {$theme === 'dark'
									? 'text-white/70'
									: 'text-primary-accent'}">Vehicle Type</label>
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
												class="text-sm capitalize {$theme === 'dark'
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
								<Button
									color={$theme === 'dark' ? 'dark' : 'light'}
									on:click={clearFilters}>Clear All</Button>
							{/if}
							<Button
								color="primary"
								on:click={() => {
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
			<div
				class="sticky top-8 rounded-2xl {$theme === 'dark'
					? 'bg-white/10 dark:shadow-none'
					: 'bg-gray-100 shadow-md'} p-6 backdrop-blur-sm">
				<div class="mb-6 flex items-center justify-between">
					<h2
						class="text-xl font-semibold {$theme === 'dark'
							? 'text-white'
							: 'text-gray-800'}">
						Filters
					</h2>
					{#if isAnyFilterActive}
						<button
							onclick={clearFilters}
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
								class="h-5 w-5 {$theme === 'dark'
									? 'text-white/70'
									: 'text-primary-accent'}"
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
						<label
							class="mb-2 block text-sm font-medium {$theme === 'dark'
								? 'text-white/70'
								: 'text-primary-accent'}">Rental Dates</label>
						<div class="flex flex-col space-y-3">
							<div>
								<label
									class="text-xs {$theme === 'dark'
										? 'text-white/50'
										: 'text-gray-600'}">Pickup Location</label>
								<div class="flex gap-2">
									<select
										id="location-desktop"
										bind:value={location}
										class="mt-1 flex-1 rounded-lg border {$theme === 'dark'
											? 'border-white/20 bg-white/5 text-white'
											: 'border-gray-300 bg-white text-gray-800'} px-3 py-2 text-sm">
										{#each CITIES as city}
											<option
												value={city.value}
												class={$theme === 'dark'
													? 'bg-gray-800'
													: 'bg-white'}>{city.label}</option>
										{/each}
									</select>
									<!-- <button
										onclick={handleLocationChange}
										disabled={isLocationSearching}
										class="mt-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 {isLocationSearching
											? 'cursor-not-allowed bg-gray-400 text-white'
											: locationChanged
												? 'animate-pulse bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]'
												: `${$theme === 'dark' ? 'bg-white text-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]' : 'bg-primary-accent text-white shadow-[0_0_20px_rgba(194,63,91,0.3)] hover:shadow-[0_0_15px_rgba(194,63,91,0.4)]'}`}">
										{#if isLocationSearching}
											<div class="flex items-center gap-2">
												<div
													class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent">
												</div>
												Loading...
											</div>
										{:else if locationChanged}
											<div class="flex items-center gap-1">
												<svg
													class="h-4 w-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
													></path>
												</svg>
												Update
											</div>
										{:else}
											Search
										{/if}
									</button> -->
								</div>
							</div>
							<div>
								<label
									class="text-xs {$theme === 'dark'
										? 'text-white/50'
										: 'text-gray-600'}">Pickup Date</label>
								<input
									type="date"
									bind:value={pickupDate}
									onchange={handleDateChange}
									onblur={handleDateChange}
									min={minPickupDate}
									class="mt-1 w-full rounded-lg border {$theme === 'dark'
										? 'border-white/20 bg-white/5 text-white placeholder-white/50'
										: 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'} px-3 py-2 text-sm" />
							</div>
							<div>
								<label
									class="text-xs {$theme === 'dark'
										? 'text-white/50'
										: 'text-gray-600'}">Dropoff Date</label>
								<input
									type="date"
									bind:value={dropoffDate}
									onchange={handleDateChange}
									onblur={handleDateChange}
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
							class="mb-2 block text-sm font-medium {$theme === 'dark'
								? 'text-white/70'
								: 'text-primary-accent'}">Maximum Price ($/day)</label>
						<input
							type="range"
							id="price-range"
							min={minPriceAvailable}
							max={maxPriceAvailable}
							bind:value={maxPrice}
							class="w-full" />
						<div
							class="mt-2 flex justify-between text-sm {$theme === 'dark'
								? 'text-white/70'
								: 'text-primary-accent'}">
							<span>${new Intl.NumberFormat('en-US').format(minPriceAvailable)}</span>
							<span>${new Intl.NumberFormat('en-US').format(maxPrice)}</span>
						</div>
					</div>

					<!-- Year Range -->
					<div class="w-full">
						<label
							class="mb-2 block text-sm font-medium {$theme === 'dark'
								? 'text-white/70'
								: 'text-primary-accent'}">Year Range</label>
						<input
							type="range"
							id="year-range"
							min={minYearAvailable}
							max={maxYearAvailable}
							bind:value={minYear}
							class="w-full" />
						<div
							class="mt-2 flex justify-between text-sm {$theme === 'dark'
								? 'text-white/70'
								: 'text-primary-accent'}">
							<span>{minYear}</span>
							<span>{maxYear}</span>
						</div>
					</div>

					<!-- Vehicle Type -->
					<div class="w-full">
						<label
							class="mb-3 block text-sm font-medium {$theme === 'dark'
								? 'text-white/70'
								: 'text-primary-accent'}">Vehicle Type</label>
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
											class="text-sm capitalize {$theme === 'dark'
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
							class="group relative block h-80 w-full transform overflow-hidden rounded-xl {$theme ===
							'dark'
								? 'bg-white/5 dark:shadow-xl'
								: 'bg-gray-100 shadow-lg'} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div class="aspect-[16/10] w-full overflow-hidden">
								{#if vehicle.images && vehicle.images.length > 0}
									{#if vehicle.images.filter((img: any) => img.isActive).length > 1}
										<Carousel
											class="pointer-events-none z-10"
											duration={Math.floor(
												Math.random() * (5000 - 3000 + 1)
											) + 3000}
											images={vehicle.images
												.filter((img: any) => img.isActive)
												.map((img: any) => ({
													src: `${img?.urls ? img?.urls.large : img?.url}`,
													alt: `${vehicle.make} ${vehicle.model}`
												}))}
											style="object-fit: cover; height:20rem; width: 100%; position: fixed; pointer-events: none;" />
									{:else}
										<img
											src={`${vehicle.images[0]?.urls ? vehicle.images[0]?.urls.large : vehicle.images[0]?.url}`}
											alt={`${vehicle.make} ${vehicle.model}`}
											class="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 {imagePositions[
												vehicle.id
											] || 'object-center'}" />
									{/if}
								{:else}
									<div
										class="flex h-full w-full items-center justify-center {$theme ===
										'dark'
											? 'bg-gray-800'
											: 'bg-gray-300'}">
										<span
											class={$theme === 'dark'
												? 'text-gray-400'
												: 'text-primary-accent'}>No image available</span>
									</div>
								{/if}

								<div
									class="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white">
									<h3
										class="text-shadow-sm text-shadow-black line-clamp-2 text-xl font-bold tracking-tight">
										{vehicle.make}
										{vehicle.model}
									</h3>
									<div class="mt-2 flex items-center justify-between">
										<p
											class="text-sm {$theme === 'dark'
												? 'text-gray-200'
												: 'text-gray-200'}">
											{vehicle.year}
										</p>
										<p class="font-semibold text-[#0bd3d3]">
											${vehicle.pricePerDay
												? new Intl.NumberFormat('en-US').format(
														vehicle.pricePerDay
													)
												: 'N/A'}/day
										</p>
									</div>
								</div>
							</div>
						</a>
					</div>
				{/each}
			</div>

			{#if filteredVehicles.length === 0}
				<div
					in:fade={{ duration: 200 }}
					class="mt-8 rounded-xl {$theme === 'dark'
						? 'bg-white/5 text-gray-300'
						: 'bg-gray-100 text-gray-700'} p-8 text-center">
					{#if filteredVehicles.length === 0 && location}
						<div class="mx-auto max-w-2xl">
							<svg
								class="mx-auto h-16 w-16 {$theme === 'dark'
									? 'text-gray-500'
									: 'text-gray-400'} mb-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
								></path>
							</svg>
							<h3
								class="mb-3 text-2xl font-bold {$theme === 'dark'
									? 'text-white'
									: 'text-gray-800'}">
								No Vehicles Available in {location}
							</h3>
							<p class="mb-6 text-lg">
								We currently don't have vehicles available in this location. If you
								would like to list your luxury vehicle in this area, please consider
								joining our platform or reach out to us directly.
							</p>
							<div
								class="flex flex-col items-center justify-center gap-4 sm:flex-row">
								<a
									href="/contact"
									class="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300 {$theme ===
									'dark'
										? 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
										: 'border border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300'}">
									<svg
										class="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										></path>
									</svg>
									Contact Us
								</a>
								<a
									href="https://my.macroexotics.com"
									target="_blank"
									class="inline-flex items-center gap-2 rounded-xl bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80">
									<svg
										class="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
									</svg>
									List Your Vehicle
								</a>
							</div>
						</div>
					{:else}
						<p class="text-lg">No vehicles match your search criteria.</p>
					{/if}
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
