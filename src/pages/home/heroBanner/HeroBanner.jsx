import { useEffect } from "react";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const HeroBanner = () => {
  const image_base_url = useSelector((state) => state?.home?.url?.backdrop_url);
  const { data, loading } = useFetch("/movie/upcoming");

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
          {/* search bar */}
          <SearchBar />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
