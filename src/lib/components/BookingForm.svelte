<script lang="ts">
	import { slide } from 'svelte/transition';
	import { getTomorrow, validateDates } from '$lib/utils/dateUtils';
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

	const handleBooking = () => {
		const validation = validateDates(pickupDate, dropoffDate);
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
		// In your other app where you're setting the booking data
		const bookingData = {
			userId,
			pickupDate,
			dropoffDate,
			location,
			vehicleType,
			vehicleId: id
		};
        document.cookie = `bookingData=${JSON.stringify(bookingData)}${cookieOptions}`;

		// Encode the booking data for the URL
	
		// Navigate to the dashboard with the booking data in the URL
		const vehicleTypeParam = vehicleType === 'yacht' ? '&vehicleType=yacht' : '';
		window.location.href = `${dashboardUrl}/booking/${id}?${userIdParam}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}&location=${location}${vehicleTypeParam}`;
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
				<select
					id="location"
					bind:value={location}
					class="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-gray-700 dark:bg-white/10 dark:text-white"
					required>
					<option value="Miami, FL" class="bg-white dark:bg-gray-800">Miami, FL</option>
					<option value="Tampa, FL" class="bg-white dark:bg-gray-800" disabled
						>Los Angeles, CA</option>
					<option value="New York, NY" class="bg-white dark:bg-gray-800" disabled
						>New York, NY</option>
					<option value="Charleston, SC" class="bg-white dark:bg-gray-800" disabled
						>Charleston, SC</option>
				</select>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
					You will receive exact pickup location when booking is confirmed
				</p>
			</div>

			<div>
				<label
					for="pickupDate"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
					Pickup Date <span class="text-red-500">*</span>
				</label>
				<input
					type="date"
					id="pickupDate"
					bind:value={pickupDate}
					min={new Date().toISOString().split('T')[0]}
					class="relative w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-accent dark:border-gray-700 dark:bg-white/10 dark:text-white [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
					required />
			</div>

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
