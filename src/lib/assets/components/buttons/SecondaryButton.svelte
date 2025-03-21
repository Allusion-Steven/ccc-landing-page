<script lang="ts">
	import { theme } from '$lib/stores/theme';
	export let href = '';
	export let text = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let width = '';
	export let className = '';
</script>

{#if href}
	<a
		{href}
		class="group relative inline-flex {width === ''
			? 'min-w-48'
			: width} {className} items-center justify-center rounded-lg border {$theme === 'dark' ? 'border-white/10 bg-white/5 text-white hover:border-primary-light/20' : 'border-primary-accent/10 bg-primary-accent/5 text-primary-accent hover:border-primary-light/20'} px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-primary-light/10 hover:shadow-[0_0_20px_rgba(126,212,172,0.15)] md:text-lg"
	>
		{text}
		<svg
			class="ml-2 h-5 w-5 transform opacity-70 transition-transform group-hover:translate-x-1"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M9 5l7 7-7 7"
			/>
		</svg>
	</a>
{:else}
	<button
		{type}
		class="group relative inline-flex {width === ''
			? ''
			: width} items-center justify-center rounded-lg border {$theme === 'dark' ? 'border-white/10 bg-white/5 text-white hover:border-primary-light/20' : 'border-primary-accent/10 bg-primary-accent/5 text-primary-accent hover:border-primary-light/20'} px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-primary-light/10 hover:shadow-[0_0_20px_rgba(126,212,172,0.15)] md:text-lg"
	>
		{text}
		<svg
			class="ml-2 h-5 w-5 transform opacity-70 transition-transform group-hover:translate-x-1"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M9 5l7 7-7 7"
			/>
		</svg>
	</button>
{/if}
