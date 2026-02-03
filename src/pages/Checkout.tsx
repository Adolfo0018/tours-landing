import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  const booking = state as Booking;

  const [validated, setValidated] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () =>
    form.firstName &&
    form.lastName &&
    form.email &&
    form.phone &&
    form.hotel;

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
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Valid email required</div>
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Phone / WhatsApp"
              name="phone"
              value={form.phone}
              onChange={handleChange}
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

      {/* Stripe must live OUTSIDE form */}
      <StripeCheckout
        amount={booking.total * 100}
        onSuccess={(paymentIntent) => {
          console.log("Stripe success:", paymentIntent.id);

          const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            generateWhatsAppMessage()
          )}`;

          window.open(url, "_blank");
        }}
      />
    </div>
  );
};

export default Checkout;