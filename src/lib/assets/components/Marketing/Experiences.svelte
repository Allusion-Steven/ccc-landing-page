<script lang="ts">
	import { Button } from 'flowbite-svelte';

	const experiences = [
		{
			category: "Romantic Escapes",
			title: "Unforgettable Anniversaries & Date Nights",
			description: "Transform special moments into extraordinary memories with our curated selection of luxury vehicles. From a sunset drive along the coast in a convertible Bentley to arriving at your anniversary dinner in a classic Rolls-Royce.",
			image: "/images/rr-culinan-interior.webp",
			features: ["Champagne service", "Custom routes", "Photography coordination", "Restaurant partnerships"]
		},
		{
			category: "Corporate Excellence",
			title: "Executive Events & Client Entertainment",
			description: "Make powerful impressions with our yacht charter and luxury car services. Perfect for board meetings, client entertainment, product launches, and exclusive corporate retreats that demand nothing less than perfection.",
			image: "/images/Princess_Yachts_Y85_15.jpg",
			features: ["Executive catering", "AV equipment", "Professional crew", "Branded experiences"]
		},
		{
			category: "Milestone Celebrations",
			title: "Weddings, Galas & Special Occasions",
			description: "Celebrate life's most important moments in style. Our fleet ensures your wedding party, gala arrival, or milestone celebration reflects the significance of your special day.",
			image: "/images/ferretti-yachts-920.jpg",
			features: ["Event coordination", "Multiple vehicle fleet", "Decorative options", "Professional chauffeurs"]
		},
		{
			category: "Lifestyle Experiences",
			title: "Weekend Getaways & Social Events",
			description: "Whether it's a weekend in the Hamptons, a wine country tour, or hosting friends for an exclusive gathering, our vehicles and yachts provide the perfect backdrop for luxury lifestyle experiences.",
			image: "/images/azimut-77s.jpg",
			features: ["Multi-day rentals", "Destination planning", "Group accommodations", "Lifestyle concierge"]
		}
	];
</script>

<section class="py-24 bg-gray-50 dark:bg-gray-950">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<div class="text-center space-y-4 mb-16">
			<h2 class="text-4xl md:text-5xl font-light text-black dark:text-white tracking-tight">
				Curated Experiences
			</h2>
			<div class="w-24 h-px bg-black dark:bg-white mx-auto"></div>
			<p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
				More than transportation. These are moments that define your story.
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12">
			{#each experiences as experience, index}
				<div class="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 overflow-hidden group hover:border-black dark:hover:border-white transition-all duration-300">
					<div class="aspect-w-16 aspect-h-9 relative">
						<img
							src={experience.image}
							alt={experience.title}
							class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						<div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
					</div>
					<div class="p-8 space-y-6">
						<div class="space-y-2">
							<div class="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wider">
								{experience.category}
							</div>
							<h3 class="text-2xl font-light text-black dark:text-white">
								{experience.title}
							</h3>
						</div>

						<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
							{experience.description}
						</p>

						<div class="space-y-3">
							<div class="text-sm font-medium text-black dark:text-white uppercase tracking-wider">
								Featured Services
							</div>
							<div class="grid grid-cols-2 gap-2">
								{#each experience.features as feature}
									<div class="text-sm text-gray-500 dark:text-gray-500 flex items-center">
										<div class="w-1 h-1 bg-black dark:bg-white rounded-full mr-3"></div>
										{feature}
									</div>
								{/each}
							</div>
						</div>

						<div class="pt-4">
							<Button
								size="sm"
								variant="outline"
								class="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-light tracking-wider transition-all duration-300"
							>
								PLAN EXPERIENCE
							</Button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-16 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-12 text-center space-y-8">
			<div class="space-y-4">
				<h3 class="text-3xl font-light text-black dark:text-white">
					Bespoke Experiences
				</h3>
				<p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
					Have something unique in mind? Our experience designers work with you to create completely customized luxury experiences that exceed your imagination.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button
					size="lg"
					class="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-0 px-8 py-3 text-base font-light tracking-wide transition-all duration-300"
				>
					DESIGN MY EXPERIENCE
				</Button>
				<Button
					size="lg"
					variant="outline"
					class="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-8 py-3 text-base font-light tracking-wide transition-all duration-300"
				>
					VIEW GALLERY
				</Button>
			</div>
		</div>
	</div>
</section>