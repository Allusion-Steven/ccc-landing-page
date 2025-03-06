<script lang="ts">
	import { Carousel } from 'flowbite-svelte';
	import { baseUrl } from '$lib/index';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { Vehicle, Yacht, VehicleTag, YachtTag } from '$lib/types';

	export let items: Vehicle[] | Yacht[] = [];
	export let title: string = '';
	export let viewAllLink: string = '';
	export let itemType: 'vehicle' | 'yacht' = 'vehicle';

	let visible = false;
	onMount(() => {
		visible = true;
	});

	function isYacht(item: Vehicle | Yacht): item is Yacht {
		return 'specs' in item;
	}
</script>

<div
	class="w-full"
	class:bg-gradient-to-br={itemType === 'yacht'}
	class:from-[#1C1C1C]={itemType === 'yacht'}
	class:via-[#1e1e1e]={itemType === 'yacht'}
	class:to-[#141414]={itemType === 'yacht'}
>
	<div class="max-w-8xl container mx-auto px-4 py-16">
		{#if visible}
			<h3
				in:fly={{ duration: 800, delay: 0, x: -50 }}
				class="mb-12 text-center text-4xl font-bold leading-tight text-white md:text-5xl"
			>
				{title}
			</h3>
			<div class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each items as item, index}
					{#if itemType === 'vehicle' ? index < 8 : index < 4}
						<a
							href={`/${itemType}/${item.id}`}
							class="group relative block h-72 w-full transform overflow-hidden rounded-xl bg-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
						>
							<div
								class="aspect-[16/10] w-full overflow-hidden"
								in:fly={{ duration: 800, delay: index * 200, x: -50 }}
							>
								{#if item.images && item.images.length > 0}
									{#if item.images.length > 1}
										<Carousel
											class="pointer-events-none;"
											let:Controls
											let:Indicators
											duration={Math.floor(
												Math.random() * (5000 - 3000 + 1)
											) + 3000}
											images={item.images.map((img) => ({
												src: `${img.url}`,
												alt: `${item.make} ${item.model}`
											}))}
											style="width: 100px; object-fit: cover; height:18rem; width: 100%; position: fixed; pointer-events: none;"
										>
											<div
												class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white"
											>
												<h3
													class="line-clamp-2 text-xl font-bold tracking-tight"
												>
													{item.make}
													{item.model}
												</h3>
												<div class="mt-2 flex items-center justify-between">
													<p class="text-sm text-gray-300">
														{#if isYacht(item)}
															{item.specs.length} | {item.specs
																.guests} Guests
														{:else}
															{item.year}
														{/if}
													</p>
													<p class="font-semibold text-[#0bd3d3]">
														${item.price}/day
													</p>
												</div>
											</div>
										</Carousel>
									{:else if item.images.length == 1}
										<img
											src={`${item.images[0]?.url}`}
											alt={`${item.make} ${item.model}`}
											class="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
											on:error={(e) => {
												const target = e.target as HTMLImageElement;
												target.style.display = 'none';
												target.nextElementSibling?.classList.remove(
													'hidden'
												);
											}}
										/>
										<div
											class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white"
										>
											<h3
												class="line-clamp-2 text-xl font-bold tracking-tight"
											>
												{item.make}
												{item.model}
											</h3>
											<div class="mt-2 flex items-center justify-between">
												<p class="text-sm text-gray-300">
													{#if isYacht(item)}
														{item.specs.length} | {item.specs.guests} Guests
													{:else}
														{item.year}
													{/if}
												</p>
												<p class="font-semibold text-[#0bd3d3]">
													${item.price}/day
												</p>
											</div>
										</div>
									{/if}
								{:else}
									<div
										class="flex h-full w-full items-center justify-center bg-gray-800"
									>
										<span class="text-gray-400">No image available</span>
										<div
											class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/0 p-4 text-white"
										>
											<h3
												class="line-clamp-2 text-xl font-bold tracking-tight"
											>
												{item.make}
												{item.model}
											</h3>
											<div class="mt-2 flex items-center justify-between">
												<p class="text-sm text-gray-300">
													{#if isYacht(item)}
														{item.specs.length} | {item.specs.guests} Guests
													{:else}
														{item.year}
													{/if}
												</p>
												<p class="font-semibold text-[#0bd3d3]">
													${item.price}/day
												</p>
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
				<SecondaryButton href={viewAllLink} type="submit" text="View All" />
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.carousel-item) {
		transition: transform 0.5s ease-in-out !important;
	}
</style>
