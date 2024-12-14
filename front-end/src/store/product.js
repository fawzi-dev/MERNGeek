import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();

    // Ensure the response contains the created product
    if (!data) {
      return { success: false, message: "Failed to create product" };
    }

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product added successfully", data };
  },

  getAllProducts: async () => {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    // Safeguard against missing or malformed API responses
    if (!data || !data.products) {
      return { success: false, message: "Failed to fetch products" };
    }

    set({ products: data.products });
    return { success: true, message: "Products fetched successfully", data: data.products };
  },

  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await res.json();
    if (!data) {
      return { success: false, message: "Failed to delete product" };
    }

    set((state) => ({ products: state.products.filter((product) => product._id !== id) }));

    return { success: true, message: "Product deleted successfully", data };
  },

  editProduct: async (id, product) => {
    console.log(id)
    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product)
    })

    const data = await res.json();
    if (!data) {
      return { success: false, message: "Failed to edit product" };
    }

    set((state) => ({ products: state.products.map((product) => product._id === id ? data.product : product) }));
    return { success: true, message: "Product edited successfully", data };
  }

}));