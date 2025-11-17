<script lang="ts">
	import Hero from '$lib/assets/components/Home/Hero.svelte';
	import Hero2 from '$lib/assets/components/Home/Hero2.svelte';
	import Why from '$lib/assets/components/Home/Why.svelte';
	import VehicleCarousel from '$lib/assets/components/Home/VehicleCarousel.svelte';
	import ShopByMake from '$lib/assets/components/Home/ShopByMake.svelte';
	import Accordion from '$lib/assets/components/Home/Accordion.svelte';
	import Experience from '$lib/assets/components/Home/Experience.svelte';
	import Experience2 from '$lib/assets/components/Home/Experience2.svelte';
	import RallySection from '$lib/assets/components/Home/RallySection.svelte';
	import { faqData } from '$lib/data/faq';
	import type { Vehicle, Yacht } from '$lib/types';
	import { onMount } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { elasticOut, quintOut } from 'svelte/easing';
	import heroImage from '$lib/assets/images/lambo-performante.jpg';
	import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';

	let mounted = false;
	let whyVisible = $state(false);
	let vehicleCarouselVisible = $state(false);
	let shopByMakeVisible = $state(false);
	let yachtCarouselVisible = $state(false);
	let accordionVisible = $state(false);
	let experienceVisible = $state(false);
	let rallyVisible = $state(false);

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
	<link rel="preload" as="image" href={yachtHeroBg} />
</svelte:head>

<div>
	<div in:fade={{ duration: 400 }}>
		<!-- <Hero /> -->
		<Hero2 />
	</div>
	<!-- Rally Section -->
	<!-- <div use:intersectionObserver={(isVisible) => (rallyVisible = isVisible)}>
		{#if rallyVisible}
			<div
				in:fly={{
					y: 30,
					duration: 300,
					easing: quintOut
				}}>
				<RallySection />
			</div>
		{/if}
	</div> -->

	<div use:intersectionObserver={(isVisible) => (vehicleCarouselVisible = isVisible)}>
		{#if vehicleCarouselVisible}
			<div
				in:fly={{
					x: -50,
					duration: 200,
					easing: quintOut
				}}>
				{#if featuredVehicles && featuredVehicles.vehicles && featuredVehicles.vehicles.length > 0}
					<VehicleCarousel
						items={featuredVehicles.vehicles}
						title="Featured Vehicles"
						viewAllLink="/vehicles"
						itemType="car" />
				{:else}
					<div class="container mx-auto py-16 text-center">
						<h3 class="mb-4 text-3xl font-bold text-white">Featured Vehicles</h3>
						<p class="text-white/70">No featured vehicles available at the moment.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (experienceVisible = isVisible)}>
		{#if experienceVisible}
			<div
			class="max500:hidden"
				in:fly={{
					x: -50,
					duration: 300,
					easing: quintOut
				}}>
				<Experience2 />
			</div>
		{/if}
	</div>



	<div use:intersectionObserver={(isVisible) => (whyVisible = isVisible)}>
		{#if whyVisible}
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

	<div use:intersectionObserver={(isVisible) => (shopByMakeVisible = isVisible)}>
		{#if shopByMakeVisible}
			<div
				in:fly={{
					y: 30,
					duration: 300,
					easing: quintOut
				}}>
				<Why />
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
					<div class="container mx-auto py-16 text-center">
						<h3 class="mb-4 text-3xl font-bold text-white">Featured Yachts</h3>
						<p class="text-white/70">No featured yachts available at the moment.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (accordionVisible = isVisible)}>
		{#if accordionVisible}
			<div
				in:fly={{
					y: 50,
					duration: 300,
					easing: quintOut
				}}>
				<div class="relative">
					<Accordion faqs={faqData} isHomePage={true} />
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	div {
		min-height: 50px;
	}
</style>
