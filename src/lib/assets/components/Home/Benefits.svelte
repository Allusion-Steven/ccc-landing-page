<script>
	import ContactButton from '$lib/assets/components/ContactButton.svelte';
</script>

<section class="bg-[#111111] py-16 md:py-24">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl">
				Luxury Vehicle & Yacht Rentals
			</h2>
			<p class="mb-12 text-lg leading-relaxed text-gray-300">
				With Macro Exotics, experience the ultimate in luxury transportation. Whether by land or sea,
				our premium fleet of vehicles and yachts delivers unparalleled elegance and performance.
			</p>

			<div class="mb-16 grid gap-8 md:grid-cols-3">
				<div
					class="rounded-lg border border-[#023131] bg-[#1a1a1a] p-6 shadow-lg transition-all hover:shadow-xl"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Exotic Cars</h3>
					<p class="text-gray-300">From Lamborghinis to Ferraris, drive your dream car today.</p>
				</div>

				<div
					class="rounded-lg border border-[#023131] bg-[#1a1a1a] p-6 shadow-lg transition-all hover:shadow-xl"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Luxury Yachts</h3>
					<p class="text-gray-300">Experience the open waters in style with our premium vessels.</p>
				</div>

				<div
					class="rounded-lg border border-[#023131] bg-[#1a1a1a] p-6 shadow-lg transition-all hover:shadow-xl"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Concierge Service</h3>
					<p class="text-gray-300">
						24/7 white-glove service to ensure your rental experience is flawless.
					</p>
				</div>
			</div>
			<div class="mx-auto max-w-4xl rounded-lg bg-[#1a1a1a] p-8 shadow-xl border border-[#023131]">
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
						<div class="rounded-full bg-pink-200 p-3 ">
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
						<div class="rounded-full bg-pink-200 p-3 ">
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
			<div class="mt-[5rem] flex justify-center">
				<ContactButton />
			</div>
		</div>
	</div>
</section>
