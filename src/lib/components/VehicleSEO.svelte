<script lang="ts">
    interface Props {
        make: string;
        model: string;
        year: string;
        imageUrl: string;
        vehicleType?: 'vehicle' | 'yacht';
        canonical: string;
    }

    let {
        make,
        model,
        year,
        imageUrl,
        vehicleType = 'vehicle',
        canonical
    }: Props = $props();
    const vehicleTypeText = vehicleType === 'yacht' ? 'yacht' : 'car';
    const title = `${make} ${model} | Macro Exotics`;
    const description = `${year} ${make} ${model} - Luxury ${vehicleTypeText} rental in Miami. Book now at Macro Exotics.`;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="title" content={title} />
    <meta name="keywords" content="{make}, {model}, Luxury {vehicleTypeText} Rental, Miami, Macro Exotics" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Macro Exotics" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1C1C1C" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://macroexotics.com/{vehicleType}/{canonical}" />
    <meta property="og:image" content="https://macroexotics.com{imageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Macro Exotics" />
    <link rel="canonical" href="https://macroexotics.com/{vehicleType}/{canonical}" />
</svelte:head> 