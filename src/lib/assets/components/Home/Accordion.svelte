<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import type { FAQItem } from '$lib/data/faq';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';

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

<section class="">
	<div class="mx-auto w-full max-w-7xl px-4 py-20">
		{#if contentVisible}
			{#if isHomePage}
			<div class="mb-16 text-center">
				<h2
					class="mb-4 text-4xl font-bold text-white md:text-5xl"
					in:fly={{ y: 50, duration: 1000, delay: 200 }}
				>
					Frequently Asked Questions
				</h2>
				<p class="text-lg text-gray-300" in:fly={{ y: 50, duration: 1000, delay: 400 }}>
					Find answers to common questions about our luxury car rental service
				</p>
			</div>
			{/if}

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!-- Left Column -->
				<div class="space-y-4">
					{#each leftColumnFaqs as faq, index}
						<div
							in:fly={{ y: 50, duration: 800, delay: 200 + index * 100, easing: quintOut }}
							class="rounded-xl border border-white/5 bg-[#2d1b2a]/40 backdrop-blur-sm transition-all duration-300 hover:border-white/10"
						>
							<button
								class="group flex w-full items-center justify-between px-8 py-6 text-left"
								on:click={() => toggleItem(index * 2)}
								aria-expanded={activeIndex === index * 2}
							>
								<span
									class="text-lg font-medium text-white/90 transition-colors duration-200 group-hover:text-miami-light-pink"
									>{faq.title}</span
								>
								<svg
									class="h-6 w-6 transform text-white/50 transition-transform duration-300 group-hover:text-miami-light-pink {activeIndex === index * 2
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
									class="px-8 pb-6" 
									transition:slide={{ duration: 300, easing: quintOut }}
								>
									<div class="mb-6 h-px w-full bg-white/5"></div>
									<p class="leading-relaxed text-gray-300">{faq.answer}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Right Column -->
				<div class="space-y-4">
					{#each rightColumnFaqs as faq, index}
						<div
							in:fly={{ y: 50, duration: 800, delay: 200 + index * 100, easing: quintOut }}
							class="rounded-xl border border-white/5 bg-[#2d1b2a]/40 backdrop-blur-sm transition-all duration-300 hover:border-white/10"
						>
							<button
								class="group flex w-full items-center justify-between px-8 py-6 text-left"
								on:click={() => toggleItem(index * 2 + 1)}
								aria-expanded={activeIndex === index * 2 + 1}
							>
								<span
									class="text-lg font-medium text-white/90 transition-colors duration-200 group-hover:text-miami-light-pink"
									>{faq.title}</span
								>
								<svg
									class="h-6 w-6 transform text-white/50 transition-transform duration-300 group-hover:text-miami-light-pink {activeIndex === index * 2 + 1
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
									class="px-8 pb-6" 
									transition:slide={{ duration: 300, easing: quintOut }}
								>
									<div class="mb-6 h-px w-full bg-white/5"></div>
									<p class="leading-relaxed text-gray-300">{faq.answer}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			{#if !showAll}
				<div
					in:fly={{ y: 50, duration: 1000, delay: 400 + displayFaqs.length * 150 }}
					class="mt-12 text-center"
				>
					<SecondaryButton href="/faq" text="View All FAQs" />
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
