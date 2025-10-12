<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';
	import CountdownTimer from '$lib/components/CountdownTimer.svelte';
	import { Calendar, MapPin, Car, Users } from 'lucide-svelte';
	import rallyImage from '$lib/assets/images/macro-20205-rally.png';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<section
	class="relative overflow-hidden {$theme === 'dark'
		? 'bg-primary-dark'
		: 'bg-gradient-to-b from-white to-gray-50'} py-16 md:py-24 border-b {$theme === 'dark' ? 'border-white/10' : 'border-gray-200'}">


	<div class="container relative mx-auto px-6">
		{#if visible}
			<div class="mx-auto max-w-6xl">
				<!-- Header -->
				<div class="mb-8 text-center" in:fade={{ duration: 600, delay: 200 }}>
					<h2
						class="mb-4 text-4xl font-bold {$theme === 'dark'
							? 'text-white'
							: 'text-gray-900'} md:text-5xl lg:text-6xl">
						Macro Tristate Annual Rally 2025
					</h2>
					<p
						class="mx-auto max-w-3xl text-lg {$theme === 'dark'
							? 'text-gray-300'
							: 'text-gray-600'} md:text-xl">
						Join us for an exclusive luxury automotive experience in the heart of New York City
					</p>
				</div>

				<!-- Countdown Timer - Full Width -->
				<div class="mb-12" in:fade={{ duration: 600, delay: 400 }}>
					<div
						class="mx-auto max-w-4xl rounded-lg {$theme === 'dark'
							? 'bg-white/5 border-white/10'
							: 'bg-white border-gray-200'} border p-8 shadow-lg">
						<h3
							class="mb-6 text-center text-2xl font-semibold {$theme === 'dark'
								? 'text-white'
								: 'text-gray-900'}">
							Event Starts In
						</h3>
						<CountdownTimer
							targetDate="2025-11-21T00:00:00"
							className={$theme === 'dark' ? 'text-white' : 'text-gray-900'} />
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
					<!-- Left side - Image -->
					<div class="space-y-6" in:fly={{ x: -30, duration: 600, delay: 600 }}>
						<!-- Rally Image -->
						<div class="overflow-hidden rounded-lg shadow-2xl">
							<img
								src={rallyImage}
								alt="Macro Annual Rally"
								class="h-full w-full object-cover transition-transform duration-500" />
						</div>
					</div>

					<!-- Right side - Event details -->
					<div class="space-y-6" in:fly={{ x: 30, duration: 600, delay: 800 }}>
						<!-- Event Details -->
						<div
							class="rounded-lg {$theme === 'dark'
								? 'bg-white/5 border-white/10'
								: 'bg-white border-gray-200'} border p-6 shadow-lg">
							<h3
								class="mb-6 text-2xl font-bold {$theme === 'dark'
									? 'text-white'
									: 'text-gray-900'}">
								Event Details
							</h3>

							<div class="space-y-4">
								<!-- Date -->
								<div class="flex items-start gap-4">
									<div
										class="rounded-lg {$theme === 'dark'
											? 'bg-primary-light/20'
											: 'bg-primary-accent/10'} p-3">
										<Calendar
											class="h-6 w-6 {$theme === 'dark'
												? 'text-primary-light'
												: 'text-primary-accent'}" />
									</div>
									<div>
										<h4
											class="mb-1 font-semibold {$theme === 'dark'
												? 'text-white'
												: 'text-gray-900'}">
											Date
										</h4>
										<p class={$theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
											November 21, 2025
										</p>
									</div>
								</div>

								<!-- Location -->
								<div class="flex items-start gap-4">
									<div
										class="rounded-lg {$theme === 'dark'
											? 'bg-primary-light/20'
											: 'bg-primary-accent/10'} p-3">
										<MapPin
											class="h-6 w-6 {$theme === 'dark'
												? 'text-primary-light'
												: 'text-primary-accent'}" />
									</div>
									<div>
										<h4
											class="mb-1 font-semibold {$theme === 'dark'
												? 'text-white'
												: 'text-gray-900'}">
											Location
										</h4>
										<p class={$theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
											New York City - Atlantic City
										</p>
									</div>
								</div>

								<!-- Experience -->
								<div class="flex items-start gap-4">
									<div
										class="rounded-lg {$theme === 'dark'
											? 'bg-primary-light/20'
											: 'bg-primary-accent/10'} p-3">
										<Car
											class="h-6 w-6 {$theme === 'dark'
												? 'text-primary-light'
												: 'text-primary-accent'}" />
									</div>
									<div>
										<h4
											class="mb-1 font-semibold {$theme === 'dark'
												? 'text-white'
												: 'text-gray-900'}">
											Experience
										</h4>
										<p class={$theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
											Full day rally with exclusive after party, hotel accommodations, and fine
											dining
										</p>
									</div>
								</div>

								<!-- Participants -->
								<div class="flex items-start gap-4">
									<div
										class="rounded-lg {$theme === 'dark'
											? 'bg-primary-light/20'
											: 'bg-primary-accent/10'} p-3">
										<Users
											class="h-6 w-6 {$theme === 'dark'
												? 'text-primary-light'
												: 'text-primary-accent'}" />
									</div>
									<div>
										<h4
											class="mb-1 font-semibold {$theme === 'dark'
												? 'text-white'
												: 'text-gray-900'}">
											Ticket Options
										</h4>
										<p class={$theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
											Rally Participant ($1,500) and Secondary Rider ($1,000) tickets available
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- CTA Buttons -->
						<div class="flex flex-col gap-4 sm:flex-row">
							<a
								href="/rally-2025"
								class="flex-1 rounded-lg {$theme === 'dark'
									? 'border-white/20 hover:bg-white/5 border'
									: 'bg-primary-accent hover:bg-primary-accent/90'} px-6 py-4 text-center text-lg font-semibold text-white transition-all duration-300 hover:shadow-lg">
								Buy Tickets
							</a>
							<a
								href="/rally-2025"
								class="flex-1 rounded-lg {$theme === 'dark'
									? 'border-white/20 hover:bg-white/5'
									: 'border-gray-300 hover:bg-gray-50'} border px-6 py-4 text-center text-lg font-semibold {$theme ===
								'dark'
									? 'text-white'
									: 'text-gray-900'} transition-all duration-300">
								Learn More
							</a>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
