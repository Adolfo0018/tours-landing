import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY);

interface Props {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
}

const CheckoutForm = ({ onSuccess }: { onSuccess: (pi: any) => void }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || loading) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    console.log("Stripe result:", result);
    console.log("PaymentIntent status:", result.paymentIntent?.status);

    if (result.error) {
      setError(result.error.message || "Payment failed");
      setLoading(false);
      return;
    }

    if (result.paymentIntent?.status === "processing") {
      setError("Payment is processing, please wait a moment...");
      setLoading(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      onSuccess(result.paymentIntent);
      return;
    }

    setError("Unexpected payment state.");
    setLoading(false);
  };

  return (
    <form onSubmit={handlePay} className="mt-4">
      <PaymentElement />

      {error && <div className="text-danger mt-2">{error}</div>}

      <button
        type="submit"
        className="btn btn-primary w-100 mt-3"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay with card"}
      </button>
    </form>
  );
};

const StripeCheckout = ({ amount, onSuccess }: Props) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!amount) return;

    setLoading(true);

    fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(() => {
        setClientSecret(null);
        setLoading(false);
      });
  }, [amount]);

  if (loading) return <div className="mt-3">Loading payment...</div>;

  if (!clientSecret)
    return <div className="text-danger mt-3">Stripe failed to initialize</div>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripeCheckout;