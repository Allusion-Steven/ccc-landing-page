<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/rr-dawn-miami.jpg';
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

<div class="relative sm:min-h-screen">
	<div class="loading-placeholder" class:hidden={imageLoaded}></div>
	<div
		bind:this={heroDiv}
		class="hero-bg relative min-h-screen bg-miami-sunset"
		class:loaded={imageLoaded}
		style="background-image: url('{heroImage}');"
	>
		<div
			class="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/30 via-[#1e1e1e]/80 to-transparent"
		>
			<div class="absolute inset-0">
				<div
					class="absolute inset-0 bg-gradient-to-r from-[#1e1e1e]/30 via-transparent to-[#0bd3d3]/10"
				>
					<div class="hero-content-container relative flex h-screen items-center justify-center">
						<div class="container mx-auto flex h-full items-center justify-center px-4">
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
								<ContactButton />
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
