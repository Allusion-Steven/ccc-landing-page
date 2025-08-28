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
	<div class="max-w-8xl container mx-auto px-4 py-16">
		{#if visible}
			<h3
				in:fly={{ y: 30, duration: 200, delay: 50 }}
				class="mb-12 text-center text-4xl font-bold leading-tight md:text-5xl {$theme === 'dark'
					? 'text-white'
					: 'text-primary-accent'}">
				Browse by Make
			</h3>

			<div class="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 mb-8 justify-items-center">
				{#each brands as brand, index}
					<a
						href={buildBrandLink(brand.slug)}
						class="group relative aspect-square w-full max-w-[200px] md:max-w-[220px] lg:max-w-[240px] transition-all duration-300 hover:scale-[1.02] "
						in:fly={{ y: 30, duration: 200, delay: 100 + index * 50 }}>
						
						<div class="absolute inset-0 flex items-center justify-center p-4">
							{#if brand.logo}
								<div class="w-full h-full bg-black   transition-colors duration-300 flex items-center justify-center rounded-xl">
									<img src={brand.logo} alt="{brand.name} logo" class="w-[90%] h-[90%] object-contain rounded-xl" />
								</div>
							{:else}
								<div class="w-20 h-20 rounded-full border-1 border-white/50 flex items-center justify-center bg-white/10 ">
									<span class="text-white text-2xl font-bold">{brand.name.charAt(0)}</span>
								</div>
							{/if}
						</div>
					</a>
				{/each}
			</div>

			<!-- Mobile Horizontal Scroll -->
			<div class="md:hidden">
				<div class="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide">
					{#each brands as brand, index}
						<a
							href={buildBrandLink(brand.slug)}
							class="group relative aspect-square w-32 h-32 flex-shrink-0 transform overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] snap-center "
							in:fly={{ x: 30, duration: 200, delay: 100 + index * 30 }}>
							
							<!-- Brand Logo -->
							<div class="absolute inset-0 flex items-center justify-center p-2">
								{#if brand.logo}
									<div class="w-full h-full bg-white/15 group-hover:bg-white/20 transition-colors duration-300 flex items-center justify-center rounded-lg shadow-sm">
										<img src={brand.logo} alt="{brand.name} logo" class="w-[85%] h-[85%] object-contain rounded-lg" />
									</div>
								{:else}
									<div class="w-16 h-16 rounded-full border-1 border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
										<span class="text-white text-lg font-bold">{brand.name.charAt(0)}</span>
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
							<div class="w-2 h-2 rounded-full {$theme === 'dark' ? 'bg-white/30' : 'bg-gray-400/50'}"></div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Call to Action -->
			<div in:fly={{ y: 30, duration: 200, delay: 400 }} class="flex justify-center mt-8">
				<a
					href="/vehicles"
					class="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 {$theme === 'dark'
						? 'bg-primary-accent text-white hover:bg-primary-accent/80 hover:shadow-lg'
						: 'bg-primary-accent text-white hover:bg-primary-accent/90 hover:shadow-lg'}">
					View All Vehicles
					<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</a>
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