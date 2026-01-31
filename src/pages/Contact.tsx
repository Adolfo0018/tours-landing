const Contact = () => {
  const phone = "529991140120";

  const message =
    "Hola, me gustaría recibir información sobre sus tours. Gracias.";

  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container text-center">

        <h2 className="fw-bold mb-3">Contact</h2>

        <p className="text-muted mb-4">
          Have questions or need help planning your adventure? Contact us
          directly on WhatsApp.
        </p>

        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
          target="_blank"
          className="btn btn-success btn-lg"
        >
          💬 Chat on WhatsApp
        </a>

        <div className="mt-3 text-muted small">
          Available every day · Yucatán, México
        </div>

      </div>
    </section>
  );
};

export default Contact;