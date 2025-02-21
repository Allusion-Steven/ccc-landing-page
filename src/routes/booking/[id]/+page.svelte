<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { compressImage, handleFileUpload, type FormData, type FormErrors } from '$lib/utils/image';
    import { vehicles } from '$lib/constants/Vehicles';

    export let data: PageData;
    let loading = false;
    let step = 1; // 1: User Info, 2: Payment

    // Get data from server load function
    const { vehicle, pickupDate, dropoffDate, location } = data;


    // Get the vehicle ID from the route parameter
    $: vehicleId = $page.params.id;
    $: selectedVehicle = vehicles.find(v => v.id === vehicleId);


    // Form validation errors
    let errors: FormErrors = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        countryOfCitizenship: '',
        state: '',
        licenseNumber: '',
        licenseExpiration: '',
        dateOfBirth: '',
        licenseFrontImage: '',
        licenseBackImage: '',
    };

    // Countries list
    /* TODO: Fetch country list from API */
    const countries = ["United States", "Canada", "Mexico", /* Add more countries as needed */];

    // US States
    /* Fetch state list from API based off country */
    const usStates = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    // Form data
    let formData: FormData = {
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        countryOfCitizenship: '',
        state: '',
        licenseNumber: '',
        licenseExpiration: '',
        dateOfBirth: '',
        licenseFrontImage: null,
        licenseBackImage: null,
    };

    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    };

    const validateLicense = (license: string) => {
        // This is a basic validation - adjust based on your specific requirements
        return license.length >= 6;
    };

    const validateDate = (date: string) => {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate < today;
    };

    const validateForm = () => {
        let isValid = true;
        
        // Reset errors
        errors = Object.keys(errors).reduce<typeof errors>((acc, key) => ({ 
            ...acc, 
            [key]: '' 
        }), {...errors});

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
            isValid = false;
        }

        if (!validatePhone(formData.phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid phone number';
            isValid = false;
        }

        if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.countryOfCitizenship) {
            errors.countryOfCitizenship = 'Country is required';
            isValid = false;
        }

        if (!formData.state) {
            errors.state = 'State is required';
            isValid = false;
        }

        if (!validateLicense(formData.licenseNumber)) {
            errors.licenseNumber = 'Please enter a valid license number';
            isValid = false;
        }

        if (!formData.licenseExpiration) {
            errors.licenseExpiration = 'License expiration date is required';
            isValid = false;
        }

        if (!validateDate(formData.dateOfBirth)) {
            errors.dateOfBirth = 'Please enter a valid date of birth';
            isValid = false;
        }

        if (!formData.licenseFrontImage) {
            errors.licenseFrontImage = 'Front of license is required';
            isValid = false;
        }

        if (!formData.licenseBackImage) {
            errors.licenseBackImage = 'Back of license is required';
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        
        loading = true;
        // TODO: Add API call to save user data
        // If successful, move to payment step
        step = 2;
        loading = false;
    };
</script>

<!-- TODO: ADD check if user exits... -->
<!-- TODO: ADD check if vehicle is booked... -->
<!-- TODO: ADD check if user is 21+... -->
<!-- TODO: Verify  your email address-->
<!-- TODO: Verify Your Phone Number-->

<div class="container mx-auto min-h-screen px-4 py-8">
    <div class="mx-auto max-w-2xl">
        <!-- TODO: Check if user exists and is loged in -->
        <h1 class="mb-8 text-3xl font-bold text-white">Complete Your Booking</h1>

        <!-- TODO: Request parameters from URL (PICKUPDATE IS NOT WORKING)-->
        <!-- Booking Summary -->
        <div class="mb-8 rounded-lg bg-white/5 p-6 backdrop-blur-sm border border-white/10">
            <h2 class="mb-4 text-xl font-semibold text-white">Booking Details</h2>
            <div class="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                    <p class="text-sm">Pickup Date</p>
                    <p class="font-medium text-white">{pickupDate ? new Date(pickupDate).toLocaleDateString() : 'Not specified'}</p>
                </div>
                <div>
                    <p class="text-sm">Dropoff Date</p>
                    <p class="font-medium text-white">{dropoffDate ? new Date(dropoffDate).toLocaleDateString() : 'Not specified'}</p>
                </div>
                <div>
                    <p class="text-sm">Location</p>
                    <p class="font-medium text-white">{location || 'Not specified'}</p>
                </div>
                <div>
                    <p class="text-sm">Vehicle</p>
                    <p class="font-medium text-white">{vehicle?.year} {vehicle?.make} {vehicle?.model}</p>
                </div>
            </div>
        </div>

        <!-- Progress Steps -->
        <div class="mb-8 flex justify-center">
            <div class="flex items-center">
                <button
                    onclick={() => step = 1}
                    class="flex h-10 w-10 items-center justify-center rounded-full {step >= 1 ? 'bg-[#0bd3d3]' : 'bg-gray-600'} text-black hover:opacity-80 cursor-pointer"
                    type="button"
                >
                    1
                </button>
                <div class="mx-4 h-1 w-16 {step >= 2 ? 'bg-[#0bd3d3]' : 'bg-gray-600'}"></div>
                <div class="flex h-10 w-10 items-center justify-center rounded-full {step >= 2 ? 'bg-[#0bd3d3]' : 'bg-gray-600'} text-black">2</div>
            </div>
        </div>

        {#if step === 1}
            <!-- User Information Form -->
            <div class="rounded-lg bg-white/5 p-8 backdrop-blur-sm border border-white/10 shadow-xl">
                <h2 class="text-2xl font-semibold text-white mb-6">Personal Information</h2>
                <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div class="space-y-2">
                            <label for="firstName" class="text-sm font-medium text-gray-300">
                                First Name <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                bind:value={formData.firstName}
                                placeholder="John"
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.firstName ? 'border-red-500' : ''}"
                            />
                            {#if errors.firstName}
                                <p class="text-sm text-red-500">{errors.firstName}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="middleName" class="text-sm font-medium text-gray-300">Middle Name</label>
                            <input
                                type="text"
                                id="middleName"
                                bind:value={formData.middleName}
                                placeholder="Optional"
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3]"
                            />
                        </div>

                        <div class="space-y-2">
                            <label for="lastName" class="text-sm font-medium text-gray-300">
                                Last Name <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                bind:value={formData.lastName}
                                placeholder="Doe"
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.lastName ? 'border-red-500' : ''}"
                            />
                            {#if errors.lastName}
                                <p class="text-sm text-red-500">{errors.lastName}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="phoneNumber" class="text-sm font-medium text-gray-300">
                                Phone Number <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                bind:value={formData.phoneNumber}
                                placeholder="(123) 456-7890"
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.phoneNumber ? 'border-red-500' : ''}"
                            />
                            {#if errors.phoneNumber}
                                <p class="text-sm text-red-500">{errors.phoneNumber}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="email" class="text-sm font-medium text-gray-300">
                                Email Address <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                bind:value={formData.email}
                                placeholder="john.doe@example.com"
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.email ? 'border-red-500' : ''}"
                            />
                            {#if errors.email}
                                <p class="text-sm text-red-500">{errors.email}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="countryOfCitizenship" class="text-sm font-medium text-gray-300">
                                Country <span class="text-red-500">*</span>
                            </label>
                            <select
                                id="countryOfCitizenship"
                                bind:value={formData.countryOfCitizenship}
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.countryOfCitizenship ? 'border-red-500' : ''}"
                            >
                                <option value="" class="bg-gray-800">Select a country</option>
                                {#each countries as country}
                                    <option value={country} class="bg-gray-800">{country}</option>
                                {/each}
                            </select>
                            {#if errors.countryOfCitizenship}
                                <p class="text-sm text-red-500">{errors.countryOfCitizenship}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="state" class="text-sm font-medium text-gray-300">
                                State <span class="text-red-500">*</span>
                            </label>
                            <select
                                id="state"
                                bind:value={formData.state}
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.state ? 'border-red-500' : ''}"
                            >
                                <option value="" class="bg-gray-800">Select a state</option>
                                {#if formData.countryOfCitizenship === "United States"}
                                    {#each usStates as state}
                                        <option value={state} class="bg-gray-800">{state}</option>
                                    {/each}
                                {/if}
                            </select>
                            {#if errors.state}
                                <p class="text-sm text-red-500">{errors.state}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="licenseNumber" class="text-sm font-medium text-gray-300">
                                License Number <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="licenseNumber"
                                bind:value={formData.licenseNumber}
                                placeholder="Enter your driver's license number"
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.licenseNumber ? 'border-red-500' : ''}"
                            />
                            {#if errors.licenseNumber}
                                <p class="text-sm text-red-500">{errors.licenseNumber}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="licenseExpiration" class="text-sm font-medium text-gray-300">
                                License Expiration <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="licenseExpiration"
                                bind:value={formData.licenseExpiration}
                                min={new Date().toISOString().split('T')[0]}
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.licenseExpiration ? 'border-red-500' : ''}"
                            />
                            {#if errors.licenseExpiration}
                                <p class="text-sm text-red-500">{errors.licenseExpiration}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="dateOfBirth" class="text-sm font-medium text-gray-300">
                                Date of Birth <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                bind:value={formData.dateOfBirth}
                                max={new Date(new Date().setFullYear(new Date().getFullYear() - 21)).toISOString().split('T')[0]}
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0bd3d3] {errors.dateOfBirth ? 'border-red-500' : ''}"
                            />
                            {#if errors.dateOfBirth}
                                <p class="text-sm text-red-500">{errors.dateOfBirth}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="licenseFront" class="text-sm font-medium text-gray-300">
                                Driver's License (Front) <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                id="licenseFront"
                                accept="image/*"
                                on:change={(e) => handleFileUpload(e, 'front', formData, errors)}
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0bd3d3] file:text-black hover:file:bg-[#0bd3d3]/80 {errors.licenseFrontImage ? 'border-red-500' : ''}"
                            />
                            {#if errors.licenseFrontImage}
                                <p class="text-sm text-red-500">{errors.licenseFrontImage}</p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="licenseBack" class="text-sm font-medium text-gray-300">
                                Driver's License (Back) <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                id="licenseBack"
                                accept="image/*"
                                on:change={(e) => handleFileUpload(e, 'back', formData, errors)}
                                required
                                class="w-full rounded-lg bg-white/10 p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0bd3d3] file:text-black hover:file:bg-[#0bd3d3]/80 {errors.licenseBackImage ? 'border-red-500' : ''}"
                            />
                            {#if errors.licenseBackImage}
                                <p class="text-sm text-red-500">{errors.licenseBackImage}</p>
                            {/if}
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="mt-8 w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Continue to Payment'}
                    </button>
                </form>
            </div>
        {:else}
            <!-- Payment Section -->
            <div class="rounded-lg bg-white/5 p-6">
                <h2 class="mb-6 text-2xl font-semibold text-white">Payment Information</h2>
                <p class="mb-6 text-sm text-gray-400 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your payment information is securely processed and encrypted
                </p>
                <form class="space-y-4">
                    <!-- Card Holder Name -->
                    <div>
                        <label for="cardName" class="mb-2 block text-sm font-medium text-gray-300">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            id="cardName"
                            class="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <!-- Card Number -->
                    <div>
                        <label for="cardNumber" class="mb-2 block text-sm font-medium text-gray-300">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            class="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400"
                            placeholder="1234 5678 9012 3456"
                            maxlength="19"
                            required
                        />
                    </div>

                    <!-- Expiration Date and CVV -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="expDate" class="mb-2 block text-sm font-medium text-gray-300">
                                Expiration Date
                            </label>
                            <input
                                type="text"
                                id="expDate"
                                class="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400"
                                placeholder="MM/YY"
                                maxlength="5"
                                required
                            />
                        </div>
                        <div>
                            <label for="cvv" class="mb-2 block text-sm font-medium text-gray-300">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                class="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-white placeholder-gray-400"
                                placeholder="123"
                                maxlength="4"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="mt-6 w-full rounded-lg bg-gradient-to-r from-miami-pink to-miami-light-pink px-5 py-2.5 text-center text-sm font-medium text-white hover:shadow-[0_0_20px_rgba(255,27,107,0.3)]"
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        {/if}
    </div>
</div> 