<script lang="ts">
    import { onMount } from "svelte";
    import { loadStripe } from "@stripe/stripe-js";
    import EmbeddedCheckout from "$lib/components/EmbeddedCheckout.svelte";
    import {
      PUBLIC_STRIPE_KEY_TEST,
    } from "$env/static/public";
/*     import { ProgressRadial } from "@skeletonlabs/skeleton";
 */    
    export const prerender = true;
/*     import TOS from "$lib/Components/Global/TOS.svelte";
    import TOSLink from "$lib/Components/Global/TOSLink.svelte"; */
    let stripe: any = null;
    let scrollAnchor: HTMLElement | null;
    onMount(async () => {
      const stripeKey = /* isLive ? PUBLIC_STRIPE_KEY : */ PUBLIC_STRIPE_KEY_TEST;
      stripe = await loadStripe(stripeKey);
      // get the scroll anchor element if it exists in the dom
      document.addEventListener("DOMContentLoaded", function () {
        scrollAnchor = document.getElementById("checkout-container");
      });
    });
/*     $: if (scrollAnchor) {
      scrollAnchor?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } */
    export let data;
    const {
      clientSecret,
    } = data;
    // console.log(product_details);
    // console.log(metadata);
  </script>
  
  <svelte:head>
    <title>Checkout</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="https://macroexotics.com/checkout" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </svelte:head>
  
  <div
    class="checkout-container w-[100vw] flex items-center justify-center bg-primary-500"
  >
    <div class="checkout-header w-full">Checkout</div>
  
    <div class="checkout-embedded w-full">
      {#if !stripe}
        <div class="spinner"></div>
<!--         <ProgressRadial
          class="progress-radial"
          stroke={50}
          meter="stroke-primary-500"
          track="stroke-primary-500/30"
          strokeLinecap="butt"
          value={undefined}
        /> -->
      {:else if stripe && clientSecret}
        <EmbeddedCheckout {stripe} {clientSecret} />
<!--         <div class="tos">
          <TOSLink />
        </div> -->
      {/if}
    </div>
  </div>
  
  <!-- src/routes/[referrer]/checkout/[product]/+page.svelte -->
  
  <style>
    .checkout-container {
      @apply flex flex-col  justify-start h-full w-full bg-primary-500 min-h-[100vh];
    }
  
    .checkout-header {
      @apply bg-miami-pink p-4 text-center text-4xl font-bold text-white;
      max-height: 100px;
    }
    /* 
    .checkout-embedded {
      @apply flex flex-col items-center justify-center h-full w-full;
    } */
  
    .spinner {
      @apply w-16 h-16 border-b-2 border-primary-500 rounded-full animate-spin;
    }
  
    .progress-radial {
      @apply w-16 h-16;
    }
  
    .tos {
      @apply mt-4 text-center;
    }
  
    @media (max-width: 768px) {
      .checkout-container {
        @apply grid h-full w-full;
        grid-template-columns: 1fr;
      }
    }
  </style>
  