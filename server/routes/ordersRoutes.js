import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/ordersController.js";

const router = express.Router();

// POST /api/orders    -> create an order
router.post("/", createOrder);

// GET /api/orders     -> list orders
router.get("/", getOrders);

// GET /api/orders/:id -> get single order
router.get("/:id", getOrderById);

// PUT /api/orders/:id -> update order
router.put("/:id", updateOrder);

// DELETE /api/orders/:id -> remove order
router.delete("/:id", deleteOrder);

export default router;
