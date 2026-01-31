import { type Attraction } from "../types/Attraction";
import { useNavigate } from "react-router-dom";

interface Props {
  data: Attraction;
}

const AttractionCard = ({ data }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="card h-100 shadow-sm attraction-card"
      onClick={() => navigate(`/tours/${data.slug}`)}
      role="button"
    >
      <img
        src={data.heroImage}
        className="card-img-top"
        alt={data.title}
        style={{ height: 180, objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{data.title}</h6>

        {data.subtitle && (
          <small className="text-muted">{data.subtitle}</small>
        )}

        {data.rating && (
          <div className="mt-2">
            ⭐ {data.rating} {data.reviews && `(${data.reviews})`}
          </div>
        )}

        <div className="mt-auto fw-semibold">
          From ${data.price}
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;