<script lang="ts">
	import type { VehicleImage } from '$lib/types';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	
	interface Props {
		// Updated type to handle both direct URLs and urls object structure
		images: VehicleImage[];
	}

	let { images }: Props = $props();

	let selectedImageIndex = $state(0);
	let transitionDirection = $state(1); // 1 for right-to-left, -1 for left-to-right

	// Store for image positions
	let imagePositions: Record<number, string> = $state({});

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

	// Function to detect if an image is portrait and get appropriate object positioning
	function getImageObjectPosition(imageUrl: string): Promise<string> {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				// If image is portrait (height > width), position it to show top portion
				if (img.height > img.width) {
					resolve('object-center');
				} else {
					resolve('object-center');
				}
			};
			img.onerror = () => {
				resolve('object-center'); // Default fallback
			};
			img.src = imageUrl;
		});
	}

	// Preload image positions when component mounts
	onMount(async () => {
		for (let i = 0; i < images.length; i++) {
			const imageUrl = getImageUrl(images[i]);
			if (imageUrl) {
				imagePositions[i] = await getImageObjectPosition(imageUrl);
			}
		}
	});
</script>

<div class="container">
	<div class="relative h-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 shadow-2xl border border-white/10 sm:h-[700px]">
		{#if images && images.length > 0}
			{#key selectedImageIndex}
			<!-- in:fly={{ duration: 100, x: -transitionDirection * 10 }}
				out:fly={{ duration: 100, x: transitionDirection * 10 }} -->
				<img
					src={getImageUrl(images[selectedImageIndex])}
					alt={images[selectedImageIndex].alt}
					class="h-full w-full object-cover {imagePositions[selectedImageIndex] || 'object-center'}"
				/>
			{/key}
			<!-- Left Arrow -->
			{#if images && images.length > 1}
				<button
					class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 p-3 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
					onclick={() => {
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
					class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 p-3 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
					onclick={() => {
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
				<div class="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
					{#each images as _, index}
						<button
							class="h-2 w-16 rounded-full transition-all duration-300 backdrop-blur-sm {selectedImageIndex ===
							index
								? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg'
								: 'bg-white/30 hover:bg-white/50'}"
							onclick={() => {
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
	<div class="mt-6 grid grid-cols-4 gap-4">
		{#each images as image, index}
			<button
				class="group relative h-20 w-full cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl {selectedImageIndex === index ? 'ring-4 ring-cyan-400 shadow-2xl scale-105' : 'hover:scale-105'}"
				onclick={() => {
					transitionDirection = index > selectedImageIndex ? -1 : 1;
					selectedImageIndex = index;
				}}
				aria-label={`View image ${index + 1}`}
			>
				<img
					src={getSmallUrl(image)}
					alt={image.alt}
					class="h-full w-full rounded-xl object-cover ${imagePositions[index] || 'object-center'} transition-all duration-300 group-hover:scale-110"
				/>
				<!-- Selected indicator -->
				{#if selectedImageIndex === index}
					<div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center">
						<div class="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
							<svg class="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>
