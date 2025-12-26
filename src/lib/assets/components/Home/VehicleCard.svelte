<script lang="ts">
	import { onMount } from 'svelte';
	import type { Vehicle, Yacht } from '$lib/types';
	import { theme } from '$lib/stores/theme';

	interface Props {
		item: Vehicle | Yacht;
		itemType?: 'car' | 'yacht';
	}

	let { item, itemType = 'car' }: Props = $props();

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	function isYacht(item: Vehicle | Yacht): item is Yacht {
		return (item as any).vehicleType === 'yacht';
	}

	function getVehicleImage() {
		if (item.images && item.images.length > 0) {
			return item.images[0]?.urls?.large || item.images[0]?.url || '';
		}
		return '';
	}

	function getLocation() {
		if (item.pickupLocation?.city && item.pickupLocation?.state) {
			return {
				city: item.pickupLocation.city.toUpperCase(),
				state: item.pickupLocation.state
			};
		}
		if (item.location) {
			return {
				city: item.location.toUpperCase(),
				state: 'FL'
			};
		}
		return {
			city: 'MIAMI',
			state: 'Florida'
		};
	}

	function getAvailabilityStatus() {
		return item.isAvailable !== false ? 'Available' : 'Rented';
	}

	function getVehicleTags() {
		return item.tags || [];
	}
</script>

<div class="card-container" class:dark={$theme === 'dark'}>
	<!-- Status info -->
	<small class="status-label">
		<span class="icon">🚗</span>
		<span class="text">Tap for details</span>
	</small>

	<div class="card-wrap">
<!-- 		{#if getVehicleImage()}
			<img src={getVehicleImage()} alt="{item.make} {item.model}" class="thumbnail" />
		{/if} -->

		<div class="card">
			<div class="card-content">
				<div class="border"></div>
				<div class="blob"></div>

				<!-- Header -->
				<div class="top">
					<div class="logo-wrap">
						<div class="brand-logo">{item.make} {item?.model}</div>
					</div>

					<div class="right">
						<div class="status-badge" class:rented={!item.isAvailable}>
							<span class="check">{item.isAvailable !== false ? '✓' : '✗'}</span>
							<div class="text">{getAvailabilityStatus()}</div>
						</div>
						<div class="vehicle-id">
							<div class="num">{item.id?.slice(0, 6)}</div>
						</div>
					</div>
				</div>

				<!-- Main content -->
				<div class="mid">
					<!-- Vehicle/Yacht info -->
					<div class="loc">
						<div class="box location-box">
							<div class="label">
								<span class="sign">📍</span>Location
							</div>
							<div class="line">
								<div class="code">{getLocation().city}</div>
							</div>
							<div class="country">{getLocation().state}</div>
						</div>

						<!-- <div class="dur">
							<div class="duration">
								<svg width="100" viewBox="-40 -10 700 200" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M4 143C100.5 38.3333 356.3 -108.2 607.5 143"
										class="path-white"
										stroke="white"
										stroke-width="10"
										stroke-linecap="round"
										stroke-linejoin="bevel"
										stroke-dasharray="25 25" />
									<path
										class="path-gradient"
										d="M4 143C101 38.5 321.5 -78.4999 543 87"
										stroke="url(#gradient)"
										stroke-width="20"
										stroke-miterlimit="16"
										stroke-linecap="round" />
									<defs>
										<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" style="stop-color:#f890e7;stop-opacity:1" />
											<stop offset="100%" style="stop-color:#08D3D3;stop-opacity:1" />
										</linearGradient>
									</defs>
								</svg>
							</div>
							<div class="meta">
								<div class="time">{isYacht(item) ? '4-8 hours' : 'Daily Rental'}</div>
							</div>
						</div> -->

<!-- 						<div class="box rental-box">
							<div class="label">
								<span class="sign">⏱️</span>Duration
							</div>
							<div class="line">
								<div class="code">{isYacht(item) ? '4H+' : '1D+'}</div>
							</div>
							<div class="country">{isYacht(item) ? 'Hourly' : 'Daily'}</div>
						</div> -->
					</div>

					<!-- Stats -->
					<div class="stat">
						<div class="times">
							{#if isYacht(item)}
								<div class="speed-stat">
									<div>
										<span class="speed-label">
											<span class="icon">📏</span>
											Length
										</span>
									</div>
									<div class="speed-box">
										<span class="speed-value">{item.specs?.length || 'N/A'}</span>
										<span class="speed-unit">FT</span>
									</div>
								</div>

								<div class="speed-stat">
									<div>
										<span class="speed-label">
											<span class="icon">👥</span>
											Guests
										</span>
									</div>
									<div class="speed-box">
										<span class="speed-value">{item.specs?.guests || 0}</span>
										<span class="speed-unit">MAX</span>
									</div>
								</div>

								<div class="speed-stat">
									<div>
										<span class="speed-label">
											<span class="icon">🛏️</span>
											Cabins
										</span>
									</div>
									<div class="speed-box">
										<span class="speed-value">{item.specs?.cabins || 0}</span>
										<span class="speed-unit"></span>
									</div>
								</div>
							{:else}
								<div class="speed-stat">
									<div>
										<span class="speed-label">
											<span class="icon">📅</span>
											Year
										</span>
									</div>
									<div class="speed-box">
										<span class="speed-value text-white">{item.year}</span>
										<span class="speed-unit"></span>
									</div>
								</div>

<!-- 								<div class="speed-stat">
									<div>
										<span class="speed-label">
											<span class="icon">💰</span>
											Price
										</span>
									</div>
									<div class="speed-box">
										<span class="speed-value">${new Intl.NumberFormat('en-US').format(item.pricePerDay)}</span>
										<span class="speed-unit">/DAY</span>
									</div>
								</div> -->

<!-- 								<div class="speed-stat">
									<div>
										<span class="speed-label">
											<span class="icon">🏷️</span>
											Type
										</span>
									</div>
									<div class="speed-box">
										<span class="speed-value-small">{item.tags?.[0] || 'Luxury'}</span>
									</div>
								</div> -->
							{/if}
						</div>
					</div>

					<!-- Vehicle image section -->
					<div class="vehicle-display">
						{#if getVehicleImage()}
							<img
								src={getVehicleImage()}
								alt="{item.make} {item.model}"
								class="vehicle-img" />
						{/if}
<!-- 						<div class="vehicle-info">
							<div class="vehicle-label">
								<span class="icon">{isYacht(item) ? '⛵' : '🚗'}</span>
								{isYacht(item) ? 'Yacht' : 'Vehicle'}
							</div>

						</div> -->
					</div>

					<!-- Footer info -->
					<div class="foot">
						<div class="item">
							<div class="wrap">
								<span class="data">
									<span class="icon">💰</span>Price
								</span>
								<span class="val">
									{#if isYacht(item) && item.yachtPricing}
										${new Intl.NumberFormat('en-US').format(item.yachtPricing.fourHours)}/4h
									{:else}
										${new Intl.NumberFormat('en-US').format(item.pricePerDay)}/day
									{/if}
								</span>
							</div>
						</div>

						{#if isYacht(item)}
							<div class="item">
								<div class="wrap">
									<span class="data">
										<span class="icon">⚓</span>Crew
									</span>
									<span class="val">{item.specs?.crew || 0}</span>
								</div>
							</div>
						{:else}
							<div class="item">
								<div class="wrap">
									<span class="data">
										<span class="icon">📅</span>Model
									</span>
									<span class="val">{item.year}</span>
								</div>
							</div>
						{/if}

						<div class="item">
							<div class="wrap">
								<span class="data">
									<span class="icon">✨</span>Status
								</span>
								<span class="val">{item.isActive ? 'Active' : 'Inactive'}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Features -->
				<div class="features">
					{#each getVehicleTags() as tag}
						<div class="feature">
							<span class="feature-icon">✓</span>
							{tag}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 0;
		height: 100%;
	}

	.status-label {
		font-size: 0.65rem;
		margin-bottom: 1rem;
		font-weight: 200;
		letter-spacing: 0.05rem;
		text-transform: uppercase;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.75;
	}

	.status-label .icon {
		margin-right: 0.5rem;
		font-size: 0.8rem;
	}

	.card-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2rem;
		position: relative;
	}

	.thumbnail {
		position: absolute;
		top: -2rem;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 18rem;
		z-index: 99;
		pointer-events: none;
		border-radius: 1rem;
		opacity: 0.2;
		filter: blur(0.5rem);
	}

	.card {
		background: rgba(255, 255, 255, 0.025);
		backdrop-filter: blur(2rem);
		border-radius: 2rem;
		padding: 1.5rem;
		width: 100%;
		max-width: 22rem;
		min-height: 32rem;
		position: relative;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 2rem rgba(255, 255, 255, 0.1);
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.card:hover {
		transform: scale(1.02);
		box-shadow: 0 0 3rem rgba(255, 255, 255, 0.2);
	}

	.dark .card {
		background: rgba(0, 0, 0, 0.7);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.blob {
		height: 10rem;
		width: 10rem;
		background: linear-gradient(135deg, #fff 0%, #08d3d3 100%);
		position: absolute;
		top: 0;
		right: 0;
		filter: blur(3rem);
		border-radius: 40%;
		z-index: -1;
		pointer-events: none;
		opacity: 0.3;
	}

	.border {
		position: absolute;
		top: 0;
		left: 10%;
		height: 2px;
		width: 80%;
		background: linear-gradient(
			0.25turn,
			rgba(255, 255, 255, 0),
			rgba(248, 144, 231, 0.6),
			rgba(255, 255, 255, 0)
		);
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.brand-logo {
		font-size: 1.2rem;
		font-weight: 700;
		color: #f890e7;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
	}

	.right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.status-badge {
		font-size: 0.6rem;
		background: linear-gradient(to bottom, #00774f, #29c676);
		box-shadow: 0 0 1rem rgba(255, 255, 255, 0.2);
		border: 1px solid green;
		border-radius: 3rem;
		padding: 0.2rem 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.status-badge.rented {
		background: linear-gradient(to bottom, #774f00, #c67629);
		border: 1px solid orange;
	}

	.check {
		margin-right: 0.25rem;
	}

	.vehicle-id {
		font-size: 0.7rem;
		font-weight: 500;
		opacity: 0.5;
	}

	.mid {
		margin-top: 1.25rem;
		position: relative;
		z-index: 99;
	}

	.loc {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 2rem 0;
		gap: 0.5rem;
	}

	.box {
		background: rgba(255, 255, 255, 0.05);
		padding: 0.5rem;
		border-radius: 0.75rem;
		text-align: center;
		position: relative;
		height: 4rem;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}

	.label {
		font-size: 0.65rem;
		opacity: 0.5;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-bottom: 0.25rem;
	}

	.sign {
		margin-right: 0.25rem;
	}

	.code {
		font-family: 'Courier New', monospace;
		font-size: 1.2rem;
		font-weight: 700;
		color: #08d3d3;
		margin-top: 0.25rem;
	}

	.country {
		opacity: 0.3;
		font-size: 0.65rem;
		margin-top: 0.25rem;
	}

	.dur {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.duration {
		margin-top: 0.5rem;
		width: 100%;
	}

	.meta {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.7rem;
		flex-flow: column;
		opacity: 0.6;
		text-align: center;
		margin-top: 0.5rem;
	}

	.stat {
		display: flex;
		align-items: center;
		flex-flow: row;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.speed-stat {
		font-size: 0.7rem;
		padding: 0.5rem;
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		font-size: 0.6rem;
		color: #fff;
		font-weight: 400;
		letter-spacing: 0.02rem;
		text-transform: uppercase;
		flex-flow: column;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.speed-box {
		margin-top: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.speed-label {
		opacity: 0.5;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.speed-value {
		font-size: 1.2rem;
		font-weight: 700;
		color: #fff;
	}

	.speed-value-small {
		font-size: 0.8rem;
		font-weight: 600;
		color: #fff;
		text-transform: capitalize;
	}

	.speed-unit {
		font-size: 0.5rem;
		opacity: 0.5;
		margin-top: 0.25rem;
	}

	.times {
		display: flex;
		justify-content: space-between;
		flex-flow: row;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
	}

	.vehicle-display {
		text-align: center;
		margin: 1.5rem 0;
		position: relative;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 1rem;
		padding: 1rem;
	}

	.vehicle-img {
		width: 100%;
		max-height: 10rem;
		object-fit: contain;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
		filter: brightness(0.9) contrast(1.1);
	}

	.vehicle-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.vehicle-label {
		font-size: 0.7rem;
		opacity: 0.5;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.type {
		font-size: 0.9rem;
		font-weight: 600;
		color: #08d3d3;
	}

	.foot {
		display: flex;
		justify-content: space-between;
		margin-top: 1.5rem;
		gap: 0.5rem;
		position: relative;
		z-index: 99;
	}

	.item {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.75rem;
		border-radius: 1rem;
		flex: 1;
		position: relative;
		transition: all 0.3s ease;
	}

	.item:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-2px);
	}

	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.75rem;
	}

	.data {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.65rem;
		opacity: 0.5;
		text-transform: uppercase;
	}

	.val {
		margin-top: 0.25rem;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: -0.01rem;
		color: #fff;
	}

	.features {
		display: flex;
		justify-content: space-between;
		align-items: center;
		opacity: 0.6;
		font-size: 0.55rem;
		margin-top: 1rem;
		padding: 0.75rem;
		text-transform: uppercase;
		flex-wrap: wrap;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 0.75rem;
	}

	.feature {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
	}

	.feature-icon {
		color: #29c676;
		filter: drop-shadow(0 0 0.5rem #29c676);
	}

	/* Animations */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.card-container {
		animation: fadeIn 0.6s ease-out;
	}

	/* Path animations */
	.path-white {
		animation: dash 5s linear alternate infinite;
	}

	.path-gradient {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 2s ease-in-out forwards;
	}

	@keyframes dash {
		from {
			stroke-dashoffset: 1000;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
