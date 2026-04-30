const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, hashed],
    (err) => {
      if (err) return res.json(err);
      res.json({ msg: "User created" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length === 0) return res.json("User not found");

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.json("Wrong password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, role: user.role });
  });
};