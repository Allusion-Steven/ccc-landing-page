import { PUBLIC_STRIPE_KEY_TEST } from '$env/static/public';

let stripePromise: Promise<any>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe();
    }
    return stripePromise;
};

const loadStripe = async () => {
    const Stripe = (await import('@stripe/stripe-js')).loadStripe;
    console.log("PUBLIC_STRIPE_KEY_TEST --------------- ", PUBLIC_STRIPE_KEY_TEST);
    const stripe = await Stripe(PUBLIC_STRIPE_KEY_TEST);
    return stripe;
}; 