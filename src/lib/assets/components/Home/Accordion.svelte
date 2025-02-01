<script lang="ts">
    import { slide } from 'svelte/transition';
    import type { FAQItem } from '$lib/data/faq';
    import SecondaryButton from '../buttons/SecondaryButton.svelte';
    
    export let faqs: FAQItem[];
    export let showAll = false;
    let activeIndex: number | null = null;
    
    $: displayFaqs = showAll ? faqs : faqs.slice(0, 6);

    function toggleItem(index: number) {
        activeIndex = activeIndex === index ? null : index;
    }
</script>

<section class="bg-[#1e1e1e]">
    <div class="w-full max-w-4xl mx-auto px-4 py-24">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p class="text-lg text-gray-300">Find answers to common questions about our luxury car rental service</p>
        </div>
        
        <div class="space-y-4">
            {#each displayFaqs as faq, index}
                <div class="bg-[#2d1b2a]/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-white/10 transition-all duration-300">
                    <button
                        class="w-full px-8 py-6 text-left flex justify-between items-center group"
                        on:click={() => toggleItem(index)}
                        aria-expanded={activeIndex === index}
                    >
                        <span class="text-lg font-medium text-white/90 group-hover:text-miami-light-pink transition-colors duration-200">{faq.title}</span>
                        <svg
                            class="w-6 h-6 transform transition-transform duration-300 text-white/50 group-hover:text-miami-light-pink {activeIndex === index ? 'rotate-180' : ''}"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    
                    {#if activeIndex === index}
                        <div
                            class="px-8 pb-6"
                            transition:slide={{ duration: 300 }}
                        >
                            <div class="w-full h-px bg-white/5 mb-6"></div>
                            <p class="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        {#if !showAll}
            <div class="mt-12 text-center">
                <SecondaryButton href="/faq" text="View All FAQs" />
            </div>
        {/if}
    </div>
</section>

<style>
    section {
        position: relative;
    }
    section::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 150px;
        background: linear-gradient(to bottom, transparent, #2d1b2a);
        pointer-events: none;
    }
</style> 