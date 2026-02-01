import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StripeCheckout from "../components/StripeCheckout";

interface Booking {
  title: string;
  startDate: string;
  people: number;
  total: number;
}

const WHATSAPP_NUMBER = "5219991140120";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state as Booking | null;

  // Redirect si se pierde el booking (refresh / Stripe)
  useEffect(() => {
    if (!booking) navigate("/");
  }, []);

  if (!booking) return null;

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

  const sendWhatsApp = () => {
    const message = `
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

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h2 className="mb-3">Complete your reservation</h2>

      {/* Summary */}
      <div className="card p-3 mb-4">
        <h5>{booking.title}</h5>

        <div>People: {booking.people}</div>
        <div>Date: {formatDate(booking.startDate)}</div>

        <div className="fw-semibold mt-2">
          Total: ${booking.total}
        </div>
      </div>

      {/* Customer form */}
      <div className="card p-3">
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
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Phone / WhatsApp"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
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

        {/* Stripe */}
        <StripeCheckout
          amount={booking.total * 100}
          onSuccess={sendWhatsApp}
        />
      </div>
    </div>
  );
};

export default Checkout;