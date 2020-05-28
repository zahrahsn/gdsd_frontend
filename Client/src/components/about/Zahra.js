import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/zahra.css";

class Zahra extends React.Component {
  render() {
    return (
      <div
        className="mainDiv"
        style={{
          backgroundColor: "#ffe5da",
          height: "100vh",
          width: "100%",
          paddingTop: "8em"
        }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-sm-8"
              style={{ backgroundColor: "#f4d8cd", padding: "1em" }}
            >
              <h3>Education:</h3>
              <ul>
                <li>
                  <h6>Software Engineering B.E.</h6>
                  <small>
                    <a href="http://www.kiau.ac.ir/en">KIAU</a>
                  </small>
                </li>
                <li>
                  <h6>Global Software Development M.Sc.</h6>
                  <small>
                    <a href="http://hs-fulda.de">Hochschule Fulda</a>
                  </small>
                </li>
              </ul>
              <h3>Programming Skills:</h3>
              <div className="row" style={{ marginTop: "2em" }}>
                <p className="col-sm-2">Front End</p>
                <div className="col-sm-10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%", backgroundColor: "#50bae3" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <p className="col-sm-2">C#</p>
                <div className="col-sm-10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "60%", backgroundColor: "#50bae3" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <p className="col-sm-2">JavaScript</p>
                <div className="col-sm-10">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "60%", backgroundColor: "#50bae3" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-sm-4"
              style={{ backgroundColor: "#e5c9be", padding: "1em" }}
            >
              <div className="row thumb">
                <img
                  src="/images/photos/zahra.jpg"
                  alt="MyPhoto"
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <div className="row" style={{ marginTop: "1em" }}>
                <h6 className="col-sm-12 text-center">Zahra Hossein Zadeh</h6>
              </div>
              <div className="row" style={{ marginTop: "1em" }}>
                <h6 className="col-sm-12 text-center">
                  <i className="fas fa-at"></i>4z.hosseinzade@gmail.com
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Zahra;
