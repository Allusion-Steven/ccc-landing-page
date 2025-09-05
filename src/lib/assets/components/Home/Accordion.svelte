<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import type { FAQItem } from '$lib/data/faq';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { theme } from '$lib/stores/theme';

	export let faqs: FAQItem[];
	export let showAll = false;
	export let isHomePage = false;
	let activeIndex: number | null = null;
	let contentVisible = false;

	$: displayFaqs = showAll ? faqs : faqs.slice(0, 10);
	$: leftColumnFaqs = displayFaqs.filter((_, i) => i % 2 === 0);
	$: rightColumnFaqs = displayFaqs.filter((_, i) => i % 2 === 1);

	function toggleItem(index: number) {
		activeIndex = activeIndex === index ? null : index;
	}

	onMount(() => {
		setTimeout(() => {
			contentVisible = true;
		}, 100);
	});
</script>

<section class="{$theme === 'dark' ? 'bg-primary-dark' : 'bg-white'}">
	<div class="mx-auto w-full max-w-7xl px-4 py-20">
		{#if contentVisible}
			{#if isHomePage}
			<div class="mb-16 text-center">
				<h2
					class="mb-4 text-4xl font-bold {$theme === 'dark' ? 'text-white' : 'text-black'} md:text-5xl"
					in:fly={{ y: 50, duration: 400, delay: 200 }}
				>
					Frequently Asked Questions
				</h2>
				<p class="text-lg {$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}" in:fly={{ y: 50, duration: 400, delay: 400 }}>
					Find answers to common questions about our luxury car rental service
				</p>
			</div>
			{/if}

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Left Column -->
				<div class="space-y-4">
					{#each leftColumnFaqs as faq, index}
						<div
							class="overflow-hidden rounded-lg {$theme === 'dark' ? 'bg-white/5' : 'bg-primary-accent/5'} transition-all duration-300"
							in:fly={{ y: 50, duration: 400, delay: 600 + index * 100 }}
						>
							<button
								class="flex w-full items-center justify-between p-4 text-left"
								on:click={() => toggleItem(index * 2)}
							>
								<span class="text-lg font-medium {$theme === 'dark' ? 'text-white' : 'text-black'}">{faq.title}</span>
								<svg
									class="h-6 w-6 transform {$theme === 'dark' ? 'text-white' : 'text-primary-accent'} transition-transform duration-300 {activeIndex === index * 2
										? 'rotate-180'
										: ''}"
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
							{#if activeIndex === index * 2}
								<div
									class="px-4 pb-4"
									transition:slide={{
										duration: 300,
										easing: quintOut
									}}
								>
									<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">{faq.answer}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Right Column -->
				<div class="space-y-4">
					{#each rightColumnFaqs as faq, index}
						<div
							class="overflow-hidden rounded-lg {$theme === 'dark' ? 'bg-white/5' : 'bg-primary-accent/5'} transition-all duration-300"
							in:fly={{ y: 50, duration: 400, delay: 600 + index * 100 }}
						>
							<button
								class="flex w-full items-center justify-between p-4 text-left"
								on:click={() => toggleItem(index * 2 + 1)}
							>
								<span class="text-lg font-medium {$theme === 'dark' ? 'text-white' : 'text-black'}">{faq.title}</span>
								<svg
									class="h-6 w-6 transform {$theme === 'dark' ? 'text-white' : 'text-black'} transition-transform duration-300 {activeIndex === index * 2 + 1
										? 'rotate-180'
										: ''}"
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
							{#if activeIndex === index * 2 + 1}
								<div
									class="px-4 pb-4"
									transition:slide={{
										duration: 300,
										easing: quintOut
									}}
								>
									<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">{faq.answer}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			{#if !showAll && displayFaqs.length < faqs.length}
				<div class="mt-12 text-center">
					<SecondaryButton href="/faq" text="View All FAQs" colorScheme={$theme === 'dark' ? 'dark' : 'light'} />
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	section {
		position: relative;
	}
/* 	section::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 10px;
		background: linear-gradient(to bottom, transparent, #2d1b2a);
		pointer-events: none;
	} */
</style>
