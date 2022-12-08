import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  let { id } = useParams();

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
      .put(`/products/update/${id}`, formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => [
        setProductName(res.data.productName),
        setProductPrice(res.data.productPrice),
        setProductStock(res.data.productStock),
        setProductDesc(res.data.productDesc),
        setProductStatus(res.data.productStatus),
        setFileName(res.data.productImage),
      ])
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="container">
        <Header />
        <h2>Edit Product</h2>
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
              required
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
              required
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
              required
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
              required
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
              required
            />
            <span> Inactive: </span>
            <input
              type="radio"
              label="Inactive"
              checked={productStatus === "Inactive"}
              value="Inactive"
              onClick={() => setProductStatus("Inactive")}
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
