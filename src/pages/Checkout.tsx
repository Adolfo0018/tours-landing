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
          className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleSubmit}
        >
          <svg
            viewBox="0 0 32 32"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.867 6.667L2 29.333l6.88-2.453A13.25 13.25 0 0016 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16 2.667zm0 24c-2.24 0-4.427-.587-6.347-1.707l-.453-.267-4.08 1.453 1.467-3.973-.293-.48A10.56 10.56 0 015.333 16C5.333 10.12 10.12 5.333 16 5.333S26.667 10.12 26.667 16 21.88 26.667 16 26.667zm5.827-7.787c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.497-2.56-1.587-.947-.847-1.587-1.893-1.773-2.213-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.54-.72-.55l-.613-.013c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.453 4.827.76.327 1.353.52 1.813.667.76.24 1.453.207 2 .127.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"/>
          </svg>

          Confirm reservation via WhatsApp
        </button>

      </div>
    </div>
  );
};

export default Checkout;