<script>
	// import horizontalLogoLight from '$lib/assets/logos/horizontal-logo-light.svg';
	import heroImage from '$lib/assets/images/rolls-royce-bg-hero.jpeg';
</script>

<section
	class="relative h-[50vh] w-full bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black/50"
	style="background-image: url({heroImage})"
>
	<div class="relative flex h-[50vh] items-center justify-center">
		<div class="container mx-auto px-4 py-20">
			<div class="mx-auto max-w-4xl text-center">
				<h1 class="mb-8 text-3xl font-bold leading-tight text-white md:text-5xl">
					Stay Connected & Protected
				</h1>

				<p class="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
					Keep your employees connected and stress-free with Macro Exotics. Ensure their essential
					devices are protected when they need them most, so they can stay focused and productive
					every day.
				</p>

				<div class="flex justify-center gap-4">
					<a
						href="/contact"
						class="text-blackgroup relative inline-flex items-center rounded-full bg-[#05ADAD] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:bg-pink-500"
					>
						Schedule a Consultation
						<svg
							class="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
