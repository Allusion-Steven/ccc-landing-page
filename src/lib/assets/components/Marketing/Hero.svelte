<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Background Image -->
	<div class="absolute inset-0 z-0">
		<img
			src="/images/sunseeker-78.jpg"
			alt="Luxury yacht"
			class="w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
		<div class="space-y-8">
			<h1 class="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
				MACRO
				<span class="block text-4xl md:text-6xl lg:text-7xl font-extralight mt-4 text-gray-300">
					EXOTICS
				</span>
			</h1>

			<div class="max-w-3xl mx-auto space-y-6">
				<p class="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
					The premier peer-to-peer luxury club connecting discerning individuals who share an uncompromising passion for exceptional automobiles and yachts.
				</p>

				<p class="text-lg md:text-xl text-white/70 font-light">
					Exclusive. Curated. Extraordinary.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
				<Button
					size="xl"
					class="bg-white text-black hover:bg-gray-200 border-0 px-12 py-4 text-lg font-light tracking-wide transition-all duration-300"
				>
					JOIN THE CLUB
				</Button>
				<Button
					size="xl"
					variant="outline"
					class="border-white text-white hover:bg-white hover:text-black px-12 py-4 text-lg font-light tracking-wide transition-all duration-300"
				>
					LEARN MORE
				</Button>
			</div>
		</div>
	</div>

	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
		<div class="w-px h-16 bg-white opacity-30"></div>
	</div>
</section>