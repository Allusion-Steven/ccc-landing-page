<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	$: error = $page.error;
	$: console.log('error: ', error);

	onMount(() => {
		//set timeout
		// setTimeout(() => {
		// 	goto('/dashboard');
		// }, 3000);
	});
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

{#if error}
	<div
		class="mx-auto my-auto flex min-h-screen w-2/3 flex-1 flex-grow items-center justify-center text-center align-middle"
	>
		<div
			class="mx-auto w-full rounded-lg bg-white p-6 align-middle shadow-lg transition-all duration-300 hover:shadow-xl"
		>
			<h1 class="mb-4 text-3xl font-bold">Sorry, There was an issue</h1>
			<p class="text-lg text-red-500">{error.message}</p>
		</div>
	</div>
{:else}
	<h1 class="text-3xl font-bold text-red-500">Error: Unknown error</h1>
{/if}
