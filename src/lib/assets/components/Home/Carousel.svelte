<script lang="ts">
	import { Carousel } from 'flowbite-svelte';
	import { vehicles } from '$lib/constants/Vehicles';
	import { baseUrl } from '$lib/index';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div class="max-w-8xl container mx-auto px-4 py-16">
	{#if visible}
		<h3
			in:fly={{ duration: 800, delay: 0, x: -50 }}
			class="mb-12 text-center text-4xl font-bold leading-tight text-white md:text-5xl"
		>
			Featured Vehicles
		</h3>
		<div class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each vehicles as vehicle, index}
			<!-- TODO: Make each vehicle slide in one by one-->
				{#if index < 8}
					<a
						href={`/vehicle/${vehicle.id}`}
						class="group relative block h-72 w-full transform overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
						
					>
						<div class="aspect-[16/10] w-full overflow-hidden" in:fly={{ duration: 800, delay: index * 200, x: -50 }}>
							{#if vehicle.images && vehicle.images.length > 0}
								{#if vehicle.images.length > 1}
									<!-- TODO: Need to add a controls or indicators here  and remove auto scroll -->

									<Carousel
										class="pointer-events-none;"
										let:Controls
										let:Indicators
										duration={Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000}
										images={vehicle.images.map((img) => ({
											src: `${baseUrl}${img.src}`,
											alt: `${vehicle.make} ${vehicle.model}`
										}))}
										style="width: 100px; object-fit: cover; height:18rem; width: 100%; position: fixed; pointer-events: none;"
									>
																	<!-- 								<Controls
									class="absolute flex w-full flex-col justify-between pt-4 text-red-400 dark:text-green-400"
									style="justify-content: space-between; align-items: space-between;     width: 100%;"
								/> -->
										<div
											class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white"
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
									</Carousel>
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
									<div
										class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white"
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
								{/if}
							{:else}
								<div class="flex h-full w-full items-center justify-center bg-gray-800">
									<span class="text-gray-400">No image available</span>
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
							{/if}
						</div>
					</a>
				{/if}
			{/each}
		</div>
		<div in:fade={{ duration: 800, delay: 1200 }} class="flex justify-center">
			<SecondaryButton href="/vehicles" type="submit" text="View All Vehicles" />
		</div>
	{/if}
</div>

<style>
	:global(.carousel-item) {
		transition: transform 0.5s ease-in-out !important;
	}
</style>
