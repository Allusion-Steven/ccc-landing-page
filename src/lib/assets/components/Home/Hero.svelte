<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/rolls-royce-bg-hero.jpeg';
	import ContactButton from '../ContactButton.svelte';
</script>

<div
	class="relative min-h-screen bg-miami-sunset"
	style="background-image: url('{heroImage}'); background-size: cover; background-position: center;"
>
	<div class="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] via-[#1e1e1e]/80 to-transparent">
		<div class="absolute inset-0">
			<div
				class="absolute inset-0 bg-gradient-to-r from-[#1e1e1e]/30 via-transparent to-[#0bd3d3]/10"
			>
				<div class="relative flex h-screen items-center justify-center">
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
