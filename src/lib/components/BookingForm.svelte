<script lang="ts">
	import { slide } from 'svelte/transition';
	import { getTomorrow, validateDates, get24HoursFromNow } from '$lib/utils/dateUtils';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { apiUrl, dashboardUrl } from '$lib';

	export let id: string;
	export let showDatePicker: boolean;
	export let pickupDate: string;
	export let dropoffDate: string;
	export let location: string;
	export let vehicleType: 'vehicle' | 'yacht' = 'vehicle';

	let error: string = '';
	let selectedDuration: '4' | '6' | '8' = '4'; // Default to 4 hours for yachts

	// Calculate minimum date based on vehicle type
	$: minDate =
		vehicleType === 'yacht' ? get24HoursFromNow() : new Date().toISOString().split('T')[0];

	const handleBooking = () => {
		const validation =
			vehicleType === 'yacht'
				? validateDates(pickupDate, dropoffDate, true) // Pass yacht flag for 24-hour validation
				: validateDates(pickupDate, dropoffDate);

		if (!validation.isValid) {
			error = validation.error || '';
			return;
		}

		// Clear any existing errors
		error = '';

		const userId = $page.url.searchParams.get('userId') || '';
		const userIdParam = userId ? `userId=${userId}` : '';

		// Set cookies with proper attributes for cross-site sharing
		const cookieOptions = `; SameSite=None; Secure; Path=/`;

		// Build booking data with duration for yachts
		const bookingData = {
			userId,
			pickupDate,
			dropoffDate,
			location,
			vehicleType,
			vehicleId: id,
			...(vehicleType === 'yacht' && { duration: selectedDuration }) // Add duration for yachts
		};
		document.cookie = `bookingData=${JSON.stringify(bookingData)}${cookieOptions}`;

		// Navigate to the dashboard with the booking data in the URL
		const vehicleTypeParam = vehicleType === 'yacht' ? '&vehicleType=yacht' : '';
		let url = `${dashboardUrl}/booking?vehicleId=${id}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`;
		if (vehicleType === 'yacht') {
			url += `&duration=${selectedDuration}`;
		}
		window.location.href = url;
	};
</script>

{#if showDatePicker}
	<div
		class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
		transition:slide={{ duration: 300 }}>
		<div class="space-y-4">
			<div>
				<label
					for="location"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
					Pickup Location <span class="text-red-500">*</span>
				</label>
				<h3 class="text-md text-sky-300 dark:text-sky-300">{location}</h3>
				<!-- 				<select
					id="location"
					bind:value={location}
					class="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-gray-700 dark:bg-white/10 dark:text-white"
					required>
					<option value="Miami, FL" class="bg-white dark:bg-gray-800">Miami, FL</option>
					<option value="Tampa, FL" class="bg-white dark:bg-gray-800"
						>Los Angeles, CA</option>
					<option value="New York, NY" class="bg-white dark:bg-gray-800"
						>New York, NY</option>
					<option value="Charleston, SC" class="bg-white dark:bg-gray-800"
						>Charleston, SC</option>
				</select> -->
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
					You will receive exact pickup location when booking is confirmed
				</p>
			</div>

			{#if vehicleType === 'yacht'}
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Charter Duration <span class="text-red-500">*</span>
					</label>
					<div class="grid grid-cols-3 gap-3">
						<label
							class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-3 text-center transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5 {selectedDuration ===
							'4'
								? 'border-primary-accent bg-primary-accent/10 text-primary-accent dark:border-miami-blue dark:bg-miami-blue/10 dark:text-miami-blue'
								: 'text-gray-700 dark:text-gray-300'}">
							<input
								type="radio"
								bind:group={selectedDuration}
								value="4"
								class="sr-only" />
							<span class="font-medium">4 Hours</span>
						</label>
						<label
							class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-3 text-center transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5 {selectedDuration ===
							'6'
								? 'border-primary-accent bg-primary-accent/10 text-primary-accent dark:border-miami-blue dark:bg-miami-blue/10 dark:text-miami-blue'
								: 'text-gray-700 dark:text-gray-300'}">
							<input
								type="radio"
								bind:group={selectedDuration}
								value="6"
								class="sr-only" />
							<span class="font-medium">6 Hours</span>
						</label>
						<label
							class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-3 text-center transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5 {selectedDuration ===
							'8'
								? 'border-primary-accent bg-primary-accent/10 text-primary-accent dark:border-miami-blue dark:bg-miami-blue/10 dark:text-miami-blue'
								: 'text-gray-700 dark:text-gray-300'}">
							<input
								type="radio"
								bind:group={selectedDuration}
								value="8"
								class="sr-only" />
							<span class="font-medium">8 Hours</span>
						</label>
					</div>
				</div>
			{/if}

			<div>
				<label
					for="pickupDate"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
					{vehicleType === 'yacht' ? 'Charter Date' : 'Pickup Date'}
					<span class="text-red-500">*</span>
				</label>
				<input
					type="date"
					id="pickupDate"
					bind:value={pickupDate}
					min={minDate}
					class="relative w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-gray-700 dark:bg-white/10 dark:text-white [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
					required />
				{#if vehicleType === 'yacht'}
					<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Yacht charters must be booked at least 24 hours in advance
					</p>
				{/if}
			</div>

			{#if vehicleType === 'vehicle'}
				<div>
					<label
						for="dropoffDate"
						class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Dropoff Date <span class="text-red-500">*</span>
					</label>
					<input
						type="date"
						id="dropoffDate"
						bind:value={dropoffDate}
						min={pickupDate
							? getTomorrow(pickupDate)
							: getTomorrow(new Date().toISOString().split('T')[0])}
						class="relative w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-gray-700 dark:bg-white/10 dark:text-white [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
						required />
				</div>
			{/if}

			{#if error}
				<div class="rounded bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20">
					{error}
				</div>
			{/if}

			<button
				type="button"
				on:click={handleBooking}
				class="w-full rounded-lg bg-primary-accent px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-primary-accent/90 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2 dark:focus:ring-offset-gray-900">
				Continue to Booking
			</button>
		</div>
	</div>
{/if}
