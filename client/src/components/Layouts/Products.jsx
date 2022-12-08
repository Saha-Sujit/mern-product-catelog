import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";

const Products = ({ products }) => {
  const [product, setProduct] = useState([]);
  //delete product by id
  const deleteProduct = (id) => {
    axios.delete(`/products/${id}`).then((res) => console.log(res.data));
    window.location.reload(false);
  };
  return (
    <>
      <Header />
      <h2>All Products</h2>
      <div class="row">
        {products.map((product, key) => (
          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <img
                  className=""
                  src={`/uploads/${product.productImage}`}
                  alt="..."
                  style={{ width: "300px" }}
                />
                <h5 class="card-title">{product.productName}</h5>
                <p className="card-text">Price: ₹{product.productPrice}</p>
                <p className="card-text">In Stock: {product.productStock}</p>
                <p className="card-text">Description: {product.productDesc}</p>
                <p className="card-text">Status: {product.productStatus}</p>
                <div className="row">
                  <div className="col-sm-2">
                    <Link
                      to={`/update/${product._id}`}
                      className="btn btn-outline-success"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="col-sm-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
