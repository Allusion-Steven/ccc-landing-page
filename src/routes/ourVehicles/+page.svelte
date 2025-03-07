<script lang="ts">
	import { fly, scale, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { Vehicle } from '$lib/types';
	import { Carousel } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { apiUrl } from '$lib/index';

	let loading = true;
	let error: string | null = null;
	let vehicles: Vehicle[] = [];

	async function fetchData() {
		loading = true;
		error = null;
		try {
			// TODO: Change to fetch from hardcoded URL
			const response = await fetch(`${apiUrl}/vehicles`);
			const result = await response.json();
			vehicles = result.vehicles;
		} catch (err) {
			console.error('Error fetching vehicles:', err);
			error = 'Error fetching vehicles';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchData();
	});
</script>

<div class="min-h-screen bg-[#1C1C1C]" in:fly={{ y: 50, duration: 1000 }}>
	<div class="container mx-auto px-4 py-12">
		<h1
			class="mb-8 text-center text-4xl font-bold text-white"
			in:fly={{ y: 50, duration: 1000, delay: 200 }}>
			Our Vehicle Collection
		</h1>

		{#if loading}
			<div class="flex flex-col items-center justify-center space-y-4 py-12">
				<div
					class="h-12 w-12 animate-spin rounded-full border-4 border-[#0bd3d3] border-t-transparent">
				</div>
				<p class="text-lg text-white">Loading our amazing vehicles...</p>
			</div>
		{:else if error}
			<div class="text-center text-red-500">
				{error}
			</div>
		{:else if vehicles.length > 0}
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
				{#each vehicles as vehicle (vehicle.id)}
					<div animate:flip={{ duration: 300 }}>
						<a
							in:scale={{ duration: 300, start: 0.95 }}
							out:fade={{ duration: 200 }}
							href={`/vehicle/${vehicle.id}?userId=${vehicle.userId}`}
							class="group relative block h-80 w-full transform overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
							<div class="aspect-[16/10] w-full overflow-hidden">
								{#if vehicle.images && vehicle.images.length > 0}
									{#if vehicle.images.length > 1}
										<Carousel
											class="pointer-events-none z-10"
											duration={Math.floor(
												Math.random() * (5000 - 3000 + 1)
											) + 3000}
											images={vehicle.images.map((img) => ({
												src: img.url,
												alt: `${vehicle.make} ${vehicle.model}`
											}))}
											style="object-fit: cover; height:20rem; width: 100%; position: fixed; pointer-events: none;" />
									{:else}
										<img
											src={vehicle.images[0].url}
											alt={`${vehicle.make} ${vehicle.model}`}
											class="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
									{/if}
								{:else}
									<div
										class="flex h-full w-full items-center justify-center bg-gray-800">
										<span class="text-gray-400">No image available</span>
									</div>
								{/if}

								<div
									class="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white">
									<h3 class="line-clamp-2 text-xl font-bold tracking-tight">
										{vehicle.make}
										{vehicle.model}
									</h3>
									<div class="mt-2 flex items-center justify-between">
										<p class="text-sm text-gray-300">{vehicle.year}</p>
										<p class="font-semibold text-[#0bd3d3]">
											${vehicle.pricePerDay}/day
										</p>
									</div>
								</div>
							</div>
						</a>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center text-gray-400">
				No vehicles available. Click the button above to fetch vehicles.
			</div>
		{/if}
	</div>
</div>
