<script lang="ts">
	let { title, description, link, linkText } = $props();
	let show = $state(true);
</script>

<div
	class="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center bg-primary-accent/50 p-4 font-[600] leading-tight text-white backdrop-blur-md dark:bg-primary-dark/50 {show
		? 'block'
		: 'hidden'}">
	<div class="flex flex-col items-center justify-center gap-1">
		<p class="text-xl">{title}</p>
		<p>{description}</p>
	</div>
	<button
		onclick={() => (show = false)}
		class="right-4 mt-4 w-full rounded-md bg-primary-dark/50 px-4 py-2 text-white hover:bg-primary-dark/80 dark:bg-primary-light/80 dark:hover:bg-primary-light/80 sm:absolute sm:mt-0 sm:w-[100px]">
		{linkText}
	</button>
</div>
