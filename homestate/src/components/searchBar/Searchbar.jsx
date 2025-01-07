import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";
const Searchbar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const types = ["buy", "rent"];

  const switchType = (type) => {
    setQuery((pre) => {
      return { ...pre, type };
    });
  };

  const handleChange = (e) => {
    setQuery((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`${query.type === type ? "active" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>

      <form action="">
        <input
          type="text"
          name="location"
          placeholder="City Location"
          onChange={handleChange}
          value={query.location}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          min={0}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?city=${query.location}&type=${query.type}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Searchbar;
