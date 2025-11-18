import OrderItem from "../models/OrderItem.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create a new order item
export const createOrderItem = async (req, res) => {
  try {
    const { orderId, productId, quantity, price } = req.body;

    // Validate required fields
    if (!orderId || !productId || !quantity || !price) {
      return res.status(400).json({ message: "orderId, productId, quantity, and price are required" });
    }

    const orderItem = await OrderItem.create({
      orderId,
      productId,
      quantity,
      price,
    });

    return res.status(201).json(orderItem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create order item", error: err.message });
  }
};

// Get all order items
export const getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [
        { model: Order, attributes: ["orderId", "orderStatus", "totalAmount"] },
        { model: Product, attributes: ["productId", "productName", "unitPrice"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(orderItems);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch order items", error: err.message });
  }
};

// Get a single order item by id
export const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findByPk(id, {
      include: [
        { model: Order, attributes: ["orderId", "orderStatus", "totalAmount"] },
        { model: Product, attributes: ["productId", "productName", "unitPrice"] },
      ],
    });

    if (!orderItem) return res.status(404).json({ message: "Order item not found" });
    return res.status(200).json(orderItem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch order item", error: err.message });
  }
};

// Get all items for a specific order
export const getOrderItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderItems = await OrderItem.findAll({
      where: { orderId },
      include: [
        { model: Product, attributes: ["productId", "productName", "unitPrice", "stockQuantity"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (orderItems.length === 0) {
      return res.status(404).json({ message: "No items found for this order" });
    }
    return res.status(200).json(orderItems);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch order items", error: err.message });
  }
};

// Update an order item
export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;

    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) return res.status(404).json({ message: "Order item not found" });

    await orderItem.update({ quantity, price });
    return res.status(200).json(orderItem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update order item", error: err.message });
  }
};

// Delete an order item
export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) return res.status(404).json({ message: "Order item not found" });

    await orderItem.destroy();
    return res.status(200).json({ message: "Order item deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete order item", error: err.message });
  }
};

export default {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  updateOrderItem,
  deleteOrderItem,
};
