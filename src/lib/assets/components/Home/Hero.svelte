<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/lambo-performante.jpg';
	import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';
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
	let vehicleType = 'Car';
	let currentBgImage = heroImage;
	let previousBgImage = heroImage;

	$: {
		if (currentBgImage !== (vehicleType === 'Car' ? heroImage : yachtHeroBg)) {
			previousBgImage = currentBgImage;
			currentBgImage = vehicleType === 'Car' ? heroImage : yachtHeroBg;
		}
	}

	onMount(() => {
		// Preload both images
		const preloadImages = [heroImage, yachtHeroBg].map((src) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = resolve;
				img.onerror = reject;
			});
		});

		Promise.all(preloadImages)
			.then(() => {
				imageLoaded = true;
				setTimeout(() => {
					contentVisible = true;
				}, 300);
			})
			.catch((error) => {
				console.error('Error preloading images:', error);
			});
	});
</script>

<div class="relative h-[100vh]">
	<div class="loading-placeholder" class:hidden={imageLoaded}></div>

	{#if contentVisible}
		<div class="relative h-full overflow-hidden">
			{#key currentBgImage}
				<div
					class="hero-bg absolute inset-0"
					style="background-image: url('{currentBgImage}'); background-size: cover; background-position: center; background-repeat: no-repeat;"
					in:fade={{ duration: 400 }}
					out:fade={{ duration: 400 }}
				/>
			{/key}

			<div
				class="absolute inset-0 bg-gradient-to-br from-[#1C1C1C]/85 via-[#1e1e1e]/80 to-[#2d1b2a]/85"
			>
				<div
					class="absolute inset-0 bg-gradient-to-t from-[#2d1b2a]/60 to-transparent"
				></div>
				<div class="container mx-auto h-full px-4">
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
								Connect with luxury vehicle owners and experience the extraordinary.
								From exotic cars to luxury yachts, Macro Exotics delivers
								unparalleled rental experiences.
							</p>

							<div
								in:fly={{ y: 50, duration: 1000, delay: 600 }}
								class="mx-auto mb-12 max-w-4xl"
							>
								<div
									class="mb-4 flex w-full items-center justify-center space-x-4 align-middle"
								>
									<p class="text-white/95">I'm Looking For</p>
									<button
										class="w-24 rounded-2xl p-2 backdrop-blur-sm transition-all duration-300 {vehicleType ===
										'Car'
											? 'bg-gradient-to-r from-miami-pink to-miami-light-pink text-white'
											: 'bg-white/10 text-white/90 hover:bg-white/20'}"
										on:click={() => {
											vehicleType = 'Car';
										}}>Cars</button
									>

									<button
										class="w-24 rounded-2xl p-2 backdrop-blur-sm transition-all duration-300 {vehicleType ===
										'Yacht'
											? 'bg-gradient-to-r from-miami-pink to-miami-light-pink text-white'
											: 'bg-white/10 text-white/90 hover:bg-white/20'}"
										on:click={() => {
											vehicleType = 'Yacht';
										}}>Yachts</button
									>
								</div>
								<div class="rounded-2xl bg-white/10 p-2 backdrop-blur-sm">
									<div
										class="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0"
									>
										<div class="relative flex w-full md:w-2/5">
											<div class="flex w-full space-x-2">
												<div class="relative w-full">
													<div
														class="absolute left-4 top-1/2 z-10 -translate-y-1/2"
													>
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
													<select
														bind:value={location}
														class="!h-12 w-full appearance-none !rounded-2xl !border-transparent !bg-white/10 !px-12 text-white placeholder-white/50 transition-all duration-300 hover:!bg-white/20 focus:!border-transparent focus:!ring-0"
														style="background-color: rgba(255, 255, 255, 0.1);"
													>
														<option
															value="Miami, FL"
															class="!bg-[#1C1C1C] !text-white hover:!bg-white/20"
															>Miami, FL</option
														>
														<option
															value="Los Angeles, CA"
															disabled
															class="!bg-[#1C1C1C] !text-white hover:!bg-white/20"
															>Los Angeles, CA</option
														>
														<option
															value="New York, NY"
															disabled
															class="!bg-[#1C1C1C] !text-white hover:!bg-white/20"
															>New York, NY</option
														>
														<option
															value="Columbus, OH"
															disabled
															class="!bg-[#1C1C1C] !text-white hover:!bg-white/20"
															>Columbus, OH</option
														>
													</select>
												</div>
											</div>
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
													min={pickupDate ||
														new Date().toISOString().split('T')[0]}
												/>
											</div>
										</div>

										<!-- Search button -->
										<button
											class="!h-12 w-full rounded-2xl bg-gradient-to-r from-miami-pink to-miami-light-pink px-8 font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(255,27,107,0.3)] md:w-auto"
											on:click={() => {
												const baseUrl =
													vehicleType === 'Yacht'
														? '/yachts'
														: '/vehicles';
												const params = new URLSearchParams({
													location: location,
													pickupDate: pickupDate,
													dropoffDate: dropoffDate,
													...(vehicleType === 'Yacht' && {
														vehicleType: 'yacht'
													})
												});
												window.location.href = `${baseUrl}?${params.toString()}`;
											}}
										>
											Search
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>


	@media screen and (min-width: 1024px) {
		.hero-bg {
			background-size: 180% !important;
			background-position: center;
		}
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
