<script lang="ts">
	import Hero from '$lib/assets/components/Home/Hero.svelte';
	import Why from '$lib/assets/components/Home/Why.svelte';
	import VehicleCarousel from '$lib/assets/components/Home/VehicleCarousel.svelte';
	import Accordion from '$lib/assets/components/Home/Accordion.svelte';
	import Experience from '$lib/assets/components/Home/Experience.svelte';
	import { faqData } from '$lib/data/faq';
	import { vehicles } from '$lib/constants/Vehicles';
	import { yachts } from '$lib/constants/Yachts';
	import type { Vehicle, Yacht } from '$lib/types';
	import { onMount } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { elasticOut, quintOut } from 'svelte/easing';

	let mounted = false;
	let whyVisible = false;
	let vehicleCarouselVisible = false;
	let yachtCarouselVisible = false;
	let accordionVisible = false;
	let experienceVisible = false;

	export let data;
	const { featuredVehicles } = data;

	function intersectionObserver(node: HTMLElement, callback: (isVisible: boolean) => void) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						callback(true);
					}
				});
			},
			{
				threshold: 0.5
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
</svelte:head>

<div>
	<div in:fade={{ duration: 1000 }}>
		<Hero />
	</div>

	<div use:intersectionObserver={(isVisible) => (experienceVisible = isVisible)}>
		{#if experienceVisible}
			<div
				in:fly={{
					x: -100,
					duration: 1000,
					easing: quintOut
				}}>
				<Experience />
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (vehicleCarouselVisible = isVisible)}>
		{#if vehicleCarouselVisible}
			<div
				in:fly={{
					x: -100,
					duration: 3000,
					easing: quintOut
				}}>
				<VehicleCarousel
					items={featuredVehicles.vehicles}
					title="Featured Vehicles"
					viewAllLink="/vehicles"
					itemType="vehicle" />
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (whyVisible = isVisible)}>
		{#if whyVisible}
			<div
				in:fly={{
					y: 50,
					duration: 800,
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
					x: -100,
					duration: 3000,
					easing: quintOut
				}}>
				<VehicleCarousel
					items={yachts as Yacht[]}
					title="Featured Yachts"
					viewAllLink="/yachts"
					itemType="yacht" />
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (accordionVisible = isVisible)}>
		{#if accordionVisible}
			<div
				in:fly={{
					y: 100,
					duration: 2000,
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
