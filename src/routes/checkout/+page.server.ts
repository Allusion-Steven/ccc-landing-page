// src/routes/[referrer]/checkout/[product]/+page.server.js
import { isLive } from "$lib";
import Stripe from "stripe";
const stripeKey = /*isLive ? env.STRIPE_KEY_LIVE :  */ env.STRIPE_KEY_TEST;
const stripe = new Stripe(stripeKey);
import { env } from "$env/dynamic/private";

// TODO: change to correct URL for landing page
const DOMAIN = env.DOMAIN;
let uuid = ""

export async function load({ params, url, cookies }: any) {
    // console.log("params: ", params);
    //let uuid = url.searchParams.get("uuid");
    //const return_url = `${DOMAIN}return/success?session_id={CHECKOUT_SESSION_ID}&uuid=${uuid}`;
    const return_url = `https://www.macroexotics.com`;

/*     const coupon = url.searchParams.get("coupon");
    let c_email;
    let referrer_id = url.searchParams.get("referrer"); */
    // let c_email = url.searchParams.get("email");
/*     if (!referrer_id || referrer_id === 'not set') {
        let cookie = cookies.get('referrer')
        console.log("cookie: ", cookie);
        if (cookie) {
            referrer_id = cookie
        }
    }
    const product_id = params.product.toString();

    let firebaseDocId = url.searchParams.get("docId");
    if (!product_id) {
        return {
            error: "Invalid URL"
        }
    } */
      
/*         const product_details = {
        id: '1231231231',
        name: "Premium Car Cleaning Club Membership",
        description: "Monthly premium car cleaning service subscription",
        price: {
            test: 'price_test_1234567890', // Test mode price ID
            live: 'price_live_1234567890'  // Live mode price ID
        },
        features: [
            "Monthly Premium Cleaning",
            "Priority Scheduling",
            "Premium Products Used",
            "Interior & Exterior Service"
        ],
        interval: 'month',
        currency: 'usd',
        amount: 9900 // $99.00
    }; */

    // create metadata
    const metadata = {
/*         referrer_id: '',
        uuid: uuid,
        vehicle_make: "",
        vehicle_model: "",
        vehicle_year: "", */

    }


    console.log("metadata: ", metadata);
   // console.log("c_email: ", c_email);

    // Hardcoded product details

    const lineItem =  [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Custom Product',
            },
            unit_amount: 2000, // Amount in cents
          },
          quantity: 1,
        },
      ]

    // get the product details
    //make the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        payment_method_types: ['us_bank_account', 'card'],
        allow_promotion_codes: true,
        line_items: lineItem,
        customer_email: 'test@test.com',
        metadata: metadata,
        mode: 'payment',
        return_url
    });
     console.log("session: ", session)

    return { clientSecret: session.client_secret,  metadata };
}
