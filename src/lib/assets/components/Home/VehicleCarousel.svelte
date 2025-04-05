<script lang="ts">
	import { Carousel } from 'flowbite-svelte';
	import { baseUrl } from '$lib/index';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { Vehicle, Yacht, VehicleTag, YachtTag } from '$lib/types';
	import { theme } from '$lib/stores/theme';

	export let items: Vehicle[] | Yacht[] = [];
	export let title: string = '';
	export let viewAllLink: string = '';
	export let itemType: 'car' | 'yacht' = 'car';

	let visible = false;
	onMount(() => {
		visible = true;
	});

	function isYacht(item: Vehicle | Yacht): item is Yacht {
		return (item as any).vehicleType === 'yacht';
	}

	// Safe getter function for yacht specs
	function getYachtInfo(yacht: any) {
		const specs = yacht.specs || {};
		return {
			length: specs.length || 'N/A',
			guests: specs.guests || yacht.capacity || 0
		};
	}
</script>

<div
	class="w-full {itemType === 'yacht' && $theme === 'dark' ? 'bg-gradient-to-br' : ''} 
	{itemType === 'yacht' && $theme === 'dark' ? 'from-[#1C1C1C] via-[#1e1e1e] to-[#141414]' : ''}
	{itemType === 'yacht' && $theme === 'light' ? 'bg-white' : ''}
	{$theme === 'dark' && itemType !== 'yacht' ? 'bg-transparent' : ''}
	{$theme === 'light' && itemType !== 'yacht' ? 'bg-white' : ''}">
	<div class="max-w-8xl container mx-auto px-4 py-16">
		{#if visible}
			<h3
				in:fly={{ y: 50, duration: 1000, delay: 200 }}
				class="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">
				{title}
			</h3>
			<div class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each items as item, index}
					{#if itemType === 'car' ? index < 8 : index < 4}
						<a
							href={`/${itemType === 'car' ? 'vehicle' : "yacht"}/${item.id}${item.userId ? `?userId=${item.userId}` : ''}`}
							class="group relative blockGallery h-72 w-full transform overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl {$theme === 'dark' ? 'bg-white/5' : 'bg-[#8393AA]/10'}">
							<div
								class="aspect-[16/10] w-full overflow-hidden"
								in:fly={{ y: 50, duration: 1000, delay: 400 + (index * 200) }}>
								{#if item.images && item.images.length > 0}
									{#if item.images.length > 1}
										<Carousel
											class="pointer-events-none;"
											let:Controls
											let:Indicators
											duration={Math.floor(
												Math.random() * (5000 - 3000 + 1)
											) + 3000}
											images={item.images.map((img) => {
												return {
													src: `${img?.urls ? img?.urls.large : img?.url}`,
													alt: img?.alt || `${item.make} ${item.model}`
												};
											})}
											style="width: 100px; object-fit: cover; height:18rem; width: 100%; position: fixed; pointer-events: none;">
											<div
												class="fixed bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t {$theme === 'dark' ? 'from-black/90 to-black/0' : 'from-black/80 via-[#513954]/70 to-transparent'}">
												<h3
													class="line-clamp-2 text-xl font-bold tracking-tight ">
													{item.make}
													{item.model}
												</h3>
												<div class="mt-2 flex items-center justify-between">
													<p class="text-sm {$theme === 'dark' ? 'text-gray-300' : 'text-white'}">
														{#if isYacht(item)}
															{item.specs.length} | {item.specs.guests} Guests
														{:else}
															{item.year}
														{/if}
													</p>
													<p class="font-semibold {$theme === 'dark' ? 'text-miami-bright-blue' : 'text-[#08D3D3]'}">
														${new Intl.NumberFormat('en-US').format(item.pricePerDay)}/day
													</p>
												</div>
											</div>
										</Carousel>
									{:else if item.images.length == 1}
										<img
											src={`${item.images[0]?.urls ? item.images[0]?.urls.large : item.images[0]?.url}`}
											alt={`${item.make} ${item.model}`}
											class="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
											on:error={(e) => {
												const target = e.target as HTMLImageElement;
												target.style.display = 'none';
												target.nextElementSibling?.classList.remove(
													'hidden'
												);
											}} />
										<div
											class="fixed bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t {$theme === 'dark' ? 'from-black/90 to-black/0' : 'from-black/80 via-[#513954]/70 to-transparent'}">
											<h3
												class="line-clamp-2 text-xl font-bold tracking-tight">
												{item.make}
												{item.model}
											</h3>
											<div class="mt-2 flex items-center justify-between">
												<p class="text-sm {$theme === 'dark' ? 'text-gray-300' : 'text-white'}">
													{#if isYacht(item)}
														{item.specs.length} | {item.specs.guests} Guests
													{:else}
														{item.year}
													{/if}
												</p>
												<p class="font-semibold {$theme === 'dark' ? 'text-miami-bright-blue' : 'text-miami-bright-blue'}">
													${new Intl.NumberFormat('en-US').format(item.pricePerDay)}/day
												</p>
											</div>
										</div>
									{/if}
								{:else}
									<div
										class="flex h-full w-full items-center justify-center {$theme === 'dark' ? 'bg-gray-800' : 'bg-[#8393AA]/20'}">
										<span class="{$theme === 'dark' ? 'text-gray-400' : 'text-[#513954]'}">No image available</span>
										<div
											class="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t {$theme === 'dark' ? 'from-black/90 to-black/0' : 'from-black/80 via-[#513954]/70 to-transparent'}">
											<h3
												class="line-clamp-2 text-xl font-bold tracking-tight">
												{item.make}
												{item.model}
											</h3>
											<div class="mt-2 flex items-center justify-between">
												<p class="text-sm {$theme === 'dark' ? 'text-gray-300' : 'text-white'}">
													{#if isYacht(item)}
														{item.specs.length} | {item.specs.guests} Guests
													{:else}
														{item.year}
													{/if}
												</p>
												<p class="font-semibold {$theme === 'dark' ? 'text-miami-bright-blue' : 'text-[#8393AA]'}">
													${new Intl.NumberFormat('en-US').format(item.pricePerDay)}/day
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
			<div in:fly={{ y: 50, duration: 1000, delay: 1200 }} class="flex justify-center">
				<SecondaryButton 
					href={viewAllLink} 
					type="submit" 
					text="View All" 
					colorScheme={$theme === 'dark' ? 'dark' : 'dark'}
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.carousel-item) {
		transition: transform 0.5s ease-in-out !important;
	}
</style>
