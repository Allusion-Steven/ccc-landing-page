<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import Footer from '$lib/assets/components/Footer.svelte';
	import logo from '$lib/assets/logos/horizontal-logo-full.svg';
	import '../app.css';
	import { quintOut } from 'svelte/easing';
	import AccountIcon from '$lib/assets/components/Icons/AccountIcon.svelte';
	import { page } from '$app/stores';
	let { children } = $props();
	let isMenuOpen = $state(false);
	let innerWidth = $state(0);
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
	onNavigate(() => {
		closeMenu();
	});
</script>

<svelte:window bind:innerWidth on:resize={() => (isMenuOpen = false)} />

<nav class="bg-gradient-to-r from-miami-dark via-miami-purple to-miami-dark py-6 text-white">
	<div class="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
		<div class="flex w-full items-center justify-between px-4">
			<a href="/" class="text-xl font-bold">
				<img
					src={logo}
					alt="Macro Exotics Logo"
					class="h-12 transition-transform hover:scale-105 md:h-16"
				/>
			</a>
			<div class="flex items-center gap-4">
				{#if !$page.data.user}
					<a
						href="/login"
						class="flex items-center gap-2 text-white hover:text-miami-light-pink hover:drop-shadow-[0_0_8px_rgba(255,27,107,0.5)] sm:hidden"
					>
						<AccountIcon className="w-6 h-6 pointer-events-none" />
					</a>
				{/if}

				<button
					class="text-white transition-colors duration-300 hover:text-miami-pink md:hidden"
					onclick={toggleMenu}
					aria-label="Toggle menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						{#if isMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
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
				}}
			>
				<div
					class="flex flex-col space-y-6 px-4 py-6 text-center md:flex-row md:justify-end md:space-x-8 md:space-y-0 md:px-4 md:py-0"
				>
					<a
						href="/"
						class="text-lg font-medium text-white transition-colors duration-300 hover:text-miami-light-pink hover:drop-shadow-[0_0_8px_rgba(255,27,107,0.5)]"
					>
						Home
					</a>

					<a
						href="/contact"
						class="text-lg font-medium text-white transition-colors duration-300 hover:text-miami-light-pink hover:drop-shadow-[0_0_8px_rgba(255,27,107,0.5)]"
					>
						Contact
					</a>

					<!-- TODO: Create login / logout page... Logout API -->
					{#if !$page.data.user}
						<a
							href="/login"
							class="flex items-center justify-center gap-2 text-white hover:text-miami-light-pink hover:drop-shadow-[0_0_8px_rgba(255,27,107,0.5)]"
						>
							<AccountIcon className="w-6 h-6 sm:flex hidden" />
						</a>
					{:else}
						<a
							href="/logout"
							class="text-lg font-medium text-white transition-colors duration-300 hover:text-miami-light-pink hover:drop-shadow-[0_0_8px_rgba(255,27,107,0.5)]"
						>
							Logout
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</nav>

<main class="mx-auto min-h-[80vh] w-full bg-gradient-to-b from-[#1e1e1e] to-[#2d1b2a]">
	{@render children()}
</main>

<Footer />
