<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { contactFormStore } from '$lib/stores/contactFormStore';
	import heroBg from '$lib/assets/images/contact-form-bg-img.png';
	import { theme } from '$lib/stores/theme';

	let email = $state('');
	let phone = $state('');
	let f_name = $state('');
	let l_name = $state('');
	let name = $derived(f_name + ' ' + l_name);
	let message = $state('');
	let sendFeedback = $state('');

	let contactFormSending = $state(false);
	let contactFormSent = $state(false);
	let sendingWarnText = $state('');
	let send_btn;
	// import { vehicleFormStore } from '$lib/store';

	onMount(() => {
		send_btn = document.querySelector('send-btn');
	});

	async function handleSendButton() {
		console.log('handleSendButton');
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
			email: email,
			phone: phone,
			name: name,
			message: message
		};

		const response = await fetch('/api/email/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
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
			if (requiredFields[i] === 'email' && email === '') {
				return 'email is required';
			} else if (requiredFields[i] === 'phone' && phone === '') {
				return 'email or phone is require to be able to be able to reach you!';
			} else if (requiredFields[i] === 'message' && message === '') {
				return 'message is required';
			} else {
				if (email !== '' || (phone !== '' && message !== '')) {
					return 'valid';
				} else {
					return 'Please enter an email or phone number to reach you, and a message letting us know what you need help with.';
				}
			}
		}
	}
</script>

<div
	class="min-h-screen {$theme === 'dark'
		? 'bg-[#1c1c1c'
		: 'bg-gray-50'} py-12 md:py-16">
	<div class="container mx-auto px-4 md:px-8" in:fly={{ y: 30, duration: 600, delay: 100 }}>
		<div class="mx-auto max-w-6xl">
			<!-- Header Section -->
			<div class="mb-16 text-center" in:fly={{ y: 20, duration: 600, delay: 200 }}>
				<h1 class="mb-6 text-4xl md:text-5xl lg:text-6xl font-light {$theme === 'dark'
					? 'text-white'
					: 'text-gray-900'} tracking-tight">
					Contact Us
				</h1>
				<p class="mx-auto max-w-2xl text-lg md:text-xl {$theme === 'dark'
					? 'text-gray-300'
					: 'text-gray-600'} leading-relaxed">
					Experience luxury service with personalized attention. We're here to assist you with your premium vehicle and yacht needs.
				</p>
			</div>

			<!-- Contact Info Cards -->
			<div class="mb-16 grid gap-8 md:grid-cols-2" in:fly={{ y: 30, duration: 600, delay: 300 }}>
				<div class="group">
					<div class="h-full rounded-2xl border {$theme === 'dark'
						? 'border-gray-800 bg-[#232528]'
						: 'border-gray-200 bg-white'} p-8 transition-all duration-300 group-hover:shadow-lg {$theme === 'dark'
						? 'group-hover:shadow-gray-900/25'
						: 'group-hover:shadow-gray-200/50'}">
						<div class="mb-6">
							<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full {$theme === 'dark'
								? 'bg-gray-700'
								: 'bg-gray-100'}">
								<svg class="h-6 w-6 {$theme === 'dark'
									? 'text-gray-300'
									: 'text-gray-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
								</svg>
							</div>
							<h3 class="mb-3 text-xl font-medium {$theme === 'dark'
								? 'text-white'
								: 'text-gray-900'}">
								Sales Support
							</h3>
						</div>
						<div class="space-y-3">
							<p class="text-base {$theme === 'dark'
								? 'text-gray-300'
								: 'text-gray-600'}">
								Ready to experience luxury? Our sales team is here to help you find the perfect vehicle or yacht for your needs.
							</p>
							<div class="space-y-2">
								<p class="text-sm {$theme === 'dark'
									? 'text-gray-400'
									: 'text-gray-500'}">Phone:</p>
								<a href="tel:+18888675309" class="block text-lg font-medium {$theme === 'dark'
									? 'text-white hover:text-gray-300'
									: 'text-gray-900 hover:text-gray-700'} transition-colors">
									(888) 867-5309
								</a>
							</div>
							<div class="space-y-2">
								<p class="text-sm {$theme === 'dark'
									? 'text-gray-400'
									: 'text-gray-500'}">Email:</p>
								<a href="mailto:support@macroexotics.com" class="block text-lg font-medium {$theme === 'dark'
									? 'text-white hover:text-gray-300'
									: 'text-gray-900 hover:text-gray-700'} transition-colors">
									support@macroexotics.com
								</a>
							</div>
						</div>
					</div>
				</div>

				<div class="group">
					<div class="h-full rounded-2xl border {$theme === 'dark'
						? 'border-gray-800 bg-[#232528]'
						: 'border-gray-200 bg-white'} p-8 transition-all duration-300 group-hover:shadow-lg {$theme === 'dark'
						? 'group-hover:shadow-gray-900/25'
						: 'group-hover:shadow-gray-200/50'}">
						<div class="mb-6">
							<div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full {$theme === 'dark'
								? 'bg-gray-700'
								: 'bg-gray-100'}">
								<svg class="h-6 w-6 {$theme === 'dark'
									? 'text-gray-300'
									: 'text-gray-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
								</svg>
							</div>
							<h3 class="mb-3 text-xl font-medium {$theme === 'dark'
								? 'text-white'
								: 'text-gray-900'}">
								Member Support
							</h3>
						</div>
						<div class="space-y-3">
							<p class="text-base {$theme === 'dark'
								? 'text-gray-300'
								: 'text-gray-600'}">
								Exclusive support for our valued members. Get priority assistance with your bookings and account management.
							</p>
							<div class="space-y-2">
								<p class="text-sm {$theme === 'dark'
									? 'text-gray-400'
									: 'text-gray-500'}">Phone:</p>
								<a href="tel:+18888675309" class="block text-lg font-medium {$theme === 'dark'
									? 'text-white hover:text-gray-300'
									: 'text-gray-900 hover:text-gray-700'} transition-colors">
									(888) 867-5309
								</a>
							</div>
							<div class="space-y-2">
								<p class="text-sm {$theme === 'dark'
									? 'text-gray-400'
									: 'text-gray-500'}">Email:</p>
								<a href="mailto:admin@macroexotics.com" class="block text-lg font-medium {$theme === 'dark'
									? 'text-white hover:text-gray-300'
									: 'text-gray-900 hover:text-gray-700'} transition-colors">
									admin@macroexotics.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="mx-auto max-w-3xl" in:fly={{ y: 30, duration: 600, delay: 400 }}>
				<div class="rounded-2xl border {$theme === 'dark'
					? 'border-gray-800 bg-[#232528]'
					: 'border-gray-200 bg-white'} shadow-lg">
					<div class="p-8 md:p-12">
						<div class="mb-8 text-center">
							<h2 class="mb-4 text-2xl md:text-3xl font-light {$theme === 'dark'
								? 'text-white'
								: 'text-gray-900'} tracking-tight">
								Send us a message
							</h2>
							<p class="text-base {$theme === 'dark'
								? 'text-gray-300'
								: 'text-gray-600'}">
								We'll get back to you within 24 hours
							</p>
						</div>

						<form class="space-y-6">
							<div class="grid gap-6 md:grid-cols-2">
								<div class="space-y-2">
									<label for="contact-first-name" class="text-sm font-medium {$theme === 'dark'
										? 'text-gray-300'
										: 'text-gray-700'}">
										First Name
									</label>
									<input
										id="contact-first-name"
										required
										class="w-full rounded-lg border {$theme === 'dark'
											? 'border-gray-700 bg-[#232528] text-white placeholder-gray-400 focus:border-gray-600'
											: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-gray-400'} px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-opacity-20 {$theme === 'dark'
											? 'focus:ring-gray-500'
											: 'focus:ring-gray-600'}"
										type="text"
										placeholder="Jane"
										bind:value={f_name} />
								</div>
								<div class="space-y-2">
									<label for="contact-last-name" class="text-sm font-medium {$theme === 'dark'
										? 'text-gray-300'
										: 'text-gray-700'}">
										Last Name
									</label>
									<input
										id="contact-last-name"
										class="w-full rounded-lg border {$theme === 'dark'
											? 'border-gray-700 bg-[#232528] text-white placeholder-gray-400 focus:border-gray-600'
											: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-gray-400'} px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-opacity-20 {$theme === 'dark'
											? 'focus:ring-gray-500'
											: 'focus:ring-gray-600'}"
										type="text"
										placeholder="Doe"
										bind:value={l_name} />
								</div>
							</div>
							<div class="grid gap-6 md:grid-cols-2">
								<div class="space-y-2">
									<label for="contact-phone" class="text-sm font-medium {$theme === 'dark'
										? 'text-gray-300'
										: 'text-gray-700'}">
										Phone Number
									</label>
									<input
										id="contact-phone"
										class="w-full rounded-lg border {$theme === 'dark'
											? 'border-gray-700 bg-[#232528] text-white placeholder-gray-400 focus:border-gray-600'
											: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-gray-400'} px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-opacity-20 {$theme === 'dark'
											? 'focus:ring-gray-500'
											: 'focus:ring-gray-600'}"
										type="tel"
										placeholder="800-867-5309"
										bind:value={phone} />
								</div>
								<div class="space-y-2">
									<label for="contact-email" class="text-sm font-medium {$theme === 'dark'
										? 'text-gray-300'
										: 'text-gray-700'}">
										Email Address
									</label>
									<input
										id="contact-email"
										required
										class="w-full rounded-lg border {$theme === 'dark'
											? 'border-gray-700 bg-[#232528] text-white placeholder-gray-400 focus:border-gray-600'
											: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-gray-400'} px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-opacity-20 {$theme === 'dark'
											? 'focus:ring-gray-500'
											: 'focus:ring-gray-600'}"
										type="email"
										placeholder="john@example.com"
										autocomplete="email"
										bind:value={email} />
								</div>
							</div>
							<div class="space-y-2">
								<label for="contact-message" class="text-sm font-medium {$theme === 'dark'
									? 'text-gray-300'
									: 'text-gray-700'}">
									Message
								</label>
								<textarea
									id="contact-message"
									required
									class="w-full rounded-lg border {$theme === 'dark'
										? 'border-gray-700 bg-[#232528] text-white placeholder-gray-400 focus:border-gray-600'
										: 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-gray-400'} px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-opacity-20 {$theme === 'dark'
										? 'focus:ring-gray-500'
										: 'focus:ring-gray-600'} resize-none"
									rows="6"
									placeholder="How can we help you?"
									bind:value={message}></textarea>
							</div>

							{#if sendingWarnText}
								<div class="rounded-lg border {$theme === 'dark'
									? 'border-red-800 bg-red-900/20 text-red-200'
									: 'border-red-300 bg-red-50 text-red-700'} p-4 text-center">
									{sendingWarnText}
								</div>
							{/if}

							<button
								type="button"
								class="w-full rounded-lg {$theme === 'dark'
									? 'bg-gray-700 hover:bg-gray-600 text-white'
									: 'bg-gray-900 hover:bg-gray-800 text-white'} px-6 py-4 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-opacity-20 {$theme === 'dark'
									? 'focus:ring-gray-500'
									: 'focus:ring-gray-600'}"
								onclick={handleSendButton}
								disabled={contactFormSending}>
								{#if contactFormSending}
									<div class="flex items-center justify-center gap-2">
										<div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
										Sending...
									</div>
								{:else if contactFormSent}
									<div class="flex items-center justify-center gap-2">
										<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
										</svg>
										Sent!
									</div>
								{:else}
									Send Message
								{/if}
							</button>

							{#if sendFeedback}
								<div class="rounded-lg border {$theme === 'dark'
									? 'border-green-800 bg-green-900/20 text-green-200'
									: 'border-green-300 bg-green-50 text-green-700'} p-4 text-center">
									{sendFeedback}
								</div>
							{/if}
						</form>
						</div>

					<div class="border-t {$theme === 'dark'
						? 'border-gray-700 bg-[#232528]'
						: 'border-gray-200 bg-gray-50'} px-8 py-6 text-center">
						<p class="text-sm {$theme === 'dark'
							? 'text-gray-400'
							: 'text-gray-600'} leading-relaxed">
							By clicking "Send Message", I understand that I will receive email,
							text or phone updates regarding my inquiries, subscription, and/or
							related services. I have read and agree to the
							<a href="/privacy" target="_blank" rel="noreferrer" class="underline {$theme === 'dark'
								? 'text-gray-300 hover:text-white'
								: 'text-gray-700 hover:text-gray-900'} transition-colors">
								Privacy Policy
							</a>.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

