import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("productImage", fileName);
    formData.append("productPrice", productPrice);
    formData.append("productStock", productStock);
    formData.append("productDesc", productDesc);
    formData.append("productStatus", productStatus);

    setProductName("");
    setProductPrice("");
    setProductStock("");
    setProductDesc("");
    setProductStatus("");

    axios
      .post("/products/add", formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <Header />
        <h2>Add Product</h2>
        <span className="text-success">{message}</span>
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group mt-3">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control"
              placeholder="Product Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Product Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="form-control"
              placeholder="Product Price"
            />
          </div>
          <div className="form-group mt-3">
            <label>Product Stock</label>
            <input
              type="number"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              className="form-control"
              placeholder="Product Stock"
            />
          </div>
          <div className="form-group mt-3">
            <label>Product Description</label>
            <textarea
              type="text"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              className="form-control"
              placeholder="Product Description"
            />
          </div>
          <div className="form-group mt-3">
            <label>Product Status</label>
            <br />
            <span>Active: </span>
            <input
              type="radio"
              label="Active"
              checked={productStatus === "Active"}
              value="Active"
              onClick={() => setProductStatus("Active")}
            />
            <span> Inactive: </span>
            <input
              type="radio"
              label="Inactive"
              checked={productStatus === "Inactive"}
              value="Inactive"
              onClick={() => setProductStatus("Inactive")}
            />
          </div>
          <div className="form-group mt-3">
            <label>Choose Product Image</label>
            <br />
            <input
              type="file"
              filename="productImage"
              className="form-control-file"
              onChange={onChangeFile}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
