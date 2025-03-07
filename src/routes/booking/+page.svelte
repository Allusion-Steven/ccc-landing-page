<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { vehicles } from '$lib/constants/Vehicles';

	let selectedVehicle: string = '';
	let pickupDate: string = '';
	let dropoffDate: string = '';
	let location: string = '';
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

	const handleContinue = () => {
		if (!selectedVehicle) {
			error = 'Please select a vehicle';
			return;
		}

		if (!location) {
			error = 'Please select a pickup location';
			return;
		}

		if (!validateDates()) {
			return;
		}

		// Clear any existing errors
		error = '';

		// Navigate to the booking form with the selected vehicle ID
		goto(
			`/booking/${selectedVehicle}?pickup=${pickupDate}&dropoff=${dropoffDate}&location=${location}`
		);
	};
</script>

<div class="container mx-auto min-h-screen px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-8 text-center text-3xl font-bold text-white">Book Your Dream Car</h1>

		<div class="rounded-lg border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm">
			<!-- Booking Form -->
			<div class="space-y-6">
				<!-- Location Selection -->
				<div class="space-y-2">
					<label for="location" class="text-sm font-medium text-gray-300">
						Pickup Location <span class="text-red-500">*</span>
					</label>
					<select
						id="location"
						bind:value={location}
						required
						class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3]">
						<option value="" class="bg-gray-800">Select a location</option>
						<option value="Miami, FL" class="bg-gray-800">Miami, FL</option>
					</select>
				</div>

				<!-- Date Selection -->
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="space-y-2">
						<label for="pickupDate" class="text-sm font-medium text-gray-300">
							Pickup Date <span class="text-red-500">*</span>
						</label>
						<input
							type="date"
							id="pickupDate"
							bind:value={pickupDate}
							min={new Date().toISOString().split('T')[0]}
							required
							class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3]" />
					</div>

					<div class="space-y-2">
						<label for="dropoffDate" class="text-sm font-medium text-gray-300">
							Dropoff Date <span class="text-red-500">*</span>
						</label>
						<input
							type="date"
							id="dropoffDate"
							bind:value={dropoffDate}
							min={pickupDate || new Date().toISOString().split('T')[0]}
							required
							class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3]" />
					</div>
				</div>

				<!-- Vehicle Selection -->
				<div class="space-y-2">
					<label for="vehicle" class="text-sm font-medium text-gray-300">
						Select Vehicle <span class="text-red-500">*</span>
					</label>
					<select
						id="vehicle"
						bind:value={selectedVehicle}
						required
						class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3]">
						<option value="" class="bg-gray-800">Select a vehicle</option>
						{#each vehicles as vehicle}
							<option value={vehicle.id} class="bg-gray-800">
								{vehicle.year}
								{vehicle.make}
								{vehicle.model} - ${vehicle.pricePerDay}/day
							</option>
						{/each}
					</select>
				</div>

				{#if error}
					<div class="rounded-lg bg-red-500/10 p-3 text-red-500">
						{error}
					</div>
				{/if}

				<button
					type="button"
					on:click={handleContinue}
					class="mt-8 w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80">
					Continue to Booking
				</button>
			</div>
		</div>
	</div>
</div>
