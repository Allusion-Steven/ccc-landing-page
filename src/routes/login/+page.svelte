<script lang="ts">
	import { enhance } from '$app/forms';
	import loginImage from '$lib/assets/images/570s.jpg';
	import { onMount } from 'svelte';

	interface LoginActionData {
		message?: string;
		success?: boolean;
	}

	let heroDiv;
	let imageLoaded = $state(false);

	onMount(() => {
		const img = new Image();
		img.src = loginImage;
		img.onload = () => {
			imageLoaded = true;
		};
	});

	let { form }: { form: LoginActionData | null } = $props();

	let activeTab = $state<'login' | 'register'>('login');
	let password = $state('');
	let confirmPassword = $state('');
	let passwordsMatch = $state(true);

	function handleRegisterSubmit(event: SubmitEvent) {
		if (password !== confirmPassword) {
			event.preventDefault();
			passwordsMatch = false;
			return;
		}
		passwordsMatch = true;
	}
</script>

<div class="relative min-h-[80vh]">
	<div class="loading-placeholder" class:hidden={imageLoaded}></div>

	<!-- Background Image -->
	<div
		class="absolute inset-0"
		bind:this={heroDiv}
		class:loaded={imageLoaded}
		style="background-image: url('{loginImage}');"
	>
		<img src={loginImage} alt="Background" class="h-full w-full object-cover" />
		<div
			class="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/50"
		></div>
	</div>

	<!-- Login Form Container -->
	<div class="relative flex min-h-[80vh] items-center justify-center">
		<div
			class="login-form-container w-[450px] rounded-xl bg-gradient-to-r from-miami-dark/85 via-miami-purple/85 to-miami-dark/85 shadow-2xl backdrop-blur-sm"
		>
			<div class="w-full px-8 py-12">
				<!-- Tabs -->
				<div class="mb-8 flex border-b border-gray-600">
					<button
						class="flex-1 py-2 text-center text-lg font-medium transition-colors {activeTab ===
						'login'
							? 'border-b-2 border-[#0bd3d3] text-white'
							: 'text-gray-400 hover:text-gray-300'}"
						onclick={() => (activeTab = 'login')}
					>
						Login
					</button>
					<button
						class="flex-1 py-2 text-center text-lg font-medium transition-colors {activeTab ===
						'register'
							? 'border-b-2 border-[#0bd3d3] text-white'
							: 'text-gray-400 hover:text-gray-300'}"
						onclick={() => (activeTab = 'register')}
					>
						Register
					</button>
				</div>

				{#if activeTab === 'login'}
					<form class="space-y-6" method="post" action="?/login" use:enhance>
						<div>
							<label for="login-username" class="block text-sm font-medium text-gray-300">
								Email
							</label>
							<input
								id="login-username"
								name="username"
								required
								class="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4
								py-3 text-white backdrop-blur-sm transition-colors
								focus:border-blue-500 focus:ring-2 focus:ring-[#0bd3d3]"
								placeholder="Enter your Email"
							/>
						</div>

						<div>
							<label for="login-password" class="block text-sm font-medium text-gray-300">
								Password
							</label>
							<input
								id="login-password"
								type="password"
								name="password"
								required
								class="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4
								py-3 text-white backdrop-blur-sm transition-colors
								focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Enter your password"
							/>
						</div>

						<button
							type="submit"
							class="w-full relative inline-flex items-center justify-center rounded-lg bg-[#0bd3d3] px-8 py-3 text-base font-medium text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#0bd3d3]/80 hover:shadow-lg md:text-lg"
						>
							Sign In
						</button>
					</form>
				{:else}
					<form
						class="space-y-6"
						method="post"
						action="?/register"
						use:enhance
						onsubmit={handleRegisterSubmit}
					>
						<div>
							<label for="register-username" class="block text-sm font-medium text-gray-300">
								Username
							</label>
							<input
								id="register-username"
								name="username"
								required
								class="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4
								py-3 text-white backdrop-blur-sm transition-colors
								focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Choose a username"
							/>
						</div>

						<div>
							<label for="register-password" class="block text-sm font-medium text-gray-300">
								Password
							</label>
							<input
								id="register-password"
								type="password"
								name="password"
								required
								bind:value={password}
								class="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4
								py-3 text-white backdrop-blur-sm transition-colors
								focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Choose a password"
							/>
						</div>

						<div>
							<label for="confirm-password" class="block text-sm font-medium text-gray-300">
								Confirm Password
							</label>
							<input
								id="confirm-password"
								type="password"
								required
								bind:value={confirmPassword}
								class="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4
								py-3 text-white backdrop-blur-sm transition-colors
								focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
								placeholder="Confirm your password"
							/>
							<!-- TODO: Password validation fix-->
							{#if !passwordsMatch}
								<p class="mt-1 text-sm text-red-400">Passwords do not match</p>
							{/if}
						</div>

						<button
							type="submit"
							class="w-full relative inline-flex items-center justify-center rounded-lg bg-[#0bd3d3] px-8 py-3 text-base font-medium text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#0bd3d3]/80 hover:shadow-lg md:text-lg"
						>
							Create Account
						</button>
					</form>
				{/if}

				{#if form?.message}
					<p class="mt-4 text-center text-red-400">{form.message}</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.loading-placeholder {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
	}

	/* Remove the previous background animations as they're no longer needed */
	@media (max-width: 550px) {
		.login-form-container {
			width: 90%;
		}
	}
</style>
