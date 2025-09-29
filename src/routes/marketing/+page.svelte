<script lang="ts">
	import Hero from '$lib/assets/components/Marketing/Hero.svelte';
	import About from '$lib/assets/components/Marketing/About.svelte';
	import Services from '$lib/assets/components/Marketing/Services.svelte';
	import Experiences from '$lib/assets/components/Marketing/Experiences.svelte';
</script>

<svelte:head>
	<title>Marketing - Macro Exotics | Exclusive Luxury Car & Yacht Club</title>
	<meta name="description" content="Join Macro Exotics - the premier peer-to-peer luxury club connecting wealthy individuals who share a passion for exclusive cars and yachts. Experience unparalleled luxury with our concierge services." />
</svelte:head>

<main class="min-h-screen bg-white dark:bg-black">
	<Hero />
	<About />
	<Services />
	<Experiences />
</main>