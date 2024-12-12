import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import Product from "./models/products.model.js";


dotenv.config();  /// dotenv configuration

const app = express(); // express app instance

app.use(express.json()); // express json middleware

app.post("/products", async (req, res) => {
  const product = req.body;

  console.log(req.body);

  if (!product.name || !product.description || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product);

  try {
    newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }


});

app.listen(5000, function () {

  // Connect to MongoDB database
  connectDb();

  // Log the server start message to the console
  console.log("Server started on port 5000");
});