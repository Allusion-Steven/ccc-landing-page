<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import mclarenLogo from '$lib/assets/images/maclaren.jpg';
	import lamborghiniLogo from '$lib/assets/images/lamborghini.jpg';
	import rollsRoyceLogo from '$lib/assets/images/rolls-royce.jpg';
	import bentleyLogo from '$lib/assets/images/bentley.jpg';
	import cadillacLogo from '$lib/assets/images/cadiallac.jpg';
	import rangeRoverLogo from '$lib/assets/images/range-rover.jpg';
	import mercedesLogo from '$lib/assets/images/mercedes.jpg';
	import ferrariLogo from '$lib/assets/images/ferrari.jpg';
	import porscheLogo from '$lib/assets/images/porsche.jpg';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';

	let visible = false;
	onMount(() => {
		visible = true;
	});

	// Define luxury car brands with placeholder brand info
	const brands = [
		{
			name: 'Lamborghini',
			slug: 'lamborghini',
			gradient: 'from-yellow-400 to-orange-500',
			accentColor: 'text-yellow-400',
			logo: lamborghiniLogo
		},
		{
			name: 'Rolls Royce',
			slug: 'Rolls',
			gradient: 'from-purple-400 to-indigo-500',
			accentColor: 'text-purple-400',
			logo: rollsRoyceLogo
		},
		{
			name: 'McLaren',
			slug: 'mclaren',
			gradient: 'from-orange-400 to-red-500',
			accentColor: 'text-orange-400',
			logo: mclarenLogo
		},
		{
			name: 'Porsche',
			slug: 'porsche',
			gradient: 'from-red-400 to-pink-500',
			accentColor: 'text-red-400',
			logo: porscheLogo
		},
		{
			name: 'Ferrari',
			slug: 'ferrari',
			gradient: 'from-red-500 to-red-600',
			accentColor: 'text-red-500',
			logo: ferrariLogo
		},
		{
			name: 'Bentley',
			slug: 'bentley',
			gradient: 'from-green-400 to-emerald-500',
			accentColor: 'text-green-400',
			logo: bentleyLogo
		},
		{
			name: 'Mercedes',
			slug: 'mercedes',
			gradient: 'from-gray-400 to-slate-500',
			accentColor: 'text-gray-400',
			logo: mercedesLogo
		},
		{
			name: 'Range Rover',
			slug: 'range',
			gradient: 'from-emerald-400 to-teal-500',
			accentColor: 'text-emerald-400',
			logo: rangeRoverLogo
		},
		{
			name: 'Cadillac',
			slug: 'cadillac',
			gradient: 'from-blue-400 to-indigo-500',
			accentColor: 'text-blue-400',
			logo: cadillacLogo
		}
	];

	// Build link for brand filtering
	function buildBrandLink(brandSlug: string): string {
		return `/vehicles?make=${encodeURIComponent(brandSlug)}`;
	}
</script>

<div
	class="w-full mx-auto light:bg-white dark:bg-[#1C1C1C]/70">
	<div class="max-w-8xl container mx-auto px-4 py-4">
		{#if visible}
			<h3
				in:fly={{ y: 30, duration: 200, delay: 50 }}
				class="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl {$theme === 'dark'
					? 'text-white'
					: 'text-primary-accent'}">
				Browse by Make
			</h3>

			<div class="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 mb-8 gap-3 justify-items-center">
				{#each brands as brand, index}
					<a
						href={buildBrandLink(brand.slug)}
						class="rounded-xl bg-black p-2 group relative aspect-square w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] transition-all duration-300 hover:scale-[1.02] "
						in:fly={{ y: 30, duration: 200, delay: 100 + index * 50 }}>
						
							{#if brand.logo}
								<div class="w-full h-full  p-2 transition-colors duration-300 flex items-center justify-center rounded-xl">
									<img src={brand.logo} alt="{brand.name} logo" class="w-[90%] h-[90%] object-contain rounded-xl" />
								</div>

							{/if}
					</a>
				{/each}
			</div>

			<!-- Mobile Horizontal Scroll -->
			<div class="md:hidden">
				<div class="flex gap-3 overflow-x-auto p-4 snap-x snap-mandatory scrollbar-hide">
					{#each brands as brand, index}
						<a
							href={buildBrandLink(brand.slug)}
							class="bg-black group relative aspect-square w-32 h-32 flex-shrink-0 transform overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] snap-center "
							in:fly={{ x: 30, duration: 200, delay: 100 + index * 30 }}>
							
							<!-- Brand Logo -->
							<div class="absolute inset-0 flex items-center bg-black justify-center p-2">
								{#if brand.logo}
									<div class="w-full h-full  transition-colors duration-300 flex items-center justify-center rounded-lg shadow-sm">
										<img src={brand.logo} alt="{brand.name} logo" class="w-[85%] h-[85%] object-contain rounded-lg" />
									</div>

								{/if}
							</div>
						</a>
					{/each}
				</div>

				<!-- Scroll Indicator -->
				<div class="flex justify-center mt-4">
					<div class="flex space-x-2">
						{#each brands as _, index}
							<div class="w-2 h-2 rounded-full {$theme === 'dark' ? 'bg-black' : 'bg-gray-400/50'}"></div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Call to Action -->
			<div in:fly={{ y: 30, duration: 200, delay: 400 }} class="flex justify-center mt-8">
				<SecondaryButton href="/vehicles" text="View All Vehicles" colorScheme={$theme === 'dark' ? 'dark' : 'light'} />

			</div>
		{/if}
	</div>
</div>

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* Smooth scroll for mobile carousel */
	.snap-x {
		scroll-behavior: smooth;
	}
</style>