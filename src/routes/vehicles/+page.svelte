<script lang="ts">
	import { vehicles } from '$lib/constants/Vehicles';
	import { baseUrl } from '$lib/index';
	import { Carousel, Input, Modal, Button } from 'flowbite-svelte';
	import { fade, scale } from 'svelte/transition';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';

	export let data: PageData;
	const { pickupDate, dropoffDate, location } = data;

	// Filter states
	let searchQuery = '';
	let maxPrice: number;
	let minYear: number;
	let maxYear: number;
	let showFiltersModal = false;

	// Get unique tags from vehicles array
	const vehicleTypes = [...new Set(vehicles.flatMap(vehicle => vehicle.tags))].sort();
	let selectedTypes: string[] = [];

	// Get min and max values for the filters
	const minPriceAvailable = Math.min(...vehicles.map((v) => v.price));
	const maxPriceAvailable = Math.max(...vehicles.map((v) => v.price));
	const minYearAvailable = Math.min(...vehicles.map((v) => v.year));
	const maxYearAvailable = Math.max(...vehicles.map((v) => v.year));

	// Initialize filters to their full ranges
	maxPrice = maxPriceAvailable;
	minYear = minYearAvailable;
	maxYear = maxYearAvailable;

	// Update filteredVehicles to filter by tags instead of type
	$: filteredVehicles = vehicles.filter((vehicle) => {
		const matchesSearch = (vehicle.make + ' ' + vehicle.model)
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesPrice = vehicle.price <= maxPrice;
		const matchesYear = vehicle.year >= minYear && vehicle.year <= maxYear;
		// Check if any of the vehicle's tags match any of the selected types
		const matchesType = selectedTypes.length === 0 || 
			vehicle.tags.some(tag => selectedTypes.includes(tag));

		return matchesSearch && matchesPrice && matchesYear && matchesType;
	});

	// Add reactive statement to check if any filters are active
	$: isAnyFilterActive = 
		searchQuery !== '' || 
		maxPrice !== maxPriceAvailable || 
		minYear !== minYearAvailable || 
		maxYear !== maxYearAvailable || 
		selectedTypes.length > 0;

	// Add clear filters function
	function clearFilters() {
		searchQuery = '';
		maxPrice = maxPriceAvailable;
		minYear = minYearAvailable;
		maxYear = maxYearAvailable;
		selectedTypes = [];
	}
</script>

<style lang="postcss">
	input[type="range"] {
		@apply h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10;
	}
	input[type="range"]::-webkit-slider-thumb {
		@apply h-4 w-4 appearance-none rounded-full bg-[#0bd3d3] hover:bg-[#0bd3d3]/80;
	}
	input[type="range"]::-moz-range-thumb {
		@apply h-4 w-4 appearance-none rounded-full border-0 bg-[#0bd3d3] hover:bg-[#0bd3d3]/80;
	}
</style>

<!-- TODO: Fetch all vehicles from the database -->
<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-center text-4xl font-bold text-white">Available Vehicles</h1>

	<div class="flex flex-col gap-8 lg:flex-row">
		<!-- Mobile Filter Button -->
		<div class="lg:hidden">
			<Button color="light" class="w-full" on:click={() => showFiltersModal = true}>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
				</svg>
				Filters
				{#if isAnyFilterActive}
					<span class="ml-2 rounded-full bg-[#0bd3d3] px-2 py-0.5 text-xs text-black">Active</span>
				{/if}
			</Button>
		</div>

		<!-- Filters Modal for Mobile -->
		{#if showFiltersModal}
			<div 
				class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity"
				on:click={() => showFiltersModal = false}
				on:keydown={(e) => e.key === 'Escape' && (showFiltersModal = false)}
				role="button"
				tabindex="0"
			>
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<div
					class="fixed right-0 top-0 h-full w-[90%] max-w-md transform overflow-y-auto bg-[#1c1c1c] p-6 shadow-xl transition-transform duration-300"
					on:click|stopPropagation
					on:keydown|stopPropagation
					role="dialog"
					tabindex="-1"
					transition:fly={{ x: 300, duration: 300 }}
				>
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-bold text-white">Filters</h3>
						<button
							class="rounded-lg p-2 text-white/70 hover:bg-white/10"
							on:click={() => showFiltersModal = false}
							aria-label="Close filters"
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="flex flex-col gap-6">
						<!-- Search input -->
						<div class="relative w-full">
							<div class="absolute left-4 top-1/2 z-10 -translate-y-1/2">
								<svg class="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
								</svg>
							</div>
							<Input
								id="search-mobile"
								type="text"
								placeholder="Search by make or model..."
								bind:value={searchQuery}
								class="!h-12 w-full !rounded-2xl !border-transparent !bg-white/10 !px-12 text-white placeholder-white/50"
							/>
						</div>

						<!-- Price Range -->
						<div class="w-full">
							<label for="price-range-mobile" class="mb-2 block text-sm font-medium text-white/70">Maximum Price ($/day)</label>
							<input
								type="range"
								id="price-range-mobile"
								min={minPriceAvailable}
								max={maxPriceAvailable}
								bind:value={maxPrice}
								class="w-full"
							/>
							<div class="mt-2 flex justify-between text-sm text-white/70">
								<span>${minPriceAvailable}</span>
								<span>${maxPrice}</span>
							</div>
						</div>

						<!-- Year Range -->
						<div class="w-full">
							<label class="mb-2 block text-sm font-medium text-white/70">Year Range</label>
							<input
								type="range"
								id="year-range-mobile"
								min={minYearAvailable}
								max={maxYearAvailable}
								bind:value={minYear}
								class="w-full"
							/>
							<div class="mt-2 flex justify-between text-sm text-white/70">
								<span>{minYear}</span>
								<span>{maxYear}</span>
							</div>
						</div>

						<!-- Vehicle Type -->
						<div class="w-full">
							<label class="mb-3 block text-sm font-medium text-white/70">Vehicle Type</label>
							<div class="flex flex-wrap gap-3">
								{#each vehicleTypes as type}
									<label class="group cursor-pointer">
										<input
											type="checkbox"
											bind:group={selectedTypes}
											value={type}
											class="peer hidden"
										/>
										<div class="flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 transition-all 
												   peer-checked:border-[#0bd3d3] peer-checked:bg-[#0bd3d3]/10 hover:border-white/40 hover:bg-white/10">
											<span class="text-sm text-white/70 transition-colors peer-checked:text-[#0bd3d3] group-hover:text-white">
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
								<Button color="light" on:click={clearFilters}>Clear All</Button>
							{/if}
							<Button color="primary" on:click={() => showFiltersModal = false}>Apply Filters</Button>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Filters sidebar (desktop) -->
		<div class="hidden lg:w-80 lg:block">
			<div class="sticky top-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-xl font-semibold text-white">Filters</h2>
					{#if isAnyFilterActive}
						<button
							on:click={clearFilters}
							class="text-sm text-[#0bd3d3] hover:text-[#0bd3d3]/80 transition-colors"
						>
							Clear All
						</button>
					{/if}
				</div>
				<div class="flex flex-col gap-8">
					<!-- Search input -->
					<div class="relative w-full">
						<div class="absolute left-4 top-1/2 z-10 -translate-y-1/2">
							<svg class="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						<Input
							id="search"
							type="text"
							placeholder="Search by make or model..."
							bind:value={searchQuery}
							class="!h-12 w-full !rounded-2xl !border-transparent !bg-white/10 !px-12 text-white placeholder-white/50"
						/>
					</div>

					<!-- Price Range -->
					<div class="w-full">
						<label class="mb-2 block text-sm font-medium text-white/70">Maximum Price ($/day)</label>
						<input
							type="range"
							id="price-range"
							min={minPriceAvailable}
							max={maxPriceAvailable}
							bind:value={maxPrice}
							class="w-full"
						/>
						<div class="mt-2 flex justify-between text-sm text-white/70">
							<span>${minPriceAvailable}</span>
							<span>${maxPrice}</span>
						</div>
					</div>

					<!-- Year Range -->
					<div class="w-full">
						<label class="mb-2 block text-sm font-medium text-white/70">Year Range</label>
						<input
							type="range"
							id="year-range"
							min={minYearAvailable}
							max={maxYearAvailable}
							bind:value={minYear}
							class="w-full"
						/>
						<div class="mt-2 flex justify-between text-sm text-white/70">
							<span>{minYear}</span>
							<span>{maxYear}</span>
						</div>
					</div>

					<!-- Vehicle Type -->
					<div class="w-full">
						<label class="mb-3 block text-sm font-medium text-white/70">Vehicle Type</label>
						<div class="flex flex-wrap gap-3">
							{#each vehicleTypes as type}
								<label class="group cursor-pointer">
									<input
										type="checkbox"
										bind:group={selectedTypes}
										value={type}
										class="peer hidden"
									/>
									<div class="flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 transition-all 
											   peer-checked:border-[#0bd3d3] peer-checked:bg-[#0bd3d3]/10 hover:border-white/40 hover:bg-white/10">
										<span class="text-sm text-white/70 transition-colors peer-checked:text-[#0bd3d3] group-hover:text-white">
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
					<div animate:flip={{duration: 300}}>
						<a
							in:scale={{duration: 300, start: 0.95}}
							out:fade={{duration: 200}}
							href={`/vehicle/${vehicle.id}?${new URLSearchParams({
								...(pickupDate ? { pickupDate } : {}),
								...(dropoffDate ? { dropoffDate } : {}),
								...(location ? { location } : {})
							}).toString()}`}
							class="group relative block h-80 w-full transform overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
						>
							<div class="aspect-[16/10] w-full overflow-hidden">
								{#if vehicle.images && vehicle.images.length > 0}
									{#if vehicle.images.length > 1}
										<Carousel
											class="pointer-events-none z-10"
											duration={Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000}
											images={vehicle.images.map((img) => ({
												src: `${baseUrl}${img.src}`,
												alt: `${vehicle.make} ${vehicle.model}`
											}))}
											style="object-fit: cover; height:20rem; width: 100%; position: fixed; pointer-events: none;"
										/>
									{:else}
										<img
											src={`${vehicle.images[0]?.src}`}
											alt={`${vehicle.make} ${vehicle.model}`}
											class="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
									{/if}
								{:else}
									<div class="flex h-full w-full items-center justify-center bg-gray-800">
										<span class="text-gray-400">No image available</span>
									</div>
								{/if}

								<div
									class="absolute bottom-0 z-50 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white"
								>
									<h3 class="line-clamp-2 text-xl font-bold tracking-tight">
										{vehicle.make}
										{vehicle.model}
									</h3>
									<div class="mt-2 flex items-center justify-between">
										<p class="text-sm text-gray-300">{vehicle.year}</p>
										<p class="font-semibold text-[#0bd3d3]">${vehicle.price}/day</p>
									</div>
								</div>
							</div>
						</a>
					</div>
				{/each}
			</div>

			{#if filteredVehicles.length === 0}
				<div in:fade={{duration: 200}} class="mt-8 text-center text-gray-400">
					<p>No vehicles match your search criteria.</p>
				</div>
			{/if}
		</div>
	</div>
</div> 