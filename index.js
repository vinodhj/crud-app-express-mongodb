const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/product.route.js");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // allowed all origins
  // origin: (origin, callback) => {
  //   console.log("origin", origin);
  //   if (origin === "http://localhost:3002" || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  maxAge: 2 * 3600, // Optional: Cache the preflight response for 2 hours
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", productRoute);

// home route
app.get("/", function (req, res) {
  res.send("NodeJS CRUD App");
});

app.get("/cors-test", function (req, res) {
  res.send("CORS Test");
  //res.send(__dirname + "/cors-test.html");
  console.log("dir", __dirname + "/cors-test.html");
  //res.sendFile(__dirname + "/cors-test.html");
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
