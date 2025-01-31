<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { slide } from "svelte/transition";
  import { type Stripe } from "@stripe/stripe-js";
  import { type StripeEmbeddedCheckout } from "@stripe/stripe-js";
  export let stripe: Stripe;
  export let clientSecret: string;

  let wrapper: HTMLElement | null = null;

  let checkoutElement: StripeEmbeddedCheckout | null = null;

  async function initializeCheckout() {
    if (stripe && clientSecret && wrapper) {
      try {
        if (checkoutElement) {
          await checkoutElement.destroy();
        }
        checkoutElement = await stripe.initEmbeddedCheckout({ clientSecret });
        await checkoutElement.mount(wrapper);
      } catch (error) {
        console.error("Error initializing checkout:", error);
      }
    }
  }

  $: if (stripe && clientSecret && wrapper) {
    initializeCheckout();
  }

  onMount(() => {
    if (stripe && clientSecret && wrapper) {
      initializeCheckout();
    }
  });

  onDestroy(() => {
    if (checkoutElement) {
      try {
        checkoutElement.destroy();
      } catch (error) {
        console.error("Error destroying checkout:", error);
      }
    }
  });
</script>

{#if stripe && clientSecret}
  <div
    id="checkout-container"
    class="checkout-wrapper"
    transition:slide
    bind:this={wrapper}
  />
{/if}
