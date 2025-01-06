<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/assets/components/Footer.svelte';
	// import { logo } from 'static/horizontal-logo.svg';
	import logo from '$lib/assets/logos/horizontal-logo-full.svg';
	import '../app.css';
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

<nav class="bg-white p-4">
	<div
		class="container mx-auto flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0"
	>
		<div class="flex w-full items-center justify-between">
			<a href="/" class="text-xl font-bold text-white">
				<img src={logo} alt="Logo" class="h-8 w-3/4 md:h-10 md:w-auto" />
			</a>
			<button
				class="text-gray-800 hover:text-[#FF9C57] md:hidden"
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

		<div class="{isMenuOpen ? 'block' : 'hidden'} mt-4 md:mt-0 md:block">
			<div class="flex flex-col space-y-2 text-center md:flex-row md:space-x-4 md:space-y-0">
				<a href="/" class="text-gray-800 hover:text-[#FF9C57]">Home</a>

				<a href="/contact" class="text-gray-800 hover:text-[#FF9C57]">Contact</a>
			</div>
		</div>
	</div>
</nav>

<main class=" mx-auto w-full">
	{@render children()}
</main>
<Footer />
