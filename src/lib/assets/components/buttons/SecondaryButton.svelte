<script lang="ts">
	import { theme } from '$lib/stores/theme';
	export let href = '';
	export let text = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let width = '';
	export let className = '';
	export let colorScheme: 'default' | 'light' | 'dark' = 'default';
	export let hoverTextColor = '';

	// Color styles based on colorScheme and theme
	let buttonStyle = '';

	$: {
		if ($theme === 'dark') {
			buttonStyle = 'border-white/10 bg-white/5 text-white hover:border-primary-light/30 hover:bg-primary-light/15 hover:text-white';
		} else {
			if (colorScheme === 'default') {
				buttonStyle = 'border-[#8393AA]/20 bg-[#8393AA]/5 text-[#513954] hover:bg-[#8393AA]/20 hover:border-[#8393AA]/40 hover:text-[#513954] hover:shadow-md';
			} else if (colorScheme === 'light') {
				const hoverText = hoverTextColor ? `hover:${hoverTextColor}` : 'hover:text-[#513954]';
				buttonStyle = `border-black/30 border-white/30 bg-white/80 text-[#513954] hover:bg-[#D0E1E1]/30 hover:border-[#8393AA]/40 hover:shadow-md ${hoverText}`;
			} else if (colorScheme === 'dark') {
				buttonStyle = 'border-[#513954]/20 bg-[#513954] text-white hover:bg-[#B54959] hover:border-[#B54959]/70 hover:shadow-md hover:shadow-[#B54959]/20';
			}
		}
	}
</script>

{#if href}
	<a
		{href}
		class="group relative inline-flex {width === ''
			? 'min-w-48'
			: width} {className} items-center justify-center rounded-lg border {buttonStyle} px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300 ease-in-out md:text-lg"
	>
		{text}
		<svg
			class="ml-2 h-5 w-5 transform opacity-70 transition-transform group-hover:translate-x-1 group-hover:opacity-100"
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
			: width} items-center justify-center rounded-lg border {buttonStyle} px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300 ease-in-out md:text-lg"
	>
		{text}
		<svg
			class="ml-2 h-5 w-5 transform opacity-70 transition-transform group-hover:translate-x-1 group-hover:opacity-100"
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
