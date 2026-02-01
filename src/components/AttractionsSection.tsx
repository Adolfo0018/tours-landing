import { useState } from "react";
import { attractions } from "../data/attractions";
import AttractionCard from "./AttractionCard";
import SearchBar from "./SearchBart";

const AttractionsSection = () => {

  const [search, setSearch] = useState("");
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

      {filteredAttractions.length === 0 && (
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