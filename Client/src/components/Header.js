import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "font-awesome/css/font-awesome.min.css";
import "../css/header.css";
import { HeaderContext } from "./HeaderContext";
import Emitter from "./Emitter";
import { connect } from "react-redux";
/**
 * header component handles navigation, logout,
 * and emittes search event, assignes header context search
 * term and type.
 */
const Header = props => {
  const [values, setValues] = useContext(HeaderContext);
  const categories = ["Name", "Category", "Seller"];

  useEffect(() => {
    setValues({ searchTerm: "", searchType: "Name" });
    Emitter.on("SIGNEDIN", () => window.location.reload(false));
  }, []);

  const handleSearchInputs = event => {
    if (event.target.name === "searchDropdown") {
      setValues({ ...values, searchType: event.target.value });
    } else {
      if (event.target.value === "") {
        Emitter.emit("SEARCHBUTTONCLICKED", "|Name");
      }
      setValues({ ...values, searchTerm: event.target.value });
    }
  }

  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.reload(false);
    window.location.replace("/");
  };
  const handleSubmit = event => {
    Emitter.emit("SEARCHBUTTONCLICKED", values.searchTerm + "|" + values.searchType);
    event.preventDefault();
  };

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            <img src="/images/others/eyeBlack.png" />
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 col">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Me
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search Demo
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/privacyPolicy">
                Privacy Policy
              </Link>
            </li>
          </ul>
          <div className="col px-0">
            <form className="input-group" onSubmit={handleSubmit}>
              <select
                onChange={event =>
                  handleSearchInputs(event)
                }
                name="searchDropdown"
                className="col-sm-3 col-3 custom-select input-group-prepend"
              >
                {categories.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </select>
              <input
                className="form-control col-sm-7 col-7"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="searchTerm"
                value={values.searchTerm}
                onChange={event =>
                  handleSearchInputs(event)
                }
              />
              <div className="col-sm-2 col-2 input-group-append px-0">
                <button className="btn btn-info my-0 my-sm-0" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="col px-0">
            <ul className="navbar-nav float-lg-right">
              <Link className="nav-item" to="/cart">
                <li className="nav-item">
                  <i
                    id="cd-cart-trigger"
                    className="fa fa-shopping-cart fa-2x nav-link"
                    aria-hidden="true"
                  >
                    <span className="bag">
                      {props.products.cartItems.length}
                    </span>
                  </i>
                </li>
              </Link>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={
                    window.sessionStorage.getItem("userid") === null
                      ? "/login"
                      : "/user"
                  }
                >
                  <i className="fa fa-user fa-2x mr-2" aria-hidden="true"></i>
                  {window.sessionStorage.getItem("userid") === null
                    ? "Login"
                    : "User Profile"}
                </Link>
              </li>

              <li
                className={
                  window.sessionStorage.getItem("userid") === null
                    ? "d-none"
                    : "nav-item"
                }
              >
                <Link className="nav-link" to="#" onClick={handleLogout}>
                  <i
                    className="fa fa-sign-out fa-2x mr-2"
                    aria-hidden="true"
                  ></i>
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    products: state.getProductReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkOut: product_id => {
      dispatch({ type: "ADD_TO_CART" });
    },
    filter: (category, search) => {
      dispatch({
        type: "SET_PRODUCT",
        category: category,
        search: search
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
