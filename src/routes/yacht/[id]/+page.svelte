<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
	import VehicleSEO from '$lib/components/VehicleSEO.svelte';

	export let data: PageData;
	const {
		yacht,
		pickupDate: initialPickupDate,
		dropoffDate: initialDropoffDate,
		location: initialLocation
	} = data;

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
	make={yacht.make}
	model={yacht.model}
	year={yacht.year.toString()}
	canonical={`${yacht.id}?userId=${yacht.userId}`}
	imageUrl={yacht.images[0].url ?? 'https://macroexotics.com/favicon.png'}
	vehicleType="yacht" />

<div class="container mx-auto px-4 py-8">
	<div class="grid gap-8 lg:grid-cols-2">
		<!-- Left side - Image Gallery -->
		<div>
			<ImageGallery images={yacht.images} />
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
					<span class="text-3xl font-bold text-miami-pink">${yacht.pricePerDay}/day</span>
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
						<p class="text-lg font-medium text-miami-pink">${yacht.pricePerDay}</p>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col space-y-4">
				<button
					class="w-full rounded-lg bg-miami-pink px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-miami-pink/80"
					on:click={() => (showDatePicker = !showDatePicker)}>
					Book Now
				</button>

				<BookingForm
					{showDatePicker}
					{pickupDate}
					{dropoffDate}
					{location}
					id={yacht.id}
					vehicleType="yacht" />
			</div>
		</div>
	</div>

	<!-- Yacht Description -->
	<div class="mt-8 rounded-lg bg-white/5 p-6 shadow-md">
		<h2 class="mb-4 text-2xl font-semibold text-white">About This Yacht</h2>
		<p class="mt-2 text-lg text-gray-200">
			Experience luxury on the water with the {yacht.year}
			{yacht.make}
			{yacht.model}. This stunning {yacht.specs.length} yacht offers exceptional comfort and style,
			accommodating up to {yacht.specs.guests} guests in {yacht.specs.cabins} luxurious cabins.
			With a professional crew of {yacht.specs.crew}, your journey will be nothing short of
			extraordinary.
		</p>
	</div>
</div>
