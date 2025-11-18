import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import cookieParser from "cookie-parser";
import User from "./models/User.js";
import Order from "./models/Order.js";
import Product from "./models/Product.js";
import Supplier from "./models/Supplier.js";
import OrderItem from "./models/OrderItem.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import suppliersRoutes from "./routes/suppliersRoutes.js";
import orderItemsRoutes from "./routes/orderItemsRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // if you need cookies
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/orders", ordersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/order-items", orderItemsRoutes);
app.get("/", (req, res) => res.send("Hairtag API is running 🚀"));
app.post("/api/status", (req, res) => { 
  // so now we will say this endpoint data is an object with apiName , status and version
  // we will extract those from req.body
  const { apiName, status, version,description } = req.body;

  console.log(`API Status Update - Name: ${apiName}, Status: ${status}, Version: ${version}`, description ? `, Description: ${description}` : "");
  res.json({ message: "Status received", apiName, status, version, description });
});

// Sync DB
sequelize
  .sync() // { force: true } if you want to reset DB
  .then(() => {
    console.log("Database synced");
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));