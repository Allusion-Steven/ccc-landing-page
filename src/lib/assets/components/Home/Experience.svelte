<script>
	import { fly } from 'svelte/transition';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';
	import conciergeHeroBg from '$lib/assets/images/concierge-service.avif';
	import heroBg from '$lib/assets/images/rr-culinan-interior.webp';
</script>

<section class="bg-gradient-to-br py-16">
	<div class="px-4">
		<div class="mx-auto max-w-5xl">
			<h2
				in:fly={{ y: 50, duration: 1000, delay: 200 }}
				class="mb-8 text-center text-5xl font-bold text-white "
			>
				Luxury Vehicle & Yacht Rentals
			</h2>
			<p
				in:fly={{ y: 50, duration: 1000, delay: 300 }}
				class="mb-8 text-center text-lg leading-relaxed text-gray-300"
			>
				With Macro Exotics, experience the ultimate in luxury transportation. Whether by
				land or sea, our premium fleet of vehicles and yachts delivers unparalleled elegance
				and performance.
			</p>
			<div class="mb-8 grid gap-8 md:grid-cols-3">
				<div
					in:fly={{ x: -50, duration: 1000, delay: 400 }}
					class="group relative h-[400px] transform overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]"
				>
					<img
						src={heroBg}
						alt="Luxury Car Experience"
						class="absolute inset-0 h-full w-full object-cover"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
						<div class="absolute bottom-0 p-8">
							<h3 class="mb-3 text-2xl font-bold text-white">
								Exotic Car Collection
							</h3>
							<p class="mb-4 text-gray-300">
								Experience the thrill of driving the world's most prestigious
								vehicles through the vibrant streets of Miami.
							</p>
							<SecondaryButton href="/vehicles" text="Explore Cars" />
						</div>
					</div>
				</div>

				<div
					in:fly={{ x: 50, duration: 1000, delay: 600 }}
					class="group relative h-[400px] transform overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]"
				>
					<img
						src={yachtHeroBg}
						alt="Yacht Experience"
						class="absolute inset-0 h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-transparent"
					>
						<div class="absolute bottom-0 p-8">
							<h3 class="mb-3 text-2xl font-bold text-white">Yacht Adventures</h3>
							<p class="mb-4 text-gray-300">
								Set sail on crystal-clear waters with premium yachts, perfectly
								suited for adventures wherever your journey leads.
							</p>
							<SecondaryButton
								className="whitespace-nowrap"
								href="/yachts"
								text="Discover Yachts"
							/>
						</div>
					</div>
				</div>
				<div
					in:fly={{ x: 50, duration: 1000, delay: 600 }}
					class="group relative h-[400px] transform overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]"
				>
					<img
						src={conciergeHeroBg}
						alt="Yacht Experience"
						class="absolute inset-0 h-full w-full object-cover"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
						<div class="absolute bottom-0 p-8">
							<h3 class="mb-3 text-2xl font-bold text-white">Concierge Service</h3>
							<p class="mb-4 text-gray-300">
								Round-the-clock white-glove support to make your rental experience
								seamless and exceptional.
							</p>
							<SecondaryButton
								className="whitespace-nowrap"
								href="/yachts"
								text="Learn More"
							/>
						</div>
					</div>
				</div>
			</div>

			<div
				in:fly={{ y: 50, duration: 1000, delay: 800 }}
				class="mx-auto max-w-5xl rounded-lg border border-[#023131] bg-gradient-to-br from-miami-pink/10 to-miami-blue/10 p-8 shadow-xl"
			>
				<h3 class="mb-6 text-center text-2xl font-bold text-white">Rental Benefits</h3>
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
			<div in:fly={{ y: 50, duration: 1000, delay: 1000 }} class="mt-8 flex justify-center">
				<SecondaryButton href="https://my.macroexotics.com/login" text="Join the club" />
			</div>
		</div>
	</div>
</section>
