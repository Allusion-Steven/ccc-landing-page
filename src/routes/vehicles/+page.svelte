<script lang="ts">
	import { vehicles } from '$lib/constants/Vehicles';
	import { baseUrl } from '$lib/index';
	import { Carousel, Input } from 'flowbite-svelte';
	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	// Filter states
	let searchQuery = '';
	let minPrice = 0;
	let maxPrice = 2500;
	let minYear = 2020;
	let maxYear = 2024;

	$: filteredVehicles = vehicles.filter((vehicle) => {
		const matchesSearch = (vehicle.make + ' ' + vehicle.model)
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesPrice = vehicle.price >= minPrice && vehicle.price <= maxPrice;
		const matchesYear = vehicle.year >= minYear && vehicle.year <= maxYear;

		return matchesSearch && matchesPrice && matchesYear;
	});

	// Get min and max values for the filters
	const minPriceAvailable = Math.min(...vehicles.map((v) => v.price));
	const maxPriceAvailable = Math.max(...vehicles.map((v) => v.price));
	const minYearAvailable = Math.min(...vehicles.map((v) => v.year));
	const maxYearAvailable = Math.max(...vehicles.map((v) => v.year));
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

	<div class="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

			<div class="relative w-full flex items-center justify-center">
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

			<div class="w-full">
				<label class="mb-2 block text-sm font-medium text-white/70">Price Range ($/day)</label>
				<input
					type="range"
					id="price-range"
					min={minPriceAvailable}
					max={maxPriceAvailable}
					bind:value={minPrice}
					class="w-full"
				/>
				<div class="mt-2 flex justify-between text-sm text-white/70">
					<span>${minPrice}</span>
					<span>${maxPrice}</span>
				</div>
			</div>

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
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each filteredVehicles as vehicle (vehicle.id)}
			<div animate:flip={{duration: 300}}>
				<a
					in:scale={{duration: 300, start: 0.95}}
					out:fade={{duration: 200}}
					href={`/vehicle/${vehicle.id}`}
					class="group relative block h-80 w-full transform overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
				>
					<div class="aspect-[16/10] w-full overflow-hidden">
						{#if vehicle.images && vehicle.images.length > 0}
							{#if vehicle.images.length > 1}
								<Carousel
									class="pointer-events-none"
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
							class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white"
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