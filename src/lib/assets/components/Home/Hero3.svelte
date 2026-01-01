<script>
    import { run } from 'svelte/legacy';
    import heroImage from '$lib/assets/images/lambo-performante.jpg';
    import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { dashboardUrl } from '$lib';
    import { CITIES } from '$lib/data/cities';

    let imageLoaded = $state(false);
    let location = $state('all'); // Default to "All" locations
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
        // Preload images
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
            dropoffDate: dropoffDate
        });
        window.location.href = `${baseUrl}?${params.toString()}`;
    }
</script>

<div class="relative min-h-[100svh] max500:min-h-[90vh] lg:h-screen overflow-hidden">
    <!-- Loading State -->
    <div class="loading-bg" class:hidden={imageLoaded}></div>

    {#if contentVisible}
        <!-- Background Image with Ken Burns Effect -->
        <div class="absolute inset-0">
            {#key currentBgImage}
                <div
                    class="absolute inset-0 bg-cover bg-center ken-burns"
                    style="background-image: url('{currentBgImage}');"
                    in:fade={{ duration: 1000, easing: cubicOut }}
                    out:fade={{ duration: 800 }}></div>
            {/key}

            <!-- Refined Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        </div>

        <!-- Main Content -->
        <div class="relative z-10 h-full flex flex-col">
            <!-- Desktop: centered content, Mobile: content at top -->
            <div class="flex-1 flex items-start lg:items-center pt-24 lg:pt-0">
                <div class="w-full max-w-[1800px] mx-auto px-6 lg:px-20">
                    <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    <!-- Left: Typography & Branding -->
                    <div class="space-y-6 lg:space-y-8">
                        <!-- Subtle Accent Line -->
                        <div
                            in:fly={{ x: -40, duration: 600, delay: 100, easing: cubicOut }}
                            class="flex items-center gap-4">
                            <div class="w-12 h-[1px] bg-gradient-to-r from-white/60 to-transparent"></div>
                            <span class="text-white/50 text-xs tracking-[0.3em] uppercase font-light">Established 2019</span>
                        </div>

                        <!-- Main Headline -->
                        <h1
                            in:fly={{ y: 30, duration: 700, delay: 200, easing: cubicOut }}
                            class="text-white">
                            <span class="block text-4xl sm:text-6xl lg:text-8xl font-extralight tracking-tight leading-[0.9]">
                                Curated
                            </span>
                            <span class="block text-4xl sm:text-6xl lg:text-8xl font-extralight tracking-tight leading-[0.9] mt-2">
                                <span class="italic font-light">Luxury</span>
                            </span>
                        </h1>

                        <!-- Tagline -->
                        <p
                            in:fly={{ y: 20, duration: 600, delay: 400, easing: cubicOut }}
                            class="text-white/60 text-base lg:text-xl font-light max-w-md leading-relaxed tracking-wide lg:block">
                            Premier collection of exotic automobiles and luxury yachts,
                            available for those who appreciate the extraordinary.
                        </p>

                        <!-- Decorative Element -->
                        <div
                            in:fly={{ y: 20, duration: 600, delay: 500, easing: cubicOut }}
                            class="hidden lg:flex items-center gap-6 pt-4">
                            <div class="flex items-center gap-2 text-white/40 text-sm tracking-wider">
                                <span class="w-2 h-2 rounded-full bg-white/30"></span>
                                Cars
                            </div>
                            <div class="w-8 h-[1px] bg-white/20"></div>
                            <div class="flex items-center gap-2 text-white/40 text-sm tracking-wider">
                                <span class="w-2 h-2 rounded-full bg-white/30"></span>
                                Yachts
                            </div>
                            <div class="w-8 h-[1px] bg-white/20"></div>
                            <div class="flex items-center gap-2 text-white/40 text-sm tracking-wider">
                                <span class="w-2 h-2 rounded-full bg-white/30"></span>
                                Experiences
                            </div>
                        </div>
                    </div>

                    <!-- Right: Minimal Search Panel -->
                    <div class="hidden lg:block">
                        <div
                            in:fly={{ x: 40, duration: 700, delay: 300, easing: cubicOut }}
                            class="search-panel">

                            <!-- Panel Header -->
                            <div class="border-b border-white/10 pb-6 mb-8">
                                <h2 class="text-white text-sm tracking-[0.2em] uppercase font-light">Begin Your Journey</h2>
                            </div>

                            <!-- Type Selector -->
                            <div class="mb-10">
                                <div class="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10 w-fit">
                                    <button
                                        class="type-btn {vehicleType === 'Car' ? 'active' : ''}"
                                        onclick={() => { vehicleType = 'Car'; }}>
                                        Automobiles
                                    </button>
                                    <button
                                        class="type-btn {vehicleType === 'Yacht' ? 'active' : ''}"
                                        onclick={() => { vehicleType = 'Yacht'; }}>
                                        Yachts
                                    </button>
                                </div>
                            </div>

                            <!-- Form Fields -->
                            <div class="space-y-8">
                                <!-- Location -->
                                <div class="field-group">
                                    <label class="field-label">Location</label>
                                    <select
                                        bind:value={location}
                                        class="field-select">
                                        {#each CITIES as city}
                                            <option value={city.value}>{city.label}</option>
                                        {/each}
                                    </select>
                                    <div class="field-line"></div>
                                </div>

                                <!-- Dates -->
                                <div class="grid grid-cols-2 gap-8">
                                    <div class="field-group">
                                        <label class="field-label">From</label>
                                        <input
                                            type="date"
                                            bind:value={pickupDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            class="field-input" />
                                        <div class="field-line"></div>
                                    </div>
                                    <div class="field-group">
                                        <label class="field-label">To</label>
                                        <input
                                            type="date"
                                            bind:value={dropoffDate}
                                            min={pickupDate || new Date().toISOString().split('T')[0]}
                                            class="field-input" />
                                        <div class="field-line"></div>
                                    </div>
                                </div>

                                <!-- Search Button -->
                                <button
                                    class="search-btn group"
                                    onclick={handleSearch}
                                    disabled={isSearching}>
                                    {#if isSearching}
                                        <span class="flex items-center gap-3">
                                            <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Searching
                                        </span>
                                    {:else}
                                        <span class="flex items-center justify-between w-full">
                                            <span>Explore Collection</span>
                                            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    {/if}
                                </button>
                            </div>

                            <!-- Host Link -->
                            <div class="mt-10 pt-8 border-t border-white/10">
                                <a
                                    href={dashboardUrl}
                                    target="_blank"
                                    class="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors duration-300">
                                    <span>List your vehicle</span>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

           
        </div>
         <!-- Mobile Search - inside flex-col container for proper bottom alignment -->
         <div class="lg:hidden  z-20 px-4 pb-6">
            <div
            in:fly={{ y: 30, duration: 600, delay: 400, easing: cubicOut }}
            class="mobile-panel">

            <!-- Type Toggle -->
            <div class="flex gap-1 p-1 rounded-full bg-white/5 mb-6">
                <button
                    class="mobile-type-btn {vehicleType === 'Car' ? 'active' : ''}"
                    onclick={() => { vehicleType = 'Car'; }}>
                    Cars
                </button>
                <button
                    class="mobile-type-btn {vehicleType === 'Yacht' ? 'active' : ''}"
                    onclick={() => { vehicleType = 'Yacht'; }}>
                    Yachts
                </button>
            </div>

            <!-- Compact Form -->
            <div class="space-y-4">
                <select
                    bind:value={location}
                    aria-label="Select location"
                    class="mobile-field">
                    {#each CITIES as city}
                        <option value={city.value}>{city.label}</option>
                    {/each}
                </select>

                <div class="grid grid-cols-2 gap-3">
                    <input
                        type="date"
                        bind:value={pickupDate}
                        min={new Date().toISOString().split('T')[0]}
                        aria-label="Start date"
                        class="mobile-field" />
                    <input
                        type="date"
                        bind:value={dropoffDate}
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                        aria-label="End date"
                        class="mobile-field" />
                </div>

                <button
                    class="mobile-search-btn"
                    onclick={handleSearch}
                    disabled={isSearching}>
                    {#if isSearching}
                        <span class="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                    {:else}
                        Search
                    {/if}
                </button>
            </div>
        </div>
        
        </div>

        <!-- Bottom Accent -->
        <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    {/if}
</div>

<style>
    .loading-bg {
        position: absolute;
        inset: 0;
        background: #0a0a0a;
    }

    .ken-burns {
        animation: kenBurns 20s ease-in-out infinite alternate;
    }

    @keyframes kenBurns {
        0% { transform: scale(1); }
        100% { transform: scale(1.08); }
    }

    .search-panel {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 2px;
        padding: 2.5rem;
    }

    .type-btn {
        padding: 0.75rem 1.5rem;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.5);
        border-radius: 9999px;
        transition: all 0.3s ease;
    }

    .type-btn:hover {
        color: rgba(255, 255, 255, 0.8);
    }

    .type-btn.active {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    .field-group {
        position: relative;
    }

    .field-label {
        display: block;
        font-size: 0.65rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
        margin-bottom: 0.75rem;
    }

    .field-select,
    .field-input {
        width: 100%;
        background: transparent;
        border: none;
        color: white;
        font-size: 1rem;
        font-weight: 300;
        padding-bottom: 0.75rem;
        outline: none;
        cursor: pointer;
    }

    .field-select option {
        background: #1a1a1a;
        color: white;
    }

    .field-line {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: rgba(255, 255, 255, 0.15);
        transition: background 0.3s ease;
    }

    .field-group:focus-within .field-line {
        background: rgba(255, 255, 255, 0.4);
    }

    .field-input::-webkit-calendar-picker-indicator {
        filter: invert(1);
        opacity: 0.5;
        cursor: pointer;
    }

    .field-select {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='1.5'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 0 center;
        background-size: 1.25rem;
    }

    .search-btn {
        width: 100%;
        padding: 1.25rem 1.5rem;
        background: white;
        color: #0a0a0a;
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .search-btn:hover {
        background: #f5f5f5;
    }

    .search-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    /* Mobile Styles */
    .mobile-panel {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 1.5rem;
        padding: 1.5rem;
        position: absolute;
        bottom: 10%;

    }

    .mobile-type-btn {
        flex: 1;
        padding: 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.4);
        border-radius: 9999px;
        transition: all 0.3s ease;
    }

    .mobile-type-btn.active {
        background: #0a0a0a;
        color: white;
    }

    .mobile-field {
        width: 100%;
        height: 3rem;
        padding: 0 1rem;
        background: rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0.75rem;
        font-size: 0.875rem;
        color: #0a0a0a;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .mobile-field:focus {
        border-color: rgba(0, 0, 0, 0.3);
    }

    .mobile-field option {
        background: white;
        color: #0a0a0a;
    }

    .mobile-search-btn {
        width: 100%;
        height: 3.5rem;
        background: #0a0a0a;
        color: white;
        font-weight: 600;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }

    .mobile-search-btn:hover {
        background: #1a1a1a;
    }

    .mobile-search-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
</style>
