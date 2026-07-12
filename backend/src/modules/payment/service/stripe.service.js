import Stripe from "stripe";

// ─── Stripe SDK Instance ──────────────────────────────────────────────────────
// All Stripe API interactions are isolated in this service.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
});

// ─── Stripe Service ───────────────────────────────────────────────────────────

export const stripeService = {
    /**
     * Create a Stripe Payment Intent.
     * @param {number} amountInCents - Amount in smallest currency unit (cents for USD).
     * @param {string} currency - Currency code (e.g., "usd").
     * @param {object} metadata - Metadata to attach (e.g., { userId }).
     * @returns {Promise<Stripe.PaymentIntent>}
     */
    createPaymentIntent: async (amountInCents, currency, metadata) => {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency,
            metadata,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return paymentIntent;
    },

    /**
     * Construct and verify a Stripe webhook event from raw body + signature.
     * @param {Buffer} rawBody - The raw request body buffer.
     * @param {string} signature - The Stripe-Signature header value.
     * @returns {Stripe.Event}
     */
    constructWebhookEvent: (rawBody, signature) => {
        return stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET,
        );
    },
};
