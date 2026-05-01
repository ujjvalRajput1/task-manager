console.log("🔥 THIS FILE IS RUNNING");
const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./route/authroute");

dotenv.config();

const app = express();

app.use(express.json());

// ✅ ADD THIS
app.get("/test", (req, res) => {
  res.send("Test route working ✅");
});

// ✅ IMPORTANT
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const cors = require("cors");
app.use(cors());