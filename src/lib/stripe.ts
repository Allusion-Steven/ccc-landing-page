import Stripe from "stripe";
import { isLive } from "$lib";
import { STRIPE_KEY_TEST, STRIPE_KEY_LIVE, STRIPE_API_VERSION } from "$env/static/private";

const stripeKey = !isLive ? STRIPE_KEY_TEST : STRIPE_KEY_LIVE;

console.log(isLive ? "Stripe is running in test mode" : "Stripe is running in live mode");

if (!isLive) {
    console.log("Stripe is running in test mode");
    console.log("Stripe key: " + stripeKey);
}

export const stripe = new Stripe(stripeKey, {
    //@ts-expect-error
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createFetchHttpClient(),
});

export async function getSubscriptionFromCheckoutSession(sessionId: string) {
    try {
        // Retrieve the Checkout Session
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        let subscriptionId: string | undefined;

        // Check if it's a subscription mode session
        if (session.mode === 'subscription' && session.subscription) {
            subscriptionId = session.subscription as string;
        } else {
            // For mixed mode or subscription_data sessions
            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
            const subscriptionItem = lineItems.data.find(item => item.subscription);
            subscriptionId = subscriptionItem?.subscription as string;
        }

        if (!subscriptionId) {
            throw new Error('No subscription found for this session');
        }

        // Retrieve the full Subscription object
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        return subscription;
    } catch (error) {
        console.error('Error retrieving subscription:', error);
        throw error;
    }
}