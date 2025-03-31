<script lang="ts">
	import type { VehicleImage } from '$lib/types';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';

	// Updated type to handle both direct URLs and urls object structure
	export let images: VehicleImage[];

	let selectedImageIndex = 0;
	let transitionDirection = 1; // 1 for right-to-left, -1 for left-to-right

	// Helper function to get the image URL regardless of format, preferring large URL when available
	function getImageUrl(image: any): string {
		if (image.urls?.large){
			return image.urls.large;
		} 
		return image.src || image.url || '';
	}

	// Helper function to get the thumbnail URL, or fallback to main URL
	function getSmallUrl(image: any): string {
		if (image.urls?.small) return image.urls.small;
		return image.small || image.src || image.url || '';
	}
</script>

<div class="container">
	<div class="relative h-[400px] overflow-hidden rounded-xl {$theme === 'dark' ? 'bg-white/5' : 'bg-white shadow-md'} sm:h-[500px]">
		{#if images && images.length > 0}
			{#key selectedImageIndex}
				<img
					transition:fly={{ duration: 300, x: transitionDirection * 300 }}
					src={getImageUrl(images[selectedImageIndex])}
					alt={images[selectedImageIndex].alt}
					class="h-full w-full object-cover"
				/>
			{/key}
			<!-- Left Arrow -->
			{#if images && images.length > 1}
				<button
					class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full {$theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/80 hover:bg-white shadow-md'} p-2.5 {$theme === 'dark' ? 'text-white' : 'text-[#BF4959]'} transition-all duration-300"
					on:click={() => {
						transitionDirection = 1;
						selectedImageIndex =
							selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
					}}
					aria-label="Previous image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<!-- Right Arrow -->
				<button
					class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full {$theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/80 hover:bg-white shadow-md'} p-2.5 {$theme === 'dark' ? 'text-white' : 'text-[#BF4959]'} transition-all duration-300"
					on:click={() => {
						transitionDirection = -1;
						selectedImageIndex =
							selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
					}}
					aria-label="Next image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
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
								? $theme === 'dark' ? 'bg-[#0bd3d3]' : 'bg-[#BF4959]'
								: $theme === 'dark' ? 'bg-white/50' : 'bg-gray-300'}"
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
			<div class="flex h-full items-center justify-center {$theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}">
				<span class="{$theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}">No image available</span>
			</div>
		{/if}
	</div>
	<!-- Thumbnail Section -->
	<div class="mt-4 grid grid-cols-3 gap-4">
		{#each images as image, index}
			<button
				class="h-full w-full cursor-pointer rounded-lg overflow-hidden {$theme === 'dark' ? '' : 'shadow-sm hover:shadow-md transition-shadow'}"
				on:click={() => {
					transitionDirection = index > selectedImageIndex ? -1 : 1;
					selectedImageIndex = index;
				}}
				aria-label={`View image ${index + 1}`}
			>
				<img
					src={getSmallUrl(image)}
					alt={image.alt}
					class={`h-full w-full rounded-lg object-cover ${
						selectedImageIndex === index 
							? $theme === 'dark' 
								? 'border-4 border-[#0bd3d3]' 
								: 'border-4 border-[#BF4959]'
							: ''
					}`}
				/>
			</button>
		{/each}
	</div>
</div>
