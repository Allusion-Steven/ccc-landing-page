<script>
	import { fly, scale } from 'svelte/transition';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';
	import conciergeHeroBg from '$lib/assets/images/concierge-service.avif';
	import heroBg from '$lib/assets/images/rr-culinan-interior.webp';
	import { theme } from '$lib/stores/theme';
	import { dashboardUrl, loginUrl } from '$lib';

	const benefits = [
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`,
			title: 'Premium Insurance',
			description: 'Comprehensive protection for worry-free luxury'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />`,
			title: 'Flexible Terms',
			description: 'From hourly to monthly rentals available'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 8a2 2 0 002 2h4a2 2 0 002-2l-2-8m-6 0V3" />`,
			title: 'White-Glove Service',
			description: 'Concierge delivery and personalized support'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />`,
			title: 'VIP Access',
			description: 'Exclusive member benefits and priority booking'
		}
	];
</script>

<section class="relative overflow-hidden py-20 {$theme === 'dark' ? 'bg-primary-dark' : ''}">
	<!-- Background Pattern for light theme only -->
	{#if $theme === 'light'}
		<div class="absolute inset-0 opacity-5">
			<div class="absolute inset-0 "></div>
		</div>
	{/if}
	
	<div class="relative z-10 px-4 md:px-12 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<!-- Header -->
			<div class="mb-8 text-center" in:fly={{ y: 30, duration: 600, delay: 100 }}>
				<h2 class="mb-6 text-4xl font-bold tracking-tight {$theme === 'dark' ? 'text-white' : 'text-black'} lg:text-6xl" >
					Luxury Experience
				</h2>
				<p class="mx-auto max-w-3xl text-lg leading-relaxed {$theme === 'dark' ? 'text-gray-300' : 'text-black/80'} lg:text-xl">
					Elevate your journey with our exclusive collection of premium vehicles and yachts. 
					Where luxury meets performance, creating unforgettable experiences.
				</p>
			</div>

			<!-- Main Experience Cards -->
			<div class="mb-8 grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Exotic Cars -->
				<div 
					in:fly={{ x: -50, duration: 600, delay: 200 }}
					class="group relative overflow-hidden rounded-2xl  backdrop-blur-xl shadow-2xl transition-all duration-700 "
				>
					<div class="aspect-[4/5] overflow-hidden">
						<img
							src={heroBg}
							alt="Luxury Car Collection"
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
					</div>
					
					<div class="absolute inset-x-0 bottom-0 p-8">
						<div class="mb-4">
							<h3 class="mb-3 text-2xl font-bold text-white">Exotic Vehicles</h3>
							<p class="text-gray-200/90 leading-relaxed">
								Experience automotive excellence with our curated collection of the world's most prestigious supercars and luxury vehicles.
							</p>
						</div>
						<SecondaryButton 
							href="/vehicles" 
							text="Explore Collection" 
							width="w-full"
							colorScheme="light"
							hoverTextColor="text-white" 
						/>
					</div>


				</div>

				<!-- Luxury Yachts -->
				<div 
					in:fly={{ y: 50, duration: 600, delay: 300 }}
					class="group relative overflow-hidden rounded-2xl bg-gradient-to-br {$theme === 'dark' ? 'from-gray-900/50 to-gray-800/30' : 'from-white/80 to-gray-50/60'} backdrop-blur-xl shadow-2xl transition-all duration-700 "
				>
					<div class="aspect-[4/5] overflow-hidden">
						<img
							src={yachtHeroBg}
							alt="Premium Yacht Experience"
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
					</div>
					
					<div class="absolute inset-x-0 bottom-0 p-8">
						<div class="mb-4">
							<h3 class="mb-3 text-2xl font-bold text-white">Luxury Yachts</h3>
							<p class="text-gray-200/90 leading-relaxed">
								Sail into elegance with our premium yacht fleet, offering unparalleled comfort and sophistication on the water.
							</p>
						</div>
						<SecondaryButton 
							href="/yachts" 
							text="Discover Yachts" 
							width="w-full"
							colorScheme="light"
							hoverTextColor="text-white" 
						/>
					</div>

				</div>

				<!-- Become a Host -->
				<div 
					in:fly={{ x: 50, duration: 600, delay: 400 }}
					class="group relative overflow-hidden rounded-2xl bg-gradient-to-br {$theme === 'dark' ? 'from-gray-900/50 to-gray-800/30' : 'from-white/80 to-gray-50/60'} backdrop-blur-xl shadow-2xl transition-all duration-700 "
				>
					<div class="aspect-[4/5] overflow-hidden">
						<img
							src={conciergeHeroBg}
							alt="Become a Host"
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
					</div>
					
					<div class="absolute inset-x-0 bottom-0 p-8">
						<div class="mb-4">
							<h3 class="mb-3 text-2xl font-bold text-white">Host Partnership</h3>
							<p class="text-gray-200/90 leading-relaxed">
								Join our exclusive network and transform your luxury assets into a thriving rental business with premium support.
							</p>
						</div>
						<SecondaryButton 
							href={dashboardUrl} 
							text="Become a Host" 
							width="w-full"
							colorScheme="light"
							hoverTextColor="text-white" 
						/>
					</div>

				</div>
			</div>

			<!-- Benefits Section -->
			<div 
				in:fly={{ y: 50, duration: 600, delay: 500 }}
				class="relative overflow-hidden rounded-3xl border {$theme === 'dark' ? 'border-gray-700/20 bg-gray-900/10' : 'border-primary-accent/10 bg-gradient-to-br from-white/60 to-gray-50/40'} backdrop-blur-xl p-8 shadow-2xl lg:p-12"
			>
				<!-- Subtle background decoration for light mode only -->
				{#if $theme === 'light'}
					<div class="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-primary-light/10 to-primary-accent/10 blur-3xl"></div>
					<div class="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-tr from-primary-blue/10 to-primary-light/10 blur-3xl"></div>
				{/if}
				
				<div class="relative">
					<h3 class="mb-12 text-center text-3xl font-bold {$theme === 'dark' ? 'text-white' : 'text-black'} lg:text-4xl">
						Premium Benefits
					</h3>
					
					<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{#each benefits as benefit, i}
							<div 
								in:scale={{ duration: 400, delay: 600 + i * 100 }}
								class="group flex flex-col items-center text-center transition-all duration-500"
							>
								<div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full  bg-primary-accent dark:bg-black shadow-lg transition-all duration-500 ">
									<svg
										class="h-8 w-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										{@html benefit.icon}
									</svg>
								</div>
								<h4 class="mb-3 text-xl font-semibold {$theme === 'dark' ? 'text-white' : 'text-black'}">{benefit.title}</h4>
								<p class="text-sm leading-relaxed {$theme === 'dark' ? 'text-gray-300' : 'text-black/80'}">{benefit.description}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- CTA Section -->
			<div 
				in:fly={{ y: 30, duration: 600, delay: 800 }}
				class="mt-8 text-center"
			>
				<div class="inline-block transform transition-all duration-300 hover:scale-105">
					<SecondaryButton 
						href={loginUrl} 
						text="Join the Club" 
						colorScheme={$theme === 'dark' ? 'dark' : 'light'}
					/>
				</div>
				<p class="mt-2 text-sm {$theme === 'dark' ? 'text-gray-400' : 'text-black/80'}">
					Become part of an exclusive community of luxury enthusiasts
				</p>
			</div>
		</div>
	</div>
</section>