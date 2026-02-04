import { useEffect, useState } from "react";
import { getAttractions } from "../data/attractions";
import { type Attraction } from "../types/Attraction";
import AttractionCard from "./AttractionCard";
import SearchBar from "./SearchBart";

const AttractionsSection = () => {
  const [search, setSearch] = useState("");
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAttractions().then((data) => {
      setAttractions(data);
      setLoading(false);
    });
  }, []);

  const filteredAttractions = attractions.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container mt-4">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search attractions..."
      />

      {loading && (
        <div className="text-center text-muted my-5">
          Loading attractions...
        </div>
      )}

      {!loading && filteredAttractions.length === 0 && (
        <div className="text-center text-muted my-5">
          No attractions found
        </div>
      )}

      <div className="row g-4">
        {filteredAttractions.map((item) => (
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