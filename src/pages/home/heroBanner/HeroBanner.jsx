import { useEffect, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

const HeroBanner = () => {
  const image_base_url = useSelector((state) => state?.home?.url?.backdrop_url);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");

  const searchQueryHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const searchButtonHandle = () => {
    if (query.length > 1) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {}, [data]);

  return (
    <div className="hero-Banner">
      {!loading && (
        <div className="backdrop-img">
          <img
            src={
              data?.results?.length > 0
                ? image_base_url +
                  data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
                : " "
            }
          />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV Show and people to discover. Explore now.
          </span>
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
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
