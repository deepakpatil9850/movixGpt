import { useEffect } from "react";
import getDataFromApi from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/slice/homeSlice";
import Body from "./components/Body";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Home from "./pages/home/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:mediaType/:id",
        element: <Details />,
      },
      {
        path: "/search/:query",
        element: <SearchResult />,
      },
      {
        path: "/explore/:type",
        element: <Explore />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    setApiConfig();
    getAllGenre();
  }, []);

  const setApiConfig = () => {
    getDataFromApi("/configuration").then((res) => {
      const urls = {
        backdrop_url: res?.images?.secure_base_url + "w780",
        poster_url: res?.images?.secure_base_url + "w185",
        big_poster_url: res?.images?.secure_base_url + "w342",
        profile_url: res?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfig(urls));
    });
  };

  const getAllGenre = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((point) => {
      promises.push(getDataFromApi(`/genre/${point}/list`));
    });

    const data = await Promise.all(promises);

    data?.map(({ genres }) =>
      genres?.map((genre) => (allGenres[genre?.id] = genre))
    );
    dispatch(getGenres(allGenres));
  };

  return (
    <div>
      <RouterProvider router={appRoutes} />
    </div>
  );
}

export default App;
