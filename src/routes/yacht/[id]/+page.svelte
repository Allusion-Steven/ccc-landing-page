<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
	import VehicleSEO from '$lib/components/VehicleSEO.svelte';
	import type { VehicleImage } from '$lib/types';

	export let data: PageData;
	const {
		yacht,
		pickupDate: initialPickupDate,
		dropoffDate: initialDropoffDate,
		location: initialLocation
	} = data;

	if (!yacht) {
		throw new Error('Yacht data is missing');
	}

	console.log('Page received yacht data:', yacht);

	// Make sure userId is available for links and APIs
	const userId = yacht.userId || $page.url.searchParams.get('userId') || '';
	// Use the vehicleType from URL or default to "yacht" and ensure proper typing
	const vehicleType = ($page.url.searchParams.get('vehicleType') || 'yacht') as
		| 'yacht'
		| 'vehicle';

	if (userId && !yacht.userId) {
		yacht.userId = userId;
		console.log('Updated yacht with userId from URL params:', userId);
	}

	let showDatePicker = false;
	let pickupDate: string = initialPickupDate;
	let dropoffDate: string = initialDropoffDate;
	let location: string = initialLocation;

	// Handle URL parameters when the page loads
	$: {
		const searchParams = $page.url.searchParams;
		location = searchParams.get('location') || initialLocation;
		pickupDate = searchParams.get('pickupDate') || initialPickupDate;
		dropoffDate = searchParams.get('dropoffDate') || initialDropoffDate;
	}

	// Safe getter function for yacht specs
	function getYachtInfo(yachtObj: any, field: string, defaultValue: any = 'N/A') {
		if (!yachtObj || !yachtObj.specs) return defaultValue;
		return yachtObj.specs[field] || defaultValue;
	}

	// Extract description safely
	const description = yacht.description || '';

	// Ensure we have valid images array
	const yachtImages =
		yacht.images && Array.isArray(yacht.images)
			? yacht.images.filter((img: VehicleImage) => img && img.isActive)
			: [];

	// Get the best quality image URL for SEO
	const seoImageUrl =
		yachtImages.length > 0 && yachtImages[0].urls?.large
			? yachtImages[0].urls.large
			: (yacht.images?.[0]?.url ?? 'https://macroexotics.com/favicon.png');
</script>

<VehicleSEO
	make={yacht.make || ''}
	model={yacht.model || ''}
	year={yacht.year?.toString() || ''}
	canonical={`${yacht.id}${userId ? `?userId=${userId}` : ''}`}
	imageUrl={seoImageUrl}
	vehicleType="yacht" />

<div
	class="min-h-screen bg-gray-50 dark:bg-transparent px-4 py-8"
	in:fly={{ y: 50, duration: 1000, delay: 200 }}>
	<div
		class="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-10"
		in:fly={{ y: 50, duration: 1000, delay: 400 }}>
		<div class="md:col-span-1 lg:col-span-6" in:fly={{ y: 50, duration: 1000, delay: 600 }}>
			<ImageGallery images={yachtImages} />
		</div>

		<!-- Right side - Yacht Information -->
		<div class="flex flex-col justify-start space-y-8 md:col-span-1 lg:col-span-4">
			<div>
				<h1 class="text-4xl font-bold text-primary-accent dark:text-white">
					{yacht.make || ''}
					{yacht.model || ''}
				</h1>
				<div class="mt-4 flex items-center justify-between">
					<span class="text-xl text-primary-accent/80 dark:text-gray-300">{yacht.year}</span>
					<span class="text-3xl font-bold text-[#BF4959] dark:text-miami-blue">
						${new Intl.NumberFormat('en-US').format(yacht.pricePerDay)}/day
					</span>
				</div>
			</div>

			<!-- Yacht Specifications -->
			<div class="space-y-6">
				<h2 class="text-2xl font-semibold text-primary-accent dark:text-white">Specifications</h2>
				<div class="grid grid-cols-2 gap-4">
					<div class="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-white/5 dark:shadow-none dark:hover:shadow-none">
						<span class="text-sm text-gray-500 dark:text-gray-400">Length</span>
						<p class="text-lg font-medium text-primary-accent dark:text-white">
							{getYachtInfo(yacht, 'length')}
						</p>
					</div>

					<!-- 				TODO: Add beam to the yacht form on backend	
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Beam</span>
						<p class="text-lg font-medium text-white">{getYachtInfo(yacht, 'beam')}</p>
					</div> -->
					<div class="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-white/5 dark:shadow-none dark:hover:shadow-none">
						<span class="text-sm text-gray-500 dark:text-gray-400">Guests</span>
						<p class="text-lg font-medium text-primary-accent dark:text-white">
							{getYachtInfo(yacht, 'guests', 0)}
						</p>
					</div>
					<div class="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-white/5 dark:shadow-none dark:hover:shadow-none">
						<span class="text-sm text-gray-500 dark:text-gray-400">Cabins</span>
						<p class="text-lg font-medium text-primary-accent dark:text-white">
							{getYachtInfo(yacht, 'cabins', 0)}
						</p>
					</div>
					<div class="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-white/5 dark:shadow-none dark:hover:shadow-none">
						<span class="text-sm text-gray-500 dark:text-gray-400">Crew</span>
						<p class="text-lg font-medium text-primary-accent dark:text-white">
							{getYachtInfo(yacht, 'crew', 0)}
						</p>
					</div>
					<div class="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-white/5 dark:shadow-none dark:hover:shadow-none">
						<span class="text-sm text-gray-500 dark:text-gray-400">Daily Rate</span>
						<p class="text-lg font-medium text-[#BF4959] dark:text-miami-blue">
							${new Intl.NumberFormat('en-US').format(yacht.pricePerDay)}/day
						</p>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col space-y-4">
				<button
					class="w-full rounded-lg bg-[#BF4959] dark:bg-miami-pink px-6 py-3 font-semibold text-white shadow-sm hover:shadow-md transition-all duration-300 hover:opacity-90"
					on:click={() => (showDatePicker = !showDatePicker)}>
					Book Now
				</button>

				<BookingForm
					{showDatePicker}
					{pickupDate}
					{dropoffDate}
					{location}
					id={yacht.id}
					{vehicleType} />

				<a
					href={`/contact${userId ? `?userId=${userId}` : ''}`}
					class="w-full rounded-lg border border-[#BF4959] dark:border-[#0bd3d3] px-6 py-3 text-center font-semibold text-[#BF4959] dark:text-[#0bd3d3] transition-all duration-300 hover:bg-[#BF4959]/10 dark:hover:bg-[#0bd3d3]/10 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none">
					Contact Us
				</a>
			</div>
		</div>
	</div>

	<!-- Yacht Description -->
	<div class="container mx-auto">
		<h2 class="mt-20 text-3xl font-bold uppercase text-primary-accent dark:text-white">Description</h2>
		<div class="mt-8 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow dark:bg-white/5 dark:hover:shadow-none p-6">
			<p class="mt-2 text-lg text-primary-accent dark:text-gray-200">
				{#if description}
					{description}
				{:else}
					Experience luxury on the water with the {yacht.year || 'modern'}
					{yacht.make || ''}
					{yacht.model || ''}. This stunning {getYachtInfo(yacht, 'length')} yacht offers exceptional
					comfort and style, accommodating up to {getYachtInfo(yacht, 'guests', 0)} guests in {getYachtInfo(
						yacht,
						'cabins',
						0
					)} luxurious cabins. With a professional crew of {getYachtInfo(yacht, 'crew', 0)},
					your journey will be nothing short of extraordinary.
				{/if}
			</p>
		</div>
	</div>
</div>
