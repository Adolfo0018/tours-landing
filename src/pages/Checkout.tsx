import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const booking = state;
  const WHATSAPP_NUMBER = "5219991140120";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hotel: "",
    notes: "",
  });

  const handleSubmit = () => {
    const message = `
  🧭 *New Tour Reservation*

  *Tour:* ${booking?.title}
  *Dates:* ${booking?.startDate} → ${booking?.endDate}
  *People:* ${booking?.people}
  *Total:* $${booking?.total}

  👤 *Customer*
  Name: ${form.firstName} ${form.lastName}
  Email: ${form.email}
  Phone: ${form.phone}
  Hotel: ${form.hotel}

  📝 Notes:
  ${form.notes}
  `;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-4">

      <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Complete your reservation</h2>

      {/* Summary */}
      <div className="card p-3 mb-4">

        <h5>{booking?.title}</h5>

        <div>People: {booking?.people}</div>
        <div>Dates: {booking?.startDate} → {booking?.endDate}</div>
        <div className="fw-semibold mt-2">
          Total: ${booking?.total}
        </div>

      </div>

      {/* Form */}
      <div className="card p-3">

        <div className="row">

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="First name"
              name="firstName"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Last name"
              name="lastName"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              placeholder="Phone / WhatsApp"
              name="phone"
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <input
              className="form-control"
              placeholder="Hotel / Pickup location"
              name="hotel"
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <textarea
              className="form-control"
              placeholder="Special requests"
              name="notes"
              rows={3}
              onChange={handleChange}
            />
          </div>

        </div>

        <button
          className="btn btn-success w-100"
          onClick={handleSubmit}
        >
          Confirm reservation via WhatsApp
        </button>


      </div>
    </div>
  );
};

export default Checkout;