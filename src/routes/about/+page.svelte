<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { theme } from '$lib/stores/theme';
	import SecondaryButton from '$lib/assets/components/buttons/SecondaryButton.svelte';
	import PrimaryButton from '$lib/assets/components/buttons/PrimaryButton.svelte';
	import {
		Shield,
		UserCheck,
		Car,
		ShieldCheck,
		Sparkles,
		CreditCard,
		Clock,
		Search,
		Calendar,
		Key
	} from 'lucide-svelte';
	// Using static images
	const heroBg = '/images/rr-culinan-interior.webp';
	const yachtImage = '/images/sunseeker-78.jpg';
	const yachtImage2 = '/images/ferretti-yachts-920.jpg';

	let mounted = $state(false);
	let storyVisible = $state(false);
	let howItWorksVisible = $state(false);
	let trustVisible = $state(false);
	let servicesVisible = $state(false);
	let ctaVisible = $state(false);

	const stats = [
		{ value: '500+', label: 'Exclusive Members' },
		{ value: '150+', label: 'Luxury Vehicles' },
		{ value: '24/7', label: 'Concierge Service' },
		{ value: '100%', label: 'Insured' }
	];

	const steps = [
		{
			icon: Search,
			title: 'Browse',
			description: 'Explore our curated collection of exotic cars and luxury yachts'
		},
		{
			icon: Calendar,
			title: 'Book',
			description: 'Select your dates and complete our simple, secure booking process'
		},
		{
			icon: Key,
			title: 'Experience',
			description: 'Enjoy white-glove delivery and an unforgettable journey'
		}
	];

	const trustFeatures = [
		{
			icon: UserCheck,
			title: 'Verified Drivers',
			description:
				'All renters undergo comprehensive background checks and license verification',
			bullets: ['Background screening', 'License verification', 'Driving record review']
		},
		{
			icon: Car,
			title: 'Verified Vehicles',
			description: 'Every vehicle is inspected and meets our rigorous quality standards',
			bullets: ['Multi-point inspection', 'Maintenance records', 'Photo documentation']
		},
		{
			icon: ShieldCheck,
			title: 'Insurance Coverage',
			description: 'Comprehensive protection for hosts and renters on every rental',
			bullets: ['$2M liability coverage', 'Comprehensive insurance', '24/7 claims support']
		}
	];

	const services = [
		{
			icon: Sparkles,
			title: 'White Glove Service',
			description: 'Personalized concierge support from booking to return',
			bullets: ['Door-to-door delivery', 'Professional detailing', 'Flexible scheduling']
		},
		{
			icon: CreditCard,
			title: 'Easy Payments',
			description: 'Secure transactions with flexible payment options',
			bullets: ['Multiple payment methods', 'Transparent pricing', 'Secure checkout']
		},
		{
			icon: Clock,
			title: '24/7 Concierge',
			description: 'Round-the-clock support for all your needs',
			bullets: ['Emergency assistance', 'Itinerary planning', 'Exclusive reservations']
		}
	];

	function intersectionObserver(node: HTMLElement, callback: (isVisible: boolean) => void) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						callback(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '50px' }
		);

		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>About | Macro Exotics</title>
	<meta
		name="description"
		content="Discover Macro Exotics - Miami's premier peer-to-peer platform for luxury car and yacht rentals. Learn about our story, services, and commitment to exceptional experiences." />
	<meta name="title" content="About | Macro Exotics" />
	<meta
		name="keywords"
		content="About Macro Exotics, Luxury Car Rental Miami, Yacht Rental Miami, Peer-to-peer Rentals, Exotic Car Sharing" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Macro Exotics" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#1C1C1C" />

	<meta property="og:title" content="About | Macro Exotics" />
	<meta
		property="og:description"
		content="Discover Macro Exotics - Miami's premier peer-to-peer platform for luxury car and yacht rentals." />
	<meta property="og:url" content="https://macroexotics.com/about" />
	<meta property="og:image" content="https://macroexotics.com/logo-square-768.png" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Macro Exotics" />
	<link rel="canonical" href="https://macroexotics.com/about" />
</svelte:head>

<div class={$theme === 'dark' ? 'bg-primary-dark' : 'bg-white'}>
	<!-- ============================================ -->
	<!-- HERO OPTION A: Full-Width Image Hero -->
	<!-- ============================================ -->
	<section class="relative h-[60vh] min-h-[500px] overflow-hidden">
		<div class="absolute inset-0">
			<img src={heroBg} alt="Luxury vehicle interior" class="h-full w-full object-cover" />
			<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"
			></div>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		</div>

		<div class="relative z-10 flex h-full items-center">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				{#if mounted}
					<div class="max-w-2xl" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
						<div class="mb-6 h-[1px] w-16 bg-white/60"></div>
						<h1 class="mb-6 text-5xl font-light tracking-tight text-white md:text-7xl">
							Our Story
						</h1>
						<p class="text-xl font-light leading-relaxed text-white/70">
							Where luxury meets community. A peer-to-peer platform connecting exceptional vehicles
							with discerning enthusiasts.
						</p>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- ============================================ -->
	<!-- HERO OPTION B: Minimal Text-Only Header -->
	<!-- Uncomment this and comment out Option A to switch -->
	<!-- ============================================ -->
	<!--
	<section class="py-24 lg:py-32 {$theme === 'dark' ? 'bg-primary-dark' : 'bg-white'}">
		<div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
			{#if mounted}
				<div class="space-y-6" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
					<div class="w-24 h-px {$theme === 'dark' ? 'bg-white' : 'bg-black'} mx-auto"></div>
					<h1 class="text-5xl md:text-7xl font-light {$theme === 'dark' ? 'text-white' : 'text-black'} tracking-tight">
						About Us
					</h1>
					<p class="text-xl {$theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-light max-w-2xl mx-auto">
						Miami's premier peer-to-peer platform for luxury vehicles and yachts
					</p>
				</div>
			{/if}
		</div>
	</section>
	-->

	<!-- ============================================ -->
	<!-- SECTION 1: Company Story / Mission -->
	<!-- ============================================ -->
	<section class="py-24 {$theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div
				class="grid items-center gap-16 lg:grid-cols-2"
				use:intersectionObserver={(v) => (storyVisible = v)}>
				{#if storyVisible}
					<div class="space-y-8">
						<div class="space-y-4" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
							<h2
								class="text-4xl font-light tracking-tight md:text-5xl {$theme === 'dark'
									? 'text-white'
									: 'text-black'}">
								Redefining
								<span class="block {$theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}">
									Luxury Access
								</span>
							</h2>
							<div class="h-px w-24 {$theme === 'dark' ? 'bg-white' : 'bg-black'}"></div>
						</div>

						<div
							class="space-y-6 text-lg leading-relaxed"
							in:fly={{ y: 30, duration: 600, delay: 200, easing: quintOut }}>
							<p class={$theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
								Macro Exotics is Miami's premier peer-to-peer luxury rental platform. We connect
								passionate vehicle owners with discerning clients who appreciate the extraordinary.
							</p>

							<p class={$theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
								Our platform bridges the gap between exotic car collectors, yacht owners, and those
								seeking unforgettable experiences. Whether you're looking to share your prized
								possession or seeking the perfect vehicle for your next adventure, we make the
								connection seamless and secure.
							</p>

							<p class={$theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
								Every interaction is personal. Every experience is exceptional. Every moment is
								crafted to exceed the expectations of those who accept nothing less than perfection.
							</p>
						</div>
					</div>

					<div class="space-y-8" in:fly={{ y: 30, duration: 600, delay: 300, easing: quintOut }}>
						<div class="grid grid-cols-2 gap-4">
							<div
								class="relative overflow-hidden border {$theme === 'dark'
									? 'border-gray-800'
									: 'border-gray-200'}">
								<img
									src={heroBg}
									alt="Luxury vehicle interior"
									class="h-48 w-full object-cover" />
								<div class="absolute inset-0 bg-black/10"></div>
							</div>
							<div
								class="relative overflow-hidden border {$theme === 'dark'
									? 'border-gray-800'
									: 'border-gray-200'}">
								<img
									src={yachtImage}
									alt="Luxury yacht"
									class="h-48 w-full object-cover" />
								<div class="absolute inset-0 bg-black/10"></div>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-8">
							{#each stats as stat, i}
								<div
									class="space-y-2 text-center"
									in:fly={{ y: 20, duration: 400, delay: 400 + i * 100, easing: quintOut }}>
									<div
										class="text-4xl font-light {$theme === 'dark' ? 'text-white' : 'text-black'}">
										{stat.value}
									</div>
									<div
										class="text-sm uppercase tracking-wider {$theme === 'dark'
											? 'text-gray-400'
											: 'text-gray-600'}">
										{stat.label}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- ============================================ -->
	<!-- SECTION 2: How It Works -->
	<!-- ============================================ -->
	<section class="py-24 {$theme === 'dark' ? 'bg-primary-dark' : 'bg-white'}">
		<div
			class="mx-auto max-w-7xl px-6 lg:px-8"
			use:intersectionObserver={(v) => (howItWorksVisible = v)}>
			{#if howItWorksVisible}
				<div class="mb-16 text-center" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
					<h2
						class="text-4xl font-light tracking-tight md:text-5xl {$theme === 'dark'
							? 'text-white'
							: 'text-black'}">
						How It Works
					</h2>
					<div
						class="mx-auto mt-4 h-px w-24 {$theme === 'dark' ? 'bg-white' : 'bg-black'}"></div>
					<p
						class="mx-auto mt-6 max-w-2xl text-xl {$theme === 'dark'
							? 'text-gray-400'
							: 'text-gray-600'}">
						Seamless booking from start to finish
					</p>
				</div>

				<div class="grid gap-12 md:grid-cols-3">
					{#each steps as step, i}
						<div
							class="group space-y-6 text-center"
							in:fly={{ y: 30, duration: 600, delay: 150 + i * 150, easing: quintOut }}>
							<div
								class="mx-auto flex h-20 w-20 items-center justify-center border transition-all duration-300 {$theme ===
								'dark'
									? 'border-white text-white group-hover:bg-white group-hover:text-black'
									: 'border-black text-black group-hover:bg-black group-hover:text-white'}">
								<span class="text-3xl font-light">{i + 1}</span>
							</div>

							<div
								class="mx-auto flex h-12 w-12 items-center justify-center {$theme === 'dark'
									? 'text-gray-400'
									: 'text-gray-600'}">
								<svelte:component this={step.icon} class="h-8 w-8" strokeWidth={1.5} />
							</div>

							<h3
								class="text-2xl font-light {$theme === 'dark' ? 'text-white' : 'text-black'}">
								{step.title}
							</h3>

							<p class={$theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
								{step.description}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- ============================================ -->
	<!-- SECTION 3: Trust & Safety -->
	<!-- ============================================ -->
	<section class="py-24 {$theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}">
		<div
			class="mx-auto max-w-7xl px-6 lg:px-8"
			use:intersectionObserver={(v) => (trustVisible = v)}>
			{#if trustVisible}
				<div class="mb-16 text-center" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
					<Shield
						class="mx-auto mb-4 h-12 w-12 {$theme === 'dark' ? 'text-white' : 'text-black'}"
						strokeWidth={1.5} />
					<h2
						class="text-4xl font-light tracking-tight md:text-5xl {$theme === 'dark'
							? 'text-white'
							: 'text-black'}">
						Trust & Safety
					</h2>
					<div
						class="mx-auto mt-4 h-px w-24 {$theme === 'dark' ? 'bg-white' : 'bg-black'}"></div>
					<p
						class="mx-auto mt-6 max-w-2xl text-xl {$theme === 'dark'
							? 'text-gray-400'
							: 'text-gray-600'}">
						Your peace of mind is our priority. Hosts and renters are protected on every rental.
					</p>
				</div>

				<div class="grid gap-12 md:grid-cols-3">
					{#each trustFeatures as feature, i}
						<div
							class="group space-y-6 text-center"
							in:fly={{ y: 30, duration: 600, delay: 150 + i * 150, easing: quintOut }}>
							<div
								class="mx-auto flex h-16 w-16 items-center justify-center border transition-all duration-300 {$theme ===
								'dark'
									? 'border-white text-white group-hover:bg-white group-hover:text-black'
									: 'border-black text-black group-hover:bg-black group-hover:text-white'}">
								<svelte:component this={feature.icon} class="h-8 w-8" strokeWidth={1.5} />
							</div>

							<div class="space-y-4">
								<h3
									class="text-2xl font-light {$theme === 'dark' ? 'text-white' : 'text-black'}">
									{feature.title}
								</h3>

								<p
									class="leading-relaxed {$theme === 'dark'
										? 'text-gray-400'
										: 'text-gray-600'}">
									{feature.description}
								</p>

								<ul class="space-y-2 text-sm {$theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}">
									{#each feature.bullets as bullet}
										<li>- {bullet}</li>
									{/each}
								</ul>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- ============================================ -->
	<!-- SECTION 4: Services & Benefits -->
	<!-- ============================================ -->
	<section class="py-24 {$theme === 'dark' ? 'bg-primary-dark' : 'bg-white'}">
		<div
			class="mx-auto max-w-7xl px-6 lg:px-8"
			use:intersectionObserver={(v) => (servicesVisible = v)}>
			{#if servicesVisible}
				<div class="mb-16 text-center" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
					<h2
						class="text-4xl font-light tracking-tight md:text-5xl {$theme === 'dark'
							? 'text-white'
							: 'text-black'}">
						Uncompromising Service
					</h2>
					<div
						class="mx-auto mt-4 h-px w-24 {$theme === 'dark' ? 'bg-white' : 'bg-black'}"></div>
					<p
						class="mx-auto mt-6 max-w-2xl text-xl {$theme === 'dark'
							? 'text-gray-400'
							: 'text-gray-600'}">
						Every detail handled with precision. Every expectation exceeded with elegance.
					</p>
				</div>

				<div class="grid gap-12 md:grid-cols-3">
					{#each services as service, i}
						<div
							class="group space-y-6 text-center"
							in:fly={{ y: 30, duration: 600, delay: 150 + i * 150, easing: quintOut }}>
							<div
								class="mx-auto flex h-16 w-16 items-center justify-center border transition-all duration-300 {$theme ===
								'dark'
									? 'border-white text-white group-hover:bg-white group-hover:text-black'
									: 'border-black text-black group-hover:bg-black group-hover:text-white'}">
								<svelte:component this={service.icon} class="h-8 w-8" strokeWidth={1.5} />
							</div>

							<div class="space-y-4">
								<h3
									class="text-2xl font-light {$theme === 'dark' ? 'text-white' : 'text-black'}">
									{service.title}
								</h3>

								<p
									class="leading-relaxed {$theme === 'dark'
										? 'text-gray-400'
										: 'text-gray-600'}">
									{service.description}
								</p>

								<ul class="space-y-2 text-sm {$theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}">
									{#each service.bullets as bullet}
										<li>- {bullet}</li>
									{/each}
								</ul>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- ============================================ -->
	<!-- SECTION 5: CTA Section -->
	<!-- ============================================ -->
	<section class="py-24 {$theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}">
		<div
			class="mx-auto max-w-4xl px-6 text-center lg:px-8"
			use:intersectionObserver={(v) => (ctaVisible = v)}>
			{#if ctaVisible}
				<div in:fly={{ y: 30, duration: 600, easing: quintOut }}>
					<h2
						class="text-4xl font-light tracking-tight md:text-5xl {$theme === 'dark'
							? 'text-white'
							: 'text-black'}">
						Ready to Experience Luxury?
					</h2>
					<p
						class="mx-auto mt-6 max-w-2xl text-xl {$theme === 'dark'
							? 'text-gray-400'
							: 'text-gray-600'}">
						Browse our collection or list your vehicle to start earning
					</p>

					<div
						class="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
						in:fly={{ y: 20, duration: 600, delay: 200, easing: quintOut }}>
						<SecondaryButton
							href="/vehicles"
							text="Browse Vehicles"
							colorScheme={$theme === 'dark' ? 'dark' : 'light'} />
						<SecondaryButton
							href="/yachts"
							text="Browse Yachts"
							colorScheme={$theme === 'dark' ? 'dark' : 'light'} />
						<PrimaryButton href="https://my.macroexotics.com/" text="Become a Host" />
					</div>
				</div>
			{/if}
		</div>
	</section>
</div>
