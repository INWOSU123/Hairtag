import Supplier from "../models/Supplier.js";

// Create a new supplier
export const createSupplier = async (req, res) => {
  try {
    const { contactName, contactEmail, contactPhone, isActive } = req.body;
    const supplier = await Supplier.create({
      contactName,
      contactEmail,
      contactPhone,
      isActive,
    });
    return res.status(201).json(supplier);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create supplier", error: err.message });
  }
};

// Get list of suppliers (with optional pagination / filtering)
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({ order: [["createdAt", "DESC"]] });
    return res.status(200).json(suppliers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch suppliers", error: err.message });
  }
};

// Get a single supplier by id
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    return res.status(200).json(supplier);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch supplier", error: err.message });
  }
};

// Update a supplier
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    const { contactName, contactEmail, contactPhone, isActive } = req.body;
    await supplier.update({ contactName, contactEmail, contactPhone, isActive });
    return res.status(200).json(supplier);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update supplier", error: err.message });
  }
};

// Delete a supplier
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    await supplier.destroy();
    return res.status(200).json({ message: "Supplier deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete supplier", error: err.message });
  }
};

export default {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
