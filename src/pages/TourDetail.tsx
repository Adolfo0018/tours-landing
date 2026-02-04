import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAttractions } from "../data/attractions";
import { type Attraction } from "../types/Attraction";
import Reservations from "../components/Reservations";

const TourDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttractions().then((data) => {
      const found = data.find((x) => x.slug === slug);
      setTour(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading tour...</p>
      </div>
    );
  }

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
        <div className="col-lg-8">
          <ul className="nav nav-tabs mb-3" id="tourTabs" role="tablist">
            <li className="nav-item">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#do"
                type="button"
              >
                What you'll do
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#included"
                type="button"
              >
                What's included
              </button>
            </li>

            <li className="nav-item">
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#reservation"
                type="button"
              >
                Reservation
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {/* What you'll do */}
            <div className="tab-pane fade show active" id="do">
              <ul className="list-group list-group-flush bg-white bg-opacity-10 border border-light rounded-3 shadow">
                {tour.whatYouWillDo.map((item, i) => (
                  <li
                    key={i}
                    className="list-group-item bg-transparent text-black border-bottom border-light border-opacity-25"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's included */}
            <div className="tab-pane fade" id="included">
              <ul className="list-group list-group-flush bg-white bg-opacity-10 border border-light rounded-3 shadow">
                {tour.whatsIncluded.map((item, i) => (
                  <li
                    key={i}
                    className="list-group-item bg-transparent text-black border-bottom border-light border-opacity-25"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reservation */}
            <div className="tab-pane fade" id="reservation">
              <Reservations price={tour.price} title={tour.title} tourId={tour.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
