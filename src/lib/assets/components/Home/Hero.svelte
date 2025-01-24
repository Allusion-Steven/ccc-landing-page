<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/lambo-performante.jpg';
	import ContactButton from '../ContactButton.svelte';
	import { onMount } from 'svelte';

	let heroDiv;
	let imageLoaded = false;

	onMount(() => {
		const img = new Image();
		img.src = heroImage;
		img.onload = () => {
			imageLoaded = true;
		};
	});
</script>

<div class="relative sm:h-[80vh]">
	<div class="loading-placeholder" class:hidden={imageLoaded}></div>
	<div
		bind:this={heroDiv}
		class="hero-bg relative h-[80vh] bg-miami-sunset"
		class:loaded={imageLoaded}
		style="background-image: url('{heroImage}');;"
	>
		<div
			class="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/60 via-[#1e1e1e]/90 to-transparent"
		>
			<div class="absolute inset-0">
				<div
					class="absolute inset-0 bg-gradient-to-r from-[#1e1e1e]/30 via-transparent to-[#0bd3d3]/10"
				>
					<div class="hero-content-container relative flex h-[80vh] items-center justify-center">
						<div class="container mx-auto flex h-[80vh] items-center justify-center px-4">
							<div class="mx-auto max-w-4xl text-center">
								<h1 class="mb-8 text-3xl font-bold leading-tight text-white md:text-5xl">
									Luxury Rentals, Peer to Peer
								</h1>

								<p class="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
									Experience luxury on your terms with Macro Exotics. Our peer-to-peer platform
									connects owners of exotic cars and luxury yachts with discerning renters, offering
									an exclusive collection of premium vehicles and vessels for unforgettable
									experiences on land and sea.
								</p>
								<div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
									<a
										href="/contact"
										class="group relative inline-flex items-center justify-center rounded-full bg-[#0bd3d3] px-8 py-3 text-base font-medium text-gray-900 transition-all duration-300 ease-in-out hover:bg-[#0bd3d3]/80 hover:scale-105 hover:shadow-lg md:text-lg"
									>
										Rent a Car
										<svg
											class="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</a>
									<a
										href="/list"
										class="group relative inline-flex items-center justify-center rounded-full bg-transparent border-2 border-[#0bd3d3] px-8 py-3 text-base font-medium text-white transition-all duration-300 ease-in-out hover:bg-[#0bd3d3]/10 hover:scale-105 hover:shadow-lg md:text-lg"
									>
										List a Car
										<svg
											class="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</a>
								</div>
							</div>
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
