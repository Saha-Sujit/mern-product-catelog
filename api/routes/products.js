const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/products");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//request get all products
router.get("/", (req, res) => {
  Products.find()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//request add new products
router.post("/add", upload.single("productImage"), (req, res) => {
  const newProduct = new Products({
    productName: req.body.productName,
    productImage: req.file.originalname,
    productPrice: req.body.productPrice,
    productStock: req.body.productStock,
    productDesc: req.body.productDesc,
    productStatus: req.body.productStatus,
  });

  newProduct
    .save()
    .then(() => res.json("The new product added successfully!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//request find article by id
router.get("/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//request find article by id and update
router.put("/update/:id", upload.single("productImage"), (req, res) => {
  Products.findById(req.params.id)
    .then((product) => {
      product.productName = req.body.productName;
      product.productImage = req.file.originalname;
      product.productPrice = req.body.productPrice;
      product.productStock = req.body.productStock;
      product.productDesc = req.body.productDesc;
      product.productStatus = req.body.productStatus;

      product
        .save()
        .then(() => res.json("The product is updated successfully!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//request find article by id and delete
router.delete("/:id", (req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(() => res.json("The product is deleted"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
