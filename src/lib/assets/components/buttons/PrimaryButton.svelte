<script lang="ts">
	export let href = '';
	export let text = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let width = '';
</script>

{#if href}
	<a
		{href}
		class="group relative inline-flex {width === ''
			? 'min-w-48'
			: width} items-center justify-center rounded-lg bg-gradient-to-r from-miami-pink to-miami-light-pink px-8 py-4 text-base font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(255,27,107,0.3)] md:text-lg"
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
			? 'min-w-48'
			: width} items-center justify-center rounded-lg bg-gradient-to-r from-miami-pink to-miami-light-pink px-8 py-4 text-base font-medium text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(255,27,107,0.3)] md:text-lg"
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
