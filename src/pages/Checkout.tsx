import { useLocation } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
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

  const formatDate = (date: any) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;

    // Bootstrap validation
    if (!formElement.checkValidity()) {
      formElement.classList.add("was-validated");
      return;
    }

    // Seguridad extra por si booking viene vacío
    if (!booking?.title || !booking?.startDate || !booking?.people) {
      alert("Booking information missing");
      return;
    }

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

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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
    <div className="container mt-4">
      <h2>Complete your reservation</h2>

      {/* Summary */}
      <div className="card p-3 mb-4">
        <h5>{booking?.title}</h5>

        <div>People: {booking?.people}</div>
        <div>Date: {formatDate(booking?.startDate)}</div>

        <div className="fw-semibold mt-2">
          Total: ${booking?.total}
        </div>
      </div>

      {/* Form */}
      <form className="card p-3" onSubmit={handleSubmit} noValidate>
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
            <div className="invalid-feedback">First name is required</div>
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
            <div className="invalid-feedback">Last name is required</div>
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
            />
            <div className="invalid-feedback">Hotel is required</div>
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

        <button
          type="submit"
          className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
            <path d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.867 6.667L2 29.333l6.88-2.453A13.25 13.25 0 0016 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16 2.667zm0 24c-2.24 0-4.427-.587-6.347-1.707l-.453-.267-4.08 1.453 1.467-3.973-.293-.48A10.56 10.56 0 015.333 16C5.333 10.12 10.12 5.333 16 5.333S26.667 10.12 26.667 16 21.88 26.667 16 26.667z" />
          </svg>

          Confirm reservation via WhatsApp
        </button>
      </form>
    </div>
  );
};

export default Checkout;