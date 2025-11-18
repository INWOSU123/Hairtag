import express from "express";
import {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItemsController.js";

const router = express.Router();

// POST /api/order-items    -> create an order item
router.post("/", createOrderItem);

// GET /api/order-items     -> list all order items
router.get("/", getOrderItems);

// GET /api/order-items/:id -> get single order item
router.get("/:id", getOrderItemById);

// GET /api/order-items/order/:orderId -> get all items for an order
router.get("/order/:orderId", getOrderItemsByOrderId);

// PUT /api/order-items/:id -> update order item
router.put("/:id", updateOrderItem);

// DELETE /api/order-items/:id -> remove order item
router.delete("/:id", deleteOrderItem);

export default router;
