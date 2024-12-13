
import Product from "../models/products.model.js";
import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { get } from "mongoose";

const router = express.Router();


router.post("/", createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.patch("/:id", updateProduct)


router.delete("/:id", deleteProduct)


export default router;