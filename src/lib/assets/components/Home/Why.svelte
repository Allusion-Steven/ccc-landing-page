<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';
	import PrimaryButton from '$lib/assets/components/buttons/PrimaryButton.svelte';
	import SecondaryButton from '$lib/assets/components/buttons/SecondaryButton.svelte';

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<section
	class="relative overflow-hidden {$theme === 'dark'
		? 'bg-primary-dark'
		: 'bg-white'} py-12 md:py-32">
	<!-- Background decoration -->
	<div
		class="absolute left-0 top-0 h-[600px] w-[600px] opacity-15 blur-[150px]"
		style="background: linear-gradient(45deg, {$theme === 'dark'
			? '#f890e7 0%, #ff1b6b'
			: '#ff1b6b 0%, #f890e7'} 100%);">
	</div>
	<div
		class="absolute bottom-0 right-0 h-[400px] w-[400px] opacity-15 blur-[150px]"
		style="background: linear-gradient(45deg, {$theme === 'dark'
			? '#ff1b6b 0%, #f890e7'
			: '#f890e7 0%, #ff1b6b'} 100%);">
	</div>

	<div class="container relative mx-auto px-6">
		<div
			class="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between">
			<!-- Left side content -->
			<div class="w-full lg:w-1/2">
				<h2
					class="mb-6 text-4xl font-bold {$theme === 'dark'
						? 'text-white'
						: 'text-primary-accent'} md:text-5xl"
					in:fly={{ y: 50, duration: 1000, delay: 200 }}>
					Why Choose Macro Exotics?
				</h2>
				<p
					class="mb-4 text-lg {$theme === 'dark'
						? 'text-gray-300'
						: 'text-primary-muted'}"
					in:fly={{ y: 50, duration: 1000, delay: 400 }}>
					In today's sharing economy, we connect luxury vehicle owners with discerning
					clients seeking premium experiences. Our peer-to-peer platform creates
					opportunities for both owners and renters in the world of exotic vehicles and
					luxury yachts.
				</p>
				<p
					class="mb-4 text-lg {$theme === 'dark'
						? 'text-gray-300'
						: 'text-primary-muted'}">
					Whether you're sharing your prized possession or seeking the perfect vehicle for
					your next adventure, we make the connection seamless and secure through our
					comprehensive verification process and dedication to exce
				</p>
				<div class="flex flex-wrap gap-4" in:fly={{ y: 50, duration: 1000, delay: 600 }}>
					<PrimaryButton
						text="Become a host"
						href="https://my.macroexotics.com/"
						width="w-full" />
					<SecondaryButton text="Book a vehicle" href="/vehicles" width="w-full" colorScheme={$theme === 'dark' ? 'light' : 'dark'} />
				</div>
			</div>

			<!-- Right side features -->
			<div class="w-full lg:w-1/2">
				<div class="grid gap-8 sm:grid-cols-2">
					<!-- Feature 1 -->
					<div
						class="rounded-xl {$theme === 'dark'
							? 'bg-white/5'
							: 'bg-primary-accent/5'} p-6"
						in:fly={{ y: 50, duration: 1000, delay: 800 }}>
						<div class="mb-4">
							<svg
								class="h-8 w-8 {$theme === 'dark'
									? 'text-primary-light'
									: 'text-primary-accent'}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h3
							class="mb-2 text-xl font-bold {$theme === 'dark'
								? 'text-white'
								: 'text-primary-accent'}">
							Premium Selection
						</h3>
						<p class={$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}>
							Access to the most exclusive and luxurious vehicles in the market.
						</p>
					</div>

					<!-- Feature 2 -->
					<div
						class="rounded-xl {$theme === 'dark'
							? 'bg-white/5'
							: 'bg-primary-accent/5'} p-6"
						in:fly={{ y: 50, duration: 1000, delay: 1000 }}>
						<div class="mb-4">
							<svg
								class="h-8 w-8 {$theme === 'dark'
									? 'text-primary-light'
									: 'text-primary-accent'}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h3
							class="mb-2 text-xl font-bold {$theme === 'dark'
								? 'text-white'
								: 'text-primary-accent'}">
							24/7 Support
						</h3>
						<p class={$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}>
							Round-the-clock assistance for all your rental needs.
						</p>
					</div>

					<!-- Feature 3 -->
					<div
						class="rounded-xl {$theme === 'dark'
							? 'bg-white/5'
							: 'bg-primary-accent/5'} p-6"
						in:fly={{ y: 50, duration: 1000, delay: 1200 }}>
						<div class="mb-4">
							<svg
								class="h-8 w-8 {$theme === 'dark'
									? 'text-primary-light'
									: 'text-primary-accent'}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</div>
						<h3
							class="mb-2 text-xl font-bold {$theme === 'dark'
								? 'text-white'
								: 'text-primary-accent'}">
							Flexible Payments
						</h3>
						<p class={$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}>
							Multiple payment options and transparent pricing.
						</p>
					</div>

					<!-- Feature 4 -->
					<div
						class="rounded-xl {$theme === 'dark'
							? 'bg-white/5'
							: 'bg-primary-accent/5'} p-6"
						in:fly={{ y: 50, duration: 1000, delay: 1400 }}>
						<div class="mb-4">
							<svg
								class="h-8 w-8 {$theme === 'dark'
									? 'text-primary-light'
									: 'text-primary-accent'}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
							</svg>
						</div>
						<h3
							class="mb-2 text-xl font-bold {$theme === 'dark'
								? 'text-white'
								: 'text-primary-accent'}">
							VIP Experience
						</h3>
						<p class={$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}>
							Personalized service and exclusive benefits for our clients.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
