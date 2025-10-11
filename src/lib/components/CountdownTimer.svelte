<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	// Props for customization
	let {
		targetDate = '2025-11-21T00:00:00',
		className = ''
	} = $props();

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let interval: ReturnType<typeof setInterval>;

	function calculateTimeLeft() {
		const target = new Date(targetDate).getTime();
		const now = new Date().getTime();
		const difference = target - now;

		if (difference > 0) {
			days = Math.floor(difference / (1000 * 60 * 60 * 24));
			hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			seconds = Math.floor((difference % (1000 * 60)) / 1000);
		} else {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		}
	}

	onMount(() => {
		calculateTimeLeft();
		interval = setInterval(calculateTimeLeft, 1000);
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});

	function formatNumber(num: number): string {
		return num.toString().padStart(2, '0');
	}
</script>

<div class="countdown-container {className}" in:fade={{ duration: 600 }}>
	<div class="countdown-grid">
		<div class="countdown-item">
			<div class="countdown-number">{formatNumber(days)}</div>
			<div class="countdown-label">Days</div>
		</div>
		<div class="countdown-separator">:</div>
		<div class="countdown-item">
			<div class="countdown-number">{formatNumber(hours)}</div>
			<div class="countdown-label">Hours</div>
		</div>
		<div class="countdown-separator">:</div>
		<div class="countdown-item">
			<div class="countdown-number">{formatNumber(minutes)}</div>
			<div class="countdown-label">Minutes</div>
		</div>
		<div class="countdown-separator">:</div>
		<div class="countdown-item">
			<div class="countdown-number">{formatNumber(seconds)}</div>
			<div class="countdown-label">Seconds</div>
		</div>
	</div>
</div>

<style>
	.countdown-container {
		font-family: 'Cormorant Garamond', serif;
	}

	.countdown-grid {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.countdown-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.countdown-number {
		font-size: 3rem;
		font-weight: 300;
		line-height: 1;
		letter-spacing: 0.02em;
	}

	.countdown-label {
		font-size: 0.875rem;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		opacity: 0.8;
	}

	.countdown-separator {
		font-size: 2.5rem;
		font-weight: 300;
		opacity: 0.5;
		margin: 0 0.25rem;
	}

	@media (max-width: 640px) {
		.countdown-number {
			font-size: 2rem;
		}

		.countdown-label {
			font-size: 0.75rem;
		}

		.countdown-separator {
			font-size: 1.75rem;
		}

		.countdown-grid {
			gap: 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.countdown-number {
			font-size: 1.5rem;
		}

		.countdown-label {
			font-size: 0.625rem;
		}

		.countdown-separator {
			font-size: 1.25rem;
			margin: 0 0.125rem;
		}
	}
</style>

