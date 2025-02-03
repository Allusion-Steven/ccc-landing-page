<script>
	import ContactButton from '$lib/assets/components/ContactButton.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<section class="relative overflow-hidden bg-[#1C1C1C] py-24 md:py-32">
	<!-- Background decoration -->
	<div
		class="absolute left-0 top-0 h-[600px] w-[600px] opacity-15 blur-[150px]"
		style="background: linear-gradient(45deg, #f890e7 0%, #023131 100%);"
	></div>
	<div
		class="absolute bottom-0 right-0 h-[400px] w-[400px] opacity-15 blur-[150px]"
		style="background: linear-gradient(45deg, #023131 0%, #f890e7 100%);"
	></div>

	<div class="container relative mx-auto px-6">
		<div class="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between">
			<!-- Left side content -->
			<div class="mb-4 md:mb-12 flex max-w-2xl flex-col justify-between gap-4 lg:sticky lg:top-8 lg:mb-0">
				{#if visible}
					<h2
						in:fly={{ x: -50, duration: 800, delay: 0 }}
						class="mb-4 bg-gradient-to-r from-pink-300 to-[#f890e7] bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl"
					>
						Why Choose<br />Macro Exotics?
					</h2>
					<p 
						in:fly={{ x: -50, duration: 800, delay: 200 }}
						class="mb-8 text-xl text-gray-400"
					>
						Experience luxury without compromise - where exceptional vehicles meet discerning clients.
					</p>
					<div in:fly={{ x: -50, duration: 800, delay: 400 }}>
						<p class="text-lg sm:leading-loose text-gray-300 md:text-xl">
							In today's sharing economy, we connect luxury vehicle owners with discerning clients
							seeking premium experiences. Our peer-to-peer platform creates opportunities for both
							owners and renters in the world of exotic vehicles and luxury yachts.
						</p><br>
						<p class="text-lg sm:leading-loose text-gray-300 md:text-xl">
							Whether you're sharing your prized possession or seeking the perfect vehicle for your next
							adventure, we make the connection seamless and secure through our comprehensive
							verification process and dedication to exceptional service.
						</p>
					</div>
				{/if}
			</div>

			<!-- Right side features -->
			<div class="w-full lg:max-w-2xl">
				<div class="space-y-6">
					{#if visible}
						<div
							in:fly={{ x: 50, duration: 800, delay: 200 }}
							class="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 p-8 backdrop-blur-lg transition-all duration-300 hover:border-[#f890e7]/50 hover:bg-black/40"
						>
							<div
								class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-[#f890e7]/20"
							>
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
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<h3 class="mb-3 text-2xl font-semibold text-white">Exclusive Access</h3>
							<p class="text-gray-400">
								Access to an unparalleled collection of luxury vehicles and yachts for your special
								events and celebrations. Experience the extraordinary.
							</p>
						</div>

						<div
							in:fly={{ x: 50, duration: 800, delay: 400 }}
							class="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 p-8 backdrop-blur-lg transition-all duration-300 hover:border-[#f890e7]/50 hover:bg-black/40"
						>
							<div
								class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-[#f890e7]/20"
							>
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
							<h3 class="mb-3 text-2xl font-semibold text-white">Safe Monetization</h3>
							<p class="text-gray-400">
								Transform your luxury assets into revenue streams with our secure platform. We ensure
								your vehicles are protected while generating returns.
							</p>
						</div>

						<div
							in:fly={{ x: 50, duration: 800, delay: 600 }}
							class="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-black/30 p-8 backdrop-blur-lg transition-all duration-300 hover:border-[#f890e7]/50 hover:bg-black/40"
						>
							<div
								class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-[#f890e7]/20"
							>
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
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h3 class="mb-3 text-2xl font-semibold text-white">Seamless Connections</h3>
							<p class="text-gray-400">
								Our sophisticated platform brings together qualified renters and premium vehicle
								owners, creating a trusted community of luxury enthusiasts.
							</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
