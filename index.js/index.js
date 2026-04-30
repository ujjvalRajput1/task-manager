require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.log("DB ERROR ❌:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running on Railway");
});

// =========================
// 🔐 AUTH ROUTES (Signup/Login)
// =========================

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "User registered successfully" });
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token });
  });
});

// =========================
// 📁 PROJECT ROUTES
// =========================

// Create Project
app.post("/projects", (req, res) => {
  const { title, description, createdBy } = req.body;

  const sql =
    "INSERT INTO projects (title, description, createdBy) VALUES (?, ?, ?)";

  db.query(sql, [title, description, createdBy], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Project created" });
  });
});

// Get Projects
app.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

// =========================
// 📌 TASK ROUTES
// =========================

// Create Task
app.post("/tasks", (req, res) => {
  const { title, projectId, assignedTo, status, dueDate } = req.body;

  const sql =
    "INSERT INTO tasks (title, projectId, assignedTo, status, dueDate) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [title, projectId, assignedTo, status, dueDate],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Task created" });
    }
  );
});

// Get Tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

// =========================
// 🚀 SERVER START
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});