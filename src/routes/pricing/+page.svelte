<script lang="ts">
    import { onMount } from 'svelte';
    import { Button } from 'flowbite-svelte';
    import { pricingTiers } from '$lib/constants/Pricing';


    let selectedTier = $state<string | null>("Premium");



    function handleTierSelect(tierName: string) {
        selectedTier = selectedTier === tierName ? null : tierName;
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
    <div class="container mx-auto px-4">
        <!-- Header Section -->
        <div class="mb-16 text-center">
            <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">Choose Your Membership</h1>
            <p class="text-xl text-gray-400">Select the perfect plan for your luxury driving experience</p>
        </div>

        <!-- Pricing Cards Container -->
        <div class="grid gap-8 md:grid-cols-3">
            {#each pricingTiers as tier}
                <div 
                    class="relative flex flex-col {tier.highlighted ? 'transform scale-105' : ''} z-0 hover:z-10 mt-6"
                    onclick={() => handleTierSelect(tier.name)}
                    onkeydown={(e) => e.key === 'Enter' && handleTierSelect(tier.name)}
                    role="button"
                    tabindex="0"
                >
                    <!-- Highlight badge for premium plan -->
                    {#if tier.highlighted}
                        <div class="absolute -top-6 left-1/2 -translate-x-1/2 transform z-30">
                            <span class="rounded-full bg-[#0bd3d3] px-4 py-1 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                Most Popular
                            </span>
                        </div>
                    {/if}

                    <!-- Selection flag -->
                    {#if selectedTier === tier.name}
                        <div class="absolute -top-2 -right-2 z-20">
                            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#0bd3d3] shadow-lg">
                                <svg class="h-5 w-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                    {/if}

                    <div class="flex h-full flex-col rounded-2xl {selectedTier === tier.name ? 'bg-gradient-to-br from-miami-dark via-miami-purple to-miami-dark' : 'bg-gray-800'} p-8 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                        <div class="mb-8">
                            <h2 class="mb-2 text-2xl font-bold text-white">{tier.name}</h2>
                            <div class="mb-4">
                                <span class="text-4xl font-bold text-white">{tier.price}</span>
                                <span class="text-gray-400">/month</span>
                            </div>
                            <p class="text-gray-400">{tier.description}</p>
                        </div>

                        <div class="mb-8 flex-grow">
                            <ul class="space-y-4">
                                {#each tier.features as feature}
                                    <li class="flex items-center text-gray-300">
                                        <svg class="mr-3 h-5 w-5 text-[#0bd3d3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {feature}
                                    </li>
                                {/each}
                            </ul>
                        </div>

                        <Button
                            class="w-full rounded-lg {selectedTier === tier.name ? 'bg-[#0bd3d3] text-gray-900 hover:bg-[#0bd3d3]/80' : 'bg-gray-700 text-white hover:bg-gray-600'} py-3 text-center font-semibold transition-colors"
                            href="/login"
                        >
                            {selectedTier === tier.name ? `Join The ${tier.name} Club` : 'Get Started'}
                        </Button>
                    </div>
                </div>

            {/each}
        </div>

        <!-- Additional Info -->
        <div class="mt-16 text-center">
            <p class="text-gray-400">
                All plans include access to our mobile app and 24/7 roadside assistance.
                <br />
                Need a custom plan? <a href="/contact" class="text-[#0bd3d3] hover:underline">Contact us</a>
            </p>
        </div>
    </div>
</div>

<style>
    /* Add any additional custom styles here */
</style> 