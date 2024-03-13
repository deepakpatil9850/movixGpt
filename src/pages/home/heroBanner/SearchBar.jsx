import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const searchButtonHandle = () => {
    if (query.length > 1) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder="Search for movies and TV shows"
        onKeyUp={searchQueryHandle}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button
        onClick={() => {
          searchButtonHandle();
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
