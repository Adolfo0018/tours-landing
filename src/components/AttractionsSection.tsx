import { attractions } from "../data/attractions";
import AttractionCard from "./AttractionCard";

const AttractionsSection = () => {
  return (
    <section className="container mt-4">
      <div className="row g-4">
        {attractions.map((item) => (
          <div
            key={item.id}
            className="col-12 col-sm-6 col-lg-4 col-xl-3"
          >
            <AttractionCard data={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttractionsSection;