<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<section class="py-24 bg-white dark:bg-black relative overflow-hidden">
	<!-- Background Image -->
	<div class="absolute inset-0 z-0 opacity-5">
		<img
			src="/images/pershing-9x.jpg"
			alt="Luxury yacht"
			class="w-full h-full object-cover"
		/>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
		<div class="text-center space-y-4 mb-16">
			<h2 class="text-4xl md:text-5xl font-light text-black dark:text-white tracking-tight">
				Uncompromising Service
			</h2>
			<div class="w-24 h-px bg-black dark:bg-white mx-auto"></div>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				Every detail handled with precision. Every expectation exceeded with elegance.
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-12">
			<div class="text-center space-y-6 group">
				<div class="w-16 h-16 mx-auto border border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
					</svg>
				</div>
				<div class="space-y-4">
					<h3 class="text-2xl font-light text-black dark:text-white">Concierge Excellence</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Our dedicated concierge team anticipates your every need. From pre-arrival preparation to post-rental follow-up, we ensure seamless experiences that reflect your sophisticated standards.
					</p>
					<ul class="text-sm text-gray-500 dark:text-gray-500 space-y-2">
						<li>• 24/7 personal concierge support</li>
						<li>• Custom itinerary planning</li>
						<li>• Exclusive venue recommendations</li>
						<li>• Personal shopping & dining reservations</li>
					</ul>
				</div>
			</div>

			<div class="text-center space-y-6 group">
				<div class="w-16 h-16 mx-auto border border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
					</svg>
				</div>
				<div class="space-y-4">
					<h3 class="text-2xl font-light text-black dark:text-white">White-Glove Delivery</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Experience luxury from the moment you decide to drive. Our professional chauffeurs deliver each vehicle in pristine condition, wherever and whenever you desire.
					</p>
					<ul class="text-sm text-gray-500 dark:text-gray-500 space-y-2">
						<li>• Complimentary pickup & delivery</li>
						<li>• Professional detailing before each rental</li>
						<li>• GPS and emergency roadside assistance</li>
						<li>• Flexible scheduling around your calendar</li>
					</ul>
				</div>
			</div>

			<div class="text-center space-y-6 group">
				<div class="w-16 h-16 mx-auto border border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
					</svg>
				</div>
				<div class="space-y-4">
					<h3 class="text-2xl font-light text-black dark:text-white">Complete Protection</h3>
					<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
						Drive with absolute confidence. Our comprehensive insurance coverage protects both members and hosts, ensuring peace of mind for every extraordinary journey.
					</p>
					<ul class="text-sm text-gray-500 dark:text-gray-500 space-y-2">
						<li>• Full comprehensive insurance coverage</li>
						<li>• $2M liability protection</li>
						<li>• Zero deductible for approved claims</li>
						<li>• 24/7 claims support team</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-16 text-center">
			<Button
				size="lg"
				variant="outline"
				class="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-8 py-3 text-base font-light tracking-wide transition-all duration-300"
			>
				DISCOVER ALL SERVICES
			</Button>
		</div>
	</div>
</section>