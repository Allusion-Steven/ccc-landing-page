<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/lambo-performante.jpg';
	import ContactButton from '../ContactButton.svelte';
	import { onMount } from 'svelte';
	import { Search, Input, Button } from 'flowbite-svelte';
	import { Datepicker, P } from 'flowbite-svelte';
	let selectedDate = null;

	let heroDiv;
	let imageLoaded = false;
	let location = '';
	let pickupDate = new Date();
	let pickupTime = '';
	let dropoffDate = new Date();
	let dropoffTime = '';

	onMount(() => {
		const img = new Image();
		img.src = heroImage;
		img.onload = () => {
			imageLoaded = true;
		};
	});
</script>

<div class="relative h-[90vh]">
	<div class="loading-placeholder" class:hidden={imageLoaded}></div>

	<div
		bind:this={heroDiv}
		class="hero-bg relative h-full"
		class:loaded={imageLoaded}
		style="background-image: url('{heroImage}');;"
	>
		<div
			class="absolute inset-0 bg-gradient-to-br from-[#1C1C1C]/95 via-[#1e1e1e]/90 to-[#2d1b2a]/85"
		>
			<div class="absolute inset-0 bg-gradient-to-t from-[#2d1b2a]/80 to-transparent"></div>
			<div class="container mx-auto h-full px-4">
				<div class="flex h-full items-center justify-center">
					<div class="mx-auto max-w-4xl text-center">
						<h1
							class="mb-8 text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl"
						>
							Premium Cars & Yachts, Your Way
						</h1>

						<p class="mx-auto mb-12 max-w-3xl text-center text-xl leading-relaxed text-white/95">
							Connect with luxury vehicle owners and experience the extraordinary. From exotic cars
							to luxury yachts, Macro Exotics delivers unparalleled rental experiences.
						</p>

						<div class="mx-auto mb-12 max-w-4xl">
							<div class="rounded-full bg-white/10 p-2 backdrop-blur-sm">
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
										<Input
											type="text"
											placeholder="Location"
											bind:value={location}
											class="!h-12 w-full !rounded-full !border-transparent !bg-white/10 !px-12 text-white placeholder-white/50"
										/>
									</div>

									<div class="flex w-full space-x-2 md:w-3/5">
										<div class="relative z-20 w-1/2">
											<input
												class="!h-12 w-full !rounded-full !border-transparent !bg-white/10 !px-4 text-white placeholder-white/50"
												type="date"
												bind:value={pickupDate}
											/>
										</div>
										<div class="relative z-20 w-1/2">
											<input
												class="!h-12 w-full !rounded-full !border-transparent !bg-white/10 !px-4 text-white placeholder-white/50"
												type="date"
												bind:value={dropoffDate}
											/>
										</div>
									</div>

									<button
										class="!h-12 w-full rounded-full bg-gradient-to-r from-miami-pink to-miami-light-pink px-8 font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(255,27,107,0.3)] md:w-auto"
									>
										Search
									</button>
								</div>
							</div>
						</div>

						<div
							class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
						>
							<a
								href="/list"
								class="group relative inline-flex min-w-48 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-miami-light-pink/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,27,107,0.15)] md:text-lg"
							>
								List Your Vehicle
								<svg
									class="ml-2 h-5 w-5 transform opacity-70 transition-transform group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
							<a
								href="/contact"
								class="group relative inline-flex min-w-48 items-center justify-center rounded-lg bg-gradient-to-r from-miami-pink to-miami-light-pink px-8 py-4 text-base font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(255,27,107,0.3)] md:text-lg"
							>
								Rent Now
								<svg
									class="ml-2 h-5 w-5 transform opacity-70 transition-transform group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-bg {
		background-size: cover;
		background-position: center;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	.hero-bg.loaded {
		opacity: 1;
	}

	@media screen and (max-width: 649px) {
		.hero-bg {
			min-height: 80vh;
			.hero-content-container {
				max-height: 80vh;
			}
		}
	}

	.loading-placeholder {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
	}
</style>
