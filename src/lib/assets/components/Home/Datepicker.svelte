<script>
	import { Datepicker } from 'flowbite-svelte';
</script>

<div class="mx-auto w-full max-w-sm p-4">
	<Datepicker title="Select date" required placeholder="Pick a date" />
</div>

<style lang="postcss">
	:global(.datepicker) {
		@apply w-full;
	}
	:global(.datepicker-dropdown) {
		@apply rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800;
	}
</style>
