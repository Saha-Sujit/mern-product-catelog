const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productStock: { type: String, required: true },
  productDesc: { type: String, required: true },
  productStatus: { type: String, required: true },
  productImage: { type: String, required: true },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
