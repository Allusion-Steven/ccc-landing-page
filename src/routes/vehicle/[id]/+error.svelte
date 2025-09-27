<script lang="ts">
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	import { fade, fly } from 'svelte/transition';

	let status = $derived($page.status);
	let message = $derived($page.error?.message || 'An unexpected error occurred');
</script>

<div class="min-h-screen   flex items-center justify-center px-4" in:fade={{ duration: 500 }}>
	<div class="max-w-md w-full text-center">
		<div class="mb-8" in:fly={{ y: 20, duration: 600, delay: 200 }}>
			<div class="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
				<svg class="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
				</svg>
			</div>
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				{status === 404 ? 'Vehicle Not Found' : 'Oops! Something went wrong'}
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
				{message}
			</p>
		</div>

		<div class="space-y-4" in:fly={{ y: 20, duration: 600, delay: 400 }}>
			<button
				onclick={() => history.back()}
				class="w-full bg-gradient-to-r from-primary-accent to-primary-muted dark:from-blue-600 dark:to-blue-700 hover:from-primary-muted hover:to-primary-accent dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Go Back
			</button>

			<a
				href="/"
				class="w-full border-2 border-primary-accent hover:border-primary-muted text-primary-accent hover:text-primary-muted dark:border-gray-600 dark:hover:border-blue-500 dark:text-gray-200 dark:hover:text-blue-400 font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-3"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
				Return Home
			</a>

			{#if status === 400}
				<div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-lg">
					<p class="text-sm text-yellow-800 dark:text-yellow-200">
						<strong>Tip:</strong> Try accessing this vehicle through our vehicle listings page to ensure all required parameters are included.
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>