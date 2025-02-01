<script lang="ts">
    import Accordion from '$lib/assets/components/Home/Accordion.svelte';
    import { faqData } from '$lib/data/faq';
</script>

<div class="min-h-screen bg-[#1e1e1e]">
    <Accordion faqs={faqData} showAll={true} />
</div> 