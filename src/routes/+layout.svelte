<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import Footer from '$lib/assets/components/Footer.svelte';
	//TODO: Implement light v dark logo
	import logo from '$lib/assets/logos/macro-exotics-light-logo.png';
	import darkLogo from '$lib/assets/logos/macro-exotics-dark-logo.png';
	import Banner from '$lib/components/Banner.svelte';
	import '../app.css';
	import { quintOut } from 'svelte/easing';
	import AccountIcon from '$lib/assets/components/Icons/AccountIcon.svelte';
	import { page } from '$app/stores';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { dashboardUrl, isLive, loginUrl } from '$lib';
	let { children } = $props();
	let isMenuOpen = $state(false);
	let innerWidth = $state(0);
	let isScrolled = $state(false);

	// Logo source reacts directly to the theme store via inline binding in markup

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleScroll() {
		isScrolled = window.scrollY > 0;
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
		class="sticky top-0 z-50 transition-colors duration-300 {isScrolled
			? 'sm:bg-opacity-50'
			: 'sm:bg-opacity-100'} {$theme === 'dark'
			? 'bg-primary-dark text-white'
			: 'bg-white text-primary-accent'}">
		<div class="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
			<div class="flex w-full items-center justify-between px-4">
				<a href="/" class="text-xl font-bold">
					<img
						src={$theme === 'dark' ? darkLogo : logo}
						alt="Macro Exotics Logo"
						class="md:h-22 h-24 p-2 transition-transform hover:scale-105" />
				</a>
				<div class="flex items-center gap-4">
					<button
						class="rounded-full p-2 {$theme === 'dark'
							? 'bg-white text-primary-dark'
							: 'bg-primary-accent text-white'}"
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
					{#if !$page.data.user}
						<a
							href={loginUrl}
							class="flex items-center gap-2 hover:text-primary-light hover:drop-shadow-[0_0_8px_rgba(126,212,172,0.5)] sm:hidden">
							<AccountIcon className="w-6 h-6 pointer-events-none" />
						</a>
					{/if}

					<button
						class="transition-colors duration-300 hover:text-primary-light md:hidden"
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

			{#if isMenuOpen || innerWidth >= 768}
				<div
					class="w-full overflow-hidden md:block md:overflow-visible"
					transition:slide={{
						duration: 200,
						axis: 'y',
						easing: quintOut
					}}>
					<div
						class="flex flex-col space-y-4 px-4 py-6 text-center md:flex-row md:justify-end md:space-x-8 md:space-y-0 md:px-4 md:py-0">
						<a
							href="/"
							class="text-lg font-medium transition-colors duration-300 {$page.url
								.pathname === '/'
								? 'relative px-4 py-2 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-primary-light/10 before:backdrop-blur-sm hover:before:bg-primary-light/20'
								: 'px-4 py-2 hover:text-primary-light hover:drop-shadow-[0_0_8px_rgba(126,212,172,0.5)]'}">
							Home
						</a>

						<!-- TODO: Implement pricing page for live site -->
						{#if !isLive}
							<a
								href="/pricing"
								class="text-lg font-medium transition-colors duration-300 {$page.url
									.pathname === '/pricing'
									? 'relative px-4 py-2 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-primary-light/10 before:backdrop-blur-sm hover:before:bg-primary-light/20'
									: 'px-4 py-2 hover:text-primary-light hover:drop-shadow-[0_0_8px_rgba(126,212,172,0.5)]'}">
								VIP
							</a>
						{/if}
						<a
							href="/contact"
							class="text-lg font-medium transition-colors duration-300 {$page.url
								.pathname === '/contact'
								? 'relative px-4 py-2 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-primary-light/10 before:backdrop-blur-sm hover:before:bg-primary-light/20'
								: 'px-4 py-2 hover:text-primary-light hover:drop-shadow-[0_0_8px_rgba(126,212,172,0.5)]'}">
							Contact
						</a>
						<a
							href={dashboardUrl}
							class="text-lg font-medium transition-colors duration-300 px-4 py-2 hover:text-primary-light hover:drop-shadow-[0_0_8px_rgba(126,212,172,0.5)]">
							Become a Host
						</a>

						{#if !$page.data.user}
							<a
								href={loginUrl}
								class="flex items-center justify-center gap-2 hover:text-primary-light hover:drop-shadow-[0_0_8px_rgba(126,212,172,0.5)]">
								<AccountIcon className="w-6 h-6 sm:flex hidden" />
							</a>
						{:else}
							<a
								href="/logout"
								class="text-lg font-medium transition-colors duration-300 hover:text-primary-light hover:drop-shadow-[0_0_8px_rgba(126,212,172,0.5)]">
								Logout
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</nav>

	<main class="mx-auto min-h-[80vh] w-full {$theme === 'dark' ? '' : 'bg-white'}">
		{@render children()}
	</main>

	<Footer />
</div>
