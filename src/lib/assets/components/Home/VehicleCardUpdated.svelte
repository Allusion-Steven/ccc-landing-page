<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Vehicle, Yacht } from '$lib/types';
	import { theme } from '$lib/stores/theme';
	import { page } from '$app/stores';
	import { ChevronLeft, ChevronRight, MapPin, Gauge, Users, BedDouble, Anchor, ArrowRight } from 'lucide-svelte';

	interface Props {
		item: Vehicle | Yacht;
		itemType?: 'car' | 'yacht';
		index?: number;
	}

	let { item, itemType = 'car', index = 0 }: Props = $props();

	// State for carousel
	let currentImageIndex = $state(0);
	let isHovered = $state(false);

	// Helper functions
	function isYacht(item: Vehicle | Yacht): item is Yacht {
		return (item as any).vehicleType === 'yacht' || itemType === 'yacht';
	}

	function getActiveImages() {
		if (!item.images || item.images.length === 0) return [];
		return item.images.filter((img) => img?.isActive !== false).slice(0, 5);
	}

	function getImageUrl(index: number): string {
		const images = getActiveImages();
		if (images.length === 0) return '';
		const img = images[index];
		return img?.urls?.large || img?.url || '';
	}

	function changeImage(direction: number) {
		const images = getActiveImages();
		if (images.length === 0) return;

		currentImageIndex += direction;

		if (currentImageIndex < 0) {
			currentImageIndex = images.length - 1;
		} else if (currentImageIndex >= images.length) {
			currentImageIndex = 0;
		}
	}

	function goToImage(index: number) {
		currentImageIndex = index;
	}

	function getLocation() {
		if (item.pickupLocation?.city && item.pickupLocation?.state) {
			return `${item.pickupLocation.city}, ${item.pickupLocation.state}`;
		}
		if (item.location) {
			return item.location;
		}
		return 'Miami, FL';
	}

	function getFeatures() {
		if (!item.tags || item.tags.length === 0) return [];
		return item.tags.slice(0, 2);
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('en-US').format(price);
	}

	function buildItemLink(item: Vehicle | Yacht): string {
		const urlType = itemType === 'car' ? 'vehicle' : 'yacht';
		const baseLink = `/${urlType}/${item.id}`;

		// Get current URL parameters
		const currentUrl = $page.url;
		const pickupDate = currentUrl.searchParams.get('pickupDate') || '';
		const dropoffDate = currentUrl.searchParams.get('dropoffDate') || '';
		const location = currentUrl.searchParams.get('location') || '';

		// Build query parameters
		const params = new URLSearchParams();

		// Always add userId if available
		params.set('userId', item.userId);

		// Add vehicleType
		params.set('vehicleType', itemType === 'car' ? 'car' : 'yacht');

		// Add optional parameters only if they exist
		params.set('pickupDate', pickupDate);
		params.set('dropoffDate', dropoffDate);
		params.set('location', location);

		const queryString = params.toString();
		return queryString ? `${baseLink}?${queryString}` : baseLink;
	}
</script>

<a
	href={buildItemLink(item)}
	class="vehicle-card group block overflow-hidden rounded-3xl transition-all duration-500 {$theme === 'dark'
		? 'bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.05)]'
		: 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]'}"
	in:fly={{ y: 40, duration: 400, delay: 80 + index * 60 }}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="article"
	aria-label="{item.year} {item.make} {item.model}">

	<!-- Image Section -->
	<div class="image-wrapper relative overflow-hidden">
		<div class="relative aspect-[4/3] overflow-hidden {$theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-100'}">
			{#if getActiveImages().length > 0}
				<img
					src={getImageUrl(currentImageIndex)}
					alt="{item.year} {item.make} {item.model}"
					loading="lazy"
					class="image-zoom h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					onerror={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23111" width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="%23333" font-family="system-ui" font-size="14">No Image</text></svg>';
					}} />

				<!-- Gradient Overlay -->
				<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
			{:else}
				<div class="flex h-full w-full items-center justify-center {$theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}">
					{#if isYacht(item)}
						<Anchor class="h-16 w-16 opacity-30" />
					{:else}
						<Gauge class="h-16 w-16 opacity-30" />
					{/if}
				</div>
			{/if}
		</div>

		<!-- Carousel Navigation - Only visible on hover -->
		{#if getActiveImages().length > 1}
			<button
				onclick={(e) => { e.preventDefault(); changeImage(-1); }}
				aria-label="Previous image"
				class="carousel-btn absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 {isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} {$theme === 'dark'
					? 'bg-black/60 text-white backdrop-blur-md hover:bg-black/80'
					: 'bg-white/90 text-gray-800 shadow-lg backdrop-blur-md hover:bg-white'}">
				<ChevronLeft class="h-5 w-5" />
			</button>
			<button
				onclick={(e) => { e.preventDefault(); changeImage(1); }}
				aria-label="Next image"
				class="carousel-btn absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 {isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'} {$theme === 'dark'
					? 'bg-black/60 text-white backdrop-blur-md hover:bg-black/80'
					: 'bg-white/90 text-gray-800 shadow-lg backdrop-blur-md hover:bg-white'}">
				<ChevronRight class="h-5 w-5" />
			</button>

			<!-- Modern Pill Indicators -->
			<div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full {$theme === 'dark' ? 'bg-black/40' : 'bg-black/20'} px-2 py-1.5 backdrop-blur-md">
				{#each getActiveImages() as _, imgIndex}
					<button
						onclick={(e) => { e.preventDefault(); goToImage(imgIndex); }}
						aria-label="Go to image {imgIndex + 1}"
						class="indicator h-1.5 rounded-full transition-all duration-300 {imgIndex === currentImageIndex
							? 'w-6 bg-white'
							: 'w-1.5 bg-white/40 hover:bg-white/70'}">
					</button>
				{/each}
			</div>
		{/if}


	</div>

	<!-- Card Content -->
	<div class="p-5">
		<!-- Header: Title & Year -->
		<div class="mb-4">
			<div class="flex items-start justify-between gap-3">
				<div class="min-w-0 flex-1">
					<h3 class="truncate text-lg font-bold tracking-tight {$theme === 'dark' ? 'text-white' : 'text-gray-900'}">
						{item.make} {item.model}
					</h3>
					<p class="mt-0.5 text-sm font-medium {$theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}">
						{item.year} {isYacht(item) ? 'Yacht' : 'Vehicle'}
					</p>
				</div>
			</div>
		</div>

		<!-- Location -->
		<div class="mb-4 flex items-center gap-2 {$theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}">
			<MapPin class="h-4 w-4 flex-shrink-0 {$theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}" />
			<span class="truncate text-sm">{getLocation()}</span>
		</div>

		<!-- Specs/Features -->
		<div class="mb-4 flex flex-wrap gap-2">
			{#if isYacht(item)}
				<div class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 {$theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}">
					<Anchor class="h-3.5 w-3.5 {$theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}" />
					<span class="text-xs font-medium {$theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}">{item.specs?.length || 'N/A'}</span>
				</div>
				<div class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 {$theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}">
					<Users class="h-3.5 w-3.5 {$theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}" />
					<span class="text-xs font-medium {$theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}">{item.specs?.guests || 0} Guests</span>
				</div>
				<div class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 {$theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}">
					<BedDouble class="h-3.5 w-3.5 {$theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}" />
					<span class="text-xs font-medium {$theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}">{item.specs?.cabins || 0} Cabins</span>
				</div>
			{:else if getFeatures().length > 0}
				{#each getFeatures() as feature}
					<span class="rounded-lg px-3 py-1.5 text-xs font-medium uppercase {$theme === 'dark'
						? 'bg-white/5 text-gray-300'
						: 'bg-gray-50 text-gray-700'}">
						{feature}
					</span>
				{/each}
			{/if}
		</div>

		<!-- Divider -->
		<div class="mb-4 h-px {$theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-700 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'}"></div>

		<!-- Price & CTA Row -->
		<div class="flex items-center justify-between gap-4">
			<!-- Price -->
			<div class="flex flex-col">
				<span class="text-2xl font-bold tracking-tight {$theme === 'dark' ? 'text-white' : 'text-gray-900'}">
					{#if isYacht(item) && item.yachtPricing}
						${formatPrice(item.yachtPricing.fourHours)}
					{:else}
						${formatPrice(item.pricePerDay)}
					{/if}
				</span>
				<span class="text-xs font-medium {$theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}">
					{#if isYacht(item)}
						per 4 hours
					{:else}
						per day
					{/if}
				</span>
			</div>

			<!-- CTA Button -->
			<button
				class="cta-button group/btn flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 {$theme === 'dark'
					? 'border border-gray-600 bg-transparent text-gray-200 hover:border-gray-400 hover:text-white'
					: 'bg-gray-900 text-white hover:bg-gray-800'}">
				<span>View</span>
				<ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
			</button>
		</div>
	</div>
</a>

<style>
	.vehicle-card {
		transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
		            box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}



	.image-zoom {
		will-change: transform;
	}

	.indicator {
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.carousel-btn {
		will-change: opacity, transform;
	}


	/* Pulsing animation for availability dot */
	@keyframes ping {
		75%, 100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.animate-ping {
		animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
</style>
