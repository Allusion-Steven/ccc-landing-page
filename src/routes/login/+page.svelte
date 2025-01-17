<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<section
	class="background-img flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 opacity-90"
>
	<!-- login form -->

	<div class="m-8 flex w-full max-w-sm flex-col rounded-md bg-white p-4 shadow-md md:mx-auto">
		<div class="flex justify-center">
			<h1 class="text-2xl font-bold text-gray-900">Login/Register</h1>
		</div>
		<form class="mx-auto flex w-full flex-col gap-2" method="post" action="?/login" use:enhance>
			<div class="flex flex-col gap-2">
				<label class="flex flex-col gap-2">
					<span class="text-slate-500">Username</span>
					<input
						name="username"
						class="rounded-md border border-gray-300 bg-gray-100 p-2 focus:outline-none"
					/>
				</label>
				<label class="flex flex-col gap-2">
					<span class="text-slate-500">Password</span>
					<input
						type="password"
						name="password"
						class="rounded-md border border-gray-300 bg-gray-100 p-2 focus:outline-none"
					/>
				</label>
				<div class="flex flex-col gap-2">
					<button class="rounded-md bg-blue-500 p-2 text-white">Login</button>
					<button class="rounded-md bg-gray-400 p-2 text-white" formaction="?/register"
						>Register</button
					>
				</div>
			</div>
		</form>
		<p class="text-red-500">{form?.message ?? ''}</p>
	</div>
</section>

<style>
	section {
		background-size: cover;
		background-position: top;
		background-repeat: no-repeat;
		background: linear-gradient(-60deg, #e6c408f6, #6e6e0d9c, #a29a50d8, #0873e6bc, #089ce6bc);
		background-size: 600% 600%;
		animation: gradient 15s ease infinite;
		height: 100vh;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@keyframes rotate {
		0% {
			background: rotate(0deg);
		}
		100% {
			background: rotate(360deg);
		}
	}
</style>
