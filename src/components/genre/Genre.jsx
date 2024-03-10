import "./style.scss";
import { useSelector } from "react-redux";

const Genre = ({ data }) => {
  const genresList = useSelector((state) => state?.home?.genres);

  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genresList[g]?.name) return;
        return (
          <div key={genresList[g]?.id} className="genre">
            {genresList[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genre;
