import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = express.Router();

// POST /api/products    -> create a product
router.post("/", createProduct);

// GET /api/products     -> list products
router.get("/", getProducts);

// GET /api/products/:id -> get single product
router.get("/:id", getProductById);

// PUT /api/products/:id -> update product
router.put("/:id", updateProduct);

// DELETE /api/products/:id -> remove product
router.delete("/:id", deleteProduct);

export default router;
