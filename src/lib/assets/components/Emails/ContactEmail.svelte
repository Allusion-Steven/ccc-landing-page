<script lang="ts">
	import {
		Button,
		Container,
		Head,
		Hr,
		Html,
		Img,
		Preview,
		Section,
		Text,
		Link,
		Column
	} from 'svelte-email';
	// import { wrenchIconBase64 } from "$lib/assets/logos/logo.svg";
	import { onMount } from 'svelte';
	const logo_url = 'https://www.macroexotics.com/favicon.svg';

	export let f_name = '';
	export let l_name = '';
	export let email = '';
	export let phone = '';
	export let message = '';
	const dateTime = new Intl.DateTimeFormat('en-GB', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	}).format(new Date());

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
	onMount(async () => {});

	const main = {
		backgroundColor: '#ffffff'
	};
	const container_bg_dark = {
		width: '100%',
		maxWidth: '900px',
		margin: '16px auto 16px auto',
		padding: '20px 0 24px',
		backgroundColor: '#f6f9fc'
	};
	const column = {
		display: 'flex',
		width: '100%',
		textAlign: 'center' as const,
		padding: '0 20px 0 20px',
		margin: '0 0 20px 0'
	};

	const container = {
		width: '100%',
		maxWidth: '900px',
		margin: '8px auto 8px auto'
	};

	const logo = {
		margin: '0 auto'
	};

	const paragraph = {
		fontFamily,
		textAlign: 'left' as const,
		fontSize: '16px',
		lineHeight: '16px'
	};
	const paragraph_centered = {
		fontFamily,
		textAlign: 'center' as const,
		fontSize: '16px',
		lineHeight: '16px'
	};
	const heading = {
		textAlign: 'left' as const,
		fontSize: '24px',
		lineHeight: '16px',
		padding: '10px 0 10px 0'
	};
	const heading_filled_center = {
		textAlign: 'center' as const,
		fontSize: '24px',
		lineHeight: '24px',
		padding: '10px 0 10px 0',
		backgroundColor: '#f6f9fc'
	};
	const btnContainer = {
		textAlign: 'center' as const,
		padding: '24px 0 0 0',
		margin: '24px auto'
	};

	const button = {
		fontFamily,
		backgroundColor: '#5F51E8',
		borderRadius: '3px',
		color: '#fff',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};
	const support = {
		padding: '20px 0',
		backgroundColor: '#f6f9fc',
		textAlign: 'center' as const,
		color: '#8898aa',
		fontSize: '10px',
		lineHeight: '12px',
		fontFamily,
		a: {
			color: '#8898aa',
			textDecoration: 'none'
		}
	};

	const footer = {
		backgroundColor: '#F3A519',
		color: '#272D5B',
		textAlign: 'center' as const,
		fontFamily,
		fontSize: '10px'
	};
	const preview_message = ` Macro Exotics | New Contact Form Submission 🔔 | ${email} `;
</script>

<Html lang="en">
	<Head>
		<title>New Message from {email}</title>
	</Head>
	<Section>
		<Container style={container_bg_dark}>
			<!-- col -->
			<Text style={heading_filled_center}>New Contact Form Submission</Text>
			<Text style={heading_filled_center}>www.macroexotics.com</Text>
		</Container>
		<Container style={container}>
			<Text style={heading}>Contact Information</Text>
			<Text style={paragraph}>Name &nbsp;: {f_name} {l_name}</Text>
			<Text style={paragraph}>Email : {email}</Text>
			<Text style={paragraph}>Phone : {phone}</Text>
		</Container>
		<Container style={container}>
			<Text style={heading}>Message</Text>
			<Text style={paragraph}>{message}</Text>
		</Container>
	</Section>
	<Section></Section>

	<Section style={footer}>
		<Section>
			<Text style={paragraph_centered}>{dateTime}</Text>
		</Section>

		<Column style={container_bg_dark}>
			<!-- col -->
			<Hr style={hr} />

			<Img src={logo_url} alt="Macro Exotics logo" style={logo} width="200" height="auto" />
		</Column>

		<Text style={support}>
			This is an Internal email {new Date().getFullYear()}
		</Text>
	</Section>
</Html>
