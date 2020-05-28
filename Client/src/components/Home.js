import React, { useContext } from "react";
import Listing from "./Listing";
import "../css/home.css";
import { HeaderContext } from "./HeaderContext";
/**
 * landing page includes listing component
 * and passes context values as props to it
 */
const Home = () => {
  const [values, setValues] = useContext(HeaderContext);
  return (
    <div className="container">
      <div className="row">
        <Listing
          searchTerm={values.searchTerm}
          searchType={values.searchType}
        />
      </div>
    </div>
  );
};
export default Home;
