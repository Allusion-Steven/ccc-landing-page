<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/lambo-performante.jpg';
	import ContactButton from '../ContactButton.svelte';
	import { onMount } from 'svelte';
	import { Search, Input, Button } from 'flowbite-svelte';
	import { Datepicker, P } from 'flowbite-svelte';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	
	let selectedDate = null;
	let heroDiv;
	let imageLoaded = false;
	let location = 'Miami, FL';
	let pickupDate = new Date().toISOString().split('T')[0];
	let dropoffDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
	let contentVisible = false;

	onMount(() => {
		const img = new Image();
		img.src = heroImage;
		img.onload = () => {
			imageLoaded = true;
			setTimeout(() => {
				contentVisible = true;
			}, 300);
		};
	});
</script>

<div class="relative h-[90vh]">
	<div class="loading-placeholder" class:hidden={imageLoaded}></div>

	<div
		bind:this={heroDiv}
		class="hero-bg relative h-full"
		class:loaded={imageLoaded}
		style="background-image: url('{heroImage}'); background-position: center;"
	>
		<div
			class="absolute inset-0 bg-gradient-to-br from-[#1C1C1C]/85 via-[#1e1e1e]/80 to-[#2d1b2a]/85"
		>
			<div class="absolute inset-0 bg-gradient-to-t from-[#2d1b2a]/60 to-transparent"></div>
			<div class="container mx-auto h-full px-4">
				{#if contentVisible}
					<div class="flex h-full items-center justify-center">
						<div class="mx-auto max-w-4xl text-center">
							<h1
								in:fly={{ y: 50, duration: 1000, delay: 200 }}
								class="mb-8 text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl"
							>
								Premium Cars & Yachts, Your Way
							</h1>

							<p 
								in:fly={{ y: 50, duration: 1000, delay: 400 }}
								class="mx-auto mb-12 max-w-3xl text-center text-xl leading-relaxed text-white/95"
							>
								Connect with luxury vehicle owners and experience the extraordinary. From exotic cars
								to luxury yachts, Macro Exotics delivers unparalleled rental experiences.
							</p>

							<div 
								in:fly={{ y: 50, duration: 1000, delay: 600 }}
								class="mx-auto mb-12 max-w-4xl"
							>
								<div class="rounded-2xl bg-white/10 p-2 backdrop-blur-sm">
									<div
										class="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0"
									>
										<div class="relative flex w-full md:w-2/5">
											<div class="absolute left-4 top-1/2 z-10 -translate-y-1/2">
												<svg
													class="h-5 w-5 text-white/70"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
													/>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
											</div>
											<div class="absolute right-4 top-1/2 z-10 -translate-y-1/2 pointer-events-none">
												<svg
													class="h-5 w-5 text-white/70"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</div>
											<select
												bind:value={location}
												class="!h-12 w-full !rounded-2xl !border-transparent !bg-white/10 !px-12 text-white placeholder-white/50 appearance-none"
												style="background-color: rgba(255, 255, 255, 0.1);"
											>
												<option value="Miami, FL" class="!bg-[#1C1C1C] !text-white">Miami, FL</option>
												<option value="Los Angeles, CA" disabled class="!bg-[#1C1C1C] !text-white">Los Angeles, CA</option>
												<option value="New York, NY" disabled class="!bg-[#1C1C1C] !text-white">New York, NY</option>
												<option value="Columbus, OH" disabled class="!bg-[#1C1C1C] !text-white">Columbus, OH</option>
											</select>
										</div>

										<div class="flex w-full space-x-2 md:w-3/5">
											<div class="relative z-20 w-1/2">
												<input
													class="!h-12 w-full !rounded-2xl !border-transparent !bg-white/10 !px-4 text-white placeholder-white/50"
													type="date"
													bind:value={pickupDate}
													min={new Date().toISOString().split('T')[0]}
												/>
											</div>
											<div class="relative z-20 w-1/2">
												<input
													class="!h-12 w-full !rounded-2xl !border-transparent !bg-white/10 !px-4 text-white placeholder-white/50"
													type="date"
													bind:value={dropoffDate}
													min={pickupDate || new Date().toISOString().split('T')[0]}
												/>
											</div>
										</div>

										<!-- Search button -->
										<button
											class="!h-12 w-full rounded-2xl bg-gradient-to-r from-miami-pink to-miami-light-pink px-8 font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(255,27,107,0.3)] md:w-auto"
											on:click={() => window.location.href = `/vehicles?location=${encodeURIComponent(location)}&pickupDate=${encodeURIComponent(pickupDate)}&dropoffDate=${encodeURIComponent(dropoffDate)}`}
										>
											Search
										</button>
									</div>
								</div>
							</div>

							<div
								in:fly={{ y: 50, duration: 1000, delay: 800 }}
								class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
							>
								<PrimaryButton text="List Your Vehicle" href="/contact" />
								<SecondaryButton 
									text="Rent Now" 
									href="/vehicles" 
								/>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.hero-bg {
		background-size: cover;
		background-position: center;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.hero-bg.loaded {
		opacity: 1;
	}

	@media screen and (max-width: 649px) {
		.hero-bg {
			min-height: 80vh;
		}
	}

	.loading-placeholder {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
	}
	@media screen and (min-width: 649px) {
		.hero-bg {
			background-size: 160%;
		}
	}
</style>
