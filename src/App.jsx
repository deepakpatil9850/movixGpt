import { useEffect } from "react";
import getDataFromApi from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfig } from "./store/slice/homeSlice";
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
        path: "/explore",
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
  }, []);

  const setApiConfig = () => {
    getDataFromApi("/configuration").then((res) => {
      const urls = {
        image_base_url: res?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfig(urls));
    });
  };
  return (
    <div>
      <RouterProvider router={appRoutes} />
    </div>
  );
}

export default App;
