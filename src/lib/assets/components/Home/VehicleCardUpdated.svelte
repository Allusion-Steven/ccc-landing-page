<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Vehicle, Yacht } from '$lib/types';
	import { theme } from '$lib/stores/theme';
	import { page } from '$app/stores';
	import { ChevronLeft, ChevronRight, MapPin, Calendar, Check, Ruler, Users, BedDouble, Car, DollarSign, CalendarCheck } from 'lucide-svelte';

	interface Props {
		item: Vehicle | Yacht;
		itemType?: 'car' | 'yacht';
		index?: number;
	}

	let { item, itemType = 'car', index = 0 }: Props = $props();

	// State for carousel
	let currentImageIndex = $state(0);

	// Helper functions
	function isYacht(item: Vehicle | Yacht): item is Yacht {
		return (item as any).vehicleType === 'yacht' || itemType === 'yacht';
	}

	function getActiveImages() {
		if (!item.images || item.images.length === 0) return [];
		return item.images.filter((img) => img?.isActive !== false).slice(0, 4);
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
		return item.tags.slice(0, 3);
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
	class="card-hover block overflow-hidden rounded-2xl shadow-lg transition-all duration-300 {$theme ===
	'dark'
		? 'bg-[#1C1C1C] hover:shadow-2xl'
		: 'bg-white hover:shadow-xl'}"
	in:fly={{ y: 30, duration: 200, delay: 100 + index * 50 }}>
	<!-- Image Carousel -->
	<div class="carousel-container relative">
		<div
			class="relative h-56 overflow-hidden {$theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}">
			{#if getActiveImages().length > 0}
				<img
					src={getImageUrl(currentImageIndex)}
					alt="{item.make} {item.model}"
					loading="lazy"
					class="carousel-slide h-full w-full object-cover transition-opacity duration-300"
					onerror={(e) => {
						const target = e.target as HTMLImageElement;
						target.style.display = 'none';
					}} />
			{:else}
				<div
					class="flex h-full w-full items-center justify-center {$theme === 'dark'
						? 'text-gray-600'
						: 'text-gray-400'}">
					<span class="text-sm">No image available</span>
				</div>
			{/if}
		</div>

		<!-- Carousel Controls -->
		{#if getActiveImages().length > 1}
			<button
				onclick={(e) => {
					e.preventDefault();
					changeImage(-1);
				}}
				class="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition hover:bg-white">
				<ChevronLeft class="h-4 w-4 text-gray-700" />
			</button>
			<button
				onclick={(e) => {
					e.preventDefault();
					changeImage(1);
				}}
				class="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition hover:bg-white">
				<ChevronRight class="h-4 w-4 text-gray-700" />
			</button>

			<!-- Image Indicators -->
			<div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-1">
				{#each getActiveImages() as _, imgIndex}
					<button
						onclick={(e) => {
							e.preventDefault();
							goToImage(imgIndex);
						}}
						class="indicator-dot h-2 rounded-full transition-all hover:bg-white {imgIndex ===
						currentImageIndex
							? 'active w-6 bg-white'
							: 'w-2 bg-white/60'}"></button>
				{/each}
			</div>
		{/if}

		<!-- Price Badge -->
		<div
			class="absolute left-3 top-3 rounded-full px-3 py-1 text-sm font-semibold text-black shadow-lg {$theme ===
			'dark'
				? 'bg-[#9fff6b]'
				: 'bg-[#9fff6b]'}">
			{#if isYacht(item) && item.yachtPricing}
				${new Intl.NumberFormat('en-US').format(item.yachtPricing.fourHours)}/4h
			{:else}
				${new Intl.NumberFormat('en-US').format(item.pricePerDay)}/day
			{/if}
		</div>
	</div>

	<!-- Card Content -->
	<div class="p-5">
		<!-- Vehicle Info -->
		<div class="mb-3">
			<div class="mb-2 flex items-start justify-between">
				<div>
					<h3
						class="text-xl font-bold {$theme === 'dark' ? 'text-white' : 'text-gray-800'}">
						{item.make}
						{item.model}
					</h3>
					<p class="text-sm {$theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}">
						{item.year}
					</p>
				</div>
				{#if item.isAvailable !== false}
					<div
						class="flex items-center space-x-1 rounded-full px-2 py-1 text-xs {$theme ===
						'dark'
							? 'bg-green-900/30 text-green-400'
							: 'bg-green-100 text-green-700'}">
						<Check class="h-3 w-3" />
						<span>Available</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Location -->
		<div class="mb-3 flex items-center {$theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}">
			<MapPin class="mr-2 h-4 w-4 {$theme === 'dark' ? 'text-[#08D3D3]' : 'text-[#513954]'}" />
			<span class="text-sm capitalize">{getLocation()}</span>
		</div>

		<!-- Features -->
		<div class="mb-4 flex flex-wrap gap-2">

		{#if getFeatures().length > 0}
				{#each getFeatures() as feature}
					<span
						class="uppercase rounded-full border px-2 py-1 text-xs font-medium {$theme === 'dark'
							? 'border-gray-700 bg-gray-800/50 text-gray-300'
							: 'border-gray-200 bg-white text-gray-700'}">
						{feature}
					</span>
				{/each}
				{#if item.tags && item.tags.length > 3}
					<span class="text-xs {$theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}">
						+{item.tags.length - 3} more
					</span>
				{/if}
		{/if}
	</div>


		<!-- Specs -->
		<div
			class="mb-4 flex justify-between border-b pb-3 text-xs {$theme === 'dark'
				? 'border-gray-800 text-gray-400'
				: 'border-gray-100 text-gray-600'}">
			{#if isYacht(item)}
				<div class="flex items-center">
					<Ruler class="mr-1 h-3 w-3" />
					<span>{item.specs?.length || 'N/A'}</span>
				</div>
				<div class="flex items-center">
					<Users class="mr-1 h-3 w-3" />
					<span>{item.specs?.guests || 0} Guests</span>
				</div>
				<div class="flex items-center">
					<BedDouble class="mr-1 h-3 w-3" />
					<span>{item.specs?.cabins || 0} Cabins</span>
				</div>
			{:else}
				<div class="flex items-center">
					<Calendar class="mr-1 h-3 w-3" />
					<span>{item.year}</span>
				</div>
				<div class="flex items-center">
					<Car class="mr-1 h-3 w-3" />
					<span>{itemType === 'car' ? 'Car' : 'Vehicle'}</span>
				</div>
				<div class="flex items-center">
					<DollarSign class="mr-1 h-3 w-3" />
					<span>Rental</span>
				</div>
			{/if}
		</div>

		<!-- CTA Button -->
		<button
			class="cta-button relative flex w-full items-center justify-center space-x-2 overflow-hidden rounded-lg py-3 font-semiboldtransition-all duration-300 {$theme ===
			'dark'
				? 'bg-[#ffffff] text-black hover:bg-[#06b8b8]'
				: 'bg-[#000000] text-white hover:bg-[#3e2c40]'}">
			<CalendarCheck class="h-4 w-4" />
			<span>View Details</span>
		</button>
	</div>
</a>

<style>
	.card-hover {
		transition: transform 0.3s ease;
	}

	.card-hover:hover {
		transform: translateY(-5px);
	}

	.indicator-dot {
		transition: all 0.3s ease;
	}

	.carousel-slide {
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.cta-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}

	.cta-button:hover::before {
		left: 100%;
	}

	.cta-button:hover {
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}
</style>
