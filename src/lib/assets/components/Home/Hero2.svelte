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

<div class="relative h-[90vh] overflow-hidden">
    <!-- Background & Loading Placeholder -->
    <div class="loading-placeholder" class:hidden={imageLoaded}></div>
    {#if contentVisible}
        <div class="relative h-full">
            {#key currentBgImage}
                <div
                    class="hero-bg absolute inset-0 scale-105"
                    style="background-image: url('{currentBgImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
                    in:fade={{ duration: 600 }}
                    out:fade={{ duration: 600 }}></div>
            {/key}

            <!-- Premium Overlay with Gradient -->
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80">
            </div>

            <!-- Luxury Border Frame -->
            <div class="absolute inset-4 border {$theme === 'dark' 
                ? 'border-white/20' 
                : 'border-white/30'} rounded-3xl pointer-events-none luxury-frame">
            </div>

            <div class=" mx-auto h-full px-4 lg:px-16 relative z-10">
                <div class="max500:justify-start flex flex-col h-full justify-center px-4 lg:flex-row lg:items-center lg:justify-between py-8 lg:py-0">
                    <!-- Left Side - Content -->
                    <div class="w-full lg:w-1/2 space-y-6 lg:space-y-8 mb-8 lg:mb-0">
                        <div class="space-y-4 lg:space-y-6">
                            <!-- Premium Badge -->
<!--                             <div 
                                in:fly={{ x: -30, duration: 400, delay: 100 }}
                                class="max500:hidden inline-flex items-center gap-3 px-6 py-3 rounded-full {$theme === 'dark'
                                    ? 'bg-white/10 border border-white/20 text-white/90'
                                    : 'bg-black/20 border border-white/30 text-white'} backdrop-blur-xl">
                                <div class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
                                <span class="text-sm font-medium tracking-wide">LUXURY COLLECTION</span>
                            </div> -->

                            <!-- Main Heading -->
                            <h1
                                in:fly={{ x: -30, duration: 400, delay: 200 }}
                                class="text-5xl sm:text-4xl lg:text-7xl font-bold leading-tight text-white">
                                <span class="block font-light">Experience</span>
                                <span class="block bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Luxury
                                </span>
                                <span class="block font-light">Redefined</span>
                            </h1>

                            <!-- Subtitle -->
                            <p
                                in:fly={{ x: -30, duration: 400, delay: 300 }}
                                class="text-base sm:text-lg lg:text-2xl text-white font-light leading-relaxed max-w-lg">
                                Exclusive access to the world's finest exotic cars and luxury yachts
                            </p>
                        </div>
                    </div>

                    <!-- Right Side - Luxury Search Card -->
                    <div class="hidden lg:block w-5/12">
                        <div 
                            in:fly={{ x: 30, duration: 400, delay: 400 }}
                            class="luxury-search-card {$theme === 'dark'
                                ? 'bg-black/40 border-white/10'
                                : 'bg-white/15 border-white/20'} backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl">
                            
                            <!-- Card Header -->
                            <div class="text-center mb-8">
                                <h3 class="text-2xl font-bold text-white mb-2">Reserve Your Experience</h3>
                                <p class="text-white/70">Curated exclusively for connoisseurs</p>
                            </div>

                            <!-- Vehicle Type Selector -->
                            <div class="mb-8">
                                <div class="grid grid-cols-2 gap-3 p-1 rounded-2xl {$theme === 'dark'
                                    ? 'bg-white/5 border border-white/10'
                                    : 'bg-black/10 border border-white/20'}">
                                    <button
                                        class="luxury-toggle relative p-4 rounded-xl font-semibold transition-all duration-300 {vehicleType === 'Car'
                                            ? 'bg-white/20 text-white shadow-lg border border-white/30'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'}"
                                        onclick={() => { vehicleType = 'Car'; }}>
                                        <div class="flex items-center justify-center gap-2 tracking-wider" >
                                            
                                            Exotic Cars
                                        </div>
                                    </button>
                                    <button
                                        class="luxury-toggle relative p-4 rounded-xl font-semibold transition-all duration-300 {vehicleType === 'Yacht'
                                            ? 'bg-white/20 text-white shadow-lg border border-white/30'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'}"
                                        onclick={() => { vehicleType = 'Yacht'; }}>
                                        <div class="flex items-center justify-center gap-2 tracking-wider">
                                            
                                            Luxury Yachts
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <!-- Form Fields -->
                            <div class="space-y-6">
                                <!-- Location -->
                                <div class="luxury-field">
                                    <label for="hero-location" class="block text-white/60 text-sm font-medium mb-3 tracking-wide">DESTINATION</label>
                                    <div class="relative">
                                        <div class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg class="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <select
                                            id="hero-location"
                                            bind:value={location}
                                            class="w-full h-14 pl-12 pr-4 rounded-2xl border-0 {$theme === 'dark'
                                                ? 'bg-white/5 text-white border border-white/10 focus:border-pink-400/50'
                                                : 'bg-black/10 text-white border border-white/20 focus:border-pink-400/50'}
                                                font-medium transition-all duration-300 focus:ring-2 focus:ring-pink-400/30 focus:outline-none backdrop-blur-sm">
                                            <option value="Miami, FL" class="bg-black text-white">Miami, FL</option>
                                            <option value="Tampa, FL" class="bg-black text-white">Tampa, FL</option>
                                            <option value="New York, NY" class="bg-black text-white">New York, NY</option>
                                            <option value="Charleston, SC" class="bg-black text-white">Charleston, SC</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Date Range -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="luxury-field">
                                        <label for="hero-pickup-date" class="block text-white/60 text-sm font-medium mb-3 tracking-wide">FROM</label>
                                        <div class="relative">
                                            <input
                                                id="hero-pickup-date"
                                                type="date"
                                                bind:value={pickupDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                class="w-full h-14 pl-4 pr-12 rounded-2xl border-0 {$theme === 'dark'
                                                    ? 'bg-white/5 text-white border border-white/10 focus:border-pink-400/50'
                                                    : 'bg-black/10 text-white border border-white/20 focus:border-pink-400/50'}
                                                    font-medium transition-all duration-300 focus:ring-2 focus:ring-pink-400/30 focus:outline-none backdrop-blur-sm
                                                    [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg class="h-5 w-5 text-pink-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="luxury-field">
                                        <label for="hero-dropoff-date" class="block text-white/60 text-sm font-medium mb-3 tracking-wide">TO</label>
                                        <div class="relative">
                                            <input
                                                id="hero-dropoff-date"
                                                type="date"
                                                bind:value={dropoffDate}
                                                min={pickupDate || new Date().toISOString().split('T')[0]}
                                                class="w-full h-14 pl-4 pr-12 rounded-2xl border-0 {$theme === 'dark'
                                                    ? 'bg-white/5 text-white border border-white/10 focus:border-pink-400/50'
                                                    : 'bg-black/10 text-white border border-white/20 focus:border-pink-400/50'}
                                                    font-medium transition-all duration-300 focus:ring-2 focus:ring-pink-400/30 focus:outline-none backdrop-blur-sm
                                                    [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg class="h-5 w-5 text-pink-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Search Button -->
                                <button
                                    class="w-full h-16 rounded-2xl font-bold text-lg transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 
                                    bg-white/20 text-white hover:bg-white/30 hover:-translate-y-0.5 shadow-2xl hover:shadow-white/25 border-2 border-white/30"
                                    onclick={handleSearch}
                                    disabled={isSearching}>
                                    {#if isSearching}
                                        <div class="flex items-center justify-center gap-3">
                                            <span class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            <span>Searching Luxury Fleet...</span>
                                        </div>
                                    {:else}
                                        <div class="flex items-center justify-center gap-3">
                                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <span>Reserve Now</span>
                                        </div>
                                    {/if}
                                </button>

                                <!-- Host CTA -->
                                <div class="pt-6 border-t border-white/10 text-center">
                                    <p class="text-white/60 text-sm mb-4">Own luxury vehicles?</p>
                                    <a
                                        href={dashboardUrl}
                                        target="_blank"
                                        class="rounded-xl inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out whitespace-nowrap
                                        border border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 backdrop-blur-sm">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Join Our Elite Network
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Search Card -->
                    <div class="w-full lg:hidden">
                        <div 
                            in:fly={{ y: 30, duration: 400, delay: 500 }}
                            class="luxury-search-card-mobile {$theme === 'dark'
                                ? 'bg-black/40 border-white/10'
                                : 'bg-white/15 border-white/20'} backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl">
                            
                            <!-- Mobile Vehicle Type Selector -->
                            <div class="mb-6">
                                <div class="grid grid-cols-2 gap-2 p-1 rounded-2xl {$theme === 'dark'
                                    ? 'bg-white/5 border border-white/10'
                                    : 'bg-black/10 border border-white/20'}">
                                    <button
                                        class="py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 {vehicleType === 'Car'
                                            ? 'bg-white/20 text-white border border-white/30'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'}"
                                        onclick={() => { vehicleType = 'Car'; }}>
                                        Cars
                                    </button>
                                    <button
                                        class="py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 {vehicleType === 'Yacht'
                                            ? 'bg-white/20 text-white border border-white/30'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'}"
                                        onclick={() => { vehicleType = 'Yacht'; }}>
                                        Yachts
                                    </button>
                                </div>
                            </div>

                            <!-- Mobile Form -->
                            <div class="space-y-4">
                                <!-- Location -->
                                <select
                                    id="hero-mobile-location"
                                    bind:value={location}
                                    aria-label="Select location"
                                    class="w-full h-12 px-4 rounded-xl border-0 {$theme === 'dark'
                                        ? 'bg-white/5 text-white border border-white/10'
                                        : 'bg-black/10 text-white border border-white/20'}
                                        font-medium transition-all duration-300 focus:ring-2 focus:ring-pink-400/30 focus:outline-none backdrop-blur-sm">
                                    <option value="Miami, FL" class="bg-black text-white">Miami, FL</option>
                                    <option value="Tampa, FL" class="bg-black text-white">Tampa, FL</option>
                                    <option value="New York, NY" class="bg-black text-white">New York, NY</option>
                                    <option value="Charleston, SC" class="bg-black text-white">Charleston, SC</option>
                                </select>

                                <!-- Date Range -->
                                <div class="grid grid-cols-2 gap-3">
                                    <input
                                        id="hero-mobile-pickup-date"
                                        type="date"
                                        bind:value={pickupDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        aria-label="Pickup date"
                                        class="h-12 px-3 rounded-xl border-0 {$theme === 'dark'
                                            ? 'bg-white/5 text-white border border-white/10'
                                            : 'bg-black/10 text-white border border-white/20'}
                                            font-medium transition-all duration-300 focus:ring-2 focus:ring-pink-400/30 focus:outline-none backdrop-blur-sm" />
                                    <input
                                        id="hero-mobile-dropoff-date"
                                        type="date"
                                        bind:value={dropoffDate}
                                        min={pickupDate || new Date().toISOString().split('T')[0]}
                                        aria-label="Dropoff date"
                                        class="h-12 px-3 rounded-xl border-0 {$theme === 'dark'
                                            ? 'bg-white/5 text-white border border-white/10'
                                            : 'bg-black/10 text-white border border-white/20'}
                                            font-medium transition-all duration-300 focus:ring-2 focus:ring-pink-400/30 focus:outline-none backdrop-blur-sm" />
                                </div>

                                <!-- Search Button -->
                                <button
                                    class="w-full h-14 rounded-xl font-bold transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 
                                    bg-white/20 text-white hover:bg-white/30 hover:scale-105 shadow-xl border-2 border-white/30"
                                    onclick={handleSearch}
                                    disabled={isSearching}>
                                    {#if isSearching}
                                        <div class="flex items-center justify-center gap-2">
                                            <span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            <span>Searching...</span>
                                        </div>
                                    {:else}
                                        Reserve Now
                                    {/if}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .loading-placeholder {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
    }
    
    .hero-bg {
        background-attachment: fixed;
        will-change: transform;
    }
    
    @media screen and (min-width: 1024px) {
        .hero-bg {
            background-size: cover !important;
            background-position: center;
        }
    }
    
    .luxury-frame {
        /* Removed animated gradient shimmer effect */
    }
    
    .luxury-search-card {
        background: linear-gradient(145deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    
    .luxury-search-card-mobile {
        background: linear-gradient(145deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    
    .luxury-field input:focus,
    .luxury-field select:focus {
        transform: scale(1.02);
        box-shadow: 0 10px 40px rgba(244, 114, 182, 0.2);
    }
    
    .luxury-toggle:hover {
        transform: translateY(-2px);
    }
    
    /* Custom scrollbar for select */
    select {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f472b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
    }
</style>