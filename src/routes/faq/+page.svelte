<script lang="ts">
    import Accordion from '$lib/assets/components/Home/Accordion.svelte';
    import { faqData } from '$lib/data/faq';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    let contentVisible = false;

    onMount(() => {
        setTimeout(() => {
            contentVisible = true;
        }, 100);
    });
</script>

<div class="min-h-screen bg-[#1e1e1e] py-16">
    {#if contentVisible}
        <div class="container mx-auto px-4">
            <div class="mb-16 text-center" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
                <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">Frequently Asked Questions</h1>
                <p class="text-xl text-gray-400">Find answers to common questions about our services</p>
            </div>
            
            <div in:fly={{ y: 50, duration: 1000, delay: 400 }}>
                <Accordion faqs={faqData} showAll={true} isHomePage={false} />
            </div>
        </div>
    {/if}
</div> 