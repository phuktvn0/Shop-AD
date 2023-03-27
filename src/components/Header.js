import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/UserActions";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    function openMenu() {
      $(".btn-aside-minimize").on("click", function () {
        document.getElementById("root").classList.toggle("aside-mini");
      });
    }
    openMenu();
    return () => {
      $(".btn-aside-minimize").off("click");
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        document.getElementById("root").classList.add("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        document.getElementById("root").classList.remove("aside-mini");
      }
    }
    $(window).on("resize", handleResize);
    handleResize();
    return () => {
      $(window).off("resize", handleResize);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="main-header navbar">
      <div>
        <button
          className="btn btn-icon btn-aside-minimize"
          data-trigger="offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
      </div>
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form>
      </div>
      <div className="col-nav">
        <ul className="nav">
          <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/favicon.png"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
              <Link
                onClick={logoutHandler}
                className="dropdown-item text-danger"
                to="#"
              >
                Exit
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
