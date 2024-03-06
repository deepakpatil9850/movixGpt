import { useEffect } from "react";
import getDataFromApi from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfig } from "./store/slice/homeSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    apiTesting();
  }, []);
  const apiTesting = () => {
    getDataFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getApiConfig(res));
    });
  };
  return (
    <div>
      <div>Welcome</div>
    </div>
  );
}

export default App;
