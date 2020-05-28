import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/about.css";

class About extends React.Component {
  render() {
    return (
      <div>
        <div
          className="maindiv"
          style={{ backgroundColor: "#56baed", height: "100vh" }}
        >
          <div className="banner col-sm-8 offset-sm-2">
            <h1 className="text-center">Group Members</h1>
            <div className="row align-content-stretch">
              <Link
                to="/about/zahra"
                className="btn btn-outline-light col-sm-10 offset-sm-1"
              >
                Zahra Hossein Zadeh
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
