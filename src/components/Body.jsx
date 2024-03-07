import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
// import ContentWrapper from "./contentWrapper/";

const Body = () => {
  return (
    <>
      <Header />

      <Outlet />

      {/* <Footer /> */}
    </>
  );
};

export default Body;
