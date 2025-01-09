<script lang="ts">
	import { Carousel } from 'flowbite-svelte';
	import { vehicles } from '$lib/constants/Vehicles';
</script>

<div class="max-w-8xl container mx-auto px-4 py-16">
	<h3 class="mb-12 text-center text-4xl font-bold leading-tight text-white md:text-5xl">
		Featured Vehicles
	</h3>
	<div class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each vehicles as vehicle}
			<!-- TODO: Add a link to the vehicle page (change div to anchor tag) -->
			<div
				class="group relative block h-72 w-full transform overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
			>
			<!-- TODO: Remove auto carousel scroll or replace with manual scroll -->
				<div class="aspect-[16/10] w-full overflow-hidden">
					{#if vehicle.images && vehicle.images.length > 0}
						{#if vehicle.images.length > 1}
							<Carousel
								duration={3000}
								images={vehicle.images}
								style="width: 100px; object-fit: cover; height:18rem; width: 100%; position: fixed;"
							></Carousel>
						{:else if vehicle.images.length == 1}
							<img
								src={`${vehicle.images[0]?.src}`}
								alt={`${vehicle.make} ${vehicle.model}`}
								class="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								on:error={(e) => {
									const target = e.target as HTMLImageElement;
									target.style.display = 'none';
									target.nextElementSibling?.classList.remove('hidden');
								}}
							/>
						{/if}
					{:else}
						<div class="flex h-full w-full items-center justify-center bg-gray-800">
							<span class="text-gray-400">No image available</span>
						</div>
					{/if}
				</div>
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
		{/each}
	</div>
</div>
