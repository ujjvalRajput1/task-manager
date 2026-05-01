require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./route/authroute");
const taskRoutes = require("./route/taskroute");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Server running (Production Ready)");
});

app.use("/api/authMiddleware", authRoutes);
app.use("/api/taskController", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});