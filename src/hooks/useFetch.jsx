import { useEffect, useState } from "react";
import getDataFromApi from "../utils/api";

const useFetch = (url) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    getDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((e) => {
        setError("Something went wrong.." + e);
        setLoading(false);
      });
  }, [url]);

  return { loading, data, error };
};
export default useFetch;
