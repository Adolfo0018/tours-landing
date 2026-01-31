import { Link, useLocation } from "react-router-dom";

const labels: Record<string, string> = {
  tours: "Tours",
  checkout: "Checkout",
  about: "About",
  contact: "Contact",
};

const Breadcrumbs = () => {
  const location = useLocation();

  if (location.pathname === "/") return null;

  const parts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="container mt-3">
      <div className="breadcrumbs">

        <Link to="/">Home</Link>

        {parts.map((part, index) => {
          const path = "/" + parts.slice(0, index + 1).join("/");

          return (
            <span key={index}>
              <span className="sep">›</span>

              {index === parts.length - 1 ? (
                <span className="current">{labels[part] || part}</span>
              ) : (
                <Link to={path}>{labels[part] || part}</Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;