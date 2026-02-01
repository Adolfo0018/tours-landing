import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export const handler = async (event: any) => {
  try {
    const { amount } = JSON.parse(event.body || "{}");

    if (!amount) {
      return {
        statusCode: 400,
        body: "Missing amount",
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};