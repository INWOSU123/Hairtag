import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { productName, description, unitPrice, stockQuantity, supplierId, isActive } = req.body;
    
    // Validate required fields
    if (!productName || !unitPrice) {
      return res.status(400).json({ message: "productName and unitPrice are required" });
    }

    const product = await Product.create({
      productName,
      description,
      unitPrice,
      stockQuantity: stockQuantity || 0,
      supplierId,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Supplier, attributes: ["supplierId", "contactName", "contactEmail"] }],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Get a single product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [{ model: Supplier, attributes: ["supplierId", "contactName", "contactEmail"] }],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, unitPrice, stockQuantity, supplierId, isActive } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update({ productName, description, unitPrice, stockQuantity, supplierId, isActive });
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
