<script>
    import { run } from 'svelte/legacy';

    import heroImage from '$lib/assets/images/lambo-performante.jpg';
    import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { theme } from '$lib/stores/theme';
    import { dashboardUrl } from '$lib';

    let imageLoaded = $state(false);
    let location = $state('Miami, FL');
    let pickupDate = $state(new Date().toISOString().split('T')[0]);
    let dropoffDate = $state(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    let contentVisible = $state(false);
    let vehicleType = $state('Car');
    let currentBgImage = $state(heroImage);
    let previousBgImage = $state(heroImage);
    let isSearching = $state(false);

    run(() => {
        if (currentBgImage !== (vehicleType === 'Car' ? heroImage : yachtHeroBg)) {
            previousBgImage = currentBgImage;
            currentBgImage = vehicleType === 'Car' ? heroImage : yachtHeroBg;
        }
    });

    onMount(() => {
        contentVisible = true;
        imageLoaded = true;
        // Preload images background
        [heroImage, yachtHeroBg].forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    });

    function handleSearch() {
        isSearching = true;
        const baseUrl = vehicleType === 'Yacht' ? '/yachts' : '/vehicles';
        const params = new URLSearchParams({
            location: location,
            pickupDate: pickupDate,
            dropoffDate: dropoffDate,
            vehicleType: vehicleType === 'Yacht' ? 'yacht' : 'car'
        });
        window.location.href = `${baseUrl}?${params.toString()}`;
    }
</script>

<div class="relative h-[90vh]  md:pt-0">
    <!-- Background & Loading Placeholder -->
    <div class="loading-placeholder" class:hidden={imageLoaded}></div>
    {#if contentVisible}
        <div class="relative h-full overflow-hidden">
            {#key currentBgImage}
                <div
                    class="hero-bg absolute inset-0"
                    style="background-image: url('{currentBgImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
                    in:fade={{ duration: 400 }}
                    out:fade={{ duration: 400 }}></div>
            {/key}

            <div class="absolute inset-0 {$theme === 'dark'
                ? 'bg-gradient-to-br from-[#1C1C1C]/85 via-[#1e1e1e]/80 to-[#2d1b2a]/85'
                : 'bg-gradient-to-br from-white/50 via-white/45 to-white/50'}">
            <div class="absolute inset-0 {$theme === 'dark'
                ? 'bg-gradient-to-t from-[#2d1b2a]/60 to-transparent'
                : 'bg-gradient-to-t from-white/35 to-transparent'}">
            </div>

            <div class="container mx-auto h-full px-4 sm:px-6 lg:px-8">
                <div class="flex h-full items-center justify-center">
                    <div class="mx-auto max-w-4xl text-center {$theme === 'dark'
                        ? ''
                        : 'rounded-3xl bg-white/20 p-4 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-sm'}">
                        <h1
                            in:fly={{ y: 30, duration: 200, delay: 100 }}
                            class="mb-6 text-3xl font-bold tracking-tight {$theme === 'dark'
                                ? 'text-white'
                                : 'text-black'} sm:text-4xl md:text-6xl md:mb-8">
                            Premium Cars & Yachts, Your Way
                        </h1>
                        <p
                            in:fly={{ y: 30, duration: 200, delay: 200 }}
                            class="mx-auto mb-6 max-w-3xl text-center text-lg leading-relaxed {$theme === 'dark'
                                ? 'text-white/95'
                                : 'text-black/95'} drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] sm:text-xl md:mb-8">
                            Connect with luxury vehicle owners and experience the extraordinary.
                            From exotic cars to luxury yachts, Macro Exotics delivers
                            unparalleled rental experiences.
                        </p>

                        <div in:fly={{ y: 30, duration: 200, delay: 300 }} class="mx-auto mb-8 max-w-5xl md:mb-12">
                            <!-- Vehicle type switcher -->
                            <div class="mb-4 flex items-center justify-center md:mb-6">
                                <div class="vehicle-switcher inline-flex rounded-xl {$theme === 'dark' 
                                    ? 'bg-black/30 backdrop-blur-md border border-white/10' 
                                    : 'bg-white/90 backdrop-blur-md border border-gray-200/20 shadow-lg'} p-1">
                                    <span class="mr-2 px-2 py-2 text-xs font-medium {$theme === 'dark' ? 'text-white/80' : 'text-gray-600'} sm:mr-3 sm:px-3 sm:text-sm">
                                        I'm Looking For
                                    </span>
                                    <button
                                        class="relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 {vehicleType === 'Car'
                                            ? ($theme === 'dark' 
                                                ? 'bg-white text-gray-900 shadow-sm' 
                                                : 'bg-primary-accent text-white shadow-sm')
                                            : ($theme === 'dark' 
                                                ? 'text-white/70 hover:text-white hover:bg-white/10' 
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50')} sm:px-6 sm:text-sm"
                                        onclick={() => { vehicleType = 'Car'; }}>
                                        Cars
                                    </button>
                                    <button
                                        class="relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 {vehicleType === 'Yacht'
                                            ? ($theme === 'dark' 
                                                ? 'bg-white text-gray-900 shadow-sm' 
                                                : 'bg-primary-accent text-white shadow-sm')
                                            : ($theme === 'dark' 
                                                ? 'text-white/70 hover:text-white hover:bg-white/10' 
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50')} sm:px-6 sm:text-sm"
                                        onclick={() => { vehicleType = 'Yacht'; }}>
                                        Yachts
                                    </button>
                                </div>
                            </div>

                            <!-- Search widget -->
                            <div class="search-container rounded-2xl {$theme === 'dark'
                                ? 'bg-black/40 backdrop-blur-xl border border-white/10'
                                : 'bg-white/95 backdrop-blur-xl border border-gray-200/30 shadow-2xl'} p-4">
                                <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
                                    <!-- Location -->
                                    <div class="lg:col-span-3">
                                        <label class="block text-xs font-medium mb-2 {$theme === 'dark' ? 'text-white/60' : 'text-gray-500'}">
                                            Location
                                        </label>
                                        <div class="relative">
                                            <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg class="h-5 w-5 {$theme === 'dark' ? 'text-white/40' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <select
                                                bind:value={location}
                                                class="w-full h-12 pl-10 pr-4 rounded-xl border-0 {$theme === 'dark'
                                                    ? 'bg-white/10 text-white placeholder-white/40 focus:bg-white/15'
                                                    : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white'} 
                                                    font-medium transition-all duration-300 focus:ring-2 focus:ring-primary-accent/30 focus:outline-none">
                                                <option value="Miami, FL" class="{$theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}">Miami, FL</option>
                                                <option value="Tampa, FL" class="{$theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}">Tampa, FL</option>
                                                <option value="New York, NY" class="{$theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}">New York, NY</option>
                                                <option value="Charleston, SC" class="{$theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}">Charleston, SC</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Pickup Date -->
                                    <div class="lg:col-span-3">
                                        <label class="block text-xs font-medium mb-2 {$theme === 'dark' ? 'text-white/60' : 'text-gray-500'}">
                                            Pickup Date
                                        </label>
                                        <div class="relative">
                                            <input
                                                type="date"
                                                bind:value={pickupDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                class="w-full h-12 pl-4 pr-12 rounded-xl border-0 {$theme === 'dark'
                                                    ? 'bg-white/10 text-white focus:bg-white/15'
                                                    : 'bg-gray-50 text-gray-900 focus:bg-white'}
                                                    font-medium transition-all duration-300 focus:ring-2 focus:ring-primary-accent/30 focus:outline-none
                                                    [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg class="h-5 w-5 {$theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Dropoff Date -->
                                    <div class="lg:col-span-3">
                                        <label class="block text-xs font-medium mb-2 {$theme === 'dark' ? 'text-white/60' : 'text-gray-500'}">
                                            Dropoff Date
                                        </label>
                                        <div class="relative">
                                            <input
                                                type="date"
                                                bind:value={dropoffDate}
                                                min={pickupDate || new Date().toISOString().split('T')[0]}
                                                class="w-full h-12 pl-4 pr-12 rounded-xl border-0 {$theme === 'dark'
                                                    ? 'bg-white/10 text-white focus:bg-white/15'
                                                    : 'bg-gray-50 text-gray-900 focus:bg-white'}
                                                    font-medium transition-all duration-300 focus:ring-2 focus:ring-primary-accent/30 focus:outline-none
                                                    [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg class="h-5 w-5 {$theme === 'dark' ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Search Button -->
                                    <div class="lg:col-span-3 flex gap-2">
                                        <button
                                            class="flex-1 h-12 rounded-xl font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 
                                            {$theme === 'dark'
                                                ? 'bg-white text-gray-900 hover:bg-white/90 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                                                : 'bg-primary-accent text-white hover:bg-primary-accent/90 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl'}"
                                            onclick={handleSearch}
                                            disabled={isSearching}>
                                            {#if isSearching}
                                                <div class="flex items-center justify-center gap-2">
                                                    <span class="h-4 w-4 animate-spin rounded-full border-2 {$theme === 'dark' ? 'border-gray-900 border-t-transparent' : 'border-white border-t-transparent'}"></span>
                                                    <span class="hidden sm:inline">Searching...</span>
                                                </div>
                                            {:else}
                                                <div class="flex items-center justify-center gap-2">
                                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    <span class="hidden sm:inline">Search</span>
                                                </div>
                                            {/if}
                                        </button>
                                    </div>
                                </div>

                                <!-- Host CTA - Separate section below search -->
                                <div class="mt-4 pt-4 border-t {$theme === 'dark' ? 'border-white/10' : 'border-gray-200/30'} flex justify-center">
                                    <a
                                        href={dashboardUrl}
                                        target="_blank"
                                        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out whitespace-nowrap backdrop-blur-sm
                                        {$theme === 'dark'
                                            ? 'bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5'
                                            : 'bg-white text-black border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-accent/30 hover:-translate-y-0.5'}"
                                        >
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Become a Host
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    {/if}
</div>

<style>
    @media screen and (min-width: 1024px) {
        .hero-bg {
            background-size: 180% !important;
            background-position: center;
        }
    }
    
    @media screen and (max-width: 649px) {
        .hero-bg {
            min-height: 80vh;
        }
    }
    
    .loading-placeholder {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
    }
    
    .search-container {
        position: relative;
        border-radius: 1rem;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    
    /* Enhanced input focus states */
    .search-container input:focus,
    .search-container select:focus {
        transform: translateY(-1px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Custom select arrow styling */
    .search-container select {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
    }
    
    
    
    
    /* Vehicle type switcher animation */
    .vehicle-switcher button {
        position: relative;
        overflow: hidden;
    }
    
    .vehicle-switcher button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .vehicle-switcher button:hover::before {
        left: 100%;
    }
    
    /* Grid responsive behavior */
    @media (max-width: 1023px) {
        .search-container .grid {
            gap: 1rem;
        }
    }
    
    /* Enhanced mobile responsiveness */
    @media (max-width: 640px) {
        .search-container {
            padding: 1rem;
            margin: 0 1rem;
        }
        
        .search-container .grid {
            gap: 0.75rem;
        }
        
        .search-container input,
        .search-container select,
        .search-container button {
            height: 3rem;
        }
        
        /* Adjust hero height for mobile */
        .hero-bg {
            min-height: 90vh;
        }
    }
    
    /* Very small screens */
    @media (max-width: 375px) {
        .search-container {
            margin: 0 0.5rem;
            padding: 0.75rem;
        }
        
        .vehicle-switcher {
            font-size: 0.75rem;
        }
        
        .vehicle-switcher span {
            display: none; /* Hide "I'm Looking For" text on very small screens */
        }
    }
    
    /* Tablet adjustments */
    @media (min-width: 641px) and (max-width: 1023px) {
        .search-container {
            padding: 1.5rem;
        }
    }
</style>