import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliersController.js";

const router = express.Router();

// POST /api/suppliers    -> create a supplier
router.post("/", createSupplier);

// GET /api/suppliers     -> list suppliers
router.get("/", getSuppliers);

// GET /api/suppliers/:id -> get single supplier
router.get("/:id", getSupplierById);

// PUT /api/suppliers/:id -> update supplier
router.put("/:id", updateSupplier);

// DELETE /api/suppliers/:id -> remove supplier
router.delete("/:id", deleteSupplier);

export default router;
