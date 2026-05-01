const db = require("../db");          // ✅ correct path
const bcrypt = require("bcryptjs");  // ✅ correct
const jwt = require("jsonwebtoken"); // ✅ correct

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    res.json({ message: "User registered ✅" });
  } catch (err) {
  console.log("ERROR:", err);   // 👈 terminal में full error दिखेगा
  res.status(500).json({ error: err });

  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
