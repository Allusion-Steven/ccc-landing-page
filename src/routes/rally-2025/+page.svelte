<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import nycSkyline from '$lib/assets/images/nyc-skyline.webp';
	import carImage1 from '$lib/assets/images/lamborghinis-nyc.png';
	import carImage2 from '$lib/assets/images/macro-20205-rally.png';
	import { Car, Clock, Users, MapPin, Utensils, Hotel } from '@lucide/svelte';
	import ogImage from '$lib/assets/images/macro-nyc-skyline.png';
	import Contact from '$lib/assets/components/Contact/Contact.svelte';
	import CountdownTimer from '$lib/components/CountdownTimer.svelte';

	let contentVisible = $state(false);
	let ticketsVisible = $state(false);

	onMount(() => {
		contentVisible = true;
		setTimeout(() => {
			ticketsVisible = true;
		}, 300);
	});

	function scrollToTickets() {
		const ticketsSection = document.getElementById('tickets-section');
		if (ticketsSection) {
			ticketsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	const tickets = [
		{
			id: 1,

			title: 'Rally Participant',
			image: carImage2,
			price: '$1,500',
			features: [
				{ icon: Car, text: 'Driver Entry Pass & Parking' },
				{ icon: Clock, text: 'Full Day Acces & After Party' },
				{ icon: Hotel, text: 'Hotel Accomodations Included' },
				{ icon: Utensils, text: 'Dinner Included' }
			]
		},
		{
			id: 2,
			title: 'Secondary Rider',
			image: carImage1,
			price: '$1,000',
			features: [
				{ icon: Car, text: 'Premium Entry Pass' },
				{ icon: Clock, text: 'Early Access & After Party' },
				{ icon: Users, text: 'Co-driver (No parking included)' }
			]
		}
	];
</script>

<svelte:head>
	<title>Macro Annual Rally 2025 - New York City</title>
	<meta
		name="description"
		content="Join us for the Macro Annual Rally 2025 in New York City on November 1st. Experience luxury exotic cars, exclusive after party, hotel accommodations, and fine dining." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Macro Annual Rally 2025 - New York City" />
	<meta
		property="og:description"
		content="Join us for the Macro Annual Rally 2025 in New York City on November 1st. Experience luxury exotic cars, exclusive after party, hotel accommodations, and fine dining." />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Macro Annual Rally 2025 - New York City" />
	<meta
		name="twitter:description"
		content="Join us for the Macro Annual Rally 2025 in New York City on November 1st. Experience luxury exotic cars, exclusive after party, hotel accommodations, and fine dining." />
	<meta name="twitter:image" content={ogImage} />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<script async src="https://js.stripe.com/v3/buy-button.js">
	</script>

	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap"
		rel="stylesheet" />
</svelte:head>

<!-- Hero Section -->
<div class="relative min-h-[60vh] w-full overflow-hidden bg-[#e8e4dc]">
	<!-- Background Image -->
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image: url('{nycSkyline}');">
	</div>

	<!-- Subtle overlay for better text readability -->
	<div class="absolute inset-0 bg-[#4c4c4c]/50"></div>

	{#if contentVisible}
		<!-- Hero Content -->
		<div
			class="relative z-10 flex h-full min-h-[60vh] flex-col items-center justify-start px-4 sm:px-6 sm:pt-10 lg:px-8 max500:justify-center">
			<!-- Date -->
			<div in:fade={{ duration: 800, delay: 200 }} class="mb-8 text-center">
				<p class="date-text text-2xl tracking-[0.3em] text-white md:!text-3xl">
					11-21-2025
				</p>
			</div>

			<!-- Main Title -->
			<div in:fly={{ y: 30, duration: 800, delay: 400 }} class="mb-4 text-center">
				<h1
					class="hero-title text-5xl font-light leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
					Macro Annual Rally
				</h1>
			</div>

			<!-- Subtitle -->
			<div in:fly={{ y: 30, duration: 800, delay: 600 }} class="mb-12 text-center">
				<p
					class="hero-subtitle text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
					New York City
				</p>
			</div>

			<!-- CTA Button -->
			<div in:fade={{ duration: 800, delay: 800 }} class="text-center">
				<button
					onclick={scrollToTickets}
					class="group relative overflow-hidden rounded-sm border border-gray-400/50 bg-transparent bg-white px-12 py-3 text-sm tracking-[0.2em] text-gray-700 transition-all duration-300 hover:border-gray-600 hover:bg-white/30 hover:text-gray-900 sm:px-16 sm:py-4">
					<span class="relative z-10">BUY TICKETS</span>
					<div
						class="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
					</div>
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- Countdown Section -->
<section class="border-b border-gray-300/30 bg-[#e8e4dc] px-4 pt-10 sm:px-6 sm:py-12 lg:px-8">
	<div class="mx-auto max-w-4xl text-center">
		{#if contentVisible}
			<div in:fly={{ y: 20, duration: 600, delay: 300 }}>
				<h2
					class="section-title mb-6 text-3xl font-light tracking-tight text-gray-900 sm:mb-10 sm:text-5xl">
					Event Starts In
				</h2>
				<CountdownTimer targetDate="2025-11-21T00:00:00" className="text-gray-900" />
			</div>
		{/if}
	</div>
</section>

<!-- Tickets Section -->
<section id="tickets-section" class="bg-[#e8e4dc] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Section Header -->
		<div class="mb-6 text-center sm:mb-16">
			<h2
				class="section-title mb-4 text-4xl font-light text-gray-900 sm:text-5xl md:text-6xl">
				Ticket Options
			</h2>
			<p class="section-subtitle text-lg text-gray-700 sm:text-xl">
				Choose your rally experience
			</p>
		</div>

		{#if ticketsVisible}
			<!-- Tickets Grid -->
			<div class="grid gap-8 md:grid-cols-2">
				{#each tickets as ticket, i}
					<div
						in:fly={{ y: 30, duration: 600, delay: 200 + i * 150 }}
						class="ticket-card group relative overflow-hidden rounded-sm border border-gray-300/50 bg-white/40 backdrop-blur-sm transition-all duration-300  hover:shadow-2xl">
						<!-- Car Image -->
						<div class="aspect-video w-full overflow-hidden">
							<img
								src={ticket.image}
								alt={ticket.title}
								class="h-full w-full object-cover transition-transform duration-500" />
						</div>

						<!-- Card Content -->
						<div class="p-8">
							<!-- Title and Price -->
							<div class="mb-6 flex items-start justify-between">
								<h3 class="ticket-title text-3xl font-light text-gray-900">
									{ticket.title}
								</h3>
								<div class="text-right">
									<p class="ticket-price text-4xl font-light text-gray-900">
										{ticket.price}
									</p>
									<p class="text-sm text-gray-600">per entry</p>
								</div>
							</div>

							<!-- Features -->
							<ul class="mb-8 space-y-4">
								{#each ticket.features as feature}
									<li class="flex items-center gap-3 text-gray-700">
										<feature.icon class="h-5 w-5 flex-shrink-0 text-gray-600" />
										<span class="feature-text text-base">{feature.text}</span>
									</li>
								{/each}
								{#if i > 0}
									<li>
										<span class="mt-4 gap-3 text-xs text-gray-600"
											><!-- <span class="text-red-500">***</span> -->** This
											ticket must be purchased with a Rally Participant ticket
											**</span>
									</li>
								{/if}
							</ul>

							<!-- Purchase Button -->
							<stripe-buy-button
								buy-button-id="buy_btn_1SGjaWG7g2texiO0NsUHXNiE"
								publishable-key="pk_live_51QjmHXG7g2texiO0K3rrwr4XKIYt8VLZiQZAox29UajhbEzRRIXtpbZ3bs0GaurK1Qk8vfXJarenmJKmR2FHMzg000er6WUAx9">
								SELECT TICKET
							</stripe-buy-button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<!-- Rally Contact Section -->
<section>
	<Contact
		showHeader={true}
		showSalesSupport={false}
		showMemberSupport={false}
		customHeader="Questions About the Rally?"
		customSubheader="Have questions about tickets, accommodations, or the event? Fill out the form below and our team will get back to you within 24 hours." />
</section>

<style>
	.hero-title,
	.hero-subtitle,
	.date-text,
	.section-title,
	.section-subtitle,
	.ticket-title,
	.ticket-price,
	h2 {
		font-family: 'Cormorant Garamond', serif;
	}

	.hero-title {
		font-weight: 400;
		letter-spacing: 0.02em;
		text-shadow: 2px 2px 14px black;
	}

	.hero-subtitle {
		font-weight: 300;
		text-shadow: 6px 6px 8px black;
	}

	.date-text {
		font-weight: 400;
		text-transform: uppercase;
		text-shadow: 2px 2px 4px black;
	}

	.section-title {
		font-weight: 400;
		letter-spacing: 0.01em;
	}

	.section-subtitle {
		font-weight: 300;
	}

	.ticket-title {
		font-weight: 400;
	}

	.ticket-price {
		font-weight: 300;
	}

	.feature-text {
		font-weight: 300;
	}

	.ticket-card {
		transition: transform 0.3s ease;
	}

	/*     .ticket-card:hover {
        transform: translateY(-4px);
    } */

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.hero-title {
			font-size: 3rem;
			line-height: 1.1;
		}

		.hero-subtitle {
			font-size: 2rem;
		}

		.section-title {
			font-size: 2.5rem;
		}

		.ticket-title {
			font-size: 1.75rem;
		}

		.ticket-price {
			font-size: 2rem;
		}
	}

	@media (max-width: 480px) {
		/* 		.hero-title {
			font-size: 2.5rem;
		} */

		.hero-subtitle {
			font-size: 1.75rem;
		}

		.section-title {
			font-size: 2rem;
		}
	}

</style>
