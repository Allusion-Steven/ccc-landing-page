<script lang="ts">
	import { baseUrl } from '$lib/index';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';

	export let images: { url: string; alt: string }[];

	let selectedImageIndex = 0;
	let transitionDirection = 1; // 1 for right-to-left, -1 for left-to-right
</script>

<div class="container">
	<div class="relative h-[400px] overflow-hidden rounded-xl {$theme === 'dark' ? 'bg-white/5' : 'bg-primary-accent/5'} sm:h-[500px]">
		{#if images && images.length > 0}
			{#key selectedImageIndex}
				<img
					transition:fly={{ duration: 300, x: transitionDirection * 300 }}
					src={`${images[selectedImageIndex].url}`}
					alt={images[selectedImageIndex].alt}
					class="h-full w-full object-cover"
				/>
			{/key}
			<!-- Left Arrow -->
			{#if images && images.length > 1}
				<button
					class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full {$theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-primary-accent/50 hover:bg-primary-accent/70'} p-2 text-white transition-all duration-300"
					on:click={() => {
						transitionDirection = 1;
						selectedImageIndex =
							selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
					}}
					aria-label="Previous image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<!-- Right Arrow -->
				<button
					class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full {$theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-primary-accent/50 hover:bg-primary-accent/70'} p-2 text-white transition-all duration-300"
					on:click={() => {
						transitionDirection = -1;
						selectedImageIndex =
							selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
					}}
					aria-label="Next image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			{/if}
			<!-- Thumbnail Navigation -->
			{#if images && images.length > 1}
				<div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
					{#each images as _, index}
						<button
							class="h-2 w-16 rounded-full transition-all duration-300 {selectedImageIndex ===
							index
								? 'bg-[#0bd3d3]'
								: 'bg-white/50'}"
							on:click={() => {
								transitionDirection = index > selectedImageIndex ? -1 : 1;
								selectedImageIndex = index;
							}}
							aria-label={`View image ${index + 1}`}
						></button>
					{/each}
				</div>
			{/if}
		{:else}
			<div class="flex h-full items-center justify-center bg-gray-800">
				<span class="text-gray-400">No image available</span>
			</div>
		{/if}
	</div>
	<!-- Thumbnail Section -->
	<div class="mt-4 grid grid-cols-3 gap-4">
		{#each images as image, index}
			<button
				class="h-full w-full cursor-pointer rounded-lg"
				on:click={() => {
					transitionDirection = index > selectedImageIndex ? -1 : 1;
					selectedImageIndex = index;
				}}
				aria-label={`View image ${index + 1}`}
			>
				<img
					transition:fly={{ duration: 300, x: transitionDirection * 300 }}
					src={`${image.url}`}
					alt={image.alt}
					class={`h-full w-full rounded-lg object-cover ${selectedImageIndex === index ? 'border-4 border-[#0bd3d3]' : ''}`}
				/>
			</button>
		{/each}
	</div>
</div>
