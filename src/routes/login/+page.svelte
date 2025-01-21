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
	<div class="absolute inset-0"
			bind:this={heroDiv}
			class:loaded={imageLoaded}
			style="background-image: url('{loginImage}');"
>
		<img
			src={loginImage}
			alt="Background"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/50"></div>
	</div>

	<!-- Login Form Container -->
	<div class="relative flex min-h-[80vh] items-center justify-center">
		<div class="w-[450px] login-form-container rounded-xl bg-gradient-to-r from-miami-dark/85 via-miami-purple/85 to-miami-dark/85 backdrop-blur-sm shadow-2xl">
			<div class="w-full px-8 py-12">
				<!-- Tabs -->
				<div class="flex mb-8 border-b border-gray-600">
					<button
						class="flex-1 py-2 text-center text-lg font-medium transition-colors {activeTab === 'login' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}"
						onclick={() => activeTab = 'login'}
					>
						Login
					</button>
					<button
						class="flex-1 py-2 text-center text-lg font-medium transition-colors {activeTab === 'register' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}"
						onclick={() => activeTab = 'register'}
					>
						Register
					</button>
				</div>

				{#if activeTab === 'login'}
					<form 
						class="space-y-6" 
						method="post" 
						action="?/login" 
						use:enhance
					>
						<div>
							<label for="login-username" class="block text-sm font-medium text-gray-300">
								Username
							</label>
							<input
								id="login-username"
								name="username"
								required
								class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-600 
								focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
								bg-gray-800/50 text-white backdrop-blur-sm"
								placeholder="Enter your username"
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
								class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-600 
								focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
								bg-gray-800/50 text-white backdrop-blur-sm"
								placeholder="Enter your password"
							/>
						</div>

						<button 
							type="submit"
							class="w-full py-3 px-4 rounded-lg bg-blue-600/90 hover:bg-blue-700 
							text-white font-medium transition-colors focus:outline-none 
							focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 backdrop-blur-sm"
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
								class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-600 
								focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
								bg-gray-800/50 text-white backdrop-blur-sm"
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
								class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-600 
								focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
								bg-gray-800/50 text-white backdrop-blur-sm"
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
								class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-600 
								focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
								bg-gray-800/50 text-white backdrop-blur-sm"
								placeholder="Confirm your password"
							/>
							<!-- TODO: Password validation fix-->
							{#if !passwordsMatch}
								<p class="mt-1 text-sm text-red-400">Passwords do not match</p>
							{/if}
						</div>

						<button 
							type="submit"
							class="w-full py-3 px-4 rounded-lg bg-blue-600/90 hover:bg-blue-700 
							text-white font-medium transition-colors focus:outline-none 
							focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 backdrop-blur-sm"
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
