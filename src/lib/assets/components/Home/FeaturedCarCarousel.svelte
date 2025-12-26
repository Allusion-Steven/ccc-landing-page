<script lang="ts">
	import { onMount } from 'svelte';
	import type { Vehicle } from '$lib/types';
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';

	interface Props {
		items: Vehicle[];
	}

	let { items = [] }: Props = $props();

	let currentIndex = $state(-1);

	function setActiveSlide(index: number) {
		if (currentIndex === index) {
			currentIndex = -1;
		} else {
			currentIndex = index;
		}
	}

	function handleSlideClick(vehicle: Vehicle, index: number, event: MouseEvent) {
		// If clicking the active slide and not the button, navigate to vehicle page
		if (currentIndex === index) {
			const target = event.target as HTMLElement;
			// Check if clicked element is not the add-button or its children
			if (!target.closest('.add-button')) {
				window.location.href = buildItemLink(vehicle);
			}
		} else {
			setActiveSlide(index);
		}
	}

	function nextSlide() {
		const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
		setActiveSlide(nextIndex);
	}

	function previousSlide() {
		const prevIndex =
			currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
		setActiveSlide(prevIndex);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') previousSlide();
		if (e.key === 'ArrowRight') nextSlide();
	}

	onMount(() => {
		const cleanup = () => {
			document.removeEventListener('keydown', handleKeydown);
		};

		document.addEventListener('keydown', handleKeydown);

		return cleanup;
	});

	// Function to build the vehicle link with all required parameters
	function buildItemLink(item: Vehicle): string {
		const baseLink = `/vehicle/${item.id}`;

		// Get current URL parameters
		const currentUrl = $page.url;
		const pickupDate = currentUrl.searchParams.get('pickupDate') || '';
		const dropoffDate = currentUrl.searchParams.get('dropoffDate') || '';
		const location = currentUrl.searchParams.get('location') || '';

		// Build query parameters
		const params = new URLSearchParams();

		// Always add userId if available
		params.set('userId', item.userId);

		// Add vehicleType
		params.set('vehicleType', 'car');

		// Add optional parameters only if they exist
		params.set('pickupDate', pickupDate);
		params.set('dropoffDate', dropoffDate);
		params.set('location', location);

		const queryString = params.toString();
		return queryString ? `${baseLink}?${queryString}` : baseLink;
	}

	function getPrimaryImage(vehicle: Vehicle): string {
		// Try to find primary image
		const primaryImage = vehicle.images?.find((img) => img.isPrimary);
		if (primaryImage?.url) {
			return primaryImage.urls?.large || primaryImage.url;
		}

		// Fall back to first image
		const firstImage = vehicle.images?.[0];
		if (firstImage?.url) {
			return firstImage.urls?.large || firstImage.url;
		}

		// Return placeholder if no images
		return 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop';
	}
</script>

<div class="featured-carousel-wrapper">
	{#if items && items.length > 0}
		<div class="slider-container">
			<div class="now-showing">Now Available</div>

			<div class="accordion-slider">
				{#each items.slice(0, 4) as vehicle, index (vehicle.id)}
					<button
						class="slide {currentIndex === index ? 'active' : ''}"
						style="background-image: url('{getPrimaryImage(vehicle)}')"
						onclick={(e) => handleSlideClick(vehicle, index, e)}
						aria-label="View {vehicle.make} {vehicle.model}">
					<div class="slide-content">
						<div class="slide-number">{String(index + 1).padStart(2, '0')}</div>
						<div class="car-brand">{vehicle.make}</div>
						<div class="car-name">{vehicle.make} {vehicle.model}</div>
						<div class="car-subtitle">{vehicle.year} Model</div>
						<div class="car-specs">
							<div class="spec-row">
								<span class="spec-label">Year:</span>
								<span class="spec-value">{vehicle.year}</span>

							</div>
							<div class="spec-row">
								<span class="spec-label">Daily Rate:</span>
								<span class="spec-value">${vehicle.pricePerDay.toLocaleString()}</span>
							</div>
							{#if vehicle.tags && vehicle.tags.length > 0}
								<div class="spec-row">
									<span class="spec-label">Type:</span>
									<span class="spec-value uppercase">{vehicle.tags[0]}</span>
								</div>
							{/if}
							{#if vehicle.pickupLocation}
								<div class="spec-row">
									<span class="spec-label">Location:</span>
									<span class="spec-value capitalize">{vehicle.pickupLocation?.city}, {vehicle?.pickupLocation?.state}</span>
								</div>
							{/if}
						</div>

						<div class="performance-badges">
							{#if vehicle.tags && vehicle.tags.length > 0}
								{#each vehicle.tags.slice(0, 3) as tag}
									<div class="badge">
										<div class="badge-icon"></div>
										<span class="uppercase">{tag}</span>
									</div>
								{/each}
							{/if}
						</div>
					</div>
					<div class="go-to-vehicle-wrapper">
						<div
							class="add-button"
							role="link"
							tabindex="0"
							aria-label="View details"
							onclick={(e) => {
								e.stopPropagation();
								window.location.href = buildItemLink(vehicle);
							}}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.stopPropagation();
									e.preventDefault();
									window.location.href = buildItemLink(vehicle);
								}
							}}></div>
					</div>
					</button>
				{/each}
			</div>

			<button
				class="navigation-arrows nav-prev"
				onclick={previousSlide}
				aria-label="Previous slide">‹</button>
			<button class="navigation-arrows nav-next" onclick={nextSlide} aria-label="Next slide"
				>›</button>
		</div>
	{:else}
		<div class="empty-state { $theme === 'dark' ? 'text-white' : 'text-black' }" >
			<p>No featured vehicles available</p>
		</div>
	{/if}
</div>

<style>
	.featured-carousel-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
		background: #f0f2f5;
	}

	:global(.dark) .featured-carousel-wrapper {
		background: #1c1c1c;
	}

	.slider-container {
		width: 100%;
		max-width: 1600px;
		height: 600px;
		position: relative;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}

	.now-showing {
		position: absolute;
		top: 20px;
		left: 20px;
		color: #9fff6b;
		font-size: 14px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 8px;
		z-index: 10;
	}

	.now-showing::before {
		content: '';
		width: 6px;
		height: 6px;
		background: #9fff6b;
		border-radius: 50%;
	}

	.accordion-slider {
		display: flex;
		height: 100%;
		position: relative;
	}

	.slide {
		flex: 1;
		position: relative;
		cursor: pointer;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
		filter: grayscale(1);
		border: none;
		padding: 0;
	}

	.slide:hover {
		filter: grayscale(0);
	}

	.slide.active {
		flex: 2.5;
		
		filter: grayscale(0);
	}

	.slide::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 80%);
	}

	.slide-content {
		position: absolute;
		bottom: 30px;
		left: 30px;
		right: 30px;
		color: white;
		z-index: 2;
	}

	.slide.active .slide-content {
		bottom: 4%;
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
	}

	.slide.active .slide-number {
		text-align: center;
		width: 100%
	}
	.slide-number {
		font-size: 64px;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1;
		position: absolute;
		bottom: 30px;
		left: 30px;
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.slide.active .slide-number {
		bottom: auto;
		top: -50px;
		font-size: 48px;
		left: 0;
	}

	.car-brand {
		font-size: 16px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 5px;
		transform: rotate(-90deg);
		transform-origin: left bottom;
		position: absolute;
		bottom: 100px;
		left: 30px;
		white-space: nowrap;
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.slide.active .car-brand {
		transform: rotate(0deg);
		position: static;
		transform-origin: unset;
	}

	.car-name {
		font-size: 28px;
		font-weight: 700;
		margin-bottom: 8px;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 0s;
	}

	.slide.active .car-name {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.3s;
	}

	.car-subtitle {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 10px;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 0s;
	}

	.slide.active .car-subtitle {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.4s;
	}

	.car-specs {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 0s;
	}

	.slide.active .car-specs {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.5s;
	}

	.spec-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 6px;
		font-size: 14px;
		opacity: 0;
		transform: translateX(-20px);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.slide.active .spec-row {
		opacity: 1;
		transform: translateX(0);
	}

	.slide.active .spec-row:nth-child(1) {
		transition-delay: 0.6s;
	}
	.slide.active .spec-row:nth-child(2) {
		transition-delay: 0.65s;
	}
	.slide.active .spec-row:nth-child(3) {
		transition-delay: 0.7s;
	}
	.slide.active .spec-row:nth-child(4) {
		transition-delay: 0.75s;
	}

	.spec-label {
		color: rgba(255, 255, 255, 0.7);
	}

	.spec-value {
		color: white;
		font-weight: 600;
	}

	.performance-badges {
		display: flex;
		gap: 12px;
		margin-top: 15px;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		transition-delay: 0s;
		flex-wrap: wrap;
	}

	.slide.active .performance-badges {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.8s;
	}

	.badge {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 8px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		font-size: 12px;
		font-weight: 500;
		opacity: 0;
		transform: scale(0.8);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.slide.active .badge {
		opacity: 1;
		transform: scale(1);
	}

	.slide.active .badge:nth-child(1) {
		transition-delay: 0.85s;
	}
	.slide.active .badge:nth-child(2) {
		transition-delay: 0.9s;
	}
	.slide.active .badge:nth-child(3) {
		transition-delay: 0.95s;
	}

	.badge-icon {
		width: 8px;
		height: 8px;
		background: #9fff6b;
		border-radius: 50%;
	}

	.go-to-vehicle-wrapper {
		position: absolute;
		bottom: 20px;
		right: 20px;
		z-index: 3;
	}

	.add-button {
		width: 32px;
		height: 32px;
		background: transparent;
		border: 2px solid #9fff6b;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.4s ease;
		position: relative;
	}

	.add-button::before,
	.add-button::after {
		content: '';
		position: absolute;
		background: #9fff6b;
		transition: all 0.4s ease;
	}

	.add-button::before {
		width: 12px;
		height: 2px;
	}

	.add-button::after {
		width: 2px;
		height: 12px;
		transform: rotate(0deg);
	}

	.slide.active .add-button::before {
		transform: rotate(0deg);
	}

	.slide.active .add-button::after {
		opacity: 0;
		transform: scale(0);
	}

	.navigation-arrows {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 50%;
		color: white;
		cursor: pointer;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		z-index: 4;
		backdrop-filter: blur(10px);
	}

	.nav-prev {
		left: 20px;
	}

	.nav-next {
		right: 20px;
	}

	.navigation-arrows:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.empty-state {
		padding: 4rem 2rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
	}

	@media (max-width: 768px) {
		.slider-container {
			height: 700px;
		}

		.accordion-slider {
			flex-direction: column;
		}

		.slide {
			flex: 1;
			min-height: 120px;
		}

		.slide.active {
			flex: 2;
		}

		.slide-number {
			font-size: 32px;
		}

		.car-brand {
			transform: none;
			position: static;
		}

		.car-name {
			font-size: 20px;
		}

		.car-subtitle {
			font-size: 14px;
		}

		.spec-row {
			font-size: 12px;
		}

		.navigation-arrows {
			width: 40px;
			height: 40px;
			font-size: 16px;
		}

		.nav-prev {
			left: 10px;
		}

		.nav-next {
			right: 10px;
		}
	}
</style>
