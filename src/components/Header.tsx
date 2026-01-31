import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
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
                  className="btn btn-success fw-semibold ms-lg-3"
                >
                  💬 WhatsApp
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

          <p className="lead text-muted mx-auto" style={{ maxWidth: 700 }}>
            Local experiences, cenotes and cultural adventures with professional
            guides from Yucatán.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;