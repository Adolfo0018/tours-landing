import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import StripeCheckout from "../components/StripeCheckout";

interface Booking {
  title: string;
  startDate: string;
  people: number;
  total: number;
}

const WHATSAPP_NUMBER = "5219991140120";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const hasHandledRedirect = useRef(false);

  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  const booking = state as Booking;

  const [validated, setValidated] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | null
  >(null);

  const [paymentError, setPaymentError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hotel: "",
    notes: "",
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US");

  const generateWhatsAppMessage = () => `
*New Tour Reservation*

*Tour:* ${booking.title}
*Date:* ${formatDate(booking.startDate)}
*People:* ${booking.people}
*Total:* $${booking.total}

*Customer*
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
Hotel: ${form.hotel}

Notes:
${form.notes || "N/A"}
`;

  /* ================= STRIPE REDIRECT HANDLER ================= */

  useEffect(() => {
    if (hasHandledRedirect.current) return;

    const params = new URLSearchParams(window.location.search);
    const status = params.get("redirect_status");
    const pi = params.get("payment_intent");

    if (status === "succeeded" && pi) {
      hasHandledRedirect.current = true;

      setPaymentStatus("success");

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        generateWhatsAppMessage() + `\n\nStripe Payment ID:\n${pi}`
      )}`;

      window.open(url, "_blank");

      window.history.replaceState({}, "", window.location.pathname);
    }

    if (status === "failed") {
      hasHandledRedirect.current = true;
      setPaymentStatus("error");
      setPaymentError("Payment failed.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  /* ========================================================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () =>
    !!(
      form.firstName &&
      form.lastName &&
      isValidEmail(form.email) &&
      form.phone
    );


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);

    if (!isFormValid()) return;
  };

  return (
    <div className="container mt-4">
      <h2>Complete your reservation</h2>

      {/* Summary */}
      <div className="card p-3 mb-4">
        <h5>{booking.title}</h5>
        <div>People: {booking.people}</div>
        <div>Date: {formatDate(booking.startDate)}</div>
        <div className="fw-semibold mt-2">Total: ${booking.total}</div>
      </div>

      {/* Customer Form */}
      <form
        className={`card p-3 ${validated ? "was-validated" : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">First name required</div>
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Last name required</div>
          </div>

          <div className="col-md-6 mb-3">
            <input
              className={`form-control ${
                validated && !isValidEmail(form.email) ? "is-invalid" : ""
              }`}
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please enter a valid email address</div>
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Phone / WhatsApp"
              name="phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value.replace(/\D/g, ""),
                })
              }
              required
              pattern="[0-9]{10}"
            />
            <div className="invalid-feedback">10 digit phone required</div>
          </div>

          <div className="col-12 mb-3">
            <input
              className="form-control"
              placeholder="Hotel / Pickup location"
              name="hotel"
              value={form.hotel}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Hotel required</div>
          </div>

          <div className="col-12 mb-3">
            <textarea
              className="form-control"
              placeholder="Special requests"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>

      {/* Stripe OUTSIDE form */}
      <StripeCheckout
        amount={booking.total * 100}
        canPay={isFormValid()}
        onSuccess={(paymentIntent) => {
          setPaymentStatus("success");

          const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            generateWhatsAppMessage() +
              `\n\nStripe Payment ID:\n${paymentIntent.id}`
          )}`;

          window.open(url, "_blank");
        }}
        onError={(msg) => {
          setPaymentStatus("error");
          setPaymentError(msg);
        }}
      />

      {paymentStatus && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center">
              {paymentStatus === "success" && (
                <>
                  <h4 className="text-success">Payment successful ✅</h4>
                  <p>Your reservation has been completed.</p>
                </>
              )}

              {paymentStatus === "error" && (
                <>
                  <h4 className="text-danger">Payment failed ❌</h4>
                  <p>{paymentError}</p>
                </>
              )}

              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  setPaymentStatus(null);
                  navigate("/");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;