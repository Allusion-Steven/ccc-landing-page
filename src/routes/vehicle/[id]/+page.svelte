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
		vehicle,
		pickupDate: initialPickupDate,
		dropoffDate: initialDropoffDate,
		location: initialLocation
	} = data;
	//console.log('Page received vehicle data:', vehicle);

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

<VehicleSEO
	make={vehicle.make}
	model={vehicle.model}
	year={vehicle.year}
	canonical={`${vehicle.id}?userId=${vehicle.userId}`}
	imageUrl={vehicle?.images?.[0]?.url ?? 'https://macroexotics.com/favicon.png'} />

<div
	class="min-h-screen bg-gray-50 px-4 py-8 dark:bg-transparent"
	in:fly={{ y: 50, duration: 1000, delay: 200 }}>
	<div
		class="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-10"
		in:fly={{ y: 50, duration: 1000, delay: 400 }}>
		<div class="md:col-span-1 lg:col-span-6" in:fly={{ y: 50, duration: 1000, delay: 600 }}>
			<ImageGallery
				images={vehicle.images.filter((img: VehicleImage) => img?.isActive !== false)} />
		</div>

		<div class="flex flex-col justify-start space-y-8 md:col-span-1 lg:col-span-4">
			<div>
				<h1 class="text-4xl font-bold text-primary-accent dark:text-gray-300">
					{vehicle.make}
					{vehicle.model}
				</h1>
				<div class="mt-4 flex items-center justify-between">
					<span class="text-xl text-primary-accent/80 dark:text-gray-300"
						>{vehicle.year}</span>
					<span class="text-3xl font-bold text-[#0bd3d3] dark:text-[#0bd3d3]"
						>${new Intl.NumberFormat('en-US').format(vehicle.pricePerDay)}/day</span>
				</div>
			</div>

			<div class="space-y-6">
				<h2 class="text-2xl font-semibold text-primary-accent dark:text-white">Features</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						class="rounded-lg bg-white p-4 shadow-md drop-shadow-lg transition-shadow hover:shadow-lg hover:drop-shadow-xl dark:bg-white/5 dark:shadow-white/20 dark:hover:shadow-white/30 dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] dark:hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.2)]">
						<span class="text-sm text-gray-500 dark:text-gray-400">Make</span>
						<p class="text-lg font-medium text-primary-accent dark:text-white">
							{vehicle.make}
						</p>
					</div>
					<div
						class="rounded-lg bg-white p-4 shadow-md drop-shadow-lg transition-shadow hover:shadow-lg hover:drop-shadow-xl dark:bg-white/5 dark:shadow-white/20 dark:hover:shadow-white/30 dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] dark:hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.2)]">
						<span class="text-sm text-gray-500 dark:text-gray-400">Model</span>
						<p class="text-lg font-medium text-primary-accent dark:text-white">
							{vehicle.model}
						</p>
					</div>
					<div
						class="rounded-lg bg-white p-4 shadow-md drop-shadow-lg transition-shadow hover:shadow-lg hover:drop-shadow-xl dark:bg-white/5 dark:shadow-white/20 dark:hover:shadow-white/30 dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] dark:hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.2)]">
						<span class="text-sm text-gray-500 dark:text-gray-400">Year</span>
						<p class="text-lg font-medium text-primary-accent dark:text-white">
							{vehicle.year}
						</p>
					</div>
					<div
						class="rounded-lg bg-white p-4 shadow-md drop-shadow-lg transition-shadow hover:shadow-lg hover:drop-shadow-xl dark:bg-white/5 dark:shadow-white/20 dark:hover:shadow-white/30 dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] dark:hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.2)]">
						<span class="text-sm text-gray-500 dark:text-gray-400">Daily Rate</span>
						<p class="text-lg font-medium text-[#BF4959] dark:text-[#0bd3d3]">
							${new Intl.NumberFormat('en-US').format(vehicle.pricePerDay)}/day
						</p>
					</div>
				</div>
			</div>

			<!-- Description -->
			<div class="space-y-6">
				<h2 class="text-2xl font-semibold text-primary-accent dark:text-white">Description</h2>
				<div
					class="rounded-lg bg-white p-4 shadow-md drop-shadow-lg transition-shadow hover:shadow-lg hover:drop-shadow-xl dark:bg-white/5 dark:shadow-white/20 dark:hover:shadow-white/30 dark:drop-shadow-[0_4px_8px_rgba(255,255,255,0.15)] dark:hover:drop-shadow-[0_8px_16px_rgba(255,255,255,0.2)]">
					<p class="text-lg text-primary-accent dark:text-white leading-relaxed">
						{vehicle.description}
					</p>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col space-y-4">
				<button
					class="w-full rounded-lg bg-[#BF4959] px-6 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:opacity-90 hover:shadow-md dark:bg-[#0bd3d3]"
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
					class="w-full rounded-lg border border-[#BF4959] px-6 py-3 text-center font-semibold text-[#BF4959] shadow-sm transition-all duration-300 hover:bg-[#BF4959]/10 hover:shadow-md dark:border-[#0bd3d3] dark:text-[#0bd3d3] dark:shadow-none dark:hover:bg-[#0bd3d3]/10 dark:hover:shadow-none">
					Contact Us
				</a>
			</div>
		</div>
	</div>
</div>
