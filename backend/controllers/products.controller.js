import mongoose from "mongoose";
import Product from "../models/products.model.js";


export const createProduct = async (req, res) => {
  const product = req.body;

  console.log(req.body);

  if (!product.name || !product.description || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product);

  try {
    newProduct.save();
    res.status(201).json({ success: true, message: "Products being fetched from controllers" });
  } catch (error) {
    console.log("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }


}


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, message: "Products fetched successfully", products });
  } catch (error) {
    console.log("Error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" },);
  }
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product fetched successfully", product });
  } catch (error) {
    console.log("Error in fetching product", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" },);
  }

  try {
    const newProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    console.log(newProduct)
    if (!newProduct) return res.status(404).json({ success: false, message: "Product not found" });
    newProduct.updateOne(product);
    res.status(200).json({ success: true, message: "Product updated successfully", product: newProduct });
  } catch (error) {
    console.log("Error in updating product", error.message);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }


}


export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Product not found" },);
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
}