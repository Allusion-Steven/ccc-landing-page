<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import lightLogo from '$lib/assets/logos/macro-exotics-light-logo.png';
	import darkLogo from '$lib/assets/logos/macro-exotics-dark-logo.png';
	const copyDate = new Date().getFullYear();
</script>

<footer class="{$theme === 'dark' ? 'bg-primary-greyBlue	' : 'bg-gradient-to-r from-white via-gray-50 to-white'}">
	<div class="container mx-auto px-4 py-12">
		<div class="grid gap-8 md:grid-cols-4">
			<div>
				<img
				src={$theme === 'dark' ? darkLogo : lightLogo}
				alt="Macro Exotics"
				class="mb-4 h-12 w-auto"
			/>
				<p class="text-sm leading-relaxed {$theme === 'dark' ? 'text-white/80' : 'text-black/80'}">
					Premium luxury vehicle and yacht rentals connecting owners and enthusiasts. Experience
					extraordinary with Macro Exotics.
				</p>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-semibold {$theme === 'dark' ? 'text-white' : 'text-black'}">Quick Links</h3>
				<ul class="space-y-2">
					<li>
						<a
							href="/"
							class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						>
							Home
						</a>
					</li>
					<li>
						<a
							href="/about"
							class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						>
							About
						</a>
					</li>
					<li>
						<a
							href="/contact"
							class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						>
							Contact
						</a>
					</li>
					<li>
						<a
							href="/privacy"
							class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						>
							Privacy Policy
						</a>
					</li>
					<li>
						<!-- TODO: Change URL from /ourVehicles to /vehicles and change vehicles listing page to fetch from /api/vehicles -->
						<a
							href="/ourVehicles"
							class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						>
							Vehicles
						</a>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-semibold {$theme === 'dark' ? 'text-white' : 'text-black'}">Contact</h3>
				<ul class="space-y-2 text-sm {$theme === 'dark' ? 'text-white/80' : 'text-black/80'}">
					<li><a href="mailto:support@macroexotics.com" class="hover:underline duration-300">support@macroexotics.com</a></li>
					<li>21st Collins Ave</li>
					<li>Miami, FL 33411</li>
				</ul>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-semibold {$theme === 'dark' ? 'text-white' : 'text-black'}">Connect With Us</h3>
				<div class="flex space-x-4">
					<a
						href="#"
						class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						aria-label="Facebook"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
								d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
						</svg>
					</a>
					<a
						href="#"
						class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						aria-label="X (formerly Twitter)"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
					</a>
					<a
						href="https://www.instagram.com/macro_exotics/"
						class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						aria-label="Instagram"
						target="_blank">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
						</svg>
					</a>
					<a
						href="#"
						class="{$theme === 'dark' ? 'text-white/80 hover:text-miami-light-pink' : 'text-black/80 hover:text-black'} transition-colors duration-300"
						aria-label="LinkedIn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24">
							<path
								d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
						</svg>
					</a>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t {$theme === 'dark' ? 'border-miami-pink/20' : 'border-primary-accent/20'} pt-8 text-center">
			<p class="text-sm {$theme === 'dark' ? 'text-white/60' : 'text-black/80'}">
				&copy; {copyDate} Macro Exotics. All rights reserved.
			</p>
		</div>
	</div>
</footer>
