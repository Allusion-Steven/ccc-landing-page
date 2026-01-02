<script lang="ts">
	import VehicleCarousel from '$lib/assets/components/Home/VehicleCarousel.svelte';
	import VehicleCardUpdated from '$lib/assets/components/Home/VehicleCardUpdated.svelte';
	import FeaturedCarCarousel from '$lib/assets/components/Home/FeaturedCarCarousel.svelte';
	import ShopByMake from '$lib/assets/components/Home/ShopByMake.svelte';
	import type { Vehicle, Yacht } from '$lib/types';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import heroImage from '$lib/assets/images/miami-car-group.png';
	import { theme } from '$lib/stores/theme.js';
	import PrimaryButton from '$lib/assets/components/buttons/PrimaryButton.svelte';
	import SecondaryButton from '$lib/assets/components/buttons/SecondaryButton.svelte';
	import { dashboardUrl } from '$lib';

	let mounted = $state(false);
	let vehicleCarouselVisible = $state(false);
	let featuredCarCarouselVisible = $state(false);
	let featuredYachtCarouselVisible = $state(false);
	let shopByMakeVisible = $state(false);
	let yachtCarouselVisible = $state(false);

	let { data } = $props();
	const { featuredVehicles, featuredYachts } = data;

	function intersectionObserver(node: HTMLElement, callback: (isVisible: boolean) => void) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						callback(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '50px'
			}
		);

		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Home | Macro Exotics</title>
	<meta
		name="description"
		content="Experience luxury car and yacht rentals in Miami with Macro Exotics. Premium vehicles, exceptional service, and unforgettable experiences." />
	<meta name="title" content="Home | Macro Exotics" />
	<meta
		name="keywords"
		content="Luxury Car Rental, Miami, Exotic Cars, Yacht Rentals, Macro Exotics" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1C1C1C" />

	<meta property="og:title" content="Home | Macro Exotics" />
	<meta
		property="og:description"
		content="Experience luxury car and yacht rentals in Miami with Macro Exotics. Premium vehicles, exceptional service, and unforgettable experiences." />
	<meta property="og:url" content="https://macroexotics.com" />
	<meta property="og:image" content="https://macroexotics.com/favicon.png" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Macro Exotics" />
	<link rel="canonical" href="https://macroexotics.com" />

	<!-- Need to replace this favicon with real images-->
	<link rel="icon" href="https://macroexotics.com/favicon.png" />
	<link rel="preload" as="image" href={heroImage} />
</svelte:head>

<div>
	<!-- Hero Section -->
	<section class="relative h-[70vh] min-h-[500px] overflow-hidden">
		<div class="absolute inset-0">
			<img src={heroImage} alt="Luxury exotic car" class="h-full w-full object-cover" />
			<div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		</div>

		<div class="relative z-10 flex h-full items-center">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				{#if mounted}
					<div class="max-w-2xl text-center" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
						<div class="mb-6 h-[1px] w-16 bg-white/60  text-center mx-auto"></div>
						<h1 class="mb-6 text-5xl font-light tracking-tight text-white md:text-7xl">
							Curated
							<span class="block italic">Luxury</span>
						</h1>
						<p class="text-xl font-light leading-relaxed text-white/70">
							Premier collection of exotic automobiles and luxury yachts,
							available for those who appreciate the extraordinary.
						</p>
						<div class="mt-8 flex flex-wrap gap-4" in:fly={{ y: 20, duration: 600, delay: 200, easing: quintOut }}>
							<SecondaryButton
							href={dashboardUrl}
							type="submit"
							className=" text-center mx-auto my-0 hover:bg-transparent hover:text-white"
							text="Join the Club"
							colorScheme={$theme === 'dark' ? 'dark' : 'light'} />
							<!-- <SecondaryButton href="/yachts" text="Browse Yachts" colorScheme="dark" /> -->
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<div use:intersectionObserver={(isVisible) => (featuredCarCarouselVisible = isVisible)}>
		{#if featuredCarCarouselVisible}
			<div
				in:fly={{
					y: 50,
					duration: 300,
					easing: quintOut
				}}>
				{#if featuredVehicles && featuredVehicles.vehicles && featuredVehicles.vehicles.length > 0}
				<div class="{ $theme === 'dark' ? 'bg-[#353E43]' : '' }">
					<div class="md:px-[1%] px-4 pt-16 pb-4 max-w-[1620px] mx-auto">
						<h2 class="text-4xl md:text-5xl font-bold tracking-tight { $theme === 'dark' ? 'text-white' : 'text-black' }">
							Featured <span class="text-miami-hotPink">Cars</span>
						</h2>
						<p class="mt-2 text-lg { $theme === 'dark' ? 'text-white/70' : 'text-black/60' }">
							Experience style and performance with a wide variety of exotic cars
						</p>
						<div class="mt-4 h-[5px] w-full { $theme === 'dark' ? 'bg-white' : 'bg-[#2a3136]' }"></div>
					</div>
					<FeaturedCarCarousel items={featuredVehicles.vehicles} />
				</div>
				{/if}
			</div>
		{/if}	
	</div>

	<div use:intersectionObserver={(isVisible) => (featuredYachtCarouselVisible = isVisible)}>
		{#if featuredYachtCarouselVisible}
			<div
				in:fly={{
					y: 50,
					duration: 300,
					easing: quintOut
				}}>
				{#if featuredYachts && featuredYachts.vehicles && featuredYachts.vehicles.length > 0}
				<div class="{ $theme === 'dark' ? 'bg-[#353E43]' : '' }">
					<div class="md:px-[1%] px-4 pt-16 pb-4 text-right max-w-[1620px] mx-auto">
						<h2 class="text-4xl md:text-5xl font-bold tracking-tight { $theme === 'dark' ? 'text-white' : 'text-black' }">
							Featured <span class="text-miami-brightBlue">Yachts</span>
						</h2>
						<p class="mt-2 text-lg { $theme === 'dark' ? 'text-white/70' : 'text-black/60' }">
							Cruise the Miami waters in ultimate luxury
						</p>
						<div class="mt-4 h-[5px] w-full { $theme === 'dark' ? 'bg-white' : 'bg-[#2a3136]' }"></div>
					</div>
					<FeaturedCarCarousel items={featuredYachts.vehicles} itemType="yacht" />
				</div>
				{/if}
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (vehicleCarouselVisible = isVisible)}>
		{#if vehicleCarouselVisible}
			<div
				in:fly={{
					x: -50,
					duration: 200,
					easing: quintOut
				}}>
				{#if featuredVehicles && featuredVehicles.vehicles && featuredVehicles.vehicles.length > 0}
					<div class="md:px-[5%] mx-auto py-16 px-4 max-w-8xl container">
						<h3 class="mb-12 text-center text-4xl font-bold { $theme === 'dark' ? 'text-white' : 'text-black' }">Featured Vehicles</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
							{#each featuredVehicles.vehicles.slice(3, 11) as vehicle, index}
								<VehicleCardUpdated
									item={vehicle}
									itemType="car"
									{index} />
							{/each}
						</div>
						<div class="flex justify-center mt-6">
							<SecondaryButton text="View All" className=""/>
						</div>
					</div>

				{:else}
					<div class="container mx-auto py-16 text-center">
						<h3 class="mb-4 text-3xl font-bold text-white">Featured Vehicles</h3>
						<p class="text-white/70">No featured vehicles available at the moment.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (shopByMakeVisible = isVisible)}>
		{#if shopByMakeVisible}
			<div
				in:fly={{
					y: 30,
					duration: 200,
					easing: quintOut
				}}>
				<ShopByMake />
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (yachtCarouselVisible = isVisible)}>
		{#if yachtCarouselVisible}
			<div
				in:fly={{
					x: -50,
					duration: 300,
					easing: quintOut
				}}>
				{#if featuredYachts && featuredYachts.vehicles && featuredYachts.vehicles.length > 0}
					<VehicleCarousel
						items={featuredYachts.vehicles}
						title="Featured Yachts"
						viewAllLink="/yachts"
						itemType="yacht" />
				{:else}
					<div class="container mx-auto py-16 text-center ">
						<h3 class="mb-4 text-3xl font-bold text-white text-right ">Featured Yachts</h3>
						<p class="text-white/70">No featured yachts available at the moment.</p>
						<div class='h-10 bg-orange-600 w-full'></div>
					</div>
				{/if}
			</div>
		{/if}
	</div>

</div>

<style>
	div {
		min-height: 2px;
		border-radius: 10px;
	}
</style>
