<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { pricingTiers } from '$lib/constants/Pricing';
	import { fly, fade } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';
	import { loginUrl } from '$lib';

	let selectedTier = $state<string | null>('VIP');
	let contentVisible = $state(false);

	onMount(() => {
		// Small delay to ensure smooth animation
		setTimeout(() => {
			contentVisible = true;
		}, 100);
	});

	function handleTierSelect(tierName: string) {
		selectedTier = selectedTier === tierName ? null : tierName;
	}
</script>
<svelte:head>
	<title>Membership Plans & Pricing | Macro Exotics</title>
	<meta name="description" content="Choose from our exclusive membership tiers at Macro Exotics. Access premium luxury cars and yachts with VIP benefits, concierge service, and priority bookings." />
	<meta name="title" content="Membership Plans & Pricing | Macro Exotics" />
	<meta name="keywords" content="Macro Exotics membership, luxury car subscription, VIP car rental, exclusive car club Miami, luxury vehicle membership, yacht club membership" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1C1C1C" />

	<meta property="og:title" content="Membership Plans & Pricing | Macro Exotics" />
	<meta property="og:description" content="Choose from our exclusive membership tiers at Macro Exotics. Access premium luxury cars and yachts with VIP benefits, concierge service, and priority bookings." />
	<meta property="og:url" content="https://macroexotics.com/pricing" />
	<meta property="og:image" content="https://macroexotics.com/logo-square-768.png" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Macro Exotics" />
	<link rel="canonical" href="https://macroexotics.com/pricing" />
	<link rel="icon" href="https://macroexotics.com/favicon.png" />
</svelte:head>
<div
	class="min-h-screen overflow-x-hidden {$theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'} py-20"
>
	<div class="container mx-auto px-4">
		{#if contentVisible}
			<!-- Header Section -->

			<div class="sm:mb-16 text-center" in:fly={{ y: 50, duration: 400, delay: 200 }}>
				<h1 class="mb-4 text-4xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'} md:text-5xl">Choose Your Membership</h1>
				<p class="text-xl {$theme === 'dark' ? 'text-gray-400' : 'text-primary-muted'}">
					Select the perfect plan for your luxury driving experience
				</p>
			</div>

			<!-- Pricing Cards Container -->
			<div class="grid gap-8 md:grid-cols-3" in:fly={{ y: 50, duration: 400, delay: 400 }}>
				{#each pricingTiers as tier, i}
					<div
						class="relative flex flex-col {tier.highlighted
							? 'md:scale-105 transform'
							: ''} z-0 mt-6 hover:z-10"
						onclick={() => handleTierSelect(tier.name)}
						onkeydown={(e) => e.key === 'Enter' && handleTierSelect(tier.name)}
						role="button"
						tabindex="0"
						in:fly={{ x: 50, duration: 300, delay: 600 + i * 150 }}
					>
						<!-- Highlight badge for premium plan -->
						{#if tier.highlighted}
							<div class="absolute -top-6 left-1/2 z-30 -translate-x-1/2 transform">
								<span
									class="whitespace-nowrap rounded-full bg-miami-pink px-4 py-1 text-sm font-semibold text-white"
								>
									Most Popular
								</span>
							</div>
						{/if}

						<!-- Selection flag -->
						{#if selectedTier === tier.name}
							<div class="absolute -right-2 -top-2 z-20">
								<span
									class="flex h-8 w-8 items-center justify-center rounded-full bg-miami-pink shadow-lg"
								>
									<svg
										class="h-5 w-5 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								</span>
							</div>
						{/if}

						<div
							class="flex h-full flex-col rounded-2xl {selectedTier === tier.name
								? $theme === 'dark' 
									? 'bg-gradient-to-br from-miami-dark via-miami-purple to-miami-dark'
									: 'bg-gradient-to-br from-miami-pink/10 via-miami-light-pink/10 to-miami-pink/10'
								: $theme === 'dark'
									? 'bg-gray-800'
									: 'bg-white'} cursor-pointer p-4 md:p-8 shadow-xl transition-all duration-300 md:hover:scale-105 hover:scale-100"
						>
							<div class="mb-6 md:mb-8">
								<h2 class="mb-2 text-xl md:text-2xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">{tier.name}</h2>
								<div class="mb-4">
									<span class="text-3xl md:text-4xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">{tier.price}</span>
									<span class="{$theme === 'dark' ? 'text-gray-400' : 'text-primary-muted'}">/month</span>
								</div>
								<p class="text-sm md:text-base {$theme === 'dark' ? 'text-gray-400' : 'text-primary-muted'}">{tier.description}</p>
							</div>

							<div class="mb-6 md:mb-8 flex-grow">
								<ul class="space-y-3 md:space-y-4">
									{#each tier.features as feature}
										<li class="flex items-center text-sm md:text-base {$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">
											<svg
												class="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-miami-pink"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M5 13l4 4L19 7"
												></path>
											</svg>
											{feature}
										</li>
									{/each}
								</ul>
							</div>

							<Button
								class="w-full rounded-lg {selectedTier === tier.name
									? 'bg-miami-pink text-white hover:bg-miami-pink/80'
									: $theme === 'dark'
										? 'bg-gray-700 text-white hover:bg-gray-600'
										: 'bg-gray-100 text-primary-accent hover:bg-gray-200'} py-2 md:py-3 text-center text-sm md:text-base font-semibold transition-colors"
								href={loginUrl}
							>
								{selectedTier === tier.name ? `Join The ${tier.name} Club` : 'Get Started'}
							</Button>
						</div>
					</div>
				{/each}
			</div>

			<!-- Additional Info -->
			<div class="mt-16 text-center" in:fly={{ y: 50, duration: 400, delay: 1200 }}>
				<p class="{$theme === 'dark' ? 'text-gray-400' : 'text-primary-muted'}">
					All plans include access to our mobile app and 24/7 customer service.
					<br />
					Need a custom plan?
					<a href="/contact" class="text-miami-pink hover:underline">Contact us</a>
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Add smooth transitions for hover effects */
	div {
		transition: all 0.3s ease-in-out;
	}
</style>
