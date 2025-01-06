<script lang="ts">
	import { onMount } from 'svelte';
	import { contactFormStore } from '$lib/stores/contactFormStore';
	import heroBg from '$lib/assets/images/hero-bg-2-1600.png';

	// import { ProgressRadial } from '@skeletonlabs/skeleton';
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

<div class="contact-page-container space-y-4">
	<div
		class="contact-hero-container"
		style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url({heroBg}); "
	>
		<div class="contact-container relative">
			<div class="contact-hero relative z-10 p-8">
				<h1 class="text-4xl">
					<span class="text-shadow-lg text-shadow-black font-bold tracking-tighter text-white">
						Contact Us
					</span>
				</h1>
				<div
					class="card-wrap bg-surface-100 mx-auto flex w-full flex-col justify-center gap-4 bg-transparent text-center align-middle text-lg md:flex-row"
				>
					<!-- <div class="contact-card">
						<h2>Frequently Asked Questions</h2>
						<p>Find answers to our most<br />commonly asked questions.</p>
						<a href="faq">See Frequently Asked Questions</a>
					</div> -->
					<div class="contact-card">
						<h2>Sales Support</h2>
						<p>
							Contact us by phone at<br />
							<a href="tel:+18332675309">(833) 267-5309</a> or by email.
						</p>
						<a href="mailto:sales@totaltechprotection.com">sales@totaltechprotection.com</a>
					</div>
					<div class="contact-card">
						<h2>Member Support</h2>
						<p>
							Contact us by phone at<br /><a href="tel:+18332675309">(833) 267-5309</a> or by email.
						</p>
						<a href="mailto:members@totaltechprotection.com">members@totaltechprotection.com</a>
					</div>
				</div>
				<!-- <div class="contact-card">
          <h2>Carrier Pigeon</h2>
          <p>
            3101 Fairlane Farms Rd<br />
            Suite 4<br />
            Wellington, FL 33414
          </p>
        </div> -->
			</div>
		</div>
	</div>

	<div class="contact-container mx-auto flex w-full flex-col justify-center px-4">
		<div class="contact-form-container card mx-auto mb-16 max-w-[1000px] bg-white shadow-lg">
			<h2 class="mx-4 mt-10 text-3xl">Send us a message</h2>

			<form class="contact-form mx-10">
				<label class="label">
					<span class="label-text">First Name</span>
					<input
						required
						class="input"
						title="firstName"
						type="text"
						placeholder="Jane"
						bind:value={$contactFormStore.firstName}
					/>
				</label>
				<label class="label">
					<span class="label-text">Last Name</span>
					<input
						class="input"
						title="lastName"
						type="text"
						placeholder="Doe"
						bind:value={$contactFormStore.lastName}
					/>
				</label>
				<label class="label">
					<span class="label-text">Phone Number</span>
					<input
						class="input"
						title="Input (tel)"
						type="tel"
						placeholder="800-867-5309"
						bind:value={$contactFormStore.phone}
					/>
				</label>
				<label class="label">
					<span class="label-text">Email Address</span>
					<input
						required
						class="input"
						title="Input (email)"
						type="email"
						placeholder="john@example.com"
						autocomplete="email"
						bind:value={$contactFormStore.email}
					/>
				</label>
				<label class="label message w-full">
					<span class="label-text">Message</span>
					<textarea
						required
						class="textarea"
						rows="6"
						placeholder="Message"
						bind:value={$contactFormStore.message}
					></textarea>
				</label>
				<div class="sendWarning">
					<p class="text-red-500">{sendingWarnText}</p>
				</div>
				<hr />

				<button
					type="button"
					class="send-btn btn variant-filled-secondary h-[60px] w-full rounded-2xl bg-gray-800 py-4 text-xl font-bold text-white"
					on:click={handleSendButton}
				>
					{#if !contactFormSending}
						Send
					{:else if contactFormSending}
						Loading...
					{:else if contactFormSent && !contactFormSending}
						<i class="fa-solid fa-check text-green-600" />
					{/if}
				</button>
			</form>

			<div id="consent" class="text-primary-300 flex w-full items-center px-6 align-top">
				<div class="checkbox-container" hidden>
					<label for="consent-checkbox">
						<input
							type="checkbox"
							class="checkbox h-[25px] w-[25px]"
							name="consent-checkbox"
							id="vehicle-consent"
							bind:checked={$contactFormStore.consent}
							required
						/>
					</label>
				</div>
				<div class="consent-text flex">
					<p class="w-full text-center align-text-top text-sm leading-tight">
						By clicking "Continue", I understand that I will recieve email, text or phone updates
						regarding my inquiries, subscription, and/or related services. I have read and agree to
						the
						<span>
							<!-- <a href="/tos" target="_blank" rel="noreferrer" class="text-primary-400 border-b-2"
								>Terms of Service</a
							>
							<span>&</span> -->
							<!-- privacy -->
							<a
								href="/privacy"
								target="_blank"
								rel="noreferrer"
								class="text-primary-400 border-b-2">Privacy Policy</a
							>
						</span>
						.
					</p>
				</div>
			</div>

			<div class="sendFeedback">{sendFeedback}</div>
		</div>
	</div>
</div>

<style>
	.contact-hero-container {
		@apply bg-gray-900 bg-opacity-90 bg-cover bg-center bg-no-repeat text-white;
	}
	.h2 {
		@apply text-3xl font-bold;
	}
	.contact-form-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 10px 10px 0 10px;
	}

	.sendFeedback {
		@apply text-xl font-bold text-green-500;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		padding: 20px;
		text-align: center;
	}
	.sendingWarnText {
		@apply text-xl font-bold text-red-500;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		padding: 20px;
		text-align: center;
	}
	.contact-page-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		background-size: cover;
	}
	.contact-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1100px;
		font-size: 16px;
	}
	input {
		@apply bg-slate-50;
		width: 100%;
		min-height: 50px;
	}
	textarea {
		@apply bg-slate-50;
		width: 100%;
		min-height: 150px;
	}

	.contact-hero-container {
		background-size: cover;
		background-position: top;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}
	.contact-hero {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 20px;
		padding: 40px 0 60px;
		font-size: 16px;
	}

	.contact-hero h1 {
		width: 100%;
		padding-bottom: 40px;
		text-align: center;
	}
	.contact-hero h2 {
		padding-bottom: 10px;
	}
	.contact-hero a {
		text-decoration: underline;
	}
	.contact-card {
		display: flex;
		margin: 0 auto;
		min-width: calc(25% - ((20px * 3) / 4));
		flex-direction: column;
	}
	.contact-form {
		display: flex;
		max-width: 1300px;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		padding: 40px 0;
		gap: 20px;
	}
	.contact-form .label {
		width: calc(25% - ((20px * 3) / 4));
	}
	.contact-form .message {
		width: 100%;
	}
	@media screen and (max-width: 1000px) {
		.contact-card {
			width: 100%;
			padding: 20px;
		}
		.contact-form .label {
			width: 100%;
		}
		.contact-form {
			padding: 20px 0;
		}
		.contact-hero {
			padding: 20px 0 30px;
		}
		.contact-hero h1 {
			padding-bottom: 20px;
		}
		.contact-form-container {
			margin: 0 10px;
		}
		input,
		textarea {
			width: 100%;
		}
	}
</style>
