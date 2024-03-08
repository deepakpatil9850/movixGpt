import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const headerColorConvert = () => {
      if (window.scrollY > 300) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
          setShow("hide");
        } else {
          setShow("show");
        }
      } else {
        setShow("top");
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", headerColorConvert);
    return () => {
      window.removeEventListener("scroll", headerColorConvert);
    };
  }, [lastScrollY, mobileMenu]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  //? applied on mobile menu
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };

  const navigationHandle = (type) => {
    if (type === "/") {
      navigate("/");
    } else {
      navigate(`/explore/${type}`);
    }
    setMobileMenu(false);
    setShowSearch(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img
            src={logo}
            alt=""
            onClick={() => {
              navigationHandle("/");
            }}
          />
        </div>
        {/* menu itmes bar  */}
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandle("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandle("tv")}>
            TV shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={() => setShowSearch(true)} />
          </li>
        </ul>
        {/* // ? applied on mobile device */}
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {/* full width search bar start here */}
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movies and TV shows"
                onKeyUp={searchQueryHandle}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <VscChromeClose
                onClick={() => {
                  setShowSearch(false);
                }}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
