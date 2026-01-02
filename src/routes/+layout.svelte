<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import Footer from '$lib/assets/components/Footer.svelte';
	//TODO: Implement light v dark logo
	import logo from '$lib/assets/logos/macro-transpaernt-logo-square.png';
	import darkLogo from '$lib/assets/logos/macro-exotics-dark-logo.png';
	import Banner from '$lib/components/Banner.svelte';
	import '../app.css';
	import { quintOut } from 'svelte/easing';
	import AccountIcon from '$lib/assets/components/Icons/AccountIcon.svelte';
	import { page } from '$app/stores';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { loginUrl } from '$lib';
	let { children } = $props();
	let isMenuOpen = $state(false);
	let innerWidth = $state(0);
	let lastScrollY = $state(0);
	let showBottomNav = $state(true);
	let lastStateChange = $state(0);

	function handleScroll() {
		// Ignore scroll events for 300ms after state change to prevent feedback loop
		const now = Date.now();
		if (now - lastStateChange < 300) return;

		const currentScrollY = window.scrollY;

		// Always show at top of page
		if (currentScrollY < 50) {
			if (!showBottomNav) {
				showBottomNav = true;
				lastStateChange = now;
			}
			lastScrollY = currentScrollY;
			return;
		}

		if (showBottomNav) {
			// When showing, hide if scrolled 10px down from anchor
			if (currentScrollY > lastScrollY + 10) {
				showBottomNav = false;
				lastScrollY = currentScrollY;
				lastStateChange = now;
			}
		} else {
			// When hidden, track furthest scroll position
			if (currentScrollY > lastScrollY) {
				lastScrollY = currentScrollY;
			} else if (currentScrollY < lastScrollY - 10) {
				// User scrolled up 10px from furthest point, show nav
				showBottomNav = true;
				lastScrollY = currentScrollY;
				lastStateChange = now;
			}
		}
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	onNavigate(() => {
		closeMenu();
		// Ensure theme is properly applied after navigation
		if (typeof window !== 'undefined') {
			const currentTheme = $theme;
			if (currentTheme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});
</script>

<svelte:head>
	<meta name="color-scheme" content={$theme} />
	<!-- 	<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin="" />
 -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://my.macroexotics.com" />

</svelte:head>

<svelte:window bind:innerWidth onresize={() => (isMenuOpen = false)} onscroll={handleScroll} />

<div class={$theme}>
	<Banner
		title="Macro Exotics is under development"
		description="Please check back soon for updates about launch!"
		link="/"
		linkText="Hide" />
	<nav
		class="sticky top-0 z-50 bg-gray-100 dark:bg-[#353E43] text-gray-900 dark:text-white transition-colors duration-300">
		<!-- Top Row: Search | Logo | Account -->
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between py-2">
				<!-- Left: Search Icon -->
				<div class="flex flex-1 items-center justify-start">
					<button
						class="p-2 transition-colors duration-300 hover:text-sky-600"
						aria-label="Search">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
					</button>
				</div>

				<!-- Center: Logo -->
				<div class="flex flex-1 items-center justify-center">
					<a href="/" class="text-xl font-bold">
						<!-- Light theme logo (hidden in dark mode) -->
						<img
							src={logo}
							alt="Macro Exotics Logo"
							class="h-16 transition-transform md:h-14 dark:hidden" />
						<!-- Dark theme logo (hidden in light mode) -->
						<img
							src={darkLogo}
							alt="Macro Exotics Logo"
							class="hidden h-16 transition-transform md:h-14 dark:block" />
					</a>
				</div>

				<!-- Right: Account Icon & Mobile Menu -->
				<div class="flex flex-1 items-center justify-end gap-3">
					<button
						class="rounded-full p-2 transition-colors duration-300 hover:bg-sky-200 dark:hover:bg-white/20"
						onclick={toggleTheme}
						aria-label="Toggle theme">
						{#if $theme === 'dark'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
									clip-rule="evenodd" />
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
							</svg>
						{/if}
					</button>

					<a
						href={loginUrl}
						class="p-2 transition-colors duration-300 hover:text-sky-600"
						aria-label="Account">
						<AccountIcon className="w-6 h-6" />
					</a>

					<button
						class="p-2 transition-colors duration-300 hover:text-sky-600 md:hidden"
						onclick={() => (isMenuOpen = !isMenuOpen)}
						aria-label="Toggle menu">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							{#if isMenuOpen}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16" />
							{/if}
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Bottom Row: Navigation Links (Desktop) -->
		<div
			class="hidden md:block transition-all duration-300 ease-out overflow-hidden {showBottomNav ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}">
			<!-- Divider -->
			<div class="border-t border-sky-200 dark:border-white/30"></div>
			<div class="container mx-auto px-4">
				<div
					class="flex items-center justify-center space-x-12 py-3"
					style="font-family: 'Raleway', sans-serif;">
					<a
						href="/vehicles"
						class="text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-sky-600 {$page.url.pathname === '/vehicles' || $page.url.pathname.startsWith('/vehicle/')
							? 'border-b-2 border-gray-900 dark:border-white'
							: ''}">
						Cars
					</a>
					<a
						href="/yachts"
						class="text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-sky-600 {$page.url.pathname === '/yachts' || $page.url.pathname.startsWith('/yacht/')
							? 'border-b-2 border-gray-900 dark:border-white'
							: ''}">
						Yachts
					</a>
					<a
						href="/about"
						class="text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-sky-600 {$page.url.pathname === '/about'
							? 'border-b-2 border-gray-900 dark:border-white'
							: ''}">
						About
					</a>
				</div>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="md:hidden" transition:slide={{ duration: 200, axis: 'y', easing: quintOut }}>
				<!-- Divider -->
				<div class="border-t border-sky-200 dark:border-white/30"></div>
				<div class="container mx-auto px-4">
					<div
						class="flex flex-col items-center justify-center space-y-3 py-2"
						style="font-family: 'Raleway', sans-serif;">
						<a
							href="/vehicles"
							class="text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-sky-600 {$page.url.pathname === '/vehicles' || $page.url.pathname.startsWith('/vehicle/')
								? 'border-b-2 border-gray-900 dark:border-white'
								: ''}">
							Cars
						</a>
						<a
							href="/yachts"
							class="text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-sky-600 {$page.url.pathname === '/yachts' || $page.url.pathname.startsWith('/yacht/')
								? 'border-b-2 border-gray-900 dark:border-white'
								: ''}">
							Yachts
						</a>
						<a
							href="/about"
							class="text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-sky-600 {$page.url.pathname === '/about'
								? 'border-b-2 border-gray-900 dark:border-white'
								: ''}">
							About
						</a>
					</div>
				</div>
			</div>
		{/if}
	</nav>

	<main class="mx-auto min-h-[80vh] w-full {$theme === 'dark' ? '' : 'bg-white'}">
		{@render children()}
	</main>

	<Footer />
</div>
