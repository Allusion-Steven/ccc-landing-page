<script lang="ts">
    import { slide } from 'svelte/transition';
    import { getTomorrow, validateDates } from '$lib/utils/dateUtils';
    import { goto } from '$app/navigation';

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

        // Navigate to the booking form with the dates and location
        const vehicleTypeParam = vehicleType === 'yacht' ? '&vehicleType=yacht' : '';
        goto(
            `/booking/${id}?pickupDate=${encodeURIComponent(pickupDate)}&dropoffDate=${encodeURIComponent(dropoffDate)}&location=${encodeURIComponent(location)}${vehicleTypeParam}`
        );
    };
</script>

{#if showDatePicker}
    <div class="space-y-6 rounded-lg border border-white/10 bg-white/5 p-6" transition:slide={{ duration: 300 }}>
        <div class="space-y-4">
            <div>
                <label for="location" class="mb-2 block text-sm font-medium text-gray-300">
                    Pickup Location <span class="text-red-500">*</span>
                </label>
                <select
                    id="location"
                    bind:value={location}
                    class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3]"
                    required
                >
                    <option value="Miami, FL" class="bg-gray-800">Miami, FL</option>
                    <option value="Los Angeles, CA" class="bg-gray-800" disabled>Los Angeles, CA</option>
                    <option value="New York, NY" class="bg-gray-800" disabled>New York, NY</option>
                </select>
                <p class="text-sm text-gray-400">You will receive exact pickup location when booking is confirmed</p>
            </div>

            <div>
                <label for="pickupDate" class="mb-2 block text-sm font-medium text-gray-300">
                    Pickup Date <span class="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="pickupDate"
                    bind:value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    class="relative w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
                    required
                />
            </div>

            <div>
                <label for="dropoffDate" class="mb-2 block text-sm font-medium text-gray-300">
                    Dropoff Date <span class="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id="dropoffDate"
                    bind:value={dropoffDate}
                    min={pickupDate ? getTomorrow(pickupDate) : getTomorrow(new Date().toISOString().split('T')[0])}
                    class="relative w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0"
                    required
                />
            </div>

            {#if error}
                <div class="text-sm text-red-500">
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