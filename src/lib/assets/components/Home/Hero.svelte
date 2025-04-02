<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/lambo-performante.jpg';
	import yachtHeroBg from '$lib/assets/images/yacht-hero-bg.avif';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';

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
				class="absolute inset-0 {$theme === 'dark' ? 'bg-gradient-to-br from-[#1C1C1C]/85 via-[#1e1e1e]/80 to-[#2d1b2a]/85' : 'bg-gradient-to-br from-white/50 via-white/45 to-white/50'}"
			>
				<div
					class="absolute inset-0 {$theme === 'dark' ? 'bg-gradient-to-t from-[#2d1b2a]/60 to-transparent' : 'bg-gradient-to-t from-white/35 to-transparent'}"
				></div>
				<div class="container mx-auto h-full px-4">
					<div class="flex h-full items-center justify-center">
						<div class="mx-auto max-w-4xl text-center {$theme === 'dark' ? '' : 'rounded-3xl bg-white/20 p-8 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.15)]'}">
							<h1
								in:fly={{ y: 50, duration: 1000, delay: 200 }}
								class="mb-8 text-4xl font-bold tracking-tight {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}  md:text-6xl"
							>
								Premium Cars & Yachts, Your Way
							</h1>

							<p
								in:fly={{ y: 50, duration: 1000, delay: 400 }}
								class="mx-auto mb-12 max-w-3xl text-center text-xl leading-relaxed {$theme === 'dark' ? 'text-white/95' : 'text-primary-accent/95'} drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
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
									<p class="{$theme === 'dark' ? 'text-white/95' : 'text-primary-accent/95'}">I'm Looking For</p>
									<button
										class="w-24 rounded-2xl p-2 backdrop-blur-sm transition-all duration-300 {vehicleType === 'Car'
											? 'bg-gradient-to-r from-primary-light to-primary-accent text-white'
											: `${$theme === 'dark' ? 'bg-white/10 text-white/90 hover:bg-white/20' : 'bg-primary-accent/10 text-primary-accent/90 hover:bg-primary-accent/20'}`}"
										on:click={() => {
											vehicleType = 'Car';
										}}>Cars</button
									>

									<button
										class="w-24 rounded-2xl p-2 backdrop-blur-sm transition-all duration-300 {vehicleType === 'Yacht'
											? 'bg-gradient-to-r from-primary-light to-primary-accent text-white'
											: `${$theme === 'dark' ? 'bg-white/10 text-white/90 hover:bg-white/20' : 'bg-primary-accent/10 text-primary-accent/90 hover:bg-primary-accent/20'}`}"
										on:click={() => {
											vehicleType = 'Yacht';
										}}>Yachts</button
									>
								</div>
								<div class="rounded-2xl {$theme === 'dark' ? 'bg-white/10' : 'bg-primary-accent/10'} p-2 backdrop-blur-sm">
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
															class="h-5 w-5 {$theme === 'dark' ? 'text-white/70' : 'text-primary-accent/70'}"
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
														class="!h-12 w-full appearance-none !rounded-2xl !border-transparent {$theme === 'dark' ? '!bg-white/10 text-white placeholder-white/50' : '!bg-primary-accent/10 text-primary-accent placeholder-primary-accent/50'} !px-12 transition-all duration-300 hover:!bg-white/20 focus:!border-transparent focus:!ring-0"
														style:background-color={$theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(194, 63, 91, 0.1)'}
													>
														<option
															value="Miami, FL"
															class="{$theme === 'dark' ? '!bg-[#1C1C1C] !text-white' : '!bg-white !text-primary-accent'} hover:!bg-white/20"
															>Miami, FL</option
														>
														<option
															value="Los Angeles, CA"
															disabled
															class="{$theme === 'dark' ? '!bg-[#1C1C1C] !text-white' : '!bg-white !text-primary-accent'} hover:!bg-white/20"
															>Los Angeles, CA</option
														>
														<option
															value="New York, NY"
															disabled
															class="{$theme === 'dark' ? '!bg-[#1C1C1C] !text-white' : '!bg-white !text-primary-accent'} hover:!bg-white/20"
															>New York, NY</option
														>
														<option
															value="Columbus, OH"
															disabled
															class="{$theme === 'dark' ? '!bg-[#1C1C1C] !text-white' : '!bg-white !text-primary-accent'} hover:!bg-white/20"
															>Columbus, OH</option
														>
													</select>
												</div>
											</div>
										</div>

										<div class="flex w-full space-x-2 md:w-3/5">
											<div class="relative z-20 w-1/2">
												<input
													class="!h-12 w-full !rounded-2xl !border-transparent {$theme === 'dark' ? '!bg-white/10 text-white placeholder-white/50' : '!bg-primary-accent/10 text-primary-accent placeholder-primary-accent/50'} !px-4"
													type="date"
													bind:value={pickupDate}
													min={new Date().toISOString().split('T')[0]}
												/>
											</div>
											<div class="relative z-20 w-1/2">
												<input
													class="!h-12 w-full !rounded-2xl !border-transparent {$theme === 'dark' ? '!bg-white/10 text-white placeholder-white/50' : '!bg-primary-accent/10 text-primary-accent placeholder-primary-accent/50'} !px-4"
													type="date"
													bind:value={dropoffDate}
													min={pickupDate ||
														new Date().toISOString().split('T')[0]}
												/>
											</div>
										</div>

										<!-- Search button -->
										<button
											class="!h-12 w-full rounded-2xl bg-gradient-to-r from-primary-light to-primary-accent px-8 font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(255,27,107,0.3)] md:w-auto"
											on:click={() => {
												const baseUrl =
													vehicleType === 'Yacht'
														? '/yachts'
														: '/vehicles';
												const params = new URLSearchParams({
													location: location,
													pickupDate: pickupDate,
													dropoffDate: dropoffDate,
													vehicleType: vehicleType === 'Yacht' ? 'yacht' : 'car'
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
</style>
