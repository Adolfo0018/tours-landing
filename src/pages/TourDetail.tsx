import { useParams, useNavigate } from "react-router-dom";
import { attractions } from "../data/attractions";
import Reservations from "../components/Reservations";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const tour = attractions.find((x) => x.slug === slug);

  if (!tour) {
    return (
      <div className="container mt-4">
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p>Tour not found.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* Title */}
      <h1>{tour.title}</h1>

      <p className="text-muted">{tour.shortDescription}</p>

      {/* Carousel */}
      <div
        id="tourCarousel"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner rounded">

          {tour.gallery.map((img, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <img
                src={img}
                className="d-block w-100"
                style={{ maxHeight: 420, objectFit: "cover" }}
                alt=""
              />
            </div>
          ))}

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#tourCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#tourCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      <div className="row">

        {/* LEFT CONTENT */}
        <div className="col-lg-8">

          {/* What you'll do */}
          <h4>What you'll do</h4>

          <ul className="mb-4">
            {tour.whatYouWillDo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* What's included */}
          <h4>What's included</h4>

          <ul>
            {tour.whatsIncluded.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

        </div>

        {/* RESERVATIONS */}
        <div className="col-lg-4">

            <Reservations price={tour.price} title={tour.title} />

        </div>
      </div>
    </div>
  );
};

export default TourDetail;