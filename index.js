const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product.model");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/api/products", async function async(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));
