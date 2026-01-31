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

          <ul className="nav nav-tabs mb-3" id="tourTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="do-tab"
                data-bs-toggle="tab"
                data-bs-target="#do"
                type="button"
                role="tab"
              >
                What you'll do
              </button>
            </li>

            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="included-tab"
                data-bs-toggle="tab"
                data-bs-target="#included"
                type="button"
                role="tab"
              >
                What's included
              </button>
            </li>

            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="included-tab"
                data-bs-toggle="tab"
                data-bs-target="#reservation"
                type="button"
                role="tab"
              >
                Reservation
              </button>
            </li>
          </ul>

          <div className="tab-content">

            {/* What you'll do */}
            <div
              className="tab-pane fade show active"
              id="do"
              role="tabpanel"
            >
              <ul className="list-group list-group-flush">
                {tour.whatYouWillDo.map((item, i) => (
                  <li key={i} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's included */}
            <div
              className="tab-pane fade"
              id="included"
              role="tabpanel"
            >
              <ul className="list-group list-group-flush">
                {tour.whatsIncluded.map((item, i) => (
                  <li key={i} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* reservation */}
            <div
              className="tab-pane fade"
              id="reservation"
              role="tabpanel"
            >
              <ul className="list-group list-group-flush">
                <Reservations price={tour.price} title={tour.title} />
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TourDetail;