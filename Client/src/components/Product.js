import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import $ from "jquery";

/**
 * bootstrap card for showing brief information of
 * each product in home page
 */
class Product extends Component {
    render() {
    const {
      product_id,
      product_name,
      product_img,
      product_description,
      product_category,
      product_price,
      product_seller_name,
      product_seller_id
    } = this.props;
    return (
      <div className="col-md-4 col-lg-3 d-flex align-items-stretch">
        <Link
          to={{
            pathname: "/detail"
          }}
          onClick={() => {
            this.props.productDetailID(product_id);
          }}
        >
          <div className="product">
            <div className="product-img"
            style={{background:'white'}}>
              <img
                src={
                  product_img === null ||
                    product_img === "" ||
                    product_img === "null"
                    ? "https://icon-library.net//images/product-icon-png/product-icon-png-29.jpg"
                    : product_img
                }
                alt="product_name"
                style={{
                  maxHeight:'300px',
                  minHeight:'300px',
                  width:'auto',
                  objectFit:'scale-down'
                }}
               
              />
            </div>
            <div className="product-body">
              <p className="product-category">{product_category}</p>
              <h3 className="product-name">{product_name}</h3>
              <h4 className="product-price">{product_price} €</h4>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    productDetailID: product_id => {
      console.log(product_id);
      dispatch({
        type: "SET_PRODUCT_DETAIL_ID",
        payload: product_id
      });
    }
  };
};

export default connect(mapDispatchToProps, mapDispatchToProps)(Product);
