import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, orderStatus, paymentMethod, totalAmount, items } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Create the order
    const order = await Order.create({
      userId,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "credit card",
      totalAmount: totalAmount || 0,
    });

    // Add order items if provided
    if (items && Array.isArray(items)) {
      const orderItems = items.map((item) => ({
        orderId: order.orderId,
        productId: item.productId,
        quantity: item.quantity || 1,
        price: item.price,
      }));
      await OrderItem.bulkCreate(orderItems);
    }

    return res.status(201).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["userId", "firstName", "lastName", "emailAddress"] },
        { model: OrderItem, include: [{ model: Product, attributes: ["productId", "productName", "unitPrice"] }] },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Get a single order by id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        { model: User, attributes: ["userId", "firstName", "lastName", "emailAddress"] },
        { model: OrderItem, include: [{ model: Product, attributes: ["productId", "productName", "unitPrice"] }] },
      ],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};

// Update an order (status, payment method, amount)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentMethod, totalAmount } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.update({ orderStatus, paymentMethod, totalAmount });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Delete associated order items first
    await OrderItem.destroy({ where: { orderId: id } });
    await order.destroy();
    return res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete order", error: err.message });
  }
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
