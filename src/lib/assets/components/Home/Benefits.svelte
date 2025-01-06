<script>
	import ContactButton from '$lib/assets/components/ContactButton.svelte';
</script>

<section class="bg-[#111111] py-16 md:py-24">
	<div class="container mx-auto px-4">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl">
				Comprehensive Device Protection
			</h2>
			<p class="mb-12 text-lg leading-relaxed text-gray-300">
				With TotalTech Protection, employees can be assured that if their devices malfunction or are
				accidentally damaged, they're covered for necessary repairs or replacements.
			</p>

			<div class="mb-16 grid gap-8 md:grid-cols-3">
				<div
					class="rounded-lg border border-[#023131] bg-[#1a1a1a] p-6 shadow-lg transition-all hover:shadow-xl"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Phone Protection</h3>
					<p class="text-gray-300">Cracked Cell Phone Screen? They're covered.</p>
				</div>

				<div
					class="rounded-lg border border-[#023131] bg-[#1a1a1a] p-6 shadow-lg transition-all hover:shadow-xl"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">Smart Devices</h3>
					<p class="text-gray-300">Smart Device Malfunctioning? No worries, they're protected.</p>
				</div>

				<div
					class="rounded-lg border border-[#023131] bg-[#1a1a1a] p-6 shadow-lg transition-all hover:shadow-xl"
				>
					<h3 class="mb-4 text-xl font-semibold text-white">TV Coverage</h3>
					<p class="text-gray-300">
						Living Room TV Stopped Working? We'll reimburse for repairs or replacement.
					</p>
				</div>
			</div>
			<div class="mx-auto max-w-4xl rounded-lg bg-[#1a1a1a] p-8 shadow-xl border border-[#023131]">
				<h3 class="mb-6 text-2xl font-bold text-white">Coverage Details</h3>
				<div class="grid gap-6 text-left md:grid-cols-2">
					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#0bd3d3] p-3 ">
							<svg
								class="h-6 w-6 text-pink-500 group-hover:text-pink-500"
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
							<h4 class="font-semibold text-white">Reimbursement Amount</h4>
							<p class="text-gray-300">Up to $500 per incident</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#0bd3d3] p-3">
							<svg
								class="h-6 w-6 text-pink-500 group-hover:text-pink-500"
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
							<h4 class="font-semibold text-white">Annual Claim Limit</h4>
							<p class="text-gray-300">Up to $1,000 total</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#0bd3d3] p-3 ">
							<svg
								class="h-6 w-6 text-pink-500 group-hover:text-pink-500"
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
							<h4 class="font-semibold text-white">Number of Claims</h4>
							<p class="text-gray-300">Up to 2 claims per year</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="rounded-full bg-[#0bd3d3] p-3 ">
							<svg
								class="h-6 w-6 text-pink-500 group-hover:text-pink-500"
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
							<h4 class="font-semibold text-white">Incident Copay</h4>
							<p class="text-gray-300">Flat rate of $75</p>
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
