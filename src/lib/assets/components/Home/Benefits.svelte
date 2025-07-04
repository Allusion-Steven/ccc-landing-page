<script>
	import { fly } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { loginUrl } from '$lib';
</script>

<section class="overflow-hidden bg-gradient-to-br py-16 {$theme === 'dark' ? 'from-primary-dark to-[#2d1b2a]' : 'from-white to-white/90'}">
	<div class="container mx-auto px-4">
		<div class="text-center">
			<h2
				in:fly={{ y: 50, duration: 1000, delay: 200 }}
				class="mb-8 text-4xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'} md:text-5xl">
				Why Choose Macro Exotics?
			</h2>
			<p
				in:fly={{ y: 50, duration: 1000, delay: 300 }}
				class="mx-auto mb-12 max-w-2xl text-lg leading-relaxed {$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">
				Experience unparalleled luxury and service with our premium vehicle and yacht
				rental platform. We offer more than just rentals - we create unforgettable
				experiences.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div
				in:fly={{ x: -50, duration: 1000, delay: 400 }}
				class="rounded-xl {$theme === 'dark' ? 'bg-gradient-to-br from-miami-pink/10 to-miami-blue/10' : 'bg-gradient-to-br from-primary-accent/10 to-primary-light/10'} p-6">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-200">
					<svg
						class="h-6 w-6 text-[#B54959]"
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
				<h3 class="mb-3 text-xl font-semibold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">
					Premium Selection
				</h3>
				<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">
					Access to an exclusive fleet of luxury vehicles and yachts, carefully curated
					for the most discerning clients.
				</p>
			</div>

			<div
				in:fly={{ y: 50, duration: 1000, delay: 500 }}
				class="rounded-xl {$theme === 'dark' ? 'bg-gradient-to-br from-miami-pink/10 to-miami-blue/10' : 'bg-gradient-to-br from-primary-accent/10 to-primary-light/10'} p-6">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-200">
					<svg
						class="h-6 w-6 text-[#f890e7]"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
				</div>
				<h3 class="mb-3 text-xl font-semibold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">
					Flexible Options
				</h3>
				<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">
					Customizable rental periods and services tailored to your specific needs and
					preferences.
				</p>
			</div>

			<div
				in:fly={{ x: 50, duration: 1000, delay: 600 }}
				class="rounded-xl {$theme === 'dark' ? 'bg-gradient-to-br from-miami-pink/10 to-miami-blue/10' : 'bg-gradient-to-br from-primary-accent/10 to-primary-light/10'} p-6">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-200">
					<svg
						class="h-6 w-6 text-[#f890e7]"
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
				<h3 class="mb-3 text-xl font-semibold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">
					Concierge Service
				</h3>
				<p class="{$theme === 'dark' ? 'text-gray-300' : 'text-primary-muted'}">
					24/7 personalized assistance and support to ensure a seamless and luxurious
					experience.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-gradient-to-br py-16">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2
				in:fly={{ y: 50, duration: 1000, delay: 200 }}
				class="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl"
			>
				Luxury Vehicle & Yacht Rentals
			</h2>
			<p
				in:fly={{ y: 50, duration: 1000, delay: 400 }}
				class="mb-8 text-lg leading-relaxed text-gray-300 text-center"
			>
				With Macro Exotics, experience the ultimate in luxury transportation. Whether by land or
				sea, our premium fleet of vehicles and yachts delivers unparalleled elegance and
				performance.
			</p>

			<div in:fly={{ y: 50, duration: 1000, delay: 600 }} class="mb-16 grid gap-8 md:grid-cols-3">
				<div
					class="rounded-lg bg-gradient-to-br from-miami-pink/10 to-miami-blue/10 p-6 backdrop-blur-sm transition-all duration-300 hover:from-miami-pink/20 hover:to-miami-blue/20"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Exotic Cars</h3>
					<p class="text-gray-300">From Lamborghinis to Ferraris, drive your dream car today.</p>
				</div>

				<div
					class="rounded-lg bg-gradient-to-br from-miami-pink/10 to-miami-blue/10 p-6 backdrop-blur-sm transition-all duration-300 hover:from-miami-pink/20 hover:to-miami-blue/20"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Luxury Yachts</h3>
					<p class="text-gray-300">
						Experience the open waters in style with our premium vessels.
					</p>
				</div>

				<div
					class="rounded-lg bg-gradient-to-br from-miami-pink/10 to-miami-blue/10 p-6 backdrop-blur-sm transition-all duration-300 hover:from-miami-pink/20 hover:to-miami-blue/20"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Concierge Service</h3>
					<p class="text-gray-300">
						24/7 white-glove service to ensure your rental experience is flawless.
					</p>
				</div>
			</div>
			<div
				in:fly={{ y: 50, duration: 1000, delay: 800 }}
				class="mx-auto max-w-4xl rounded-lg border border-[#023131] bg-gradient-to-br from-miami-pink/10 to-miami-blue/10 p-8 shadow-xl"
			>
				<h3 class="mb-6 text-2xl font-bold text-white">Rental Benefits</h3>
				<div class="grid gap-6 text-left md:grid-cols-2">
					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-pink-200 p-3">
							<svg
								class="h-6 w-6 text-[#f890e7]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-white">Insurance Coverage</h4>
							<p class="text-gray-300">Comprehensive coverage included</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-pink-200 p-3">
							<svg
								class="h-6 w-6 text-[#f890e7]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-white">Flexible Duration</h4>
							<p class="text-gray-300">Daily to monthly rentals available</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-pink-200 p-3">
							<svg
								class="h-6 w-6 text-[#f890e7]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-white">Delivery Service</h4>
							<p class="text-gray-300">Door-to-door delivery included</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-pink-200 p-3">
							<svg
								class="h-6 w-6 text-[#f890e7]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-white">VIP Membership</h4>
							<p class="text-gray-300">Exclusive benefits for members</p>
						</div>
					</div>
				</div>
			</div>
			<div in:fly={{ y: 50, duration: 1000, delay: 1000 }} class="mt-[5rem] flex justify-center">
				<SecondaryButton href={loginUrl} text="Join the club" colorScheme={$theme === 'dark' ? 'dark' : 'dark'} />
			</div>
		</div>
	</div>
</section>
