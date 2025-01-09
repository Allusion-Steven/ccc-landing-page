<script lang="ts">
	import { Carousel } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { vehicles } from '$lib/constants/Vehicles';

	interface Vehicle {
		make: string;
		model: string;
		year: number;
		price: number;
		images: string[];
	}

	// TODO: Remove hardcoded url
	

	//

	/* 	

let vehicles: Vehicle[] = [];
onMount(async () => {
		try {

			// TODO: Remove hardcoded url
			const response = await fetch('http://localhost:5173/api/vehicles/getAllVehicles', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			if (response.ok) {
				const data = await response.json();
				vehicles = data.vehicles;
				console.log('Vehicle list =====', vehicles);
			} else {
				console.error('Failed to fetch vehicles');
			}
		} catch (error) {
			console.error('Error fetching vehicles:', error);
		}
	});

	// Calculate number of slides needed (groups of 4)
	$: slides = Array.from({ length: Math.ceil((vehicles?.length || 0) / 4) }, (_, i) =>
		vehicles.slice(i * 4, (i + 1) * 4)
	);

	// Function to get image URL with error handling
	// TODO: Remove hardcoded url
	function getImageUrl(imageName: string) {
		return `http://localhost:5173/api/vehicles/getImage/${imageName}`;
	} */

	//console.log('hardvehicles', hardVehicles);
</script>

<div class="max-w-8xl container mx-auto px-4 py-16">
	<h3 class="mb-12 text-center text-4xl font-bold leading-tight text-white md:text-5xl">
		Featured Vehicles
	</h3>
	<div class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each vehicles as vehicle}
			<a
				href="/"
				class="group relative block h-72 w-full transform overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
			>
				<div class="aspect-[16/10] w-full overflow-hidden">
					{#if vehicle.images && vehicle.images.length > 0}
						<!-- TODO: Remove hardcoded url -->
						<img
							src={`/src/lib/assets/images/${vehicle.images[0]}`}
							alt={`${vehicle.make} ${vehicle.model}`}
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
							on:error={(e) => {
								const target = e.target as HTMLImageElement;
								target.style.display = 'none';
								target.nextElementSibling?.classList.remove('hidden');
							}}
						/>
						<div class="flex hidden h-full w-full items-center justify-center bg-gray-800">
							<span class="text-gray-400">No image available</span>
						</div>
					{:else}
						<div class="flex h-full w-full items-center justify-center bg-gray-800">
							<span class="text-gray-400">No image available</span>
						</div>
					{/if}
				</div>
				<div
					class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-6 text-white"
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
			</a>
		{/each}
	</div>
</div>
