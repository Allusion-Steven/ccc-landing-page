<script lang="ts">
	import type { PageData } from './$types';
	import { baseUrl } from '$lib/index';
	import { Gallery } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { slide, fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	export let data: PageData;
	const {
		yacht,
		pickupDate: initialPickupDate,
		dropoffDate: initialDropoffDate,
		location: initialLocation
	} = data;

	let selectedImageIndex = 0;
	let showDatePicker = false;
	let pickupDate: string = initialPickupDate;
	let dropoffDate: string = initialDropoffDate;
	let location: string = initialLocation;
	let error: string = '';
	let transitionDirection = 1; // 1 for right-to-left, -1 for left-to-right

	// Add this to handle URL parameters when the page loads
	$: {
		const searchParams = $page.url.searchParams;
		location = searchParams.get('location') || initialLocation;
		pickupDate = searchParams.get('pickupDate') || initialPickupDate;
		dropoffDate = searchParams.get('dropoffDate') || initialDropoffDate;
	}

	const validateDates = () => {
		if (!pickupDate || !dropoffDate) {
			error = 'Please select both pickup and dropoff dates';
			return false;
		}

		const pickup = new Date(pickupDate);
		const dropoff = new Date(dropoffDate);

		if (dropoff <= pickup) {
			error = 'Dropoff date must be after pickup date';
			return false;
		}

		return true;
	};

	// Add this helper function to calculate tomorrow's date
	const getTomorrow = (date: string) => {
		const tomorrow = new Date(date);
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow.toISOString().split('T')[0];
	};

	// Update the handleBooking function to preserve parameters when navigating
	const handleBooking = () => {
		if (!validateDates()) {
			return;
		}

		// Clear any existing errors
		error = '';

		// Navigate to the booking form with the dates and location
		goto(
			`/booking/${yacht.id}?pickupDate=${encodeURIComponent(pickupDate)}&dropoffDate=${encodeURIComponent(dropoffDate)}&location=${encodeURIComponent(location)}&vehicleType=yacht`
		);
	};
</script>

<svelte:head>
	<title>{yacht.make} {yacht.model} | Macro Exotics</title>
	<meta name="description" content="{yacht.year} {yacht.make} {yacht.model} - Luxury yacht rental in Miami. Book now at Macro Exotics." />
	<meta name="title" content="{yacht.make} {yacht.model} | Macro Exotics" />
	<meta name="keywords" content="{yacht.make}, {yacht.model}, Luxury Yacht Rental, Miami, Macro Exotics" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1C1C1C" />

	<meta property="og:title" content="{yacht.make} {yacht.model} | Macro Exotics" />
	<meta property="og:description" content="{yacht.year} {yacht.make} {yacht.model} - Luxury yacht rental in Miami. Book now at Macro Exotics." />
	<meta property="og:url" content="https://macroexotics.com/yacht/{yacht.id}" />
	<meta property="og:image" content="https://macroexotics.com{yacht.images[0].src}" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Macro Exotics" />
	<link rel="canonical" href="https://macroexotics.com/yacht/{yacht.id}" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="grid gap-8 lg:grid-cols-2">
		<!-- Left side - Image Gallery -->
		<div class="container">
			<div class="relative h-[400px] overflow-hidden rounded-xl bg-white/5 sm:h-[500px]">
				{#if yacht.images && yacht.images.length > 0}
					{#key selectedImageIndex}
						<img
							transition:fly={{ duration: 300, x: transitionDirection * 300 }}
							src={`${baseUrl}${yacht.images[selectedImageIndex].src}`}
							alt={yacht.images[selectedImageIndex].alt}
							class="h-full w-full object-cover"
						/>
					{/key}
					<!-- Left Arrow -->
					<button
						class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-300 hover:bg-black/70"
						on:click={() => {
							transitionDirection = 1;
							selectedImageIndex =
								selectedImageIndex === 0 ? yacht.images.length - 1 : selectedImageIndex - 1;
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
						class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-300 hover:bg-black/70"
						on:click={() => {
							transitionDirection = -1;
							selectedImageIndex =
								selectedImageIndex === yacht.images.length - 1 ? 0 : selectedImageIndex + 1;
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
					<!-- Thumbnail Navigation -->
					<div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
						{#each yacht.images as _, index}
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
				{:else}
					<div class="flex h-full items-center justify-center bg-gray-800">
						<span class="text-gray-400">No image available</span>
					</div>
				{/if}
			</div>
			<!-- New Thumbnail Section -->
			<div class="mt-4 grid grid-cols-3 gap-4">
				{#each yacht.images as image, index}
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
							src={`${baseUrl}${image.src}`}
							alt={image.alt}
							class={`h-full w-full rounded-lg object-cover ${selectedImageIndex === index ? 'border-4 border-[#0bd3d3]' : ''}`}
						/>
					</button>
				{/each}
			</div>
		</div>

		<!-- Right side - Yacht Information -->
		<div class="flex flex-col justify-start space-y-8">
			<div>
				<h1 class="text-4xl font-bold text-white">
					{yacht.make}
					{yacht.model}
				</h1>
				<div class="mt-4 flex items-center justify-between">
					<span class="text-xl text-gray-300">{yacht.year}</span>
					<span class="text-3xl font-bold text-[#0bd3d3]">${yacht.price}/day</span>
				</div>
			</div>

			<!-- Yacht Specifications -->
			<div class="space-y-6">
				<h2 class="text-2xl font-semibold text-white">Specifications</h2>
				<div class="grid grid-cols-2 gap-4">
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Length</span>
						<p class="text-lg font-medium text-white">{yacht.specs.length}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Beam</span>
						<p class="text-lg font-medium text-white">{yacht.specs.beam}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Guests</span>
						<p class="text-lg font-medium text-white">{yacht.specs.guests}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Cabins</span>
						<p class="text-lg font-medium text-white">{yacht.specs.cabins}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Crew</span>
						<p class="text-lg font-medium text-white">{yacht.specs.crew}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Daily Rate</span>
						<p class="text-lg font-medium text-[#0bd3d3]">${yacht.price}</p>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col space-y-4">
				<button
					class="w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80"
					on:click={() => (showDatePicker = !showDatePicker)}
				>
					Book Now
				</button>
			</div>

			<!-- Date Picker -->
			{#if showDatePicker}
				<div class="space-y-4" transition:slide>
					<div class="rounded-lg bg-white/5 p-6">
						<h3 class="mb-4 text-xl font-semibold text-white">Select Dates</h3>
						<div class="space-y-4">
							<div>
								<label for="pickup" class="mb-2 block text-sm text-gray-300">Pickup Date</label>
								<input
									type="date"
									id="pickup"
									bind:value={pickupDate}
									min={new Date().toISOString().split('T')[0]}
									class="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white"
								/>
							</div>
							<div>
								<label for="dropoff" class="mb-2 block text-sm text-gray-300">Dropoff Date</label>
								<input
									type="date"
									id="dropoff"
									bind:value={dropoffDate}
									min={pickupDate || new Date().toISOString().split('T')[0]}
									class="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white"
								/>
							</div>
							<div>
								<label for="location" class="mb-2 block text-sm text-gray-300">Location</label>
								<select
									id="location"
									bind:value={location}
									class="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white"
								>
									<option value="Miami, FL">Miami, FL</option>
									<option value="Los Angeles, CA" disabled>Los Angeles, CA</option>
									<option value="New York, NY" disabled>New York, NY</option>
								</select>
							</div>
							{#if error}
								<p class="text-sm text-red-500">{error}</p>
							{/if}
							<button
								class="w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80"
								on:click={handleBooking}
							>
								Continue to Booking
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Yacht Description -->
	<div class="mt-8 rounded-lg bg-white/5 p-6 shadow-md">
		<h2 class="mb-4 text-2xl font-semibold text-white">About This Yacht</h2>
		<p class="mt-2 text-lg text-gray-200">
			Experience luxury on the water with the {yacht.year} {yacht.make} {yacht.model}. This stunning {yacht.specs.length} yacht 
			offers exceptional comfort and style, accommodating up to {yacht.specs.guests} guests in {yacht.specs.cabins} luxurious cabins. 
			With a professional crew of {yacht.specs.crew}, your journey will be nothing short of extraordinary.
		</p>
	</div>
</div> 