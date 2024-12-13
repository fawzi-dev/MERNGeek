import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productsRouter from "./routes/products.route.js";



dotenv.config();  /// dotenv configuration

const app = express(); // express app instance

app.use(express.json()); // express json middleware

const port = process.env.PORT || 5000;


app.use("/api/products", productsRouter);


app.listen(port, function () {

  // Connect to MongoDB database
  connectDb();

  // Log the server start message to the console
  console.log("Server started on port " + port);
});