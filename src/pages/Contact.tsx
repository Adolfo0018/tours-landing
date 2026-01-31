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
          className="btn btn-success btn-lg d-inline-flex align-items-center gap-2"
        >
          <svg
            viewBox="0 0 32 32"
            width="22"
            height="22"
            fill="currentColor"
          >
            <path d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.867 6.667L2 29.333l6.88-2.453A13.25 13.25 0 0016 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16 2.667zm0 24c-2.24 0-4.427-.587-6.347-1.707l-.453-.267-4.08 1.453 1.467-3.973-.293-.48A10.56 10.56 0 015.333 16C5.333 10.12 10.12 5.333 16 5.333S26.667 10.12 26.667 16 21.88 26.667 16 26.667zm5.827-7.787c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.497-2.56-1.587-.947-.847-1.587-1.893-1.773-2.213-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.54-.72-.55l-.613-.013c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.453 4.827.76.327 1.353.52 1.813.667.76.24 1.453.207 2 .127.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"/>
          </svg>

          Chat on WhatsApp
        </a>

        <div className="mt-3 text-muted small">
          Available every day · Yucatán, México
        </div>

      </div>
    </section>
  );
};

export default Contact;