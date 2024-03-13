import { useParams } from "react-router-dom";
import DetailsBanner from "./detailBanner/DetailsBanner";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const trailerVideo = data?.results?.filter(
    (video) => video.name === "Official Trailer" || video.type === "Trailer"
  );
  console.log(trailerVideo);
  return (
    <div>
      <DetailsBanner
        video={trailerVideo.length > 0 ? trailerVideo?.[0] : data?.results?.[0]}
        crew={credits?.crew}
      />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
