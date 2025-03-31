<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';

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
		class="mx-auto my-auto flex min-h-screen w-2/3 flex-1 flex-grow items-center justify-center text-center align-middle {$theme === 'dark' ? 'bg-primary-dark' : 'bg-white'}"
	>
		<div
			class="mx-auto w-full rounded-lg {$theme === 'dark' ? 'bg-white/10' : 'bg-primary-accent/10'} p-6 align-middle shadow-lg transition-all duration-300 hover:shadow-xl"
		>
			<h1 class="mb-4 text-3xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">Sorry, There was an issue</h1>
			<p class="text-lg text-red-500">{error.message}</p>
		</div>
	</div>
{:else}
	<h1 class="text-3xl font-bold text-red-500">Error: Unknown error</h1>
{/if}
