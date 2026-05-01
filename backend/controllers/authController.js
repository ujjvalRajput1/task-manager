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
    console.log("ERROR:", err);
    res.status(500).json({ error: err });
  }
};