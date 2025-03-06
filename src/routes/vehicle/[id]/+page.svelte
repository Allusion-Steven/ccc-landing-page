<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
	import VehicleSEO from '$lib/components/VehicleSEO.svelte';

	export let data: PageData;
	const {
		vehicle,
		pickupDate: initialPickupDate,
		dropoffDate: initialDropoffDate,
		location: initialLocation
	} = data;
	console.log('Page received vehicle data:', vehicle);

	if (!vehicle) {
		throw new Error('Vehicle data is missing');
	}

	let showDatePicker = false;
	let pickupDate: string = initialPickupDate;
	let dropoffDate: string = initialDropoffDate;
	let location: string = initialLocation;

	// Add this to handle URL parameters when the page loads
	$: {
		const searchParams = $page.url.searchParams;
		location = searchParams.get('location') || initialLocation;
		pickupDate = searchParams.get('pickupDate') || initialPickupDate;
		dropoffDate = searchParams.get('dropoffDate') || initialDropoffDate;
	}
</script>

<!-- <VehicleSEO make={vehicle.make} model={vehicle.model} imageUrl={vehicle.images[0].src} /> -->

<div
	class="container mx-auto min-h-screen px-4 py-8"
	in:fly={{ y: 50, duration: 1000, delay: 200 }}>
	<div
		class="grid grid-cols-1 gap-8 lg:grid-cols-2"
		in:fly={{ y: 50, duration: 1000, delay: 400 }}>
		<div in:fly={{ y: 50, duration: 1000, delay: 600 }}>
			<ImageGallery images={vehicle.images} />
		</div>

		<div class="flex flex-col justify-start space-y-8">
			<div>
				<h1 class="text-4xl font-bold text-white">
					{vehicle.make}
					{vehicle.model}
				</h1>
				<div class="mt-4 flex items-center justify-between">
					<span class="text-xl text-gray-300">{vehicle.year}</span>
					<span class="text-3xl font-bold text-[#0bd3d3]"
						>${vehicle.pricePerDay}/day</span>
				</div>
			</div>

			<div class="space-y-6">
				<h2 class="text-2xl font-semibold text-white">Features</h2>
				<div class="grid grid-cols-2 gap-4">
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Make</span>
						<p class="text-lg font-medium text-white">{vehicle.make}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Model</span>
						<p class="text-lg font-medium text-white">{vehicle.model}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Year</span>
						<p class="text-lg font-medium text-white">{vehicle.year}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Daily Rate</span>
						<p class="text-lg font-medium text-[#0bd3d3]">${vehicle.pricePerDay}</p>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col space-y-4">
				<button
					class="w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80"
					on:click={() => (showDatePicker = !showDatePicker)}>
					Book Now
				</button>

				<BookingForm
					{showDatePicker}
					{pickupDate}
					{dropoffDate}
					{location}
					id={vehicle.id} />

				<a
					href="/contact"
					class="w-full rounded-lg border border-[#0bd3d3] px-6 py-3 text-center font-semibold text-[#0bd3d3] transition-all duration-300 hover:bg-[#0bd3d3]/10">
					Contact Us
				</a>
			</div>
		</div>
	</div>

	<!-- New Full Width Description Section -->
	<h2 class="mt-20 text-3xl font-bold uppercase text-white">Description</h2>

	<!-- TODO: Need to add a description section here from the vehicle object -->
	<div class="mt-8 rounded-lg bg-white/5 p-6 shadow-md">
		<p class="mt-2 text-lg text-gray-200">
			{vehicle.description}
		</p>
	</div>
</div>
