<script lang="ts">
	import type { PageData } from './$types';
	import { baseUrl } from '$lib/index';
	import { Gallery } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	export let data: PageData;
	const { vehicle } = data;

	let selectedImageIndex = 0;
	let showDatePicker = false;
	let pickupDate: string = '';
	let dropoffDate: string = '';
	let location: string = 'Miami, FL';
	let error: string = '';

	const validateDates = () => {
		if (!pickupDate || !dropoffDate) {
			error = 'Please select both pickup and dropoff dates';
			return false;
		}

		const pickup = new Date(pickupDate);
		const dropoff = new Date(dropoffDate);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (pickup < today) {
			error = 'Pickup date cannot be in the past';
			return false;
		}

		if (dropoff <= pickup) {
			error = 'Dropoff date must be after pickup date';
			return false;
		}

		return true;
	};

	const handleBooking = () => {
		if (!validateDates()) {
			return;
		}

		// Clear any existing errors
		error = '';

		// Navigate to the booking form with the dates and location
		goto(`/booking/${vehicle.id}?pickup=${pickupDate}&dropoff=${dropoffDate}&location=${location}`);
	};

	console.log(baseUrl);
</script>

<div class="container mx-auto min-h-screen px-4 py-8">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Left side - Image Gallery -->
         <!-- TODO: Make the main image auto scroll -->
		<div class="container">
			<div class="relative h-[400px] sm:h-[500px] overflow-hidden rounded-xl bg-white/5">
				{#if vehicle.images && vehicle.images.length > 0}
					<img
						src={`${baseUrl}${vehicle.images[selectedImageIndex].src}`}
						alt={vehicle.images[selectedImageIndex].alt}
						class="h-full w-full object-cover"
					/>
					<!-- Thumbnail Navigation -->
					<div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
						{#each vehicle.images as _, index}
							<button
								class="h-2 w-16 rounded-full transition-all duration-300 {selectedImageIndex === index ? 'bg-[#0bd3d3]' : 'bg-white/50'}"
								on:click={() => (selectedImageIndex = index)}
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
				{#each vehicle.images as image, index}
					<button
						class="cursor-pointer h-full w-full rounded-lg"
						on:click={() => (selectedImageIndex = index)}
						aria-label={`View image ${index + 1}`}
					>
						<img
							src={`${baseUrl}${image.src}`}
							alt={image.alt}
							class={`h-full w-full object-cover rounded-lg ${selectedImageIndex === index ? 'border-4 border-[#0bd3d3]' : ''}`}
						/>
					</button>
				{/each}
			</div>
		</div>

		<!-- Right side - Vehicle Information -->
		<div class="flex flex-col justify-start space-y-8">
			<div>
				<h1 class="text-4xl font-bold text-white">
					{vehicle.make}
					{vehicle.model}
				</h1>
				<div class="mt-4 flex items-center justify-between">
					<span class="text-xl text-gray-300">{vehicle.year}</span>
					<span class="text-3xl font-bold text-[#0bd3d3]">${vehicle.price}/day</span>
				</div>
			</div>

			<!-- Vehicle Features -->
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
						<p class="text-lg font-medium text-[#0bd3d3]">${vehicle.price}</p>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col space-y-4">
				<button
					class="w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80"
					on:click={() => showDatePicker = !showDatePicker}
				>
					Book Now
				</button>

				{#if showDatePicker}
					<div 
						class="rounded-lg bg-white/5 p-6 space-y-6 border border-white/10"
						transition:slide={{ duration: 300 }}
					>
						<div class="space-y-4">
							<div>
								<label for="location" class="block mb-2 text-sm font-medium text-gray-300">
									Pickup Location <span class="text-red-500">*</span>
								</label>
								<select
									id="location"
									bind:value={location}
									class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3]"
									required
								>
									<option value="Miami, FL" class="bg-gray-800">Miami, FL</option>
								</select>
							</div>

							<div>
								<label for="pickupDate" class="block mb-2 text-sm font-medium text-gray-300">
									Pickup Date <span class="text-red-500">*</span>
								</label>
								<input
									type="date"
									id="pickupDate"
									bind:value={pickupDate}
									min={new Date().toISOString().split('T')[0]}
									class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer relative"
									required
								/>
							</div>

							<div>
								<label for="dropoffDate" class="block mb-2 text-sm font-medium text-gray-300">
									Dropoff Date <span class="text-red-500">*</span>
								</label>
								<input
									type="date"
									id="dropoffDate"
									bind:value={dropoffDate}
									min={pickupDate || new Date().toISOString().split('T')[0]}
									class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer relative"
									required
								/>
							</div>

							{#if error}
								<div class="text-red-500 text-sm">
									{error}
								</div>
							{/if}

							<button
								type="button"
								on:click={handleBooking}
								class="w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80"
							>
								Continue to Booking
							</button>
						</div>
					</div>
				{/if}

				<a
					href="/contact"
					class="w-full rounded-lg border border-[#0bd3d3] px-6 py-3 text-center font-semibold text-[#0bd3d3] transition-all duration-300 hover:bg-[#0bd3d3]/10"
				>
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
			This is temporary text to serve as a "vehicle description" section.....<br /><br />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
			et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
			elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
			sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</div>
</div>
