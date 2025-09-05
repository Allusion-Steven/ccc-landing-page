<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { fly, fade, scale, slide } from 'svelte/transition';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
	import VehicleSEO from '$lib/components/VehicleSEO.svelte';
	import type { VehicleImage } from '$lib/types';
	import { theme } from '$lib/stores/theme';
	import {
		CheckCircleOutline,
		ClipboardListOutline,
		CalendarMonthOutline,
		DollarOutline,
		CogOutline,
		UsersGroupOutline,
		HomeOutline
	} from 'flowbite-svelte-icons';

	const { data }: { data: PageData } = $props();
	const {
		yacht,
		pickupDate: initialPickupDate,
		dropoffDate: initialDropoffDate,
		location: initialLocation
	} = data;

	if (!yacht) {
		throw new Error('Yacht data is missing');
	}

	// Make sure userId is available for links and APIs
	const userId = yacht.userId || $page.url.searchParams.get('userId') || '';
	// Use the vehicleType from URL or default to "yacht" and ensure proper typing
	const vehicleType = ($page.url.searchParams.get('vehicleType') || 'yacht') as
		| 'yacht'
		| 'vehicle';

	if (userId && !yacht.userId) {
		yacht.userId = userId;
	}

	let showDatePicker = $state(false);
	let pickupDate: string = $state(initialPickupDate);
	let dropoffDate: string = $state(initialDropoffDate);
	let location: string = $state(initialLocation);
	let currentImageIndex = $state(0);
	let showImageModal = $state(false);
	let favorited = $state(false);

	// Add this to handle URL parameters when the page loads
	$effect(() => {
		const searchParams = $page.url.searchParams;
		// Prioritize: URL param -> yacht.pickupLocation.city -> yacht.location -> default
		location =
			searchParams.get('location') ||
			yacht?.pickupLocation?.city ||
			yacht?.location ||
			initialLocation;
		pickupDate = searchParams.get('pickupDate') || initialPickupDate;
		dropoffDate = searchParams.get('dropoffDate') || initialDropoffDate;
	});

	// Image navigation - make it reactive
	const activeImages = $derived(yacht?.images?.filter((img: VehicleImage) => img?.isActive !== false) || []);

	function nextImage() {
		if (activeImages.length > 1) {
			currentImageIndex = (currentImageIndex + 1) % activeImages.length;
		}
	}

	function prevImage() {
		if (activeImages.length > 1) {
			currentImageIndex =
				currentImageIndex === 0 ? activeImages.length - 1 : currentImageIndex - 1;
		}
	}

	function openImageModal(index: number) {
		currentImageIndex = index;
		showImageModal = true;
	}

	function setImageIndex(index: number) {
		if (index !== currentImageIndex) {
			currentImageIndex = index;
		}
	}

	// Get optimized image URL
	function getImageUrl(
		image: VehicleImage,
		size: 'thumbnail' | 'small' | 'medium' | 'large' = 'large'
	) {
		if (image.urls && image.urls[size]) {
			return image.urls[size];
		}
		return image.url;
	}

	// Format price
	function formatPrice(price: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(price);
	}

	// Enhanced keyboard navigation for modal
	function handleKeydown(event: KeyboardEvent) {
		if (!showImageModal) return;

		event.preventDefault();
		if (event.key === 'Escape') {
			showImageModal = false;
		} else if (event.key === 'ArrowRight' || event.key === ' ') {
			nextImage();
		} else if (event.key === 'ArrowLeft') {
			prevImage();
		} else if (event.key === 'Home') {
			currentImageIndex = 0;
		} else if (event.key === 'End') {
			currentImageIndex = activeImages.length - 1;
		}
	}

	// Scroll to booking section
	function scrollToBooking() {
		const bookingElement = document.getElementById('booking-section');
		if (bookingElement) {
			bookingElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	// Safe getter function for yacht specs
	function getYachtInfo(yachtObj: any, field: string, defaultValue: any = 'N/A') {
		if (!yachtObj || !yachtObj.specs) return defaultValue;
		return yachtObj.specs[field] || defaultValue;
	}

	// Extract description safely
	const description = yacht.description || '';

	// Get the best quality image URL for SEO
	const seoImageUrl =
		activeImages.length > 0 && activeImages[0].urls?.large
			? activeImages[0].urls.large
			: (yacht.images?.[0]?.url ?? 'https://macroexotics.com/favicon.png');
</script>

<VehicleSEO
	make={yacht.make || ''}
	model={yacht.model || ''}
	year={yacht.year?.toString() || ''}
	canonical={`${yacht.id}${userId ? `?userId=${userId}` : ''}`}
	imageUrl={seoImageUrl}
	vehicleType="yacht" />

<svelte:window onkeydown={handleKeydown} />

<div
	class="min-h-screen {$theme === 'dark' ? '' : ''}"
	in:fade={{ duration: 500 }}>
	<div class="relative" in:fly={{ y: 30, duration: 600, delay: 200 }}>
		{#if activeImages.length > 0}
			<div
				class="relative h-[60vh] min-h-[400px] overflow-hidden sm:h-[60vh] sm:min-h-[500px] lg:h-[70vh] lg:min-h-[600px] {$theme ===
				'dark'
					? 'bg-primary-dark'
					: 'bg-gray-100'}">
				{#key currentImageIndex}
					<div 
						class="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 blur-md"
						style="background-image: url('{getImageUrl(activeImages[currentImageIndex], 'large')}');"
						in:fade={{ duration: 200, delay: 100 }}
						out:fade={{ duration: 100 }}
					></div>
				{/key}
								
				<div class="relative z-10 h-full w-full flex items-center justify-center px-4">
					{#key currentImageIndex}
						<img
							src={getImageUrl(activeImages[currentImageIndex], 'large')}
							alt="{yacht.year} {yacht.make} {yacht.model}"
							class="max-h-full max-w-full object-contain shadow-2xl rounded-lg"
							in:fade={{ duration: 200, delay: 100 }}
							out:fade={{ duration: 100 }}
						/>
					{/key}
				</div>

				<!-- Floating Action Buttons -->
				<div
					class="absolute max500:flex-row right-3 top-3 flex flex-col gap-2 sm:right-6 sm:top-6 sm:gap-3 z-20">
					<button
						onclick={() => (favorited = !favorited)}
						class="group rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 sm:p-3"
						aria-label="Add to favorites">
						<svg
							class="h-4 w-4 transition-colors sm:h-5 sm:w-5 {favorited
								? 'fill-red-500 text-red-500'
								: 'text-white group-hover:text-red-300'}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
						</svg>
					</button>
					<button
						class="group rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 sm:p-3"
						aria-label="Share yacht">
						<svg
							class="h-4 w-4 sm:h-5 sm:w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
						</svg>
					</button>
					<button
						onclick={() => openImageModal(currentImageIndex)}
						class="group rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 sm:p-3"
						aria-label="View fullscreen">
						<svg
							class="h-4 w-4 sm:h-5 sm:w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
						</svg>
					</button>
				</div>

				<!-- Image Counter Badge -->
				{#if activeImages.length > 1}
					<div class="absolute left-3 top-3 sm:left-6 sm:top-6 z-20">
						<div
							class="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-md sm:gap-2 sm:px-3 sm:text-sm">
							<svg
								class="h-2 w-2 sm:h-3 sm:w-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							{currentImageIndex + 1} of {activeImages.length}
						</div>
					</div>
				{/if}

				<!-- Enhanced Navigation Controls -->
				{#if activeImages.length > 1}
					<button
						onclick={prevImage}
						class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/20 active:scale-95 sm:left-4 sm:p-4 z-20"
						aria-label="Previous image">
						<svg
							class="h-4 w-4 sm:h-6 sm:w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						onclick={nextImage}
						class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/20 active:scale-95 sm:right-4 sm:p-4 z-20"
						aria-label="Next image">
						<svg
							class="h-4 w-4 sm:h-6 sm:w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7" />
						</svg>
					</button>
				{/if}

				<!-- Yacht Title and Info Overlay -->
				<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-20 bg-gradient-to-t from-black/60 via-black/40 to-transparent">
					<div class="mx-auto max-w-7xl">
						<div
							class="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
							<div class="space-y-2 sm:space-y-4">
								<div in:fly={{ y: 20, duration: 500, delay: 400 }}>
									<h1
										class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-lg">
										{yacht.year}
										<span class="text-blue-400">{yacht.make}</span>
										{yacht.model}
									</h1>
								</div>
								{#if yacht.location}
									<div
										class="flex items-center text-sm text-gray-200 sm:text-base lg:text-xl drop-shadow-md"
										in:fly={{ y: 20, duration: 500, delay: 500 }}>
										<svg
											class="mr-2 h-4 w-4 text-blue-400 sm:mr-3 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
										{yacht.location}
									</div>
								{/if}
							</div>

							<!-- Enhanced Action Buttons -->
							<div
								class="flex flex-col gap-2 sm:flex-row sm:gap-3"
								in:fly={{ x: 20, duration: 500, delay: 600 }}>
								<button
									onclick={() => history.back()}
									class="flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition-all duration-200 hover:border-white/50 hover:bg-white/20 sm:px-6 sm:py-3 sm:text-base">
									<svg
										class="h-3 w-3 sm:h-4 sm:w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 19l-7-7 7-7" />
									</svg>
									<span class="hidden sm:inline">Back to Search</span>
									<span class="sm:hidden">Back</span>
								</button>
								<button
									onclick={scrollToBooking}
									class="flex items-center justify-center gap-2 rounded-lg border border-blue-500/50 bg-blue-600/20 px-4 py-2 text-sm text-blue-400 backdrop-blur-md transition-all duration-200 hover:border-blue-400/70 hover:bg-blue-500/30 hover:text-blue-300 sm:px-6 sm:py-3 sm:text-base">
									<svg
										class="h-3 w-3 sm:h-4 sm:w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
									<span class="hidden sm:inline">Book Now</span>
									<span class="sm:hidden">Book</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Modern Thumbnail Gallery -->
			{#if activeImages.length > 1}
				<div
					class="relative {$theme === 'dark'
						? 'bg-primary-dark/50'
						: 'bg-gray-100/50'} px-8 py-6"
					in:slide={{ duration: 500, delay: 300 }}>
					<div class="mx-auto max-w-7xl">
						<div class="mb-4 flex items-center justify-between">
							<h3
								class="text-lg font-semibold {$theme === 'dark'
									? 'text-white'
									: 'text-gray-900'}">
								Gallery
							</h3>
							<button 
								onclick={() => openImageModal(currentImageIndex)}
								class="text-blue-400 transition-colors hover:text-blue-300"
							>
								View All {activeImages.length} Photos
							</button>
						</div>
						<div class="flex gap-3 overflow-hidden relative">
							<!-- Left fade gradient -->
							<div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-{$theme === 'dark' ? 'slate-800' : 'gray-100'} to-transparent z-10 pointer-events-none"></div>
							<!-- Right fade gradient -->
							<div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-{$theme === 'dark' ? 'slate-800' : 'gray-100'} to-transparent z-10 pointer-events-none"></div>
							
							<!-- Scrollable container without visible scrollbar -->
							<div class="flex gap-3 overflow-x-auto scrollbar-hide" style="scrollbar-width: none; -ms-overflow-style: none;">
								<style>
									.scrollbar-hide::-webkit-scrollbar {
										display: none;
									}
								</style>
								{#each activeImages as image, index}
									<button
										onclick={() => (currentImageIndex = index)}
										class="group relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 {currentImageIndex ===
										index
											? 'scale-105 border-blue-500 shadow-lg shadow-blue-500/25'
											: 'hover:scale-102 border-transparent hover:border-gray-500'}"
										aria-label="View image {index + 1}">
										<img
											src={getImageUrl(image, 'thumbnail')}
											alt="{yacht.year} {yacht.make} {yacht.model} - Thumbnail {index +
												1}"
											class="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
											loading="lazy" />
										<div
											class="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/10">
										</div>
										{#if currentImageIndex === index}
											<div
												class="absolute inset-0 rounded-lg border-2 border-blue-500 bg-blue-500/20">
											</div>
										{/if}
									</button>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
		{:else}
			<!-- No Images Placeholder -->
			<div
				class="flex h-[70vh] items-center justify-center {$theme === 'dark'
					? 'bg-primary-dark'
					: 'bg-gray-100'}">
				<div
					class="text-center {$theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}"
					in:fade={{ duration: 400 }}>
					<svg
						class="mx-auto mb-4 h-20 w-20"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<p class="text-2xl font-medium">No images available</p>
					<p class="mt-2 {$theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}">
						This yacht doesn't have any photos yet
					</p>
				</div>
			</div>
		{/if}
	</div>

	<!-- Main Content with Modern Layout -->
	<div class={$theme === 'dark' ? '' : ''}>
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
			<div class="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
				<!-- Left Column: Enhanced Details & Specs -->
				<div
					class="space-y-6 sm:space-y-8 lg:col-span-2"
					in:fly={{ x: -30, duration: 600, delay: 400 }}>
					<!-- Description -->
					{#if description}
						<div
							class="group rounded-xl border-2 border-gray-300/30 {$theme === 'dark'
								? 'border-slate-600/30  '
								: 'border-gray-300/30 '} p-6 backdrop-blur-sm transition-all duration-300 ">
							<div class="mb-4 flex items-center gap-3">
								<div
									class="rounded-lg border border-gray-300/30 p-2">
									<svg
										class="h-5 w-5 {$theme === 'dark'
											? 'text-slate-300'
											: 'text-primary-accent'}"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3
									class="text-xl font-bold {$theme === 'dark'
										? 'text-white group-hover:text-slate-200'
										: 'text-gray-900 group-hover:text-gray-700'} transition-colors">
									About This Yacht
								</h3>
							</div>
							<p
								class="leading-relaxed {$theme === 'dark'
									? 'text-gray-300 group-hover:text-gray-200'
									: 'text-gray-700 group-hover:text-gray-600'} transition-colors">
								{description}
							</p>
						</div>
					{/if}

					<!-- Specifications -->
					<div
						class="group rounded-xl border border-gray-300/30 {$theme === 'dark'
							? 'border-blue-600/25 '
							: 'border-gray-300/30  hover:border-primary-accent/40 hover:shadow-primary-accent/10'} p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
						<div class="mb-6 flex items-center gap-3">
							<div
								class="rounded-lg border-gray-300/30 border-2 p-2">
								<svg
									class="h-5 w-5 {$theme === 'dark'
										? 'text-blue-300'
										: 'text-primary-accent'}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
							<h3
								class="text-xl font-bold {$theme === 'dark'
									? 'text-white group-hover:text-blue-200'
									: 'text-gray-900 group-hover:text-primary-accent'} transition-colors">
								Specifications
							</h3>
						</div>

						<!-- Basic Information -->
						<div class="grid grid-cols-2 gap-3 max500:grid-cols-2 max500:items-center max500:mx-auto sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
							<div class="flex items-center gap-3">
								<div class="rounded-lg bg-blue-600/20 p-3">
									<CheckCircleOutline class="h-5 w-5 text-blue-400" />
								</div>
								<div>
									<p
										class="text-sm {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										Make
									</p>
									<p
										class="font-semibold {$theme === 'dark'
											? 'text-white'
											: 'text-gray-900'}">
										{yacht.make}
									</p>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<div class="rounded-lg bg-green-600/20 p-3">
									<ClipboardListOutline class="h-5 w-5 text-green-400" />
								</div>
								<div>
									<p
										class="text-sm {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										Model
									</p>
									<p
										class="font-semibold {$theme === 'dark'
											? 'text-white'
											: 'text-gray-900'}">
										{yacht.model}
									</p>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<div class="rounded-lg bg-yellow-600/20 p-3">
									<CalendarMonthOutline class="h-5 w-5 text-yellow-400" />
								</div>
								<div>
									<p
										class="text-sm {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										Year
									</p>
									<p
										class="font-semibold {$theme === 'dark'
											? 'text-white'
											: 'text-gray-900'}">
										{yacht.year}
									</p>
								</div>
							</div>

							<!-- Yacht-specific specifications -->
							<div class="flex items-center gap-3">
								<div class="rounded-lg bg-emerald-600/20 p-3">
									<CogOutline class="h-5 w-5 text-emerald-400" />
								</div>
								<div>
									<p
										class="text-sm {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										Length
									</p>
									<p
										class="font-semibold {$theme === 'dark'
											? 'text-white'
											: 'text-gray-900'}">
										{getYachtInfo(yacht, 'length')}
									</p>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<div class="rounded-lg bg-purple-600/20 p-3">
									<UsersGroupOutline class="h-5 w-5 text-purple-400" />
								</div>
								<div>
									<p
										class="text-sm {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										Guests
									</p>
									<p
										class="font-semibold {$theme === 'dark'
											? 'text-white'
											: 'text-gray-900'}">
										{getYachtInfo(yacht, 'guests', 0)}
									</p>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<div class="rounded-lg bg-red-600/20 p-3">
									<HomeOutline class="h-5 w-5 text-red-400" />
								</div>
								<div>
									<p
										class="text-sm {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										Cabins
									</p>
									<p
										class="font-semibold {$theme === 'dark'
											? 'text-white'
											: 'text-gray-900'}">
										{getYachtInfo(yacht, 'cabins', 0)}
									</p>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<div class="rounded-lg bg-indigo-600/20 p-3">
									<UsersGroupOutline class="h-5 w-5 text-indigo-400" />
								</div>
								<div>
									<p
										class="text-sm {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										Crew
									</p>
									<p
										class="font-semibold {$theme === 'dark'
											? 'text-white'
											: 'text-gray-900'}">
										{getYachtInfo(yacht, 'crew', 0)}
									</p>
								</div>
							</div>

							<!-- Pricing -->
							{#if yacht.yachtPricing}
								<!-- Yacht Pricing Options -->
								<div class="col-span-2 max500:col-span-2 sm:col-span-2 lg:col-span-3">
									<div
										class="rounded-xl border border-gray-300/30} p-6">
										<div class="mb-4 flex items-center gap-2">
											<DollarOutline class="h-5 w-5 text-blue-400" />
											<h4
												class="text-lg font-semibold {$theme === 'dark'
													? 'text-white'
													: 'text-gray-900'}">
												Pricing Options
											</h4>
										</div>
										<div class="space-y-3">
											<div
												class="flex items-center justify-between border-b py-2 {$theme ===
												'dark'
													? 'border-gray-700'
													: 'border-gray-200'}">
												<span
													class="text-base font-medium {$theme === 'dark'
														? 'text-gray-300'
														: 'text-gray-700'}">4 Hours:</span>
												<span
													class="text-lg font-bold {$theme === 'dark'
														? 'text-blue-400'
														: 'text-blue-600'}">
													{formatPrice(yacht.yachtPricing.fourHours)}
												</span>
											</div>
											<div
												class="flex items-center justify-between border-b py-2 {$theme ===
												'dark'
													? 'border-gray-700'
													: 'border-gray-200'}">
												<span
													class="text-base font-medium {$theme === 'dark'
														? 'text-gray-300'
														: 'text-gray-700'}">6 Hours:</span>
												<span
													class="text-lg font-bold {$theme === 'dark'
														? 'text-blue-400'
														: 'text-blue-600'}">
													{formatPrice(yacht.yachtPricing.sixHours)}
												</span>
											</div>
											<div class="flex items-center justify-between py-2">
												<span
													class="text-base font-medium {$theme === 'dark'
														? 'text-gray-300'
														: 'text-gray-700'}">8 Hours:</span>
												<span
													class="text-lg font-bold {$theme === 'dark'
														? 'text-blue-400'
														: 'text-blue-600'}">
													{formatPrice(yacht.yachtPricing.eightHours)}
												</span>
											</div>
											<div
												class="mt-4 border-t pt-4 {$theme === 'dark'
													? 'border-gray-700'
													: 'border-gray-200'}">
												<div
													class="flex items-start space-x-2 p-3 ">
													<svg
														class="h-5 w-5 {$theme === 'dark'
															? 'text-blue-400'
															: 'text-gray-600'} mt-0.5 flex-shrink-0"
														fill="currentColor"
														viewBox="0 0 20 20">
														<path
															fill-rule="evenodd"
															d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
															clip-rule="evenodd"></path>
													</svg>
													<span
														class="text-sm font-medium {$theme ===
														'dark'
															? 'text-blue-200'
															: 'text-gray-800'}">
														* Rates are ALL IN (captain fee, gratuity,
														fuel, etc...)
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							{:else}
								<div class="flex items-center gap-3">
									<div class="rounded-lg bg-emerald-600/20 p-3">
										<DollarOutline class="h-5 w-5 text-emerald-400" />
									</div>
									<div>
										<p
											class="text-sm {$theme === 'dark'
												? 'text-gray-400'
												: 'text-gray-600'}">
											Daily Rate
										</p>
										<p
											class="font-semibold {$theme === 'dark'
												? 'text-emerald-300'
												: 'text-emerald-600'}">
											{formatPrice(yacht.pricePerDay)}/day
										</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Right Column: Enhanced Booking Card -->
				<div class="lg:col-span-1" in:fly={{ x: 30, duration: 600, delay: 500 }}>
					<div class="sticky top-8" id="booking-section">
						<div
							class="border border-gray-300/30  rounded-xl p-8 shadow-2xl backdrop-blur-md transition-all duration-300">
							<!-- Enhanced Booking Header -->
							<div class="mb-6 text-center">
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full {$theme ===
									'dark'
										? 'bg-blue-600/20'
										: 'bg-primary-accent/20'} p-2">
									<svg
										class="h-8 w-8 {$theme === 'dark'
											? 'text-blue-400'
											: 'text-primary-accent'}"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
								<h2
									class="mb-2 text-2xl font-bold {$theme === 'dark'
										? 'text-white'
										: 'text-gray-900'}">
									Book This Yacht
								</h2>
								<p class={$theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
									Complete your booking in minutes
								</p>
							</div>

							<!-- Action Buttons -->
							<div class="mb-6 flex flex-col gap-3">
								<button
									class="w-full border-2 border-gray-300/30 text-black dark:text-white flex transform items-center justify-center gap-3 rounded-xl px-6 py-4 font-semibold  shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
									onclick={() => (showDatePicker = !showDatePicker)}>
									<svg
										class="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
									Book This Yacht
								</button>

								<a
									href={`/contact${userId ? `?userId=${userId}` : ''}`}
									class="w-full border border-gray-300/30 {$theme === 'dark'
										? 'border-gray-600 text-gray-200 hover:border-blue-500 hover:text-blue-400'
										: 'border-primary-accent text-primary-accent '} flex items-center justify-center gap-3 rounded-xl px-6 py-3 text-center font-semibold transition-all duration-300">
									<svg
										class="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
									Contact Us
								</a>
							</div>

							<!-- Booking Form -->
							<BookingForm
								{showDatePicker}
								bind:pickupDate
								bind:dropoffDate
								bind:location
								id={yacht.id}
								{vehicleType}
								vehicle={yacht} />
							</div>
							<!-- Trust Indicators -->
							<div class="mt-6 border-t border-gray-700/30 pt-4">
								<div
									class="flex items-center justify-center gap-6 text-xs text-gray-400">
									<div class="flex items-center gap-1">
										<svg
											class="h-3 w-3"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
												clip-rule="evenodd" />
										</svg>
										Secure Booking
									</div>
									<div class="flex items-center gap-1">
										<svg
											class="h-3 w-3"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd" />
										</svg>
										Instant Confirmation
									</div>
									<div class="flex items-center gap-1">
										<svg
											class="h-3 w-3"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
												clip-rule="evenodd" />
										</svg>
										24/7 Support
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Enhanced Fullscreen Image Modal -->
{#if showImageModal && activeImages.length > 0}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
		onclick={() => (showImageModal = false)}
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 200 }}>
		<div
			class="relative mx-4 flex max-h-[95vh] w-full max-w-7xl items-center justify-center"
			in:scale={{ duration: 300, start: 0.8 }}>
			<!-- Enhanced Close Button -->
			<button
				onclick={() => (showImageModal = false)}
				class="fixed right-6 top-6 z-30 rounded-full bg-black/60 p-4 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 shadow-lg"
				aria-label="Close modal">
				<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Image Info Bar -->
			<div class="fixed left-1/2 top-6 z-20 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-white backdrop-blur-md shadow-lg sm:left-4 sm:top-4 sm:translate-x-0">
				<div class="flex items-center gap-2">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span class="text-sm font-medium">
						{currentImageIndex + 1} of {activeImages.length}
					</span>
				</div>
			</div>

			<!-- Main Image with Smooth Transitions -->
			<div class="relative w-full h-full flex items-center justify-center">
				{#each activeImages as image, index}
					<img
						src={getImageUrl(image, 'large')}
						alt="{yacht?.year} {yacht?.make} {yacht?.model} - Full Size"
						class="max-h-[95vh] max-w-full rounded-lg object-contain shadow-2xl mx-auto absolute transition-opacity duration-300 ease-in-out {index === currentImageIndex ? 'opacity-100' : 'opacity-0'}"
						onclick={(e) => e.stopPropagation()}
					/>
				{/each}
			</div>

			<!-- Enhanced Navigation -->
			{#if activeImages.length > 1}
				<button
					onclick={(e) => {
						e.stopPropagation();
						prevImage();
					}}
					class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
					aria-label="Previous image">
					<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<button
					onclick={(e) => {
						e.stopPropagation();
						nextImage();
					}}
					class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
					aria-label="Next image">
					<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7" />
					</svg>
				</button>

				<!-- Navigation Dots -->
				<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
					<div class="flex items-center justify-center gap-3 rounded-full bg-black/70 px-6 py-4 backdrop-blur-md shadow-lg">
						{#each activeImages as _, index}
							<button
								onclick={(e) => { e.stopPropagation(); currentImageIndex = index; }}
								class="h-4 w-4 rounded-full transition-all duration-200 {index === currentImageIndex
									? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50'
									: 'bg-white/40 hover:bg-white/70 hover:scale-110'}"
								aria-label="Go to image {index + 1}"
							></button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
