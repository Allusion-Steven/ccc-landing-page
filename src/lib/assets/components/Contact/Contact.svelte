<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { contactFormStore } from '$lib/stores/contactFormStore';
	import heroBg from '$lib/assets/images/contact-form-bg-img.png';
	import { theme } from '$lib/stores/theme';

	let email = '';
	let phone = '';
	let f_name = '';
	let l_name = '';
	let message = '';
	let sendFeedback = '';

	let contactFormSending = false;
	let contactFormSent = false;
	let sendingWarnText = '';
	let send_btn;
	// import { vehicleFormStore } from '$lib/store';

	onMount(() => {
		send_btn = document.querySelector('send-btn');
	});

	async function handleSendButton() {
		// e.preventDefault();
		if (contactFormSending) {
			sendingWarnText = 'Slow down cowboy, we are sending the form already! 🤠';
			// console.log("Form is already sending... contactFormSending: ", contactFormSending);
			return;
		}

		let validateResponse;
		validateResponse = validateForm();
		if (validateResponse && validateResponse !== 'valid') {
			sendFeedback = validateResponse;
			return;
		}

		sendFeedback = '';
		contactFormSending = true;

		// console.log(email, phone, f_name, l_name, message);
		let payload = {
			email: $contactFormStore.email,
			phone: $contactFormStore.phone,
			f_name: $contactFormStore.firstName,
			l_name: $contactFormStore.lastName,
			message: $contactFormStore.message
		};

		const response = await fetch('/api/email/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
		const data = await response.json();
		sendFeedback = data.message;

		contactFormSending = false;
		contactFormSent = true;
		// clear form after 10 seconds
		setTimeout(() => {
			console.log('clearing form and resetting button');
			clearForm();
		}, 10000);
	}
	// function to clear form fields
	function clearForm() {
		contactFormSent = false;
		contactFormSending = false;
		email = '';
		phone = '';
		f_name = '';
		l_name = '';
		message = '';
		sendFeedback = '';
		sendingWarnText = '';
	}
	// function to validate form
	const requiredFields = ['email', 'phone', 'f_name', 'l_name', 'message'];

	function validateForm() {
		if (contactFormSending) {
			return 'Form is  Already Sending';
		}
		for (let i = 0; i < requiredFields.length; i++) {
			if (requiredFields[i] === 'email' && $contactFormStore.email === '') {
				return 'email is required';
			} else if (requiredFields[i] === 'phone' && $contactFormStore.phone === '') {
				return 'email or phone is require to be able to be able to reach you!';
			} else if (requiredFields[i] === 'message' && $contactFormStore.message === '') {
				return 'message is required';
			} else {
				if (
					$contactFormStore.email !== '' ||
					($contactFormStore.phone !== '' && $contactFormStore.message !== '')
				) {
					return 'valid';
				} else {
					return 'Please enter an email or phone number to reach you, and a message letting us know what you need help with.';
				}
			}
		}
	}
</script>

<div class="min-h-screen {$theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'} py-16">
	<div class="container mx-auto sm:px-4" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
		<div
			class="rounded-lg {$theme === 'dark' ? 'bg-gradient-to-br from-miami-pink/10 to-miami-blue/10' : 'bg-gradient-to-br from-miami-pink/5 to-miami-blue/5'} p-8 shadow-2xl backdrop-blur-sm"
			in:fly={{ y: 50, duration: 1000, delay: 400 }}
		>
			<div class="space-y-8">
				<div
					class="overflow-hidden rounded-xl"
					in:fly={{ y: 50, duration: 1000, delay: 600 }}
					style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url({heroBg}); background-position: center; background-repeat: no-repeat; background-size: cover;"
				>
					<div class="px-8 py-16">
						<h1 class="mb-12 text-center">
							<span
								class="text-shadow-lg text-shadow-black text-5xl font-bold tracking-tighter text-white md:text-6xl"
							>
								Contact Us
							</span>
						</h1>
						<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
							<div
								class="rounded-xl bg-white/10 p-8 text-center backdrop-blur-md transition-all hover:bg-white/20"
							>
								<h2 class="mb-4 text-2xl font-bold text-white">Sales Support</h2>
								<p class="mb-4 text-gray-200">
									Contact us by phone at<br />
									<a
										href="tel:+18888675309"
										class="text-white transition-colors hover:text-miami-pink">(888) 867-5309</a
									>
									<br />or by email
								</p>
								<a
									href="mailto:sales@macroexotics.com"
									class="text-miami-light-pink transition-colors hover:text-white"
									>sales@macroexotics.com</a
								>
							</div>
							<div
								class="rounded-xl bg-white/10 p-8 text-center backdrop-blur-md transition-all hover:bg-white/20"
							>
								<h2 class="mb-4 text-2xl font-bold text-white">Member Support</h2>
								<p class="mb-4 text-gray-200">
									Contact us by phone at<br />
									<a
										href="tel:+18888675309"
										class="text-white transition-colors hover:text-miami-pink">(888) 867-5309</a
									>
									<br />or by email
								</p>
								<a
									href="mailto:members@macroexotics.com"
									class="text-miami-light-pink transition-colors hover:text-white"
									>members@macroexotics.com</a
								>
							</div>
						</div>
					</div>
				</div>

				<div class="mx-auto max-w-3xl">
					<div class="overflow-hidden rounded-xl {$theme === 'dark' ? 'bg-[#1C1C1C]/90 border-white/10' : 'bg-white border-primary-accent/10'} shadow-xl backdrop-blur-sm border">
						<div class="p-8">
							<h2 class="mb-8 text-center text-3xl font-bold {$theme === 'dark' ? 'text-white' : 'text-primary-accent'}">Send us a message</h2>

							<form class="space-y-6">
								<div class="grid gap-6 md:grid-cols-2">
									<label class="block">
										<span class="mb-2 block font-medium {$theme === 'dark' ? 'text-white/90' : 'text-primary-accent'}">First Name</span>
										<input
											required
											class="w-full rounded-lg {$theme === 'dark' ? 'border-white/10 bg-white/10 text-white placeholder-white/50' : 'border-primary-accent/10 bg-primary-accent/5 text-primary-accent placeholder-primary-accent/50'} px-4 py-3 transition-all focus:border-miami-pink focus:ring-2 focus:ring-miami-pink/20"
											type="text"
											placeholder="Jane"
											bind:value={$contactFormStore.firstName}
										/>
									</label>
									<label class="block">
										<span class="mb-2 block font-medium {$theme === 'dark' ? 'text-white/90' : 'text-primary-accent'}">Last Name</span>
										<input
											class="w-full rounded-lg {$theme === 'dark' ? 'border-white/10 bg-white/10 text-white placeholder-white/50' : 'border-primary-accent/10 bg-primary-accent/5 text-primary-accent placeholder-primary-accent/50'} px-4 py-3 transition-all focus:border-miami-pink focus:ring-2 focus:ring-miami-pink/20"
											type="text"
											placeholder="Doe"
											bind:value={$contactFormStore.lastName}
										/>
									</label>
								</div>
								<div class="grid gap-6 md:grid-cols-2">
									<label class="block">
										<span class="mb-2 block font-medium {$theme === 'dark' ? 'text-white/90' : 'text-primary-accent'}">Phone Number</span>
										<input
											class="w-full rounded-lg {$theme === 'dark' ? 'border-white/10 bg-white/10 text-white placeholder-white/50' : 'border-primary-accent/10 bg-primary-accent/5 text-primary-accent placeholder-primary-accent/50'} px-4 py-3 transition-all focus:border-miami-pink focus:ring-2 focus:ring-miami-pink/20"
											type="tel"
											placeholder="800-867-5309"
											bind:value={$contactFormStore.phone}
										/>
									</label>
									<label class="block">
										<span class="mb-2 block font-medium {$theme === 'dark' ? 'text-white/90' : 'text-primary-accent'}">Email Address</span>
										<input
											required
											class="w-full rounded-lg {$theme === 'dark' ? 'border-white/10 bg-white/10 text-white placeholder-white/50' : 'border-primary-accent/10 bg-primary-accent/5 text-primary-accent placeholder-primary-accent/50'} px-4 py-3 transition-all focus:border-miami-pink focus:ring-2 focus:ring-miami-pink/20"
											type="email"
											placeholder="john@example.com"
											autocomplete="email"
											bind:value={$contactFormStore.email}
										/>
									</label>
								</div>
								<label class="block">
									<span class="mb-2 block font-medium {$theme === 'dark' ? 'text-white/90' : 'text-primary-accent'}">Message</span>
									<textarea
										required
										class="w-full rounded-lg {$theme === 'dark' ? 'border-white/10 bg-white/10 text-white placeholder-white/50' : 'border-primary-accent/10 bg-primary-accent/5 text-primary-accent placeholder-primary-accent/50'} px-4 py-3 transition-all focus:border-miami-pink focus:ring-2 focus:ring-miami-pink/20"
										rows="6"
										placeholder="How can we help you?"
										bind:value={$contactFormStore.message}
									></textarea>
								</label>

								{#if sendingWarnText}
									<div class="rounded-lg bg-red-900/50 p-4 text-center text-red-200 border border-red-500/50">
										{sendingWarnText}
									</div>
								{/if}

								<button
									type="button"
									class="w-full rounded-xl bg-gradient-to-r {$theme === 'dark' 
										? 'from-miami-pink to-miami-light-pink hover:shadow-[0_0_20px_rgba(255,27,107,0.3)]' 
										: 'from-primary-light to-primary-accent hover:shadow-[0_0_20px_rgba(126,212,172,0.3)]'} px-6 py-4 font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
									on:click={handleSendButton}
									disabled={contactFormSending}
								>
									{#if contactFormSending}
										<div class="flex items-center justify-center gap-2">
											<span
												class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
											></span>
											Sending...
										</div>
									{:else if contactFormSent}
										<div class="flex items-center justify-center gap-2">
											<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M5 13l4 4L19 7"
												></path>
											</svg>
											Sent!
										</div>
									{:else}
										Send Message
									{/if}
								</button>

								{#if sendFeedback}
									<div class="rounded-lg bg-green-900/50 p-4 text-center text-green-200 border border-green-500/50">
										{sendFeedback}
									</div>
								{/if}
							</form>
						</div>

						<div class="{$theme === 'dark' ? 'bg-[#1C1C1C] border-white/10' : 'bg-primary-accent/5 border-primary-accent/10'} border-t px-8 py-6 text-center">
							<p class="text-sm {$theme === 'dark' ? 'text-white/70' : 'text-primary-muted'}">
								By clicking "Send Message", I understand that I will receive email, text or phone
								updates regarding my inquiries, subscription, and/or related services. I have read
								and agree to the
								<a
									href="/privacy"
									target="_blank"
									rel="noreferrer"
									class="text-miami-light-pink transition-colors hover:text-miami-pink"
								>
									Privacy Policy
								</a>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Remove all existing styles and replace with new ones */
	.text-shadow-lg {
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
</style>
