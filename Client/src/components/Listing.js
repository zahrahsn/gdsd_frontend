import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "./Product";
import axios from "axios";
import Emitter from "./Emitter";
import Pagination from "./Pagination";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

/**
 *the grid view for available products (paginated)
 *listens to SEARCHBUTTONCLICKED event to request the results
 *from server by search term and search type
 *includes product component for showing each product
 */
const Listing = props => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [pageLoaded, setPageLoded] = useState(false);
  useEffect(() => {
    if (!pageLoaded) {
      searchItemsInDB("", "Name");
    }
    Emitter.on("SEARCHBUTTONCLICKED", (comb) => {
      let term = comb.split('|')[0];
      let type = comb.split('|')[1];
      console.log(`Term=${term} --- Type=${type}`);
      searchItemsInDB(term, type)
    });
  }, []);

  const searchItemsInDB = async (sterm, stype) => {
    setPageLoded(true);
    console.log("TERM===========>" + sterm);
    console.log("TYPE===========>" + stype);
    const data = {
      params: {
        term: sterm,
        type: stype
      }
    };
    await axios
      .get("/api/get/allproducts", data)
      .then(response => {
        console.log(`Response Status = ${response.status}`);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.log(`Response data is not array = ${response.data}`);
        }
      })
      .catch(err => {
        console.log(err);
        // window.location.replace("/error500");
      });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  if (currentPosts.length === 0) {
    return (
      <div className="noresults">
        <h2>{"No results for " + props.searchTerm}</h2>
      </div>
    );
  } else {
    return (
      <div className="col-md-12">
        <div className="row">
          {currentPosts.map((currentPosts, index) => (
            <Product
              product_id={currentPosts.id}
              product_name={currentPosts.name}
              product_img={currentPosts.picture_link}
              product_description={currentPosts.description}
              product_category={currentPosts.category_name}
              product_price={currentPosts.price}
              product_seller_name={currentPosts.seller_name}
              product_seller_id={currentPosts.seller_id}
              key={index}
            />
          ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
        />
      </div>
    );
  }
};
const mapStateToProps = state => {
  return {
    products: state.getProductReducer
  };
};
const loadProductList = dispatch => {
  var userCartItem = [];

  fetch("/api/get/productlist")
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      if (window.sessionStorage.getItem("userid") !== null) {
        axios
          .post("/api/get/userCartItems", {
            user_id: window.sessionStorage.getItem("userid")
          })
          .then(response => {
            dispatch({
              type: "SET_PRODUCT",
              payload: res,
              user: response.data
            });
          });
      } else {
        dispatch({
          type: "SET_PRODUCT",
          payload: res,
          user: []
        });
      }
    });
};
const mapDispatchToProps = dispatch => {
  return {
    loadProductList: loadProductList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
