<script>
	import { fly } from 'svelte/transition';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';
	import conciergeHeroBg from '$lib/assets/images/concierge-service.avif';
	import heroBg from '$lib/assets/images/rr-culinan-interior.webp';
	import { theme } from '$lib/stores/theme';
	import { dashboardUrl, loginUrl } from '$lib';
</script>

<section class="overflow-hidden bg-gradient-to-br py-16 {$theme === 'dark' ? 'from-primary-dark to-[#2d1b2a]' : 'from-white to-white/90'}">
	<div class="px-4">
		<div class="container mx-auto">
			<h2
				in:fly={{ y: 50, duration: 1000, delay: 200 }}
				class="mb-8 text-center text-4xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'} md:text-5xl">
				Luxury Vehicle & Yacht Rentals
			</h2>
			<p
				in:fly={{ y: 50, duration: 1000, delay: 300 }}
				class="mb-8 text-center text-lg leading-relaxed {$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">
				With Macro Exotics, indulge in the pinnacle of luxury transportation. Whether on
				land or at sea, our exclusive selection of vehicles and yachts offers unmatched
				elegance and performance.
			</p>
			<div class="mb-8 grid gap-8 md:grid-cols-3">
				<div
					in:fly={{ x: -50, duration: 1000, delay: 400 }}
					class="group relative h-[400px] transform overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]">
					<img
						src={heroBg}
						alt="Luxury Car Experience"
						class="absolute inset-0 h-full w-full object-cover" />
					<div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-8 sm:p-4">
						<h3 class="mb-3 text-2xl font-bold text-white">
							Exotic Car Collection
						</h3>
						<p class="mb-4 text-gray-300">
							Experience the thrill of driving the world's most prestigious
							vehicles through the vibrant streets across the world.
						</p>
						<!-- TODO: Change URL from /ourVehicles to /vehicles and change vehicles listing page to fetch from /api/vehicles -->
						<SecondaryButton href="/vehicles" text="Explore Cars" width="w-full" colorScheme="light" hoverTextColor="text-white" />
					</div>
				</div>

				<div
					in:fly={{ x: 50, duration: 1000, delay: 600 }}
					class="group relative h-[400px] transform overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]">
					<img
						src={yachtHeroBg}
						alt="Yacht Experience"
						class="absolute inset-0 h-full w-full object-cover" />
					<div
						class="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-black/90 via-black/60 to-transparent p-8 sm:p-4">
						<h3 class="mb-3 text-2xl font-bold text-white">Yacht Adventures</h3>
						<p class="mb-4 text-gray-300">
							Set sail on crystal-clear waters with premium yachts, perfectly
							suited for adventures wherever your journey leads.
						</p>
						<SecondaryButton
							className="whitespace-nowrap"
							href="/yachts"
							text="Discover Yachts"
							width="w-full"
							colorScheme="light"
							hoverTextColor="text-white" />
					</div>
				</div>
				<div
					in:fly={{ x: 50, duration: 1000, delay: 600 }}
					class="group relative h-[400px] transform overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]">
					<img
						src={conciergeHeroBg}
						alt="Yacht Experience"
						class="absolute inset-0 h-full w-full object-cover" />
					<div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-8 sm:p-4">
						<h3 class="mb-3 text-2xl font-bold text-white">Become a host</h3>
						<p class="mb-4 text-gray-300">
							Boost your entrepreneurial journey and start building your own
							luxury vehicle rental business on Macro Exotics.
						</p>
						<SecondaryButton
							className="whitespace-nowrap"
							href={dashboardUrl}
							text="Become a host"
							width="w-full"
							colorScheme="light"
							hoverTextColor="text-white" />
					</div>
				</div>
			</div>

			<div
				in:fly={{ y: 50, duration: 1000, delay: 800 }}
				class="mx-auto rounded-xl border {$theme === 'dark' ? 'border-[#023131] bg-gradient-to-br from-miami-pink/10 to-miami-blue/10' : 'border-primary-accent/20 bg-gradient-to-br from-primary-accent/10 to-primary-light/10'} p-8 shadow-xl">
				<h3 class="mb-6 text-center text-2xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">Rental Benefits</h3>
				<div class="mx-auto my-0 grid gap-6 text-left md:grid-cols-2">
					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#513954] p-3">
							<svg
								class="h-6 w-6 text-[#F0E1E1]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">Insurance Coverage</h4>
							<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">Comprehensive coverage included</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#513954] p-3">
							<svg
								class="h-6 w-6 text-[#F0E1E1]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">Flexible Duration</h4>
							<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">Daily to monthly rentals available</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#513954] p-3">
							<svg
								class="h-6 w-6 text-[#F0E1E1]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">Delivery Service</h4>
							<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">Door-to-door delivery included</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#513954] p-3">
							<svg
								class="h-6 w-6 text-[#F0E1E1]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">VIP Membership</h4>
							<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">Exclusive benefits for members</p>
						</div>
					</div>
				</div>
			</div>
			<div in:fly={{ y: 50, duration: 1000, delay: 1000 }} class="mt-8 flex justify-center">
				<SecondaryButton href={loginUrl} text="Join the club" colorScheme={$theme === 'dark' ? 'light' : 'dark'} />
			</div>
		</div>
	</div>
</section>
