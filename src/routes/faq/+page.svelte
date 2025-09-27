<script lang="ts">
    import Accordion from '$lib/assets/components/Home/Accordion.svelte';
    import { faqData } from '$lib/data/faq';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { theme } from '$lib/stores/theme';

    let contentVisible = $state(false);

    onMount(() => {
        setTimeout(() => {
            contentVisible = true;
        }, 100);
    });
</script>

<svelte:head>
	<title>FAQ | Macro Exotics</title>
	<meta name="description" content="Find answers to frequently asked questions about luxury car and yacht rentals with Macro Exotics in Miami. Learn about our rental process, requirements, and services." />
	<meta name="title" content="FAQ | Macro Exotics" />
	<meta name="keywords" content="Macro Exotics FAQ, Luxury Car Rental Questions, Yacht Rental FAQ, Miami Car Rental Help" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1C1C1C" />

	<meta property="og:title" content="FAQ | Macro Exotics" />
	<meta property="og:description" content="Find answers to frequently asked questions about luxury car and yacht rentals with Macro Exotics in Miami. Learn about our rental process, requirements, and services." />
	<meta property="og:url" content="https://macroexotics.com/faq" />
	<meta property="og:image" content="https://macroexotics.com/logo-square-768.png" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Macro Exotics" />
	<link rel="canonical" href="https://macroexotics.com/faq" />
</svelte:head>

<div class="min-h-screen {$theme === 'dark' ? 'bg-primary-dark' : 'bg-white'} py-16">
    {#if contentVisible}
        <div class="container mx-auto px-4">
            <div class="mb-16 text-center" in:fly={{ y: 50, duration: 400, delay: 200 }}>
                <h1 class="mb-4 text-4xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'} md:text-5xl">Frequently Asked Questions</h1>
                <p class="text-xl {$theme === 'dark' ? 'text-gray-400' : 'text-primary-muted'}">Find answers to common questions about our services</p>
            </div>
            
            <div in:fly={{ y: 50, duration: 400, delay: 400 }}>
                <Accordion faqs={faqData} showAll={true} isHomePage={false} />
            </div>
        </div>
    {/if}
</div> 