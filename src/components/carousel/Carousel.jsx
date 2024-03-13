import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../imgLazyLoad/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genre from "../genre/Genre";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();
  const navigation = (dir) => {
    const carousel = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? carousel.scrollLeft - (carousel.offsetWidth + 20)
        : carousel.scrollLeft + (carousel.offsetWidth + 20);

    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const url = useSelector((store) => store.home.url.poster_url);
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => {
            navigation("left");
          }}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => {
            navigation("right");
          }}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item?.poster_path
                ? url + item?.poster_path
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  key={item?.id}
                  onClick={() =>
                    navigate(`/${item?.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item?.vote_average.toFixed(1)} />
                    <Genre data={item?.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item?.title || item?.name}</span>
                    <span className="date">
                      {dayjs(item?.release_date).format("MMM D,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
