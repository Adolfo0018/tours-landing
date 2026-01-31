import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top shadow header-navbar">

        <div className="container">
          <a className="navbar-brand fw-bold">
            <Link className="nav-link" to="/">
              🌴 Yucatán Tours
            </Link>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">

                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

              <li className="nav-item">
                <a
                  href="https://wa.me/529991140120?text=Hola%2C%20me%20gustaría%20recibir%20información%20sobre%20sus%20tours.%20Gracias."
                  target="_blank"
                  className="whatsapp-btn ms-lg-3"
                  aria-label="Contact on WhatsApp"
                >
                  <span className="whatsapp-tooltip">Chat on WhatsApp</span>

                  <svg
                    className="whatsapp-icon"
                    viewBox="0 0 32 32"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.64 4.64 1.867 6.667L2 29.333l6.88-2.453A13.25 13.25 0 0016 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16 2.667zm0 24c-2.24 0-4.427-.587-6.347-1.707l-.453-.267-4.08 1.453 1.467-3.973-.293-.48A10.56 10.56 0 015.333 16C5.333 10.12 10.12 5.333 16 5.333S26.667 10.12 26.667 16 21.88 26.667 16 26.667zm5.827-7.787c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.497-2.56-1.587-.947-.847-1.587-1.893-1.773-2.213-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.54-.72-.55l-.613-.013c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.453 4.827.76.327 1.353.52 1.813.667.76.24 1.453.207 2 .127.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"/>
                  </svg>

                  <span className="whatsapp-text">WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-light pt-5">
        <div className="container text-center py-5 mt-4">
          <h1 className="display-5 fw-bold">Yucatán Tours</h1>

          <p className="lead mx-auto" style={{ maxWidth: 700 }}>
            Local experiences, cenotes and cultural adventures with professional
            guides from Yucatán.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;