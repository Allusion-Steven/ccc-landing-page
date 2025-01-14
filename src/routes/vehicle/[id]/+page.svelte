<script lang="ts">
	import type { PageData } from './$types';
	import { baseUrl } from '$lib/index';
	export let data: PageData;
	const { vehicle } = data;

	let selectedImageIndex = 0;
	console.log(baseUrl);
</script>

<div class="container mx-auto min-h-screen px-4 py-8">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Left side - Image Gallery -->
		<!-- TODO: Need to add a flowbite carousel here -->
		<div class="relative h-[600px] overflow-hidden rounded-xl bg-white/5">
			{#if vehicle.images && vehicle.images.length > 0}
				<img
					src={`${baseUrl}${vehicle.images[selectedImageIndex].src}`}
					alt={vehicle.images[selectedImageIndex].alt}
					class="h-full w-full object-cover"
				/>
				<!-- Thumbnail Navigation -->
				<div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
					{#each vehicle.images as _, index}
						<button
							class="h-2 w-16 rounded-full transition-all duration-300 {selectedImageIndex === index
								? 'bg-[#0bd3d3]'
								: 'bg-white/50'}"
							on:click={() => (selectedImageIndex = index)}
							aria-label={`View image ${index + 1}`}
						/>
					{/each}
				</div>
				<!-- New Thumbnail Section -->
			{:else}
				<div class="flex h-full items-center justify-center bg-gray-800">
					<span class="text-gray-400">No image available</span>
				</div>
			{/if}
		</div>

		<!-- Right side - Vehicle Information -->
		<div class="flex flex-col justify-between space-y-6">
			<div>
				<h1 class="text-4xl font-bold text-white">
					{vehicle.make}
					{vehicle.model}
				</h1>
				<div class="mt-4 flex items-center justify-between">
					<span class="text-xl text-gray-300">{vehicle.year}</span>
					<span class="text-3xl font-bold text-[#0bd3d3]">${vehicle.price}/day</span>
				</div>
			</div>

			<!-- Vehicle Features -->
			<div class="space-y-6">
				<h2 class="text-2xl font-semibold text-white">Features</h2>
				<div class="grid grid-cols-2 gap-4">
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Make</span>
						<p class="text-lg font-medium text-white">{vehicle.make}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Model</span>
						<p class="text-lg font-medium text-white">{vehicle.model}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Year</span>
						<p class="text-lg font-medium text-white">{vehicle.year}</p>
					</div>
					<div class="rounded-lg bg-white/5 p-4">
						<span class="text-sm text-gray-400">Daily Rate</span>
						<p class="text-lg font-medium text-[#0bd3d3]">${vehicle.price}</p>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col space-y-4">
				<button
					class="w-full rounded-lg bg-[#0bd3d3] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#0bd3d3]/80"
				>
					Book Now
				</button>
				<a
					href="/contact"
					class="w-full rounded-lg border border-[#0bd3d3] px-6 py-3 text-center font-semibold text-[#0bd3d3] transition-all duration-300 hover:bg-[#0bd3d3]/10"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>

	<!-- New Full Width Description Section -->
	<h2 class="mt-20 text-3xl font-bold uppercase text-white">Description</h2>

	<!-- TODO: Need to add a description section here from the vehicle object -->
	<div class="mt-8 rounded-lg bg-white/5 p-6 shadow-md">
		<p class="mt-2 text-lg text-gray-200">
			This is temporary text to serve as a "vehicle description" section.....<br /><br />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
			et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing
			elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
			dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
			sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</div>
</div>
