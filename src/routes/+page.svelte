<script>
	import Hero from '$lib/assets/components/Home/Hero.svelte';
	import Why from '$lib/assets/components/Home/Why.svelte';
	import Benefits from '$lib/assets/components/Home/Benefits.svelte';
	import Carousel from '$lib/assets/components/Home/Carousel.svelte';
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

<Hero />
<Why />
<Carousel />
<Benefits />
