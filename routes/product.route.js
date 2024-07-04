const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

// get all products
router.get("/products", getProducts);

// get product by id
router.get("/product/:id", getProductById);

// create a product
router.post("/post-products", createProduct);

// update a product
router.put("/update-product/:id", updateProduct);

// delete a product
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
