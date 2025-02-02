<script lang="ts">
	import Hero from '$lib/assets/components/Home/Hero.svelte';
	import Why from '$lib/assets/components/Home/Why.svelte';
	import Benefits from '$lib/assets/components/Home/Benefits.svelte';
	import Carousel from '$lib/assets/components/Home/Carousel.svelte';
	import Accordion from '$lib/assets/components/Home/Accordion.svelte';
	import { faqData } from '$lib/data/faq';
	import { onMount } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { elasticOut, quintOut } from 'svelte/easing';

	let mounted = false;
	let whyVisible = false;
	let carouselVisible = false;
	let benefitsVisible = false;
	let accordionVisible = false;

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
	<title>Macro Exotics</title>
	<meta name="description" content="Macro Exotics" />
	<meta name="title" content="Macro Exotics" />
	<meta name="keywords" content="Macro Exotics" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="og:title" content="Macro Exotics" />
	<meta name="og:description" content="Macro Exotics" />
	<meta name="og:url" content="https://macroexotics.com" />
	<meta name="theme-color" content="#1C1C1C" />

	<!-- Need to replace these images with real images-->
	<meta name="og:image" content="https://macroexotics.com/logo-square-768.png" />
	<meta name="og:type" content="website" />
	<meta name="og:locale" content="en_US" />
	<meta name="og:site_name" content="Macro Exotics" />
	<link rel="canonical" href="https://macroexotics.com" />

	<!-- Need to replace this favicon with real images-->
	<link rel="icon" href="https://macroexotics.com/favicon.ico" />
</svelte:head>

<div>
	<div in:fade={{ duration: 1000 }}>
		<Hero />
	</div>

	<div use:intersectionObserver={(isVisible) => (whyVisible = isVisible)}>
		{#if whyVisible}
			<div
				in:fly={{
					x: -100,
					duration: 1000,
					easing: quintOut
				}}
			>
				<Why />
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (carouselVisible = isVisible)}>
		{#if carouselVisible}
			<div
				in:fly={{
					x: -100,
					duration: 3000,
					easing: quintOut
				}}
			>
				<Carousel />
			</div>
		{/if}
	</div>

	<div use:intersectionObserver={(isVisible) => (benefitsVisible = isVisible)}>
		{#if benefitsVisible}
			<div
				in:fly={{
					y: 50,
					duration: 800,
					easing: quintOut
				}}
			>
				<Benefits />
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
				}}
			>
				<Accordion faqs={faqData} />
			</div>
		{/if}
	</div>
</div>

<style>
	div {
		min-height: 50px;
	}
</style>
